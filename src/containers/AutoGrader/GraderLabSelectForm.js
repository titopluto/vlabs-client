import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchRunningLabNodes} from "../../redux/actions";
import {Col, FormGroup, Input, Label} from 'reactstrap';

class GraderLabSelectForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lab_name:this.props.lab_name
    }
  }

  renderLabNames = (lab, index) => {
    return (
      <option key={index}> {lab['lab__code']}</option>
    )
  };

  handleOnSelect = (event) => {
    const lab_name = event.target.value
    if (lab_name) {
      this.setState({
      lab_name
    })
    this.props.fetchRunningLabNodes(lab_name)
    this.props.getLabOnFocus(lab_name)
    }

  };

  render() {
    const { running_labs } = this.props;
    return(

      <FormGroup row>
        <Col md="3">
        <Label htmlFor="company">Select Lab</Label>
        </Col>
        <Col xs="12" md="9">
          <Input type="select" id="lab" name="lab"
                 onChange={this.handleOnSelect}
                 value={this.state.lab_name}

          >
            <option label="select a lab "> </option>
            {_.map(running_labs, this.renderLabNames)}
          </Input>
        </Col>
      </FormGroup>

    )
  }
}


const mapStateToProps = state => (
  {
    running_labs: state.labgrader.running_labs,
    lab_name: state.labgrader.lab_name,
  });

const mapDispatchToProps = dispatch => (
  {
    fetchRunningLabNodes: (value) => dispatch(fetchRunningLabNodes(value)),
    dispatch,
  })

export default connect(mapStateToProps, mapDispatchToProps)(GraderLabSelectForm);
