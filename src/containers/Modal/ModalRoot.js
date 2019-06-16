import React from 'react';
import Modal from 'react-modal';
import {connect} from "react-redux"
import ErrorModal from "./ErrorModal"
import SuccessModal from "./SuccessModal"
import InfoModal from "./InfoModal"
import ConfirmModal from "./ConfirmModal"
import CaptureModal from "./CaptureModal/CaptureModal"

const MODAL_COMPONENTS = {
  'ERROR_MODAL': ErrorModal,
  'SUCCESS_MODAL': SuccessModal,
  'INFO_MODAL' : InfoModal,
  'CAPTURE_MODAL': CaptureModal,
  'CONFIRM_MODAL': ConfirmModal
  /* other modals */
}


class ModalRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: this.props.modalProps.isOpen
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



  componentWillReceiveProps(nextProps) {
    this.setState ( {
      modalIsOpen: nextProps.modalProps.isOpen
    });
  }

  openModal() {
    // this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.props.dispatch({type: "HIDE_MODAL"})
  }

  render() {
    const {modalType, modalProps} = this.props
    if (!modalType) {
    return null
    }

    const SpecificModal = MODAL_COMPONENTS[modalType]
    return (
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal">

          <SpecificModal closeModal={this.closeModal} dispatch={this.props.dispatch} {...modalProps} />

        </Modal>
    );
  }
}

const mapStateToProps = state => ( { modalType: state.modal.modalType, modalProps: state.modal.modalProps } )

const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot)
