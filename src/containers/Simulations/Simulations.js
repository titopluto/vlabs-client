import _ from "lodash"
import React, {Component} from 'react'
import {CloseSimulation, fetchSimulations, showModal} from "../../redux/actions"
import {connect} from "react-redux"
import {Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import "../../views/Dashboard/styles.css"
import {ZOOM_OUT} from 'react-ladda';
import Error from "../Error/Error"
import Simulation from "./Simulation"


class LabSimulations extends Component {

  constructor(props) {
    super(props)
    this.renderSimulations = this.renderSimulations.bind(this)
     this.toggleTip = this.toggleTip.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  componentDidMount() {
    this.props.fetchSimulations()
  }

  toggleTip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }


  renderSimulations(simulation, i) {
    const { CloseSimulation } = this.props
    return (
      <Simulation key={i} id={i} simulation={simulation} stopAction={CloseSimulation} />
    )
  }

  render() {
    const { simulations } = this.props
    return (
      <div className="animated fadeIn">
        <Error errType="dashboard_simulations" />
        <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader className="bg-card text-white font-weight-bold">
              <i className="fa fa-minus-square"> </i>
                Active Lab
              </CardHeader>
              <CardBody className="card-body">
                <Table hover bordered striped responsive size="sm">
                  <thead className="text-dark font-weight-bold ">
                    <tr>
                      <th className="text-center">Lab ID</th>
                      <th className="text-center">User-ID</th>
                      <th className="text-center">Full Name</th>
                      <th className="text-center">Lab Code</th>
                      <th className="text-center"> Host</th>
                      <th className="text-center ">Created</th>
                      <th className="text-center"> </th>
                      <th className="text-center"> </th>
                      <th className="text-center"> </th>
                    </tr>
                  </thead>
                  <tbody>

                  {
                    !simulations ||simulations.length!==0 ?
                    _.map(simulations, this.renderSimulations)
                      :
                    null
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  simulations: state.dashboard.info,
  isFetching: state.dashboard.is_stopping_simulation,
})

// const mapDispatchToProps = dispatch => ({dispatch, CloseSimulation, getNodesLinks })


export default connect(mapStateToProps, {showModal, CloseSimulation, fetchSimulations })(LabSimulations)
