import React, {Component} from 'react';
import {Nav, NavbarBrand, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';

import {withRouter} from "react-router"
import {NavLink as RNavLink} from 'react-router-dom'
import {connect} from "react-redux"
import {logoutUser} from "../../redux/actions"

import logo from "../../static/img/dal_logo.png"

import {AppSidebarToggler} from '@coreui/react';
import DefaultHeaderDropdown from './DefaultHeaderDropdown'
import "./styles/style.css"


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  componentWillUpdate(nextProps, nextState){
  // perform any preparations for an upcoming update
  const { authenticated, logoutUser, history} = nextProps
  if (authenticated === false) return logoutUser(history)
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { logoutUser, history} = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <NavbarBrand href="#" style={{backgroundColor:"black"}}>
          <img src={logo} alt="logo" style={{height:'30px'}}/>
          <span className="nav-span"> INWK<span className="bold-gold">DAL</span></span>
        </NavbarBrand>
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none nav-link" navbar>
          <NavItem className="px-3">
            <RNavLink to="/dashboard">Dashboard</RNavLink>
          </NavItem>
           <NavItem className="px-3 nav-link">
            <RNavLink to="/courses">Courses</RNavLink>
          </NavItem>
           <NavItem className="px-3 nav-link">
            <RNavLink to="/vlabs/labs">All Registered Labs</RNavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto mx-3" navbar>
          <DefaultHeaderDropdown accnt {...this.props}/>
        </Nav>


        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => ( { authenticated: state.auth.authenticated, user: state.user_data.info})
export default withRouter(connect(mapStateToProps, {logoutUser})(DefaultHeader));

// export default DefaultHeader;
