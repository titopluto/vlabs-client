import _ from "lodash"
import React, {Component} from "react"
import {connect} from 'react-redux'
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";


class Labs extends Component {

  renderLabs(lab, index) {
    return (
          <Col key={index} xs="12" sm="6" md="4" onClick={()=>window.open(lab.document, '_blank')}>
            <Card className="">
              <CardHeader className="bg-info text-white text-capitalize">
                {lab.title}
              </CardHeader>
              <CardBody className="card-body">
                {lab.synopsis}
              </CardBody>
            </Card>
          </Col>
    )
  }

  render() {
    const courseCode = this.props.courseCode
    const courses = this.props.courses
    const course = _.find(courses, {code:courseCode})
    console.log(course)

    return (
        <Row>
          {
            _.map(course.labs, this.renderLabs.bind(this) )
          }
        </Row>
    )
  }
}

const mapStateToProps = state => ({
  courses: state.courses_labs.info
})

export default connect(mapStateToProps, null)(Labs)
