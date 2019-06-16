import React, {Component} from "react"
import _ from "lodash"
import {connect} from "react-redux"
import {Link} from 'react-router-dom';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Row} from "reactstrap";


class Courses extends Component {

    constructor() {
    super()
    this.state = {
      expContract: false,
    }
  }

  toggle(name) {
    this.setState({
    [name]: !this.state[name],
    progress: 0.5
    })
  }

  renderCourses(course, index) {
    return (
          <Col key={index} xs="12" sm="6" md="4">
            <Card className="">
              <CardHeader className="bg-gray-700 text-white text-capitalize font-weight-bold ">
                <span className="text-uppercase">{course.code}</span>
                <span className="float-right"> {course.title} </span>
              </CardHeader>
              <CardBody className="card-body">
                {course.synopsis}
              </CardBody>
              <CardFooter>
                <div className="pull-right">
                <Link to={`/courses/labs/${course.code}`}>
                  <Button className="bg-gray-200 border border-dark"> View Labs </Button>
                </Link>
                </div>
              </CardFooter>
            </Card>
          </Col>
    )
  }

  render() {
    const { courses } = this.props
    return (
            <Row>
              { _.map(courses, this.renderCourses) }
            </Row>
    )
  }

}

const mapStateToProps = (state) => ({
  courses: state.courses_labs.info
})

export default connect(mapStateToProps)(Courses)
