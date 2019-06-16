import React, {Component} from "react"
import ws from "./websocket"
import {fetchCohorts} from "../../redux/actions";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {Badge, Card, CardBody, CardHeader, Col, Row,} from 'reactstrap';

import AutoForm from "./AutoForm"
import AutoConsole from "./AutoConsole"
import AutoStatus from "./AutoStatus"
import AutoHelperTools from "./AutoHelperTools"

class AutoStart extends Component {

  constructor(props) {
    super(props);
    const username = this.props.user.username;
    // const url = `ws://localhost:8090/ws/autostart/${username}/`;
    // this.state = {autoSocket: ws}
  }

  // initialiseSocket(url) {
  //   if (!this.props.socket_connection) {
  //     this.props.socketConnect(url, 'autostart')
  //   }
  // }

  componentDidMount() {
    // const username = this.props.user.username;
    // const url = `${wsUrl}/autostart/${username}/`;
    // const socketInstance = this.state.autoSocket;


    // this.initialiseSocket(url)

    // fetch Cohorts
    this.props.fetchCohorts("controlboard")

  }

  componentWillUnmount() {
    // ws.disconnect()
    // this.props.socketDisconnect()
  }

  render() {

    const {socket_connection} = this.props

    return (
      <Row>
          <Col>
            <Card>
              <CardHeader className="text-center border border-primary">
                Lab PreStart
                 {
              socket_connection ?
                <Badge className='ml-2' color='success'> socket connected </Badge>
                :
                <Badge className='ml-2' color='danger'> socket disconnected </Badge>
            }
              </CardHeader>
              <CardBody className='border border-primary'>
                <Row>
                  <Col xs="12" md="4" lg="4" xl="4">
                    <Row>
                      <Col xs="12">
                    <AutoForm />
                    <hr className="mt-0" />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                    <AutoHelperTools/>
                    <hr className="mt-0" />
                      </Col>
                    </Row>
                  </Col>

                  <Col xs="12" md="8" lg="8" xl="8">
                    <Row>
                      <AutoStatus/>
                      <AutoConsole/>
                    </Row>
                    <hr className="mt-0" />
                  </Col>
                </Row>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
    )
  }
}

const mapStateToProps = state => (
  { authenticated: state.auth.authenticated,
    user: state.user_data.info,
    socketMsgs: state.monitorboard.socket_msgs,
    notificationMsgs: state.controlboard.notification_msgs,
    socket_connection: state.user_data.channels_socket
  }

    )

export default connect(mapStateToProps, { fetchCohorts })(AutoStart);




{/*<form onSubmit={this.handleSubmit}>*/}
          {/*<input onChange={this.handleChange}/>*/}
          {/*<button type="submit" className="btn btn-primary"> go! </button>*/}
        {/*</form>*/}
        {/*/!*{this.test()}*!/*/}
        {/*{this.props.socketMsgs.map((msg, i) =>*/}
          {/*<div key={i}><small className="text-muted"> {msg} </small></div>)*/}
        {/*}*/}
