import React, {Component} from 'react';
import {connect} from "react-redux"
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem} from 'reactstrap';
import classNames from 'classnames';
import nav from '../../../_nav'

import {logoutUser} from "../../../redux/actions"

class Sidebar extends Component {

  handleClick (e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute (routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';

  }
  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {

    const props = this.props;
    const activeRoute = this.activeRoute;
    const handleClick = this.handleClick;

    // badge addon to NavItem
    const badge = (badge) => {
      if (badge) {
        const classes = classNames( badge.class );
        return (<Badge className={ classes } color={ badge.variant }>{ badge.text }</Badge>)
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)): item.name ) };

    // nav list section title
    const title =  (title, key) => {
      const classes = classNames( "nav-title", title.class);
      return (<li key={key} className={ classes }>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => (<li key={key} className="divider"> </li>);

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = classNames( "nav-link", item.class);
      const { is_staff } = this.props
      if (!is_staff  && item.visible === 'staff') {
        return null
      }
      else
      {
        return (
          <NavItem key={key}>
            <NavLink to={item.url} className={ classes } activeClassName="active">
              <i className={item.icon}> </i>{item.name}{badge(item.badge)}
            </NavLink>
          </NavItem>
        )
      }
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className={activeRoute(item.url, props)}>
          <a className="nav-link nav-dropdown-toggle" onClick={handleClick.bind(this)}><i className={item.icon}> </i> {item.name}</a>
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </li>)
    };

    // nav link
    const navLink = (item, idx) =>
      item.title ? title(item, idx) :
      item.divider ? divider(item, idx) :
      item.children ? navDropdown(item, idx) : navItem(item, idx) ;

    // nav list
    const navList = (items) => {
      return items.map( (item, index) => navLink(item, index) );
    };

    let {first_name, last_name, groups } = this.props.user
    first_name = first_name ? first_name : "loading"
    last_name = last_name ? last_name : "loading"
    groups = groups ? groups : "loading"

    const displayGroups = (group, i) =>
       <div key={i} className="text-muted"><small> {group.name } </small></div>

    // sidebar-nav root
    const { logoutUser, history } = this.props
    return (
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}
          </Nav>
        </nav>

    )
  }
}


const mapStateToProps = state => (
   {
     user: state.user_data.info,
     is_staff: state.user_data.info.is_staff
   }
)




export default connect(mapStateToProps, { logoutUser })( Sidebar);


