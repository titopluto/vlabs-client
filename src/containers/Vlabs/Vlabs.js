import _ from "lodash"
import React, {Component} from "react"
import {connect} from "react-redux"
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Row} from "reactstrap";
import {launchSimulation} from '../../redux/actions'
import LaddaButton, {ZOOM_IN} from 'react-ladda';


class Labs extends Component {

  getLabsFromCourse(courses_vlab, courseCode) {
    // return (_.map(course, 'vlabs'))
    return _.find(courses_vlab, {code:courseCode})
  }

  renderLabs(vlabs, index) {

    const { history, dispatch, isFetching, launchSimulation } = this.props
    const sk_wave =  {
      'margin': '0px',
    };
    const sk_react =  {
      'backgroundColor': '#06f71a',
    };
    return (
          <Col key={index} xs="12" sm="6" md="4">
            <Card className="">
              <CardHeader className="bg-foursquare text-white font-weight-bold">
                {`${vlabs.title}`}
              </CardHeader>
              <CardBody className="card-body">
                {vlabs.synopsis} <br/>
                 <Button color="link" onClick={()=>window.open(vlabs.document, '_blank')} className="card-link">View Lab Manual</Button>
              </CardBody>
              <CardFooter >
                   <LaddaButton key={index}
                    className="btn btn-foursquare   btn-ladda pull-right"
                    loading={isFetching}
                    onClick={ ()=> launchSimulation(vlabs, history)}
                    data-color="green"
                    data-style={ZOOM_IN}
                  >
                    Start Lab
                  </LaddaButton>
              </CardFooter>
            </Card>
          </Col>
    )
  }

  render() {
    const { courses_vlabs } = this.props
    const courseCode = this.props.courseCode
    const course = this.getLabsFromCourse(courses_vlabs, courseCode)

    return(
      <div>
        <Row>
        {
            course ?
              _.map(course.vlabs, this.renderLabs.bind(this) )
            :
            null
        }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses_vlabs : state.courses_vlabs.info,
  isFetching: state.dashboard.is_launching_simulation,
  })

// const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, { launchSimulation } )(Labs)
