import React, {Component} from 'react';
import _ from "lodash"
import {withRouter} from "react-router"
import PropTypes from 'prop-types';
import {logoutUser} from "../../redux/actions";
import {connect} from "react-redux";
import avatar from "../../static/img/avatars/avatar.png"


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultSidebarHeader extends Component {

  displayGroups = (group, i) =>  <div key={i} className="text-muted"><small> {group.name } </small></div>

  render() {

    // eslint-disable-next-line
    const { children, logoutUser, history, ...attributes } = this.props;
    let {first_name, last_name, groups } = this.props.user;
    first_name = first_name ? first_name : "loading";
    last_name = last_name ? last_name : "loading";
    groups = groups ? groups : "loading";

    return (
      <React.Fragment>
        <img src={avatar} className="img-avatar" alt="Avatar"/>
        <div><strong>{`${first_name} ${last_name}`}</strong></div>
        { _.map(groups,this.displayGroups) }
        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
          <button type="button" className="btn btn-link" onClick={()=>logoutUser(history)}>
            <i className="fa fa-lock"> </i>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

DefaultSidebarHeader.propTypes = propTypes;
DefaultSidebarHeader.defaultProps = defaultProps;

const mapStateToProps = state => (
   {
     user: state.user_data.info,
     is_staff: state.user_data.info.is_staff
   }
)
export default withRouter(connect(mapStateToProps, { logoutUser })( DefaultSidebarHeader));

