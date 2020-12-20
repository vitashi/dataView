import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
  root: {
    width: '90%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function DataTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  let headers = []

  if (props.data.length > 0){
  	let oneRecord = props.data[0]
  	headers = Object.keys(oneRecord).map((header) => {
  		return(
  			<TableCell
                  key={header}
                  align={'center'}
                  style={{ minWidth: 100, backgroundColor: "#808080", color: "white"}}
                >
                  {header}
                </TableCell>
  		)
  	})
  }

  const tableCells = (row) => {
  	return (
	  		row.map((cell)=> {
	  		return(<TableCell align={"right"}>{cell}</TableCell>)
	  		}
	  	)
  	)

  }


  const tableHeader = (
  	<TableHead>
  		<TableRow>
  			{headers}
  		</TableRow>
    </TableHead>
  )

  const tableBody = (
  <TableBody>
  	{props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
  		return (
  			<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
  				{tableCells(Object.values(row))}
                </TableRow>
              );
            })}
          </TableBody>
  )

  return (
    <div >
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          {tableHeader}
          {tableBody}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
