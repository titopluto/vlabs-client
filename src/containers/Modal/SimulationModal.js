import React, {Component} from "react"
import {connect} from "react-redux"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


class SimulationModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.show
    };
    this.toggle = this.toggle.bind(this);
    this.myToggle = this.myToggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  myToggle() {
    this.props.dispatch({
      type:"HIDE_MODAL"
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="animated fadeIn">

                <Modal>
                  <ModalHeader toggle={this.myToggle}>Modal title</ModalHeader>
                  <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.myToggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.myToggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({dispatch})

export default connect(null, mapDispatchToProps)(SimulationModal)
