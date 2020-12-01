import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import { Repository } from '../models/repository';
import { PaginationInfo } from '../models/pagination';
import styled from '@emotion/styled';

interface RepositoryTableProps {
  repositories: Repository[];
  paginationInfo: PaginationInfo;
  onSetPage: (page: number) => any;
  onSetItemsPerPage: (itemsPerPage: number) => any;
}

const RepositoryTable: React.FC<RepositoryTableProps> = ({
  repositories,
  paginationInfo,
  onSetPage,
  onSetItemsPerPage,
}) => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <Head />
          <Body repositories={repositories} />
        </Table>
        <Pagination
          paginationInfo={paginationInfo}
          onSetPage={onSetPage}
          onSetItemsPerPage={onSetItemsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};

export default RepositoryTable;

const Head = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Repository</TableCell>
        <NumberCell align="right">🌟 Stars</NumberCell>
        <NumberCell align="right">🍴 Forks</NumberCell>
      </TableRow>
    </TableHead>
  );
};

interface BodyProps {
  repositories: Repository[];
}
const Body: React.FC<BodyProps> = ({ repositories }) => {
  return (
    <TableBody>
      {repositories.map((repo) => (
        <TableRow key={repo.id}>
          <TableCell>{repo.name}</TableCell>
          <NumberCell align="right">🌟 {repo.stargazerCount}</NumberCell>
          <NumberCell align="right">🍴 {repo.forkCount}</NumberCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

interface PaginationProps {
  paginationInfo: PaginationInfo;
  onSetPage: (page: number) => any;
  onSetItemsPerPage: (itemsPerPage: number) => any;
}
const Pagination: React.FC<PaginationProps> = ({
  paginationInfo,
  onSetPage,
  onSetItemsPerPage,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={paginationInfo.totalItems}
      labelRowsPerPage="Items"
      rowsPerPage={paginationInfo.itemsPerPage}
      page={paginationInfo.currentPage}
      onChangePage={(event, page) => onSetPage(page)}
      onChangeRowsPerPage={(event) =>
        onSetItemsPerPage(parseInt(event.target.value))
      }
    />
  );
};

const NumberCell = styled(TableCell)`
  width: ${({ theme }) => theme.spacing(16)}px;
`;
