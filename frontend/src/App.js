import './App.css';
import React from 'react';

import Paper from '@material-ui/core/Paper';
import TopBar from './TopBar'
import DataTable from './DataTable'
import Filter from './Filter'
import Chart from './Chart'
import Actions from './Actions'
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import AlertDialog from './AlertDialog'

const styles = {
  filterArea:{
      width:"100%",
      height: 100,
      marginBottom: 20,
      padding: 5,
      backgroundColor: "#ff9f80"
    },
  chartArea:{
    width: "100%",
    height:"40%"
  },

  dataArea:{
    width:"100%"
  }

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salesData: [],
      chartData: [],
      countriesData: [],
      departmentData: [],
      productsData: [],
      selectedDepartment: null,
      selectedCountry: null,
      selectedProduct: null,
      fromDate: null,
      toDate: null,
      searched: false,
      openAlert: false,
    };
  }

  componentDidMount() {
    this.salesDataArray()
    this.chartDataArray()
    this.countriesDataArray()
    this.departmentDataArray()
    this.ProductsDataArray()
  }

  componentWillUnmount() {
  }

  onDepartmentSelect(filter){
    this.setState({selectedDepartment: filter})
  }

  onCountrySelect(filter){
    this.setState({selectedCountry: filter})
  }

  onProductSelect(filter){
    this.setState({selectedProduct: filter})
  }

  onBeforeDateSelected(event){
    this.setState({fromDate: event.target.value})
  }

  onAfterDateSelected(event){
    this.setState({toDate: event.target.value})
  }

  salesDataArray = () => {
    axios
    .get(`/api/getSalesData/${this.state.selectedDepartment}/${this.state.selectedCountry}/${this.state.selectedProduct}/${this.state.fromDate}/${this.state.toDate}/`)
    .then(res => {
      if ((res.status === 200) && (res['data']['response_data'].length > 0)){
        this.setState({salesData: res.data['response_data']})
      }else if (this.state.searched){
        this.setState({openAlert: true})
      }
      
    })
    .catch(err => console.log(err));
  }

  onAlertClose(){
    this.setState({openAlert: false})
  }

  chartDataArray = () => {
    axios
    .get(`/api/getChartData/${this.state.selectedDepartment}/${this.state.selectedCountry}/${this.state.selectedProduct}/${this.state.fromDate}/${this.state.toDate}/`)
    .then(res => {
      if ((res.status === 200) && (res['data']['response_data'].length > 0)){
        this.setState({chartData: res.data['response_data']})}
      }
    )
    .catch(err => console.log(err));

  }

  countriesDataArray = () => {
    axios
    .get("/api/getCountries/")
    .then(res => this.setState({countriesData: res.data['response_data']}))
    .catch(err => console.log(err));

  }

  ProductsDataArray = () => {
    axios
    .get("/api/getProducts/")
    .then(res => this.setState({productsData: res.data['response_data']}))
    .catch(err => console.log(err));

  }

  departmentDataArray = () => {
    axios
    .get("/api/getDepartments/")
    .then(res => this.setState({departmentData: res.data['response_data']}))
    .catch(err => console.log(err));

  }

  search(){
    this.setState({searched: true})
    this.salesDataArray()
    this.chartDataArray()
  }

  onDownload(){
    let { salesData } = this.state
    let csvContent = "data:text/csv;charset=utf-8,";

    salesData.forEach(function(rowArray) {

        let row = Object.values(rowArray).join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); 
    link.click()
    }

  render(){
    return(
      <div className="App">
      
        <TopBar/>
      
        <div style={styles.chartArea}>
          <Chart data={this.state.chartData}/>
        </div>
        <AlertDialog open={this.state.openAlert} onClose={this.onAlertClose.bind(this)}/>

        <Divider/>

        <div style={styles.filterArea}>
          <Filter 
            countries={this.state.countriesData}
            departments={this.state.departmentData}
            products={this.state.productsData}
            onDepartmentSelect={this.onDepartmentSelect.bind(this)}
            onCountrySelect={this.onCountrySelect.bind(this)}
            onProductSelect={this.onProductSelect.bind(this)}
            onSearch={this.search.bind(this)}
            onFromSelect={this.onBeforeDateSelected.bind(this)}
            onToSelect={this.onAfterDateSelected.bind(this)}
            />
            
          <Actions onDownload={this.onDownload.bind(this)} />

        </div>

        <Divider/>

        <Paper style={styles.dataArea}>
          <DataTable data={this.state.salesData}/>
        </Paper>

      </div>
      )
    }

}

export default App;
