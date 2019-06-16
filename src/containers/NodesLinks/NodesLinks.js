import _ from "lodash"
import React, {Component} from 'react'
import {CloseSimulation, getNodesLinks} from "../../redux/actions"
import {connect} from "react-redux"
import uuidv1 from "uuid/v1"
import {Button, Card, CardBody, CardHeader, Col, Collapse, Row, Table,} from "reactstrap";

import LaddaButton, {ZOOM_OUT} from 'react-ladda';
import 'ladda/dist/ladda-themeless.min.css';

import Error from "../Error/Error"


class NodesLinks extends Component {

  constructor(props) {
    super(props)
    this.renderNodesWsocket = this.renderNodesWsocket.bind(this)
    this.renderNodesTelnet = this.renderNodesTelnet.bind(this)
    this.renderNodesButton = this.renderNodesButton.bind(this)
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: true };

  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  renderNodesWsocket(value, key) {
    return (
     <tr key={uuidv1()}>
       <td className="text-center text-capitalize">{key}</td>
       <td className="text-center">
         <Button className="text-white btn-success "  color="success"  size="sm"
         onClick={value? ()=>window.open(value, '_blank') : ()=>"#"}>
           {value ? "connect" : "Node Initializing"} </Button>
       </td>
     </tr>
  )

  }

  renderNodesTelnet(value, key) {
    // console.log(key, value)

    return (
     <tr key={uuidv1()}>
       <td className="text-center text-capitalize">{key}</td>
       <td className="text-center" style={{height:'40px'}} >
         <Button className="text-white btn-success"  color="success" size="sm"
         onClick={value? ()=> window.open(`telnet://${value}`, '_parent') : ()=>"#"}>
           {value ? "connect" : "Node Initializing"}
         </Button></td>
     </tr>
  )

  }

  renderNodesButton() {
    const { mode, simulations, simulation_m,
      isFetchingNodesWsocketDashboard, isFetchingNodesTelnetDashboard,
      isFetchingNodesWsocketMonitorboard, isFetchingNodesTelnetMonitorboard,
      isFetchingNodesWsocketMonitorboard_con1, isFetchingNodesTelnetMonitorboard_con1,
      getNodesLinks } = this.props

    if (mode === "dashboard") {
      return (
        simulations.length >= 1 ?
          <span>

            <LaddaButton
                    className="mr-2 btn btn-sm btn-secondary btn-ladda"
                    loading={isFetchingNodesTelnetDashboard}
                    onClick={() => getNodesLinks('dashboard', simulations[0], 0,  "telnet")}
                    size="sm"
                    data-color="red"
                    data-style={ZOOM_OUT}>
                      <i className="fa fa-refresh"> </i>{'\u00A0'}
                    telnet
            </LaddaButton>
            <LaddaButton
                    className="mt-2 mr-3  btn btn-sm btn-secondary btn-ladda"
                    loading={isFetchingNodesWsocketDashboard}
                    onClick={() => getNodesLinks('dashboard', simulations[0], 0, "webpage") }
                    data-color="red"
                    data-style={ZOOM_OUT}>
                    <i className="fa fa-refresh"> </i> {'\u00A0'}{'\u00A0'}{'\u00A0'}
                    web
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
                    className="btn btn-sm btn-secondary btn-ladda"
                    loading={isFetchingNodesTelnetMonitorboard}
                    onClick={() => getNodesLinks('monitorboard', simulation_m, 0, "telnet")}
                    size="sm"
                    data-color="red"
                    data-style={ZOOM_OUT}>
                      <i className="fa fa-refresh"> </i>{'\u00A0'}
                    telnet
            </LaddaButton>
            <LaddaButton
                    className="mt-2 mr-3  btn btn-sm btn-secondary btn-ladda"
                    loading={isFetchingNodesWsocketMonitorboard}
                    onClick={() => getNodesLinks('monitorboard', simulation_m, 0,  "webpage") }
                    data-color="red"
                    data-style={ZOOM_OUT}>
                    <i className="fa fa-refresh"> </i> {'\u00A0'}{'\u00A0'}{'\u00A0'}
                    web
            </LaddaButton>
          </span>
          :
          null
      )

    }

    else if (mode === "monitorboard_con1") {
      return (
        simulation_m ?
          <span>

            <LaddaButton
                    className="btn btn-sm btn-secondary btn-ladda"
                    loading={isFetchingNodesTelnetMonitorboard_con1}
                    onClick={() => getNodesLinks('monitorboard_con1', simulation_m, 0, "telnet")}
                    size="sm"
                    data-color="red"
                    data-style={ZOOM_OUT}>
                      <i className="fa fa-refresh"> </i>{'\u00A0'}
                    telnet
            </LaddaButton>
            <LaddaButton
                    className="mt-2 mr-3  btn btn-sm btn-secondary btn-ladda"
                    loading={isFetchingNodesWsocketMonitorboard_con1}
                    onClick={() => getNodesLinks('monitorboard_con1', simulation_m, 0,  "webpage") }
                    data-color="red"
                    data-style={ZOOM_OUT}>
                    <i className="fa fa-refresh"> </i> {'\u00A0'}{'\u00A0'}{'\u00A0'}
                    web
            </LaddaButton>
          </span>
          :
          null
      )

    }

    else return null
  }


