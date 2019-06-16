import React, {Component} from "react"
import _ from "lodash"
import {Link} from 'react-router-dom';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Row} from "reactstrap";


class AdminTools extends Component {

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

  renderTools = (tool, index) => {
    return (
          <Col key={index} xs="12" sm="6" md="4">
            <Card>
              <CardHeader className={`${tool.theme} text-white text-capitalize text-center font-weight-bold`}>
                <span className="">{tool.type}</span>
              </CardHeader>
              <CardBody className={`card-body ${tool.bodyTheme}`}>
                {tool.description}
              </CardBody>
              <CardFooter className=''>
                <div className="pull-right bg">
                <Link to={`/admin-tools/${tool.url}`}>
                  <Button className="bg-gray-200 border border-primary"> Start App </Button>
                </Link>
                </div>
              </CardFooter>
            </Card>
          </Col>
    )
  }

  render() {
    const  tools = [
      {
        type: "Lab Pre-Start",
        theme:'bg-primary',
        bodyTheme:'',
        description: " A mini-app  for pre-starting simulations for all students in a cohort",
        url: "autostart"
      },
      {
        type: "Configuration Extractor (Beta)",
        theme:'bg-openid',
        bodyTheme:'',
        description: " A mini-app for collecting configurations on simulations running in a lab",
        url: "autograder"
      },
      {
        type: "Physical Pods Configuration Extractor (Beta)",
        theme:'bg-teal',
        bodyTheme:'',
        description: " A mini-app for collecting configurations on the physical pods in the INWK equipment room",
        url: "autograder-pods"
      },
      {
        type: "Report Cards Browser",
        theme:'bg-spotify',
        bodyTheme:'',
        description: " A mini-app for browsing the report cards generated from the Configuration Compiler tool",
        url: "reports"
      },

    ]
    return (
            <Row>
              { _.map(tools, this.renderTools) }
            </Row>
    )
  }

}

export default AdminTools
