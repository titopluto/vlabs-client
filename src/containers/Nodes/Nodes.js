import _ from "lodash"
import React, {Component} from 'react'
import {getNodes, nodeOperation} from "../../redux/actions"
import {connect} from "react-redux"
import uuidv1 from "uuid/v1"
import {AppSwitch} from '@coreui/react'


import {Card, CardBody, CardHeader, Col, Collapse, Row, Table,} from "reactstrap";

import LaddaButton, {ZOOM_OUT} from 'react-ladda';
import Error from "../Error/Error"


class Nodes extends Component {

  constructor(props) {
    super(props)
    this.renderNodes = this.renderNodes.bind(this)
    this.doNodeOperation = this.doNodeOperation.bind(this)
    this.toggle = this.toggle.bind(this);
    this.fetchNodes = this.fetchNodes.bind(this)
    this.state = { tabOpen: false, isFetching: false };
  }

  componentDidMount() {
    // const { tabOpen, isFetching } = this.state
    const { mode, simulations, simulation_m,  getNodes, } = this.props


    if (this.state.tabOpen ) {

      this.setState({isFetching: true}, ()=> {
        this.fetchNodes()
        this.intervalId = setInterval(this.fetchNodes, 10000)
        console.log("interval at mounting", this.intervalId)
      })}
  }

  componentWillUnmount() {

    if (this.state.isFetching) {
      clearInterval(this.intervalId)
    }
  }

  toggle() {

    const { mode, simulations, simulation_m,  getNodes, } = this.props
    this.setState({ tabOpen: !this.state.tabOpen }, () => {

      const { tabOpen, isFetching } = this.state
      if (!isFetching && tabOpen ) {
        this.setState({isFetching: true}, ()=> {
          this.fetchNodes()
          this.intervalId = setInterval(this.fetchNodes, 10000)
        })
        setTimeout(() => this.toggle(), 60000)
      }
      else if (isFetching && !tabOpen) {  //i.e collapes = false
        this.setState({isFetching: false}, ()=> {
          clearInterval(this.intervalId)
      })}
    });
  }

  fetchNodes() {
    const { mode, simulations, simulation_m,  getNodes, } = this.props

    if (mode === 'dashboard' && simulations.length >= 1) {
      console.log("dashboard==>setting isFetching at fetchNode")
      return getNodes('dashboard', simulations[0])
    }
    else if (mode === 'monitorboard' && simulation_m) {
      console.log("monitorboard==>setting isFetching at fetchNode")
      return getNodes('monitorboard', simulation_m)
    }
  }

  doNodeOperation(state, simName, node) {
    const mode = this.props.mode
    if (state) {
      this.props.nodeOperation(simName, 'stop', node, mode)
    }
    else {
      this.props.nodeOperation(simName, 'start', node, mode)
    }
  }


  renderNodes(values, node) {
    const { mode, simulations, simulation_m,  getNodes, } = this.props
    if (mode === 'dashboard') {
      if (simulations.length >= 1) {
        const simName = simulations[0]
        const state = values['state'] === "ACTIVE" ? true : false

        return (
          <tr key={uuidv1()} className="text-center">
            <td> {node} </td>
            <td> { values['reachable'] ? 'yes' : 'no' } </td>
            <td> {values['state'].toLowerCase()} </td>
            <td>
              {/*<Label className="switch switch-text switch-success">*/}
                {/*<Input type="checkbox" className="switch-input" checked={state}*/}
                       {/*onChange={() => this.doNodeOperation(state, simName, node)}/>*/}
                {/*<span className="switch-label" data-on="On" data-off="Off"> </span>*/}
                {/*<span className="switch-handle"> </span>*/}
              {/*</Label>*/}
              <AppSwitch className={'mx-1'}
                         color={'success'}
                         outline={'alt'}
                         label
                         checked={state}
                          onChange={() => this.doNodeOperation(state, simName, node)}
              />
            </td>
          </tr>
        )
      }
    }
    else if (mode === 'monitorboard') {
      if (simulation_m) {
        const simName = simulation_m
        const state = values['state'] === "ACTIVE" ? true : false

        return (
          <tr key={uuidv1()} className="text-center">
            <td> {node} </td>
            <td> { values['reachable'] ? 'yes' : 'no' } </td>
            <td> {values['state'].toLowerCase()} </td>
            <td>
              {/*<Label className="switch switch-text switch-primary-outline-alt">*/}
                {/*<Input type="checkbox" className="switch-input" checked={state}*/}
                       {/*onChange={() => this.doNodeOperation(state, simName, node)}/>*/}
                {/*<span className="switch-label" data-on="On" data-off="Off"> </span>*/}
                {/*<span className="switch-handle"> </span>*/}
              {/*</Label>*/}
              <AppSwitch className={'mx-1'}
                         color={'success'}
                         outline={'alt'}
                         label
                         checked={state}
                          onChange={() => this.doNodeOperation(state, simName, node)}
              />
            </td>
          </tr>
        )
      }

    }
  }

