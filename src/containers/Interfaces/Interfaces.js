import _ from "lodash"
import React, {Component} from 'react'
import {getInterfaces, showModal} from "../../redux/actions"
import {connect} from "react-redux"
import uuidv1 from "uuid/v1"

import {Button, Card, CardBody, CardHeader, Col, Collapse, Row, Table,} from "reactstrap";

import LaddaButton, {ZOOM_OUT} from 'react-ladda';
import Error from "../Error/Error"


class Interfaces extends Component {

  constructor(props) {
    super(props)
    this.renderInterfaces = this.renderInterfaces.bind(this)
    this.toggle = this.toggle.bind(this);
    this.renderError = this.renderError.bind(this);
    this.state = { collapse: true };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }


  renderInterfaces(nodeObj, node, obj) {

    const { mode, simulation_m, simulations, showModal } = this.props
    if (mode === 'dashboard') {
      if (simulations[0]) {
        const simName = this.props.simulations[0].name

        return (
          _.map(nodeObj, (intValue, intID) =>
            <tr key={uuidv1()} className="text-center">
              <td> {node} </td>
              <td> {intValue['name']} </td>
              <td> {intValue['network']} </td>
              <td> { intValue['network'].search('flat') === 0 ? intValue['ip-address'] : null    } </td>
              <td> {intValue['hw-addr']}</td>
              <td> {intValue['status']}</td>
              <td><Button className="btn-warning text-dark" color="primary" onClick={
                () => showModal("SHOW_MODAL", "CAPTURE_MODAL", {simName: simName, node: node, nInterface: intID, mode:mode})}>
                <i className="fa fa-video-camera"> </i> </Button></td>
            </tr>))
      }
    }
    else if (mode === "monitorboard") {
      if (simulation_m) {
        const simName = simulation_m.name

        return (
          _.map(nodeObj, (intValue, intID) =>
            <tr key={uuidv1()} className="text-center">
              <td> {node} </td>
              <td> {intValue['name']} </td>
              <td> {intValue['network']} </td>
              <td> { intValue['network'].search('flat') === 0 ? intValue['ip-address'] : null    } </td>
              <td> {intValue['hw-addr']}</td>
              <td> {intValue['status']}</td>
              <td><Button className="btn-warning text-dark" color="primary" onClick={
                () => showModal("SHOW_MODAL", "CAPTURE_MODAL", {simName: simName, node: node, nInterface: intID, mode:mode})}>
                <i className="fa fa-video-camera"> </i> </Button></td>
            </tr>))
      }
    }
  }

  renderButton() {
    const {
      mode, simulations, simulation_m, isFetchingInterfacesDashboard,
      isFetchingInterfacesMonitorboard, getInterfaces } = this.props

    if (mode === "dashboard") {
      return (
        simulations.length >= 1 ?
          <span>
                <LaddaButton
                  className="ml-4 btn btn-sm btn-secondary btn-ladda"
                  loading={isFetchingInterfacesDashboard}
                  onClick={() => getInterfaces("dashboard",simulations[0])}
                  data-color="red"
                  data-style={ZOOM_OUT}>
                  <i className="fa fa-refresh"> </i>
                </LaddaButton>
                </span>
          :
          null
      )
    }
    else if (mode === "monitorboard") {
      return (
        simulation_m ?
          <span>
                <LaddaButton
                  className="ml-4 btn btn-sm btn-secondary btn-ladda"
                  loading={isFetchingInterfacesMonitorboard}
                  onClick={() => getInterfaces("monitorboard", simulation_m)}
                  data-color="red"
                  data-style={ZOOM_OUT}>
                  <i className="fa fa-refresh"> </i>
                </LaddaButton>
                </span>
          :
          null
      )

    }
  }

  renderError() {
    const { mode } = this.props
    if (mode === "dashboard") {
      return[
        <Error key={uuidv1()} errType="dashboard_interfaces" />
        ]
    }
    else if (mode === "monitorboard") {
      return[
        <Error key={uuidv1()} errType="monitorboard_interfaces" />
        ]
    }
    else return null
  }

  render() {
    const {  simInterfacesDashboard,simInterfacesMonitorboard, isFetchingInterfacesDashboard, mode } = this.props
    return (
      <div className="animated fadeIn">
        { this.renderError() }
          <Card className="">
              <CardHeader className="bg-card text-white font-weight-bold" onClick={this.toggle}>
                { this.state.collapse ?
                  <i className="fa fa-minus-square"> </i>
                  :
                  <i className="fa fa-plus-square"> </i>
                }
                Interfaces
              </CardHeader>

              <Collapse isOpen={this.state.collapse}>
                <CardBody className="card-body">
                  <Row>
                    <Col xs="12" lg="1">
                      { this.renderButton() }
                    </Col>

                    <Col xs="12" lg="10">
                      <Table hover bordered striped responsive size="sm">
                        <thead className="text-dark font-weight-bold" >
                          <tr>
                            <th className="text-center">Node</th>
                            <th className="text-center">Interface</th>
                            <th className="text-center">Network</th>
                            <th className="text-center">IP-Address</th>
                            <th className="text-center">Hardware Address</th>
                            <th className="text-center">Status</th>
                            <th className="text-center"> Capture Traffic</th>
                          </tr>
                        </thead>
                        <tbody>

                        {
                          mode === 'dashboard' ?
                              !simInterfacesDashboard || simInterfacesDashboard.length !== 0 ?
                                _.map(simInterfacesDashboard, this.renderInterfaces)
                                :
                              null
                            :
                            mode==='monitorboard' ?
                             !simInterfacesMonitorboard || simInterfacesMonitorboard.length !== 0 ?
                                _.map(simInterfacesMonitorboard, this.renderInterfaces)
                                :
                              null
                              :
                              null
                        }

                        </tbody>
                        </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Collapse>
            </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  simulations: state.dashboard.info,
  simInterfacesDashboard: state.dashboard.interfaces,
  simInterfacesMonitorboard: state.monitorboard.interfaces,
  isFetchingInterfacesDashboard: state.dashboard.is_fetching_interfaces,
  isFetchingInterfacesMonitorboard: state.monitorboard.is_fetching_interfaces,
  simulation_m:state.monitorboard.info

})

const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, { getInterfaces, showModal } )(Interfaces)
