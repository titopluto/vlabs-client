import React, {Component} from 'react'
import {connect} from "react-redux";
import {fetchRunningLabs, socketConnect, socketSend} from "../../redux/actions";
import config from "../../redux/actions/config"
import {Badge, Card, CardBody, CardHeader, Col, Row,} from 'reactstrap';
import GraderLabSelectForm from './GraderLabSelectForm'
import GraderLabNodes from './GraderLabNodes'
import GraderStatus from './GraderStatus'
import GraderConsole from './GraderConsole'
import GraderWhiteBoard from './GraderWhiteBoard'
import GraderFailedConnections from './GraderFailedConnections'
import GraderFailedParse from './GraderFailedParse'
import GraderFailedPasswords from './GraderFailedPasswords'
import GraderNoConnection from './GraderNoConnection'


class AutoGrader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command_list: {},
      lab:""
    }
  }

  initialiseSocket = (url) => {
    if (!this.props.socket_connection) {
      this.props.socketConnect(url, 'autograder')
    }
  };

  componentDidMount(){
    const username = this.props.user.username;
    const url = `${config.wsUrl}/vlabs-channels/${username}/`;

    // const url = `${config.wsUrl}/autograder/${username}/`;

    // this.initialiseSocket(url);

    this.props.fetchRunningLabs();
  }

  handleElementChanges =(node, event) => {
    this.setState({
      command_list: {
        ...this.state.command_list,
        [node]: event.target.value
      }
    })
  };

  getLabOnFocus = (lab) => {
    this.setState({
      lab
    })
  }


  render() {
    const { socket_connection } = this.props
    return(
      <div>
        <Card >
          <CardHeader className="text-center border border-secondary  ">
                Configuration Compiler
            {
              socket_connection ? <Badge className='ml-2' color='success'> socket connected </Badge>
                :
                <Badge className='ml-2' color='danger'> socket disconnected </Badge>
            }
          </CardHeader>
          <CardBody className="border border-secondary">
            <Row>
              <Col xs='12' sm='12' lg='5' >
                <Card>
                  <CardBody>
                      <Row>
                        <Col sm="12">
                          <GraderLabSelectForm getLabOnFocus={this.getLabOnFocus} />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm='12'>
                          <GraderLabNodes handleElementChanges={this.handleElementChanges}/>
                        </Col>
                      </Row>
                  </CardBody>

              </Card>
              </Col>

              <Col xs='12' sm="12" lg="7">
                <Card >
                  <CardBody>
                     <Row>
                        <Col sm='12'>
                          <GraderWhiteBoard lab={this.state.lab}/>
                        </Col>
                      </Row>
                    <Row>
                      <Col sm="12">
                        <GraderStatus/>
                      </Col>
                      <Col sm="12">
                        <GraderConsole/>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
          </Card>

        <Card>
            <CardBody className='border border-secondary'>
            <Row>
              <GraderFailedConnections/>
              <GraderFailedPasswords/>
              <GraderFailedParse/>
              <GraderNoConnection/>
            </Row>
            </CardBody>
        </Card>
      </div>

    )
  }
}

const mapStateToProps = state => (
  {
    socket_connection: state.labgrader.socket_connection,
    notificationMsgs: state.labgrader.notification_msgs,
    user: state.user_data.info,
  }

    );

export default connect(mapStateToProps, {fetchRunningLabs, socketConnect, socketSend})(AutoGrader);

