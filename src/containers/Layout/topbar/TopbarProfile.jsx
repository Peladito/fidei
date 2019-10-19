import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import TopbarMenuLink from './TopbarMenuLink';
import { logOut as apiLogOut } from '../../../redux/actions/apiActions';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

class TopbarProfile extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({}),
    logOut: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: { profile: { name: 'Guest' } },
  };

  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  logoutHandler = async () => {
    const { logOut } = this.props;
    await logOut();
  }

  render() {
    const { collapse } = this.state;
    const { user } = this.props;
    return (
      <div className="topbar__profile">
        <button type="button" className="topbar__avatar" onClick={this.toggle}>
          <img className="topbar__avatar-img" src={Ava} alt="avatar" />
          <p className="topbar__avatar-name">{user.profile.name}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && <button type="button" className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink title="Page one" icon="list" path="/pages/one" />
            <TopbarMenuLink title="Page two" icon="inbox" path="/pages/two" />
            <div className="topbar__menu-divider" />
            <TopbarMenuLink title="Log Out" icon="exit" path="/" clickHandler={this.logoutHandler} />
          </div>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.api.user });

export default connect(
  mapStateToProps,
  { logOut: apiLogOut },
)(TopbarProfile);
