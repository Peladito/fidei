import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from 'mdi-react/DeleteIcon';
import AccountAddIcon from 'mdi-react/AccountAddIcon';
import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import MatTableFilterButton from './MatTableFilterButton';

const MatTableToolbar = ({
  numSelected,
  handleDeleteSelected,
  handleSearchChange,
  onRequestSort,
  handleAddElement,
}) => (
  <div className="material-table__toolbar-wrap">
    <Toolbar className="material-table__toolbar">
      <div className="form__form-group-field">
        <input placeholder="Search..." name="search" onChange={handleSearchChange} />
        <div className="form__form-group-icon">
          <AccountSearchIcon />
        </div>
      </div>
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
      </div>
      <div>
        <IconButton className="icon" size="sm" color="primary" onClick={handleAddElement}>
          <AccountAddIcon />
        </IconButton>
      </div>
    </Toolbar>
  </div>
);

MatTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDeleteSelected: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleAddElement: PropTypes.func.isRequired,
};

export default MatTableToolbar;
