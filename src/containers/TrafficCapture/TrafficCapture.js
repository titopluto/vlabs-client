import _ from "lodash"
import React, {Component} from 'react'
import {fetchTrafficCaptures, TrafficCaptureDelete, TrafficCaptureDownload} from "../../redux/actions"
import {connect} from "react-redux"
import uuidv1 from "uuid/v1"

import {Button, Card, CardBody, CardHeader, Col, Collapse, Row, Table,} from "reactstrap";

import LaddaButton, {ZOOM_OUT} from 'react-ladda';

import Error from "../Error/Error"


class TrafficCapture extends Component {

  constructor(props) {
    super(props)
    this.renderCaptures = this.renderCaptures.bind(this)
    this.renderCaptureButtons = this.renderCaptureButtons.bind(this)
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: true };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }


  renderCaptures(capObj, capID, obj) {
    const { simulations, simulations_m, TrafficCaptureDownload, TrafficCaptureDelete, mode } = this.props
    const download_name = `${capObj[1]['node']}_${capObj[1]['interface-name']}_${capObj[1]['name']}`

    if (mode === 'dashboard') {
      const simName = this.props.simulations[0]
      return (
          <tr key={uuidv1()} className="text-center">
            <td> {capObj[1]['node']}</td>
            <td> {capObj[1]['interface-name']}</td>
            <td> {capObj[1]['name']}</td>
            <td> {capObj[1]['simulation']} </td>
            <td> {capObj[1]['created']} </td>
            <td> {capObj[1]['pcap-filter']}</td>
            <td> {capObj[1]['time']}</td>
            <td className="text-center">
              <Button className="mr-2 btn-success" color="success" onClick={()=>TrafficCaptureDownload(mode, simName, capObj[0], download_name ) }>
                <i className="fa fa-download"> </i>
              </Button>
            </td>
            <td>
              <Button  className="btn-danger" color="danger" onClick={()=>TrafficCaptureDelete(mode, simName, capObj[0]) }>
                <i className="fa fa-minus-circle"> </i>
              </Button>
            </td>
          </tr>
        ) }
      else if (mode === 'monitorboard') {
      const simName = this.props.simulations_m

        return (
          <tr key={uuidv1()} className="text-center">
            <td> {capObj[1]['node']}</td>
            <td> {capObj[1]['interface-name']}</td>
            <td> {capObj[1]['name']}</td>
            <td> {capObj[1]['simulation']} </td>
            <td> {capObj[1]['created']} </td>
            <td> {capObj[1]['pcap-filter']}</td>
            <td> {capObj[1]['time']}</td>
            <td className="text-center">
              <Button className="mr-2 btn-success" color="success" onClick={()=>TrafficCaptureDownload(mode, simName, capObj[0], download_name ) }>
                <i className="fa fa-download"> </i>
              </Button>
            </td>
            <td>
              <Button  className="btn-danger" color="danger" onClick={()=>TrafficCaptureDelete(mode, simName, capObj[0]) }>
                <i className="fa fa-minus-circle"> </i>
              </Button>
            </td>
          </tr>
      )}

      }

  renderCaptureButtons() {
    const { mode, simulations, simulations_m, fetchTrafficCaptures, isFetchingCaptureDashboard, isFetchingCaptureMonitorboard} = this.props
    if (mode === 'dashboard') {
      return (
      simulations.length >= 1 ?
                      <span>
                      <LaddaButton
                        className=" ml-4 btn btn-sm btn-secondary btn-ladda"
                        loading={isFetchingCaptureDashboard}
                        onClick={() => fetchTrafficCaptures(mode, simulations[0].name)}
                        data-color="red"
                        data-style={ZOOM_OUT}>
                        <i className="fa fa-refresh"> </i>
                      </LaddaButton>
                      </span>
                      :
                      null
      )}
    else if (mode === 'monitorboard') {
      return (
       simulations_m ?
                      <span>
                      <LaddaButton
                        className=" ml-4 btn btn-sm btn-secondary btn-ladda"
                        loading={isFetchingCaptureMonitorboard}
                        onClick={() => fetchTrafficCaptures(mode, simulations_m.name)}
                        data-color="red"
                        data-style={ZOOM_OUT}>
                        <i className="fa fa-refresh"> </i>
                      </LaddaButton>
                      </span>
                      :
                      null
      )}

  }

  renderError() {
    const { mode } = this.props
    if (mode === "dashboard") {
      return [
        <Error key={uuidv1()} errType="dashboard_capture" />,
            ]
    }
    else if (mode === "monitorboard") {
      return [
        <Error key={uuidv1()} errType="monitorboard_capture" />,
            ]
    }
  }

  render() {
    const { fetchTrafficCaptures, simCapturesDashboard, simCapturesMonitorboard,
      simulations, mode, simulations_m } = this.props

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
                Traffic Captures
              </CardHeader>

              <Collapse isOpen={this.state.collapse}>
                <CardBody className="card-body">
                 <Row>
                    <Col sm="12" lg="1">
                      { this.renderCaptureButtons() }
                    </Col>

                   <Col sm="12" lg="10">

                      <Table hover bordered striped responsive size="sm">
                        <thead className="text-dark font-weight-bold ">
                          <tr>
                            <th className="text-center">Node</th>
                            <th className="text-center">Interface Name</th>
                            <th className="text-center">Capture Name</th>
                            <th className="text-center"> ID</th>
                            <th className="text-center">Created</th>
                            <th className="text-center"> Filter</th>
                            <th className="text-center"> Time </th>
                            <th className="text-center">   </th>
                            <th className="text-center">   </th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          mode==='dashboard' ?
                              !simCapturesDashboard ||simCapturesDashboard.length !== 0 ?
                              _.map(simCapturesDashboard, this.renderCaptures)
                              :
                              null
                            :
                            mode==='monitorboard' ?
                                !simCapturesMonitorboard ||simCapturesMonitorboard.length !== 0 ?
                                _.map(simCapturesMonitorboard, this.renderCaptures)
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
  simulations_m: state.monitorboard.info,
  simCapturesDashboard: state.dashboard.traffic_capture,
  simCapturesMonitorboard: state.monitorboard.traffic_capture,
  isFetchingCaptureDashboard: state.dashboard.is_fetching_captures,
  isFetchingCaptureMonitorboard: state.monitorboard.is_fetching_captures
})

export default connect(mapStateToProps, { fetchTrafficCaptures, TrafficCaptureDownload, TrafficCaptureDelete  })(TrafficCapture)
