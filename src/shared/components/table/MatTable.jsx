import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
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
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const { tabulatedSource } = this.props;
    tabulatedSource.handleSort(property);
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      const { data } = this.state;
      const newSelected = new Map();
      data.map(n => newSelected.set(n.id, true));
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
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDeleteSelected = () => {
    const { data } = this.state;
    let copyData = [...data];
    const { selected } = this.state;

    for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
      copyData = copyData.filter(obj => obj.id !== selected[i]);
    }

    this.setState({ data: copyData, selected: new Map([]) });
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return !!selected.get(id);
  };

  render() {
    const {
      selected, rowsPerPage, page,
    } = this.state;
    const { tabulatedSource } = this.props;
    // eslint-disable-next-line
    console.log(tabulatedSource);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tabulatedSource.data.length - (page * rowsPerPage));
    const headersAndLabels = [
      {
        id: 'name', disablePadding: true, label: 'Dessert (100g serving)',
      },
      {
        id: 'calories', disablePadding: false, label: 'Calories',
      },
      {
        id: 'fat', disablePadding: false, label: 'Fat (g)',
      },
      {
        id: 'carbs', disablePadding: false, label: 'Carbs (g)',
      },
      {
        id: 'protein', disablePadding: false, label: 'Protein (g)',
      },
    ];
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Material table</h5>
            </div>
            <MatTableToolbar
              numSelected={[...selected].filter(el => el[1]).length}
              handleDeleteSelected={this.handleDeleteSelected}
              onRequestSort={this.handleRequestSort}
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
                  headers={headersAndLabels}
                />
                <TableBody>
                  {tabulatedSource.data
                    .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                    .map((d) => {
                      const isSelected = this.isSelected(d.id);
                      const res = headersAndLabels.map(header => (
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
              count={tabulatedSource.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
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
          </CardBody>
        </Card>
      </Col>
    );
  }
}
