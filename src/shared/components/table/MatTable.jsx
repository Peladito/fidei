import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import MatTableHead from './MatTableHead';
import MatTableToolbar from './MatTableToolbar';

// let counter = 0;

// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return {
//     id: counter, name, calories, fat, carbs, protein,
//   };
// }

// function getSorting(order, orderBy) {
//   if (order === 'desc') {
//     return (a, b) => {
//       if (a[orderBy] < b[orderBy]) {
//         return -1;
//       }
//       if (a[orderBy] > b[orderBy]) {
//         return 1;
//       }
//       return 0;
//     };
//   }
//   return (a, b) => {
//     if (a[orderBy] > b[orderBy]) {
//       return -1;
//     }
//     if (a[orderBy] < b[orderBy]) {
//       return 1;
//     }
//     return 0;
//   };
// }

export default class MatTable extends PureComponent {
  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.number.isRequired,
    })).isRequired,
    tabulatedSource: PropTypes.shape({
      order: { field: PropTypes.string, direction: PropTypes.string },
      data: PropTypes.object,
      handleSort: PropTypes.func,
      handleClick: PropTypes.func,
      handlePaginate: PropTypes.func,
    }).isRequired,
  };

  state = {
    selected: new Map([]),
  };

  getSelections = () => {
    const { selected } = this.state;
    return [...selected].reduce((r, [id, active]) => (active ? r.concat([id]) : r), []);
  };

  handleRequestSort = (event, property) => {
    const { tabulatedSource } = this.props;
    tabulatedSource.handleSort(property);
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      const { tabulatedSource } = this.props;
      const newSelected = new Map();
      tabulatedSource.data.map(n => newSelected.set(n.id, true));
      this.setState({ selected: newSelected });
      return;
    }
    this.setState({ selected: new Map([]) });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const newSelected = new Map(selected);
    const value = newSelected.get(id);
    let isActive = true;
    if (value) {
      isActive = false;
    }
    newSelected.set(id, isActive);
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    const { tabulatedSource } = this.props;
    tabulatedSource.changePage(page);
  };

  handleChangeRowsPerPage = (event) => {
    const { tabulatedSource } = this.props;
    tabulatedSource.changeLimit(Number(event.target.value));
  };

  handleDeleteSelected = () => {
    const { tabulatedSource } = this.props;
    tabulatedSource.deleteElements(this.getSelections());
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return !!selected.get(id);
  };

  handleSearch = (event) => {
    const { tabulatedSource } = this.props;
    if (event.target.value.length > 2 || event.target.value.length === 0) {
      // eslint-disable-next-line
      console.log(event.target.value);
      tabulatedSource.search(event.target.value);
    }
  }

  handleAddElement = () => {
    const { tabulatedSource } = this.props;
    tabulatedSource.handleAddElementRequest();
  }

  render() {
    const {
      selected, rowsPerPage, page,
    } = this.state;
    const { tabulatedSource, headers } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tabulatedSource.data.length - (page * rowsPerPage));
    return (
      <div>
        <MatTableToolbar
          numSelected={[...selected].filter(el => el[1]).length}
          handleDeleteSelected={this.handleDeleteSelected}
          onRequestSort={this.handleRequestSort}
          handleSearchChange={this.handleSearch}
          handleAddElement={this.handleAddElement}
        />
        <div className="material-table__wrap">
          <Table className="material-table">
            <MatTableHead
              numSelected={[...selected].filter(el => el[1]).length}
              order={tabulatedSource.order.direction}
              orderBy={tabulatedSource.order.field}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={tabulatedSource.data.length}
              headers={headers}
            />
            <TableBody>
              {tabulatedSource.data
                .map((d) => {
                  const isSelected = this.isSelected(d.id);
                  const res = headers.map(header => (
                    <TableCell
                      className="material-table__cell material-table__cell-right"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      {d[header.id]}
                    </TableCell>
                  ));

                  return (
                    <TableRow
                      className="material-table__row"
                      role="checkbox"
                      onClick={event => this.handleClick(event, d.id)}
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={d.id}
                      selected={isSelected}
                    >
                      <TableCell className="material-table__cell" padding="checkbox">
                        <Checkbox checked={isSelected} className="material-table__checkbox" />
                      </TableCell>
                      {res}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          className="material-table__pagination"
          count={tabulatedSource.total}
          rowsPerPage={tabulatedSource.limit}
          page={tabulatedSource.page}
          backIconButtonProps={{ 'aria-label': 'PrevFious Page' }}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
          dir="ltr"
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
        />
      </div>
    );
  }
}