  renderNodesButton() {
    const { mode, simulations, simulation_m, isFetchingNodesDashboard,
      isFetchingNodesMonitorboard, getNodes } = this.props

    if (mode === "dashboard") {
      return (
        simulations.length >= 1 ?
          <span>
                  <LaddaButton
                    className="btn btn-sm btn-secondary btn-ladda"
                    loading={isFetchingNodesDashboard}
                    onClick={() => getNodes('dashboard', simulations[0]) }
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
                    className=" btn btn-sm btn-secondary btn-ladda"
                    loading={isFetchingNodesMonitorboard}
                    onClick={() => getNodes('monitorboard', simulation_m ) }
                    data-color="red"
                    data-style={ZOOM_OUT}>
                    <i className="fa fa-refresh"> </i> </LaddaButton>

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
        <Error key={uuidv1()} errType="dashboard_nodes" />,
        <Error key={uuidv1()} errType="dashboard_nodes_operation" />
            ]
    }
    else if (mode === "monitorboard") {
      return [
        <Error key={uuidv1()} errType="monitorboard_nodes" />,
        <Error key={uuidv1()} errType="monitorboard_nodes_operation" />
            ]
    }
    else return null
  }


  render() {
    const {  simNodesDashboard, simNodesMonitorboard, simulations, isFetchingNodes, mode } = this.props
    const { tabOpen, isFetching } = this.state
    console.log("-----at render", tabOpen, isFetching)
    return (
      <div className="animated fadeIn">
        { this.renderError() }
          <Card className="">
              <CardHeader className="bg-card text-white font-weight-bold" onClick={this.toggle}>
                { this.state.tabOpen ?
                  <i className="fa fa-minus-square"> </i>
                  :
                  <i className="fa fa-plus-square"> </i>
                }
                Nodes
              </CardHeader>

              <Collapse isOpen={this.state.tabOpen}>
                <CardBody className="card-body">
                  <Row>
                    <Col xs="12" lg="1">
                      { this.renderNodesButton() }
                    </Col>

                    <Col xs="12" lg={{size:10}}>
                      <Table hover bordered striped responsive size="sm">
                        <thead className="text-dark font-weight-bold" >
                          <tr>
                            <th className="text-center">Node</th>
                            <th className="text-center">Mgmt Reachability</th>
                            <th className="text-center">State</th>
                            <th className="text-center"> </th>
                          </tr>
                        </thead>
                        <tbody>

                        {
                          mode==='dashboard' ?
                              !simNodesDashboard ||simNodesDashboard.length !== 0 ?
                              _.map(simNodesDashboard, this.renderNodes)
                                :
                              null
                            :
                            mode==='monitorboard' ?
                             !simNodesMonitorboard ||simNodesMonitorboard.length !== 0 ?
                              _.map(simNodesMonitorboard, this.renderNodes)
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
  simNodesDashboard: state.dashboard.nodes,
  simNodesMonitorboard: state.monitorboard.nodes,
  isFetchingNodesDashboard: state.dashboard.is_fetching_nodes,
  isFetchingNodesMonitorboard: state.monitorboard.is_fetching_nodes,
  simulation_m:state.monitorboard.info

})

const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, { getNodes, nodeOperation } )(Nodes)
