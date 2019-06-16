import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CloseSimulationTroubleshootMode, fetchSimulationByID} from "../../redux/actions"
import "./styles.css"

import Error from "../Error/Error"
import Simulation from "../Simulations/Simulation"
import {ZOOM_OUT} from 'react-ladda';
import {Card, CardBody, CardHeader, Col, Row, Table,} from "reactstrap";
import uuidv1 from "uuid/v1"


class SimulationDetail extends Component {

  constructor(props) {
    super(props)
    this.renderSimulation = this.renderSimulation.bind(this)
  }

  componentDidMount() {
    this.props.fetchSimulationByID(this.props.labID)
  }

  renderSimulation(simulation, i) {
    const { isFetching, CloseSimulationTroubleshootMode, showModal } = this.props
    return (
      <Simulation key={i} simulation={simulation} stopAction={CloseSimulationTroubleshootMode} />
    )
  }

  renderErrors() {
    return [
      <Error key={uuidv1()} errType="monitor_simulations" />,
      <Error key={uuidv1()} errType="troubleshoot_simulations" />
    ]
  }

  render() {
    const { simulation } = this.props

    return (

        <div className="animated fadeIn">
          { this.renderErrors() }
        <Row>
        <Col xs="12" lg="12">
            <Card className="">
              <CardHeader className="bg-card text-white font-weight-bold">
                <i className="fa fa-align-justify"> </i>
                Labs
              </CardHeader>
              <CardBody className="card-body">
                <Table hover bordered responsive size="sm">
                  <thead className="text-dark font-weight-bold">
                    <tr>
                      <th className="text-center">Lab ID</th>
                      <th className="text-center">user-ID</th>
                      <th className="text-center"> Full Name </th>
                      <th className="text-center"> Lab Code </th>
                      <th className="text-center"> Host </th>
                      <th className="text-center"> Created </th>
                      <th className="text-center"> </th>
                      <th className="text-center"> </th>
                      <th className="text-center"> </th>
                    </tr>
                  </thead>
                  <tbody>

                  {
                    simulation ?
                   this.renderSimulation(simulation)
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

const mapStateToProps = state => ({ simulation:state.monitorboard.info })

export default connect(mapStateToProps, {fetchSimulationByID, CloseSimulationTroubleshootMode })( SimulationDetail)
