import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {graderWhiteboardData} from "../../redux/actions";
import {FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText,} from 'reactstrap';

class GraderLabNodes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commands: []
    }
  }

  handleNodeChange = (node, event) => {
    this.props.handleElementChanges(node, event);
    const commandArray = event.target.value.split(",");
    this.setState({
      commands: commandArray
    })
    console.log(node, commandArray)
    this.props.graderWhiteboardData("normal", node, commandArray)
  };

  getNodeCommands = (node) => {
    const node_commands = this.props.node_commands;
    console.log(node_commands)
    if (_.isEmpty(node_commands)) {
      return ''
    }
    else{
      return node_commands[node]
    }

  }



  render() {
    const {nodeName} = this.props;
    return(
      <FormGroup row>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{nodeName}</InputGroupText>
          </InputGroupAddon>

          <Input type="textarea"
                 className="border border-info"
                 name="textarea-input"
                 id="textarea-input"
                 rows="4"
                 placeholder="type commands separated by commas"
                 onChange={(event)=>this.handleNodeChange(nodeName, event)}
                 value={this.getNodeCommands(nodeName)}
          />

        </InputGroup>
      </FormGroup>

    )
  }
}


const mapStateToProps = state => (
  {
    nodes: state.labgrader.nodes,
    node_commands: state.graderWhiteBoard.node_commands
  }

    );

export default connect(mapStateToProps, {graderWhiteboardData})(GraderLabNodes);
