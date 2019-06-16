import React, {Component} from "react"
import {connect} from "react-redux"
import {Field, reduxForm} from 'redux-form'
import {TrafficCaptureCreate} from "../../../redux/actions/index"
import {Button, Col, Input, Modal as RModal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";


class CaptureModal extends Component  {

  constructor(props) {
    super(props)
    this.captureSubmit = this.captureSubmit.bind(this)
  }


  renderField = ({ input, label, type, meta: { touched, error } }) => (
      <div>
        <label>{label}</label>
        <div>
          <Input {...input}  type={type} />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    )

  captureSubmit = ({pcap_filter}) => {
    const { simName, node, nInterface, dispatch, mode,  TrafficCaptureCreate} = this.props
     TrafficCaptureCreate(mode, simName, node, nInterface, pcap_filter)
  }

  render() {
    const { closeModal, isOpen, error, handleSubmit } = this.props

    return (
      <RModal isOpen={isOpen} className="modal-warning">
        <ModalHeader toggle={() => closeModal() }>
          Traffic Capture
        </ModalHeader>
        <form onSubmit={handleSubmit(this.captureSubmit)}>
        <ModalBody>
            <Field
              name="pcap_filter"
              type="text"
              component={this.renderField}
              label='PCAP FIlter. e.g: "icmp or arp", "icmp", "host 1.2.3.4", "tcp port 123"'
            />

            {error && <strong>{error}</strong>}
            <a href="http://www.tcpdump.org/manpages/pcap-filter.7.html" target="_blank" rel="noopener noreferrer">
              see syntax for more details
            </a>

        </ModalBody>
        <ModalFooter>
         <Row>
            <Col>
              <Button type="submit" color="success" className="px-4">Start Capture</Button>
            </Col>
          </Row>
        </ModalFooter>
      </form>
      </RModal>
    )
  }
}

const CaptureM = connect(null, { TrafficCaptureCreate })(CaptureModal)


export default reduxForm({
  form: 'captureForm',
  // onSubmit: this.captureSubmit
}) (CaptureM)


