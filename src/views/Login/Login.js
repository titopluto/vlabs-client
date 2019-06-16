import React, {Component} from "react";
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import {loginUser} from "../../redux/actions"

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardTitle,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import "./styles.css"
import logo from "../../static/img/dal_logo.png"
import {version} from "../../version"


class Login extends Component {

  constructor(props){
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    required = value => value ? undefined : 'Required'

    renderField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => {
      return (
         <InputGroup className="mb-3">
           <InputGroupAddon addonType="prepend">
             <InputGroupText>
             <i className={label==="email" ? "icon-user" : "icon-lock"}> </i>
             </InputGroupText>
           </InputGroupAddon>

            <Input {...input} id={label} placeholder={placeholder} type={type}
                   className={`form-control ${
                   touched && error &&
                   "is-invalid" }`} required />

         </InputGroup>
        )
  }

    handleFormSubmit({ email, password }) {
        const { history } = this.props
        // console.log(email, password)
        this.props.loginUser({ email, password}, history)
    }

    render() {
      const { handleSubmit, authErrorMsg } = this.props
      return (
        <div className="app flex-row align-items-center login-app">
        <Container>
          {/*<Row className="justify-content-center">*/}
            {/*<Col md="8">*/}
              {/*<img width="50%" src={logo}/>*/}
            {/*</Col>*/}
          {/*</Row>*/}
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4 border-dark">
                  <CardTitle className="text-center text-light font-weight-bold bg-dark  ">
                    <img src={logo} alt="logo" style={{height:'25px'}}/>
                    <span>  </span> Internetworking <span className='text-success font-italic'>v</span>Lab Studio {version.version}
                  </CardTitle>
                  <CardBody className="card-body">
                    <p className="text-muted">Sign in to your account <span className="text-danger"> {`${authErrorMsg?`:${authErrorMsg}`:""}`}</span></p>

                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>

                      <Field name="email"
                                   label="email"
                                   type="text"
                                   placeholder="netid@dal.ca"
                                   component={this.renderField}
                                   validate={this.required} />
                      <Field name="password"
                                   label="password"
                                   type="password"
                                   placeholder="password"
                                   component={this.renderField}
                                   validate={this.required} />

                      <Row>
                        <Col xs="12">
                          <Button type="submit" color="dark" className="px-4 float-right">Login</Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>

      )
    }
}
const mapStateToProps = state => (
    {authErrorMsg: state.auth.error_msg}
)


Login = connect(mapStateToProps, {loginUser})(Login)

export default reduxForm({
    form: "login"
})(Login)

