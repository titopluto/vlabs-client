import React, {Component} from 'react'
import {CloseSimulation, getNodesLinks} from "../../redux/actions"
import {connect} from "react-redux"


class SimulationStatus extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log("SIM_PRESENT", !this.props.simulations)
    this.intervalId = setInterval(this.tick, 5000)
  }

  componentWillUnount() {
    clearInterval(this.intervalId)
  }

  tick = () => {
    let i = 0
    console.log("TICK", i++)
  }


  render() {
    return <div></div>
  }
}

const mapStateToProps = state => ({simulations: state.dashboard.info})

export default connect(mapStateToProps, {CloseSimulation, getNodesLinks})(SimulationStatus)
