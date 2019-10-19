import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class TopbarMenuLinks extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
  };

  static defaultProps = {
    clickHandler: null,
  };

  render() {
    const {
      title, icon, path, clickHandler,
    } = this.props;

    return clickHandler ? (
      <div role="button" className="topbar__link" onClick={clickHandler} tabIndex="0" onKeyDown={() => ({})}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </div>
    ) : (
      <Link className="topbar__link" to={path}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </Link>
    );
  }
}
