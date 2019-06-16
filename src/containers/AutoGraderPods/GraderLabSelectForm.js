import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchRunningLabNodes, setActivePod} from "../../redux/actions";
import {Card, CardBody, Col, FormGroup, Input, Row} from 'reactstrap';
import {podsDevices} from "./data/pods";
import C from "../../redux/actions/constants"
import 'pretty-checkbox/src/pretty-checkbox.scss';

class GraderLabSelectForm extends Component {

  constructor(props) {
    super(props)
    const checkedItems = this.initPodsState()
    this.state = {
      lab_name:this.props.lab_name,
      pod_devices_exec: {},
      checkedItems,
      check_all:false
    }
  }

  initPodsState = () => {
    let checkedItems = new Map()
    for (var i=1; i<=20; i++) {
      checkedItems.set(`pod${i}`, false)
    }
    return checkedItems

  }


  renderPodNames = (podObj, index) => {
    const podName = podObj.podName
    return(
      <Col key={index} sm='3' className='mb-3'>
      <div  className="pretty p-default p-fill ">
        <input type="checkbox"
               id={`checkbox-${podName}`}
               name={podName}
               checked={this.state.checkedItems.get(podName)}
               onChange={this.handleOnChange}
        />
        <div className="state p-success text-capitalize font-weight-bold">
            <label>{podName}</label>
        </div>
    </div>
      </Col>
    )
  };

  handleOnChange = (event) => {
    const all_pods = this.props.all_pods
    const podName = event.target.name;
    const isChecked = event.target.checked;
    this.setState(prevState => {
      if (isChecked) {
        const pod_devices = _.filter(all_pods,{podName})[0]
        const pod_devices_exec= {...prevState.pod_devices_exec, [podName]:pod_devices}
        this.props.dispatch({
          type:C.SET_POD_DEVICES,
          data:{reducerType:'labgraderPods', msg: pod_devices_exec}
        })
        return (
          { checkedItems: prevState.checkedItems.set(podName, isChecked),
            pod_devices_exec,
          })
      }
      else {
        const filter_obj = _.pickBy(prevState.pod_devices_exec, (value,key)=> key !== podName)
        this.props.dispatch({
          type:C.SET_POD_DEVICES,
          data:{reducerType:'labgraderPods', msg: filter_obj}
        })
        return(
          {
            checkedItems: prevState.checkedItems.set(podName, isChecked),
            pod_devices_exec: filter_obj}
      )}
      });

    }

  handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    const checkedItems = new Map()
    const all_pods = this.props.all_pods

    const pod_devices_exec = {}

    if (isChecked) {
      for (var i=1; i<=20; i++) {
      checkedItems.set(`pod${i}`, true)
    }

      _.map(all_pods, (obj, i) => pod_devices_exec[obj.podName] = obj )

    this.setState({checkedItems, pod_devices_exec })
    }
    else {
      for (var i=1; i<=20; i++) {
      checkedItems.set(`pod${i}`, false)}
    this.setState({checkedItems, pod_devices_exec})
    }

    this.props.dispatch({
          type:C.SET_POD_DEVICES,
          data:{reducerType:'labgraderPods', msg: pod_devices_exec}
        })
  }


  render() {
    const { all_pods } = this.props;
    return(

      <FormGroup>
        <Row>
        <Col sm="12" md={{ size: 6, offset: 4 }} className='mb-2'>
           <div  className="pretty p-default ">
              <Input className="form-check-input" type="checkbox" id={`checkbox-all`}
                     name='check_all'
                     checked={this.state.checkAll}
                     onChange={this.handleCheckAll}
              />
              <div className="state p-danger-o text-capitalize">
                <label>Select All</label>
              </div>
          </div>
        </Col>
        </Row>
        <Card>
            <CardBody className='border border-secondary'>
              <Col xs="12" >
                <Row>

                  {_.map(all_pods, this.renderPodNames)}
                </Row>
        </Col>
            </CardBody>
          </Card>

      </FormGroup>

    )
  }
}


const mapStateToProps = state => (
  {
    all_pods: podsDevices,
    lab_name: state.labgraderPods.lab_name,
  });

const mapDispatchToProps = dispatch => (
  {
    fetchRunningLabNodes: (value) => dispatch(fetchRunningLabNodes(value)),
    dispatch,
  })

export default connect(mapStateToProps, mapDispatchToProps)(GraderLabSelectForm);
