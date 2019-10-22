import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from 'mdi-react/DeleteIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import MatTableFilterButton from './MatTableFilterButton';

const MatTableToolbar = ({
  numSelected, handleDeleteSelected, handleSearchChange, onRequestSort,
}) => (
  <div className="material-table__toolbar-wrap">
    <Toolbar className="material-table__toolbar">
      <div className="form">
        <div className="form__form-group products-list__search">
          <MagnifyIcon />
          <input placeholder="Search..." name="search" onChange={handleSearchChange} />
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div>
        {numSelected > 0 && (
        <h5 className="material-table__toolbar-selected">{numSelected} <span>selected</span></h5>
        )}
      </div>
      <div>
        {numSelected > 0 ? (
          <IconButton
            onClick={handleDeleteSelected}
            className="material-table__toolbar-button"
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <MatTableFilterButton onRequestSort={onRequestSort} />
        )}
        {/* <Link className="btn btn-primary products-list__btn-add" to="/pages">Add new
          user
        </Link> */}
      </div>
    </Toolbar>
  </div>
);

MatTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDeleteSelected: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default MatTableToolbar;