  renderError() {
    const { mode } = this.props
    if (mode === "dashboard") {
      return [
        <Error key={uuidv1()} errType="dashboard_nodes_webpage" />,
        <Error key={uuidv1()} errType="dashboard_nodes_telnet" />
            ]
    }
    else if (mode === "monitorboard") {
      return [
        <Error key={uuidv1()} errType="monitorboard_nodes_webpage" />,
        <Error key={uuidv1()} errType="monitorboard_nodes_telnet" />
            ]
    }
    else if (mode === "monitorboard_con1") {
      return [
        <Error key={uuidv1()} errType="monitorboard_con1_nodes_webpage" />,
        <Error key={uuidv1()} errType="monitorboard_con1_nodes_telnet" />
            ]
    }
    else return null
  }



  render() {
    const { mode, nodesWsocketDashboard, nodesTelnetDashboard,
      nodesWsocketMonitorboard, nodesTelnetMonitorboard,
      nodesWsocketMonitorboard_con1, nodesTelnetMonitorboard_con1,
      isFetchingNodesWsocketDashboard, isFetchingNodesTelnetDashboard,
      isFetchingNodesWsocketMonitorboard, isFetchingNodesTelnetMonitorboard,
      simulations, getNodesLinks,
      isStaff, simulation_m } = this.props

    return (
      <div className="animated fadeIn">
        { this.renderError() }
      <Card >
        <CardHeader className="bg-card text-white font-weight-bold" onClick={this.toggle}>
          { this.state.collapse ?
            <i className="fa fa-minus-square"> </i>
            :
            <i className="fa fa-plus-square"> </i>
          }
          { mode==="dashboard" ? "Node Connectors" : mode==="monitorboard"? "Node Connectors (Monitor Line)" : "Node Connectors (Console Line)" }
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
            <CardBody className="card-body">
              <Row>
                <Col xs="12" lg="1">
                  { this.renderNodesButton() }
                </Col>
                <Col xs="12" lg="1">
                </Col>


                <Col  xs="12" lg="4">
                  <Table hover bordered striped responsive size="sm">
                  <thead className=" text-dark font-weight-bold text-capitalize ">
                    <tr>
                      <th className="text-center">Node</th>
                      <th className="text-center">Address:Port</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                      mode === "dashboard" ? (
                        !nodesTelnetDashboard || nodesTelnetDashboard.length !== 0 ?
                            _.map(nodesTelnetDashboard, this.renderNodesTelnet)
                              :
                              <tr>
                                No Simulation Nodes!
                              </tr>
                        )
                          :
                        mode === "monitorboard" ? (

                          !nodesTelnetMonitorboard || nodesTelnetMonitorboard.length !== 0 ?
                          _.map(nodesTelnetMonitorboard, this.renderNodesTelnet)
                            :
                            <tr>
                              No Simulation Nodes!
                            </tr>
                        )
                          :
                          mode === "monitorboard_con1" ? (

                          !nodesTelnetMonitorboard_con1 || nodesTelnetMonitorboard_con1.length !== 0 ?
                          _.map(nodesTelnetMonitorboard_con1, this.renderNodesTelnet)
                            :
                            <tr>
                              No Simulation Nodes!
                            </tr>
                        )
                            :
                          null
                    }

                      </tbody>
                    </Table>
                  </Col>

                <Col xs="12" lg="4">
                  <Table hover bordered striped responsive size="sm" >
                    <thead className=" text-dark font-weight-bold">
                    <tr>
                      <th className="text-center">Node</th>
                      <th className="text-center">Web</th>

                    </tr>
                    </thead>
                    <tbody>

                    {
                      mode === "dashboard" ? (
                        !nodesWsocketDashboard || nodesWsocketDashboard.length !== 0 ?
                            _.map(nodesWsocketDashboard, this.renderNodesWsocket)
                              :
                              <tr>
                                No Simulation Nodes!
                              </tr>
                        )
                        :
                        mode === "monitorboard" ? (
                          !nodesWsocketMonitorboard || nodesWsocketMonitorboard.length !== 0 ?
                          _.map(nodesWsocketMonitorboard, this.renderNodesWsocket)
                            :
                            <tr>
                              No Simulation Nodes!
                            </tr>
                        )
                          :
                          mode === "monitorboard_con1" ? (
                          !nodesWsocketMonitorboard_con1 || nodesWsocketMonitorboard_con1.length !== 0 ?
                          _.map(nodesWsocketMonitorboard_con1, this.renderNodesWsocket)
                            :
                            <tr>
                              No Simulation Nodes!
                            </tr>
                        )
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
  nodesWsocketDashboard: state.dashboard.nodes_webpage,
  nodesTelnetDashboard: state.dashboard.nodes_telnet,

  nodesWsocketMonitorboard: state.monitorboard.nodes_webpage,
  nodesTelnetMonitorboard: state.monitorboard.nodes_telnet,

  nodesWsocketMonitorboard_con1: state.monitorboard.nodes_webpage_con1,
  nodesTelnetMonitorboard_con1: state.monitorboard.nodes_telnet_con1,

  simulations: state.dashboard.info,
  simulation_m:state.monitorboard.info,

  isFetchingNodesWsocketDashboard: state.dashboard.is_fetching_nodes_webpage,
  isFetchingNodesTelnetDashboard : state.dashboard.is_fetching_nodes_telnet,
  isFetchingNodesWsocketMonitorboard: state.monitorboard.is_fetching_nodes_webpage,
  isFetchingNodesTelnetMonitorboard : state.monitorboard.is_fetching_nodes_telnet,
  isFetchingNodesWsocketMonitorboard_con1: state.monitorboard.is_fetching_nodes_webpage_con1,
  isFetchingNodesTelnetMonitorboard_con1 : state.monitorboard.is_fetching_nodes_telnet_con1,

  isStaff: state.user_data.info.is_staff,

})

export default connect(mapStateToProps, {CloseSimulation, getNodesLinks })(NodesLinks)
