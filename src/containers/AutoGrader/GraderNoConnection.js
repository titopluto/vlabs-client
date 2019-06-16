import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {socketSend} from "../../redux/actions";
import C from "../../redux/actions/constants"

import {Button, Card, CardBody, CardHeader, Col, Table} from 'reactstrap';

const uuidv1 = require('uuid/v1');



class GraderNoConnection extends Component {

  constructor(props) {
    super(props)
  }

  handleReplyClick = (obj, username) => {
    const { node_commands, lab, folder_name, job_count } = this.props;

    if (job_count === 0) {
      this.props.dispatch({
        type: C.REMOVE_FAILED_ENTITY,
        data: {key: 'no_connection', username}
      })

       this.props.dispatch({
         type: C.RESET_GRADER_CONTENTS,
         data: {mode:'retry'}
       })

      const data = {
        type: 'device_retry_mode',
        command_list: node_commands,
        lab,
        folder_name,
        device: [obj]
      };
      this.props.dispatch(socketSend('autograder', data))
    }
    else{
      this.props.dispatch({
        type: C.SEND_NOTIFICATION,
        data: {reducerType:'labgrader',
          msg:{type:'warning', msg:'You still have an active job running'}}
      })
    }

  }

  handleReplyAllClick = () => {
    const { node_commands, lab, folder_name, job_count, no_connection } = this.props;

    if (job_count === 0) {
      this.props.dispatch({
        type: C.REMOVE_ALL_FAILED_ENTITY,
        data: {key: 'no_connection'}
      })

       this.props.dispatch({
         type: C.RESET_GRADER_CONTENTS,
         data: {mode:'retry'}
       })

      let arr = []
      _.map(no_connection, (value, key) => arr.push({[key]:value}))
      // console.log(arr)

      const data = {
        type: 'device_retry_mode',
        command_list: node_commands,
        lab,
        folder_name,
        device:arr
      };
      this.props.dispatch(socketSend('autograder', data))
    }
    else{
      this.props.dispatch({
        type: C.SEND_NOTIFICATION,
        data: {reducerType:'labgrader',
          msg:{type:'warning', msg:'You still have an active job running'}}
      })
    }

  }

  renderData = (devices_arr, username, obj) => {
    // console.log(obj, username)
    let arr = []
    _.map(devices_arr, (device) => arr.push(device[0]))

    return (
          <tr key={uuidv1()}>
            <td className='align-middle' >
              <div className='ml-2 font-weight-bold'>
                {username}
                </div>
            </td>
            <td> {_.map(arr, (device, i) =>
              <div key={i}>
                <Button className='border border-warning' block> {device} </Button>
              </div>)}
              </td>
            <td className='align-middle'>
              <Button className='ml-2'
                color='primary'
                onClick={() => this.handleReplyClick({[username]:obj[username]}, username)}>
                Retry
              </Button>
            </td>

          </tr>
        )
  }

  render() {
    const { no_connection} = this.props;
    return (
      <Col xs="12" lg="6">
            <Card>
              <CardHeader className='d-flex bg-secondary'>
                <i className="cui-options icons font-xl d-block "></i>
                No Connection Data
                { !_.isEmpty(no_connection) ?
                  <Button className='ml-auto'
                          color='danger'
                          size='sm'
                          onClick={() => this.handleReplyAllClick()}
                  > Retry All </Button>
                  : null
                }
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Device</th>
                    <th> </th>
                  </tr>
                  </thead>
                  <tbody>
                  { _.map(no_connection, this.renderData)}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
    )
  }
}


const mapStateToProps = state => (
  {
    no_connection: state.labgrader.grader_report.no_connection,
    node_commands: state.graderWhiteBoard.node_commands,
    folder_name: state.labgrader.folder_name,
    lab: state.labgrader.lab_name,
    job_count: state.labgrader.job_count
  })

const mapDispatchToProps = dispatch => (
  {
    dispatch
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(GraderNoConnection);
