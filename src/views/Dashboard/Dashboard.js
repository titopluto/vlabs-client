import React, {Component} from 'react'
import {connect} from "react-redux"

import LabSimulations from "../../containers/Simulations/Simulations"
import Nodes from "../../containers/Nodes/Nodes"
import NodesLink from "../../containers/NodesLinks/NodesLinks"
import Interfaces from "../../containers/Interfaces/Interfaces"
import TrafficCapture from "../../containers/TrafficCapture/TrafficCapture"
import Logs from "../../containers/Logs/Logs"

// import "../../containers/SimulationDetail/styles.css"


class Dashboard extends Component {

  render() {

    const style = { minWidth: "969px"}

    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div>
            <LabSimulations/>
            <NodesLink mode="dashboard"/>
            <Nodes mode="dashboard" />
            <Interfaces mode="dashboard"/>
            <TrafficCapture mode="dashboard"/>
            <Logs/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({showNodes:state.dashboard.showNodes})

export default connect(mapStateToProps)(Dashboard)
