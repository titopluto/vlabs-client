import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {FormGroup,} from 'reactstrap';

import GradeNode from "./GraderNode"

import {podModel} from "./data/podsModel"

class GraderLabNodes extends Component {

  constructor(props) {
    super(props);
    this.renderNodes = this.renderNodes.bind(this)
  }

  renderNodes = (valueArr, nodeName) => {
    return (
      _.map(valueArr, (deviceObj, i) =>
        <GradeNode key={i}
               handleElementChanges={this.props.handleElementChanges}
               nodeName={deviceObj['name']}
    />)
    )

  }



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
    nodes: podModel
  }

    );

export default connect(mapStateToProps, {})(GraderLabNodes);
