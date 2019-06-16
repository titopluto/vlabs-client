import React, {Component} from 'react'
import {connect} from 'react-redux'

import SimulationDetail from "../../containers/SimulationDetail/SimulationDetail"
import NodesLinks from "../../containers/NodesLinks/NodesLinks"
import Nodes from "../../containers/Nodes/Nodes"
import Interfaces from "../../containers/Interfaces/Interfaces"
import TrafficCapture from "../../containers/TrafficCapture/TrafficCapture"
import Logs from "../../containers/Logs/Logs"


class SimulationTroubleshoot extends Component {

  render() {

    const labID = this.props.match.params.labID
    const style = { minWidth: "969px"}

    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div>
            <SimulationDetail labID={labID} />
            <NodesLinks mode="monitorboard"/>
            <NodesLinks mode="monitorboard_con1" />
            <Nodes mode="monitorboard" />
            <Interfaces mode="monitorboard"/>
            <TrafficCapture mode="monitorboard"/>
            <Logs/>
        </div>
      </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({showNodes:state.dashboard.showNodes})

export default connect(mapStateToProps)(SimulationTroubleshoot)
