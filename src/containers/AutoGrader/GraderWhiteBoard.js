import React, {Component} from 'react'
import _ from 'lodash'
import {resetGraderContents, setFolderName, socketSend} from "../../redux/actions";
import {connect} from 'react-redux'
import {Badge, Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Progress} from 'reactstrap';
import 'spinkit/css/spinkit.css';


class GraderWhiteBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      folderName: this.props.folder_name
    }
  }

  renderNodeCommands = (command_list, node, i) => {
    return(
      <div key={node}>
        <span className='font-weight-bold  mr-2'> {node}: </span>
        <span>
          {
            _.map(command_list, (cmd, i) =>
                cmd ?
                  <span key={i}><Badge pill color='warning'> {cmd} </Badge> </span>
                  :
                  null
            )
          }
        </span>
      </div>
    )
  };

  handleFolderInput = (event) => {
    this.props.setFolderName('normal',event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.resetGraderContents('normal')
    const { node_commands, lab, folder_name } = this.props;
    const data = {command_list:node_commands, lab, folder_name};
    // console.log(data)
    this.props.socketSend('autograder', data )
  };

  render() {
    const {node_commands, job_count } = this.props;
    const {total, completed, failed, no_check, no_connection_data } = this.props.grader_update;
     const progress = ( (parseInt(completed)+ parseInt(failed)+ parseInt(no_check) + parseInt(no_connection_data)
       ) /parseInt(total)
       ) * 100
    // console.log(progress)

    return(
      <div>
      <Card>
        <CardHeader className='text-center p-0 '>
          WhiteBoard
        </CardHeader>
          <CardBody>
          {_.map(node_commands, this.renderNodeCommands)}
          </CardBody>

      </Card>
        <div className='text-center text-muted mt-0 mb-1'>
          check Report-Cards Browser for results
        </div>

        <div className='d-flex justify-content-center mb-3 mb-0 ' >
             <Form inline>
                  <FormGroup className="pr-1">
                    <Label htmlFor="folderName" className="pr-1">Folder Name</Label>
                    <Input type="text"
                           id="folderName"
                           placeholder="Optional"
                           value={this.props.folder_name}
                           onChange={this.handleFolderInput}
                            />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    <Button
                      type="submit"
                      color="success"
                      onClick={this.handleSubmit}
                    >
                     Start </Button>
                  </FormGroup>
             </Form>
          <div className="ml-4 mb-0" >
                        {
                        job_count>0 ?
                          <div className="sk-folding-cube bg-secondary">
                            <div className="sk-cube1 sk-cube bg-primary "> </div>
                            <div className="sk-cube2 sk-cube bg-success"> </div>
                            <div className="sk-cube4 sk-cube bg-danger"> </div>
                            <div className="sk-cube3 sk-cube bg-info"> </div>
                        </div>
                          : null
                      }
                      </div>
        </div>
         {job_count>0 ?
        <Progress animated color={progress<100 ? 'info':'warning'} value={progress} className="mb-2" >
          {progress>=100 ? 'retrying failed devices' : null}
        </Progress>
          :
          <Progress  color="info" value={0} className="mb-2" />}
    </div>

    )
  }
}


const mapStateToProps = state => (
  {
    node_commands: state.graderWhiteBoard.node_commands,
    job_count: state.labgrader.job_count,
    folder_name: state.labgrader.folder_name,
    lab: state.labgrader.lab_name,
    grader_update: state.labgrader.grader_update_msgs,
  }

    );

export default connect(mapStateToProps, {socketSend, resetGraderContents, setFolderName})(GraderWhiteBoard);
