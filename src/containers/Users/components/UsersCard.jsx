import React from 'react';
import {
  Card, CardBody, Col, ButtonToolbar,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import MatTable from '../../../shared/components/table/MatTable';
import { getUsers as apiGetUsers } from '../../../redux/actions/apiActions';

class UsersCard extends React.Component {
  static propTypes = {
    tabulatedSource: PropTypes.shape({}).isRequired,
    fetchUsers: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    const { fetchUsers } = this.props;
    fetchUsers(0, 20, { direction: 'asc', field: 'calories' });
  }

  render() {
    const { tabulatedSource } = this.props;
    return tabulatedSource ? (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="products-list">
            <div className="card__title">
              <h5 className="bold-text">Users</h5>
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <div className="form__form-group products-list__search">
                  <input placeholder="Search..." name="search" />
                  <MagnifyIcon />
                </div>
                <Link className="btn btn-primary products-list__btn-add" to="/pages">Add new
                  user
                </Link>
              </ButtonToolbar>
            </div>
            <MatTable tabulatedSource={tabulatedSource} />
          </CardBody>
        </Card>
      </Col>
    ) : (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Users</h5>
              <h5 className="subhead">Listing and administration</h5>
            </div>
            <p>No content here</p>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({ tabulatedSource: state.api.tabulatedSource });

export default connect(
  mapStateToProps,
  { fetchUsers: apiGetUsers },
)(UsersCard);
