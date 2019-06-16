import _ from "lodash"
import React, {Component} from 'react'
import {fetchSimulationLogs} from "../../redux/actions"
import {connect} from "react-redux"

import {Card, CardBody, CardHeader, Col, Collapse, Row, Table,} from "reactstrap";

class Logs extends Component {

  constructor(props) {
    super(props)
    this.fetchSimLogs = this.fetchSimLogs.bind(this)
    this.toggle = this.toggle.bind(this);
    this.state = {
      tabOpen: false,
      isFetching: false
    };
  }

  toggle() {
      this.setState({ tabOpen: !this.state.tabOpen }, ()=> {
        const isFetching = this.state.isFetching
        const tabOpen = this.state.tabOpen

        if ( !isFetching && tabOpen ) {  //i.e isFetching = false and tabOpen = false
          console.log(" LOGGING MOUNTING", )
          this.fetchSimLogs()
          this.intervalId = setInterval(this.fetchSimLogs, 10000)
          this.setState({isFetching: true})
          setTimeout(() => this.toggle(), 60000)
        }
        else if ( isFetching && !tabOpen) {  //i.e collapes = false
          console.log("LOGGGIN UNMOUNTING", this.props.simulations)
          clearInterval(this.intervalId)
          this.setState({isFetching: false})
        }
    });

  }

  componentDidMount() {

    const { simulations } = this.props
    const { tabOpen, isFetching } = this.state
    console.log(isFetching, tabOpen)

    if (tabOpen ) {
      console.log(" LOGGGING==>COMP DID MOUNT", simulations)
      console.log("simul lenght", simulations.length)

      if (simulations.length >= 1) {
        console.log(" LOGGING MOUNTING", simulations)
        this.fetchSimLogs()
        this.intervalId = setInterval(this.fetchSimLogs, 10000)
        this.setState({isFetching: true})
      }
    }
    // this.intervalId = setInterval(this.tick, 5000)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      // console.log("LOGGGIN RECEIVEPROPS", nextProps)
      console.log("recPropslength", nextProps.simulations.length, this.props.simulations.length)
      // clearInterval(this.intervalId)

    }
  }

  componentWillUnmount() {
    const isFetching = this.state.isFetching
    const tabOpen = this.state.tabOpen

    if (isFetching) {
      console.log("LOGGGIN UNMOUNTING", this.props.simulations)
      clearInterval(this.intervalId)
      this.setState({isFetching: false})
    }
  }

  fetchSimLogs = () => {
    const { simulations, fetchSimulationLogs } = this.props
    if (simulations.length >=1) {
      console.log("starting fetch")
      return fetchSimulationLogs(simulations[0])
    }
  }

  renderLogs(msg, i) {
    return (
      <tr className={msg.level==="WARNING" ? "bg-danger" : ""} key={i}>
        <td>{msg.level}</td>
        <td>{msg.message}</td>
        <td>{msg.session}</td>
        <td>{msg.time}</td>
      </tr>
    )

  }

  render() {
    const { logs } = this.props
    console.log( "is_fetching: " ,this.state.isFetching)
    console.log( "tabOpen: " ,this.state.tabOpen)

    return (
      <div className="animated fadeIn">
        <Row>
        <Col xs="12" lg="12">
            <Card className="">
              <CardHeader className="bg-card text-white font-weight-bold" onClick={this.toggle}>
                { this.state.tabOpen ?
                  <i className="fa fa-minus-square"> </i>
                  :
                  <i className="fa fa-plus-square"> </i>
                }
                 Logs
              </CardHeader>
              <Collapse isOpen={this.state.tabOpen}>
              <CardBody className="card-body">
                <Table hover bordered responsive size="sm">
                  <thead className="text-dark font-weight-bold">
                  <tr>
                    <th>Type</th>
                    <th>Message</th>
                    <th>Session</th>
                    <th>Time</th>
                  </tr>
                  </thead>
                  <tbody>
                        { logs ? _.map(_.reverse(logs.slice(0,20)), this.renderLogs) : null}
                   </tbody>
                  </Table>
                </CardBody>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({simulations: state.dashboard.info, logs: state.dashboard.logs})

export default connect(mapStateToProps, { fetchSimulationLogs })(Logs)
