import _ from "lodash"
import React, {Component} from 'react'
import {
  closeSimulationMonitorMode,
  fetchAllSimulations,
  showModal,
  simulationLive,
  stopAllSimulations
} from "../../redux/actions"
import {connect} from "react-redux"

import {Card, CardBody, CardHeader, Col, Input, Row, Table,} from "reactstrap";


import LaddaButton, {ZOOM_OUT} from 'react-ladda';

import Simulation from "../Simulations/Simulation"


class AllSimulations extends Component {

  constructor(props) {
    super(props)
    this.renderSimulations = this.renderSimulations.bind(this)
    this.fetchAllSims = this.fetchAllSims.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.keyPress = this.keyPress.bind(this)
    this.clearInput = this.clearInput.bind(this)

    this.state = {
      searchTerm: '',
      displayedSimulations: this.props.simulations,
      isStopping: false,
      tooltipOpen: false,

    };
  }

  componentDidMount() {
    this.props.fetchAllSimulations()
    this.intervalId = setInterval(this.fetchAllSims, 30000)
    setTimeout(() => this.stopFetching(), 600000)
  }

  stopFetching() {
    // console.log("should stop fetaching now")
    clearInterval(this.intervalId)
  }


  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        displayedSimulations: nextProps.simulations,
      })
    }
    if (nextProps.isStopping === false) {
        this.setState({
        isStopping: false,
      })
      }
  }

  toggleTip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }


  fetchAllSims() {
    return this.props.fetchAllSimulations()
  }




  renderSimulations(simulation, i) {
    const { closeSimulationMonitorMode } = this.props
    return (
      <Simulation key={i} id={i} simulation={simulation} stopAction={closeSimulationMonitorMode} />
  )

  }

  onInputChange(event) {
      let newlyDisplayedSimulations = _.filter(this.props.simulations, simulation => {
        return (
          simulation.user.toLowerCase().includes(event.target.value.toLowerCase()) ||
          simulation.user_fullname.toLowerCase().includes(event.target.value.toLowerCase())
        )
      })
      this.setState({
        displayedSimulations: newlyDisplayedSimulations,
        searchTerm: event.target.value
      })
    }

  keyPress(event) {
    if(event.keyCode === 13) {
      let newlyDisplayedSimulations = _.filter(this.props.simulations, simulation => simulation.name.toLowerCase() === event.target.value.toLowerCase())
      if (newlyDisplayedSimulations.length !== 0) {
        this.setState({
          displayedSimulations: newlyDisplayedSimulations
        })
      }
      else {
        this.setState({
          displayedSimulations: this.props.simulations
        })
      }
    }
  }

  clearInput() {
    this.setState({
      displayedSimulations: this.props.simulations,
      searchTerm: ''
    })
  }


  render() {
    const { simulations, isFetchingSimulations, fetchAllSimulations,
      isStoppingAllSimulations, stopAllSimulations, showModal, last_update } = this.props

    return (
      <div className="animated fadeIn">
            <Card className="">
              <CardHeader className="bg-card text-white font-weight-bold">
                <Row>
                   <Col lg="6">
                      <i className="fa fa-minus-square mr-2"> </i>
                      All Active Labs
                   </Col>
                  <Col lg="6">
                      <div className="input-group">
                        <Input value={this.state.searchTerm}  onChange={this.onInputChange} type="text"
                                className="form-control text-center" placeholder="search by user-ID or Full Name"/>
                      </div>
                  </Col>
                </Row>
              </CardHeader>
               <CardBody className="card-body">
                 <span>
                     <blockquote className="blockquote">
                       <footer className="blockquote-footer">
                         {`Automatically Refreshes continuously for 10 minutes at 30 seconds interval.
                       Click the Refresh button to update afterwards!`}
                       </footer>
                       <footer className="blockquote-footer">
                         {`Last Update: ${last_update}`}
                       </footer>
                     </blockquote>
                     </span>
                 <div className="d-flex">
                   <div className="mr-auto p-2">
                     <span>
                       <LaddaButton
                        className=" mb-2 btn btn-sm btn-success btn-secondary btn-ladda"
                        loading= { isFetchingSimulations }
                        onClick={() => fetchAllSimulations()}
                        data-color="red"
                        data-style={ZOOM_OUT}>
                        <i className="fa fa-refresh"> Refresh </i>
                        </LaddaButton>
                     </span>
                 </div>
                  <div className="p-2">
                    <span>
                       <LaddaButton
                        className=" mb-2 btn btn-sm btn-danger btn-secondary btn-ladda"
                        loading= { isStoppingAllSimulations }
                        onClick={
                          ()=> showModal("SHOW_MODAL", "CONFIRM_MODAL",
                                  { info: "Please Confirm",
                                  detail: `Are you sure you want to stop all  simulations`,
                                  buttonAction:()=>stopAllSimulations() })
                                }
                        size="sm" data-color="red" data-style={ZOOM_OUT}>

                      <i href="#" id="TooltipExample" className="fa fa-ban"> Stop All Simulations  </i> {'\u00A0'}

                        </LaddaButton>
                     </span>
                  </div>

                 </div>
                      <Table hover bordered striped responsive size="sm">
                          <thead className="text-dark font-weight-bold">
                            <tr style={{ whiteSpace: "nowrap" }}>
                              <th className="text-center">Lab ID</th>
                              <th className="text-center">user-ID</th>
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
                          !simulations || simulations.length!==0 ?
                          _.map(this.state.displayedSimulations, this.renderSimulations)
                            :
                          null
                        }
                        </tbody>
                      </Table>
               </CardBody>
            </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  simulations: state.monitorboard.all_info,
  isFetchingSimulations: state.monitorboard.is_fetching_all_simulations,
  isStoppingAllSimulations: state.monitorboard.is_stopping_all_simulations,
  last_update: state.monitorboard.all_info_last_update

})

export default connect(mapStateToProps, { fetchAllSimulations, closeSimulationMonitorMode, showModal, simulationLive, stopAllSimulations, showModal})(AllSimulations)
