import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Tooltip} from "reactstrap";
import LaddaButton, {ZOOM_OUT} from 'react-ladda';
import {showModal, simulationLive} from "../../redux/actions"
import {Link} from 'react-router-dom';


class Simulation extends Component {

  constructor(props) {
    super(props)
    this.toggleTip = this.toggleTip.bind(this);
    this.onStopVlab = this.onStopVlab.bind(this)
    this.state = {
      tooltipOpen: false,
      isStopping: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.isStopping)
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



  onStopVlab(simulation, id) {
    this.props.stopAction(simulation, id)
  }

  render() {
    const { isStaff, firstName, lastName, simulation, id, isStopping, showModal, simulationLive } = this.props
    let time = new Date(simulation.timestamp)
    return (
      <tr className="text-center">
        <td>{simulation.name}</td>
        <td>{simulation.user}</td>
        <td> {simulation.user_fullname} </td>
        <td>{simulation.lab}</td>
        <td>{simulation.virl_host}</td>
        <td>{time.toUTCString()}</td>
        <td>
        <LaddaButton className="btn btn-sm btn-danger btn-ladda" loading={simulation.is_stopping}
                     onClick={ ()=> showModal("SHOW_MODAL", "CONFIRM_MODAL",
                                  { info: "Please Confirm",
                                  detail: `Are you sure you want to stop the requested simulation with id: ${simulation.name} ?`,
                                  buttonAction:()=>this.onStopVlab(simulation, id)})}
                     size="sm" data-color="red" data-style={ZOOM_OUT}>

                      <i href="#" id="TooltipExample" className="fa fa-ban"> </i>{'\u00A0'}

                      <Tooltip placement="right-end" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggleTip}>
                      Stop Lab
                      </Tooltip>
        </LaddaButton>
        </td>
        <td>
          { isStaff &&
          <Button className="ml-2 btn-info" color="info" size="sm" onClick={() => simulationLive(simulation)}>
            <i className="fa fa-camera"> </i>
          </Button>
          }
        </td>
        <td>
          { isStaff &&
            <Link to={`/monitorboard/${simulation.name}`} >
              <Button className="ml-2 btn-secondary" color="secondary" size="sm">
                <i className="fa fa-wrench"> </i>
              </Button>
            </Link>
          }
        </td>
      </tr>
    )
  }
}

const mapStateToProps = state => ({
  isStopping: state.dashboard.is_stopping_simulation,
  isStaff: state.user_data.info.is_staff,
  firstName: state.user_data.info.first_name,
  lastName: state.user_data.info.last_name,


})

export default connect(mapStateToProps, { showModal, simulationLive})(Simulation)
