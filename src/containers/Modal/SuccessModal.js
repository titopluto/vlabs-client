import React from "react"
import {Button, Modal as RModal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


const SuccessModal = ({ closeModal, isOpen, success, detail }) => {
  return (
    <RModal isOpen={isOpen} className="modal-success">
      <ModalHeader toggle={() => closeModal() }>
        {success}
      </ModalHeader>
      <ModalBody>
        <h6>{detail}</h6>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => closeModal()}>Close</Button>{' '}
      </ModalFooter>
    </RModal>
  )
}

export default SuccessModal
