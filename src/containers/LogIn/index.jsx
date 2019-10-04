import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import { logIn as apiLogIn } from '../../redux/actions/apiActions';
import LogInForm from './components/LogInForm';

const LogIn = loginHandler => () => (
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
  };


  handleSubmit(loginData) {
    const { logIn } = this.props;
    logIn(loginData);
    // history.push('/dashboard');
  }

  render() {
    // eslint-disable-next-line
    console.log(this.props.jwt)
    const Login = LogIn(this.handleSubmit.bind(this));
    return (<Login />);
  }
}

const mapStateToProps = state => ({ jwt: state.api.jwt });

export default connect(
  mapStateToProps,
  { logIn: apiLogIn },
)(withRouter(Register));

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
