import _ from 'lodash'
import React, {Component} from "react"
import {connect} from "react-redux";
import {fetchCoursesByGroupPerm, resetControlboardForm, resetControlboardMsgs, socketSend} from "../../redux/actions";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';


class AutoForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      lab:"",
      input_cohort: "",
      input_course: "",
      input_lab: "",
    };
    this.renderCohortNames = this.renderCohortNames.bind(this)
    this.handleCohortOnSelect = this.handleCohortOnSelect.bind(this)

    this.cohortInput = React.createRef();
    this.courseInput = React.createRef();
    this.labInput = React.createRef();
  }

  componentWillUnmount(){
    this.props.resetControlboardForm();
  }

  renderCohortNames = (cohort, index) => {
    return (
      <option key={index}> {cohort['name']}</option>
    )
  };

  handleCohortOnSelect = (event) => {
    const input_cohort = event.target.value;
    this.props.fetchCoursesByGroupPerm("controlboard", input_cohort);
    this.setState({input_cohort, input_course:''})
  };

  renderCourseNames = (course, index) => {
    return (
      <option key={index}> {`${course.code}: ${course.title}`}</option>

    )
  };

  handleCourseOnSelect = (event) => {
    const input_course =  event.target.value;
    this.setState({input_course:input_course, input_lab:''})
  };

  handleLabOnSelect = (event) => {
    const input_lab = event.target.value;
    this.setState({input_lab})
  };

  renderLabNames = (courses) => {
    const course_code = this.state.input_course.split(":")[0];
    const course = _.find(courses, ['code', course_code]);

    if (course) {
      return(
        _.map(course['vlabs'], (lab,index) =>
        <option key={index}> {`${lab.code}`}</option>
        )
      )
    }
    else {
      return null
    }
  };

  handleFormSubmit =(e) => {
    e.preventDefault();
    this.props.resetControlboardMsgs();

    const cohort = this.cohortInput.current.props.value;
    const lab = this.labInput.current.props.value;

    if (cohort && lab) {
      const data = {
      message:"auto-start-sims",
      cohort:cohort,
      lab:lab
    };
    // this.props.wSocket.sendMessage(data)
      this.props.socketSend('autostart', data)
    }

  }

  render() {
    const {cohorts, courses, isFetchingCourses} = this.props;
    const {input_cohort, input_course, input_lab} = this.state;
    console.log(isFetchingCourses)
    return (
      <Row>
        <Col>
          <Card className="border-info">
            {/*<CardHeader className="text-center">*/}
              {/*Loader*/}
            {/*</CardHeader>*/}
            <CardBody>
              <Form action="" onSubmit={this.handleFormSubmit}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Cohort</InputGroupText>
                    </InputGroupAddon>

                    <Input type="select" value={input_cohort} id="cohort" name="cohort"
                           onChange={this.handleCohortOnSelect}
                            ref={this.cohortInput}
                           required
                    >
                      <option label="select a cohort"> </option>
                      {_.map(cohorts, this.renderCohortNames)}
                    </Input>
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Course</InputGroupText>
                    </InputGroupAddon>

                    <Input type="select"  value={input_course} id="course" name="course"
                           onChange={this.handleCourseOnSelect}
                            ref={this.courseInput}
                           required
                    >
                      <option label="select a course"></option>
                      {_.map(courses, this.renderCourseNames)}
                    </Input>
                    {  isFetchingCourses ?
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only"> </span>
                          </div>
                        </InputGroupText>
                      </InputGroupAddon>
                      :
                      null
                    }

                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Lab</InputGroupText>
                    </InputGroupAddon>
                    <Input type="select" id="lab" name="lab"
                           value={input_lab}
                            onChange={this.handleLabOnSelect}
                           ref={this.labInput}
                           required
                    >
                      <option label="select a lab "></option>
                      { this.renderLabNames(courses)}
                    </Input>

                  </InputGroup>
                </FormGroup>
                <FormGroup className="form-actions">
                  <Button
                    type="submit"
                    size="lg" color="success" block
                    className="btn-pill "
                  >
                    Start </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

    )
  }
};

const mapStateToProps = state => (
  { cohorts: state.controlboard.cohorts,
    courses: state.controlboard.courses,
    isFetchingCourses: state.controlboard.is_fetching_courses
  });

export default connect(mapStateToProps, {fetchCoursesByGroupPerm, resetControlboardForm,
  resetControlboardMsgs, socketSend})(AutoForm);


