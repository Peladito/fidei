import React from 'react';
import {
  Card, CardBody, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MatTable from '../../../shared/components/table/MatTable';
import { getUsers as apiGetUsers } from '../../../redux/actions/apiActions';

const headers = [
  {
    id: 'id', disablePadding: true, label: 'Select',
  },
  {
    id: 'name', disablePadding: false, label: 'Nombre',
  },
  {
    id: 'surname', disablePadding: false, label: 'Apellido',
  },
  {
    id: 'age', disablePadding: false, label: 'Edad',
  },
  {
    id: 'email', disablePadding: false, label: '@',
  },
];

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
    fetchUsers(0, 5, { direction: 'asc', field: 'calories' });
  }

  render() {
    const { tabulatedSource } = this.props;
    return tabulatedSource ? (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="products-list">
            <MatTable tabulatedSource={tabulatedSource} headers={headers} />
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
