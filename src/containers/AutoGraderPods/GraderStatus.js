import React, {Component} from "react"
import {connect} from "react-redux";
import {Card, CardBody, Col, Row,} from 'reactstrap'

import 'spinkit/css/spinkit.css';


class GraderStatus extends Component{

  render() {
    const {job_count, grader_update} = this.props;

    const {total, completed, failed, no_check, no_connection_data } = grader_update;


    return (
      <Card>
        <CardBody>
          <Col sm='12'>
            <Row>
                <Col sm="4">
                  <div className="callout callout-info">
                    <small className="text-muted ">Jobs in Progress</small>
                    <br />
                    <strong className="h4"> {job_count} </strong>
                  </div>
                </Col>
                <Col sm="4">
                  <div className="callout callout-info">
                    <small className="text-muted">Total Devices</small>
                    <br />
                    <strong className="h4">{total}</strong>
                  </div>
                </Col>
                <Col sm="4">
                  <div className="callout callout-success">
                    <small className="text-muted ">Completed Devices</small>
                    <br />
                    <strong className="h4"> {completed} </strong>
                  </div>
                </Col>
                <Col sm="4">
                    <div className="callout callout-danger">
                      <small className="text-muted ">Failed Devices</small>
                      <br />
                      <strong className="h4"> {failed} </strong>
                    </div>
                  </Col>
              <Col sm="4">
                    <div className="callout callout-warning">
                      <small className="text-muted ">No Check Devices</small>
                      <br />
                      <strong className="h4"> {no_check} </strong>
                    </div>
                  </Col>
              <Col sm="4">
                    <div className="callout callout-danger">
                      <small className="text-muted ">No Connection </small>
                      <br />
                      <strong className="h4"> {no_connection_data} </strong>
                    </div>
                  </Col>

            </Row>
          </Col>
        </CardBody>
      </Card>

    )

  }
}

const mapStateToProps = state => (
  { grader_update: state.labgraderPods.grader_update_msgs,
    job_count: state.labgraderPods.job_count,
    socket_connection: state.labgraderPods.socket_connection
  });

export default connect(mapStateToProps, {})(GraderStatus);


















