import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

interface RepositoryTableProps {
  repositories: any[];
}

const RepositoryTable: React.FC<RepositoryTableProps> = () => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Repository</TableCell>
              <TableCell>🌟 Stars</TableCell>
              <TableCell>🍴 Forks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>asd</TableCell>
              <TableCell>🌟 123</TableCell>
              <TableCell>🍴 111</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>asd</TableCell>
              <TableCell>🌟 123</TableCell>
              <TableCell>🍴 111</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>asd</TableCell>
              <TableCell>🌟 123</TableCell>
              <TableCell>🍴 111</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>asd</TableCell>
              <TableCell>🌟 123</TableCell>
              <TableCell>🍴 111</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={40}
        rowsPerPage={5}
        page={0}
        onChangePage={console.log}
        onChangeRowsPerPage={console.log}
      />
    </Paper>
  );
};

export default RepositoryTable;
