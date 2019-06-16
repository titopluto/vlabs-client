import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

import avatar from "../../static/img/avatars/avatar.png"

const propTypes = {
  accnt: PropTypes.bool,
};

const defaultProps = {
  accnt: false,

};

class DefaultHeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }


  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img src={avatar} className="img-avatar" alt="avatar" />
        <span className="d-md-down-none">Account</span>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                <DropdownItem onClick={()=>this.props.logoutUser(this.props.history)}><i className="fa fa-lock"> </i> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }



  render() {
    const { accnt } = this.props;
    return (
          accnt ? this.dropAccnt() :
           null
    );
  }
}

DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;

export default DefaultHeaderDropdown;
