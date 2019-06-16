import React, {Component} from "react"
import {connect} from "react-redux";
import {Col, Progress, Row,} from 'reactstrap'
import "./styles.css"


class AutoStatus extends Component{

  render() {
    const {job_count, sim_update} = this.props;

    const status = (sim_update['done'] / sim_update['total']) * 100

    return (
    <Col sm="12">
      <Row>
      <Col sm="6">
        <div className="callout callout-info">
          <small className="text-muted">Jobs in Progress</small>
          <br />
          <strong className="h4"> {job_count} </strong>
        </div>
      </Col>
      <Col sm="6">
        <div className="callout callout-danger">
          <small className="text-muted">Simulations</small>
          <br />
          <strong className="h4">{`${sim_update['done']}/${sim_update['total']}`}</strong>
        </div>
      </Col>
      <Col sm="12">
        <Progress value={status} color={status===100 ? 'success':'gray'} className="mb-3" >
          {status===100 ? 'done!':null}
        </Progress>
      </Col>
      </Row>
    </Col>
    )

  }
}

const mapStateToProps = state => (
  { sim_update: state.controlboard.sim_update_msgs,
    job_count: state.controlboard.job_count,
    socket_connection: state.controlboard.socket_connection
  });

export default connect(mapStateToProps, {})(AutoStatus);



















