import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {FormGroup,} from 'reactstrap';

import GradeNode from "./GraderNode"

class GraderLabNodes extends Component {

  constructor(props) {
    super(props);
    this.renderNodes = this.renderNodes.bind(this)
  }

  renderNodes = (value, nodeName) =>
    <GradeNode key={nodeName}
               handleElementChanges={this.props.handleElementChanges}
               nodeName={nodeName}
    />


  render() {
    const { nodes, handleElementChange } = this.props;
    // const test = {r1:"",r2:""}
    return(
      <FormGroup>
        {_.map(nodes, this.renderNodes)}
      </FormGroup>
    )
  }
}


const mapStateToProps = state => (
  {
    nodes: state.labgrader.nodes,
  }

    );

export default connect(mapStateToProps, {})(GraderLabNodes);
