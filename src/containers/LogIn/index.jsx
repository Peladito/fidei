import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import { logIn as apiLogIn } from '../../redux/actions/apiActions';
import LogInForm from './components/LogInForm';
import Alert from '../../shared/components/Alert';


const AppAlert = ({ type, title, message }) => (
  <Alert color={type}><p><span className="bold-text">{title}: </span>{message}</p></Alert>
);

AppAlert.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};


const LogIn = (loginHandler, error) => () => (
  <div className="account">
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">Welcome to
            <span className="account__logo"> Easy
              <span className="account__logo-accent">DEV</span>
            </span>
          </h3>
          <h4 className="account__subhead subhead">Start your business easily</h4>
        </div>
        { error ? <AppAlert type="danger" title="Unauthorized" message="Wrong credentials" /> : <div />}
        <LogInForm onSubmit={loginHandler} />
        <div className="account__or">
          <p>Or Easily Using</p>
        </div>
        <div className="account__social">
          <Link
            className="account__social-btn account__social-btn--facebook"
            to="/pages/one"
          ><FacebookIcon />
          </Link>
          <Link
            className="account__social-btn account__social-btn--google"
            to="/pages/one"
          ><GooglePlusIcon />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

class Register extends React.Component {
  static propTypes = {
    logIn: PropTypes.func.isRequired,
    error: PropTypes.shape({}),
  };

  static defaultProps = {
    error: null,
  };

  async handleSubmit(loginData) {
    // eslint-disable-next-line
    const { logIn } = this.props;
    await logIn(loginData);
  }

  render() {
    const { error } = this.props;
    const Login = LogIn(this.handleSubmit.bind(this), error);
    return (<Login />);
  }
}

const mapStateToProps = state => ({ user: state.api.user, error: state.api.loginError });

export default connect(
  mapStateToProps,
  { logIn: apiLogIn },
)(withRouter(Register));

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
