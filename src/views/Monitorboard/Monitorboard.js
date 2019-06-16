import React, {Component} from 'react'
import {connect} from 'react-redux'
import AllSimulations from "../../containers/AllSimulations/AllSimulations"

import Error from "../../containers/Error/Error"

// import "../../containers/SimulationDetail/styles.css"


class StaffDashboard extends Component {

  render() {

    const style = { minWidth: "1032px"}

    return (
      <div className="container h-100">
        <div className="">
            <Error errType="monitor_simulations" />
            <AllSimulations/>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({showNodes:state.dashboard.showNodes})

export default connect(mapStateToProps)(StaffDashboard)
