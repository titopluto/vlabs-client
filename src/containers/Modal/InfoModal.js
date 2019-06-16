import React from "react"
import {Button, Modal as RModal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


const InfoModal = ({ closeModal, isOpen, info, detail, buttonAction, dispatch}) => {
  return (
    <RModal isOpen={isOpen} className="modal-info">
      <ModalHeader toggle={() => { buttonAction ? dispatch({type:buttonAction}) : closeModal() } }>
        {info}
      </ModalHeader>
      <ModalBody>
        <h6>{detail}</h6>
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={() => {
          buttonAction ? dispatch({type:buttonAction}) : closeModal()}}>    Close
        </Button>{' '}
      </ModalFooter>
    </RModal>
  )
}

export default InfoModal
