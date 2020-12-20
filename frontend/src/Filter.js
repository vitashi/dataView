import './App.css';

// import { Container } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  overal: {
  	margin: theme.spacing(2),
  	maxWidth: '70%',
  	float: "left",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  button:{
  	marginTop: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
      flexGrow: 1,
    },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
}));


function DatePicker(props) {
  const classes = useStyles();

  return (
	<FormControl variant="outlined" className={classes.formControl}>
      <TextField
        id="date"
        label={props.label}
        type="date"
        onChange={props.onSelect}
        defaultValue=""
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
	</FormControl>
    
  );
}


function DropDownFilter(props){
	const classes = useStyles();
	const [filter, setFilter] = React.useState(null);

	const onFilterSelect = (event) => {
		setFilter(event.target.value);
		props.onSelect(event.target.value)
	};

	const menuItems = props.content.map((item) => (
		<MenuItem value={item.name}>{item.name}</MenuItem>
	))

	return(
		<FormControl variant="outlined" className={classes.formControl}>
	        <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
	        <Select
	          labelId="demo-simple-select-outlined-label"
	          id="demo-simple-select-outlined"
	          value={filter}
	          onChange={onFilterSelect}
	          label={props.label}
	        >
	          <MenuItem value={null}>
	            <em>None</em>
	          </MenuItem>
	          {menuItems}
	        </Select>
	      </FormControl>
	)
}


function Filter(props){

	const classes = useStyles();
	const [age, setAge] = React.useState('');
	const [selectedDepartment, setSelectedDepartment] = React.useState("")
	const [selectedCountry, setSelectedCountry] = React.useState("")
	const [selectedProduct, setSelectedProduct] = React.useState("")

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	// const onDepartmentSelect = (filter) => {
	// 	setSelectedDepartment(filter);
	// };

	// const onCountrySelect = (filter) => {
	// 	setSelectedCountry(filter);
	// };

	// const onProductSelect = (filter) => {
	// 	setSelectedProduct(filter);
	// };


	const getFilterData = (filter) => {
		let propLookup = {
			'country': props.countries,
			'department': props.departments,
			'product': props.products,
		}
		return propLookup[filter]
	}

	const query = {department: selectedDepartment, country: selectedCountry}

	return (
		<div className={classes.overal}>
          <FormLabel component="label">Filter</FormLabel>
	      <DropDownFilter label="Department" content={getFilterData("department")} onSelect={props.onDepartmentSelect}/>
	      <DropDownFilter label="Country" content={getFilterData("country")} onSelect={props.onCountrySelect}/>
	      <DropDownFilter label="Product" content={getFilterData("product")} onSelect={props.onProductSelect}/>
	      <DatePicker label={"From"} onSelect={props.onFromSelect}/>
	      <DatePicker label={"To"} onSelect={props.onToSelect}/>
	      <FormControl variant="outlined" className={classes.formControl}>
	      	<Button startIcon={<SearchIcon/>} variant="contained" onClick={props.onSearch} className={classes.button} color="primary">
	      		Search
	      	</Button>
	      </FormControl>
		</div>
		)
}

export default Filter;