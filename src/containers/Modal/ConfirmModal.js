import React from "react"
import {Button, Modal as RModal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


const handleAction = (dispatch, buttonAction, closeModal) => {
    if (buttonAction) {
      dispatch(buttonAction)
      return closeModal()
    }
    else {
      return closeModal()
    }
}


const ConfirmModal = ({ closeModal, isOpen, info, detail, buttonAction, dispatch}) => {

  return (
    <RModal isOpen={isOpen} className="modal-info">
      <ModalHeader toggle={() => { closeModal() } }>
        {info}
      </ModalHeader>
      <ModalBody>
        <h6>{detail}</h6>
      </ModalBody>
      <ModalFooter>

        <Button color="success" onClick={() => handleAction(dispatch, buttonAction, closeModal)}> Yes
        </Button>{' '}

        <Button color="danger" onClick={() => { closeModal()}}> No
        </Button>{' '}

      </ModalFooter>
    </RModal>
  )
}

export default ConfirmModal
