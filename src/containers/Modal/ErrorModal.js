import React from "react"
import {Button, Modal as RModal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


const ErrorModal = ({ closeModal, isOpen, error, detail }) => {
  return (
    <RModal isOpen={isOpen} className="modal-danger">
      <ModalHeader toggle={() => closeModal() }>
        {error}
      </ModalHeader>
      <ModalBody>
        <h6>{detail}</h6>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => closeModal()}>Close</Button>{' '}
      </ModalFooter>
    </RModal>
  )
}

export default ErrorModal
