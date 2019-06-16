import React, {Component} from "react"
import {connect} from "react-redux";
import {Card, CardBody, Col, Row,} from 'reactstrap'


class GradeConsole extends Component{

  displayConsoleMsgs() {
    const msgs = this.props.console_msgs;
    return(
      msgs.map((msg, i) => {
        return (
          <div key={i}>
            <small key={i}  style={{color:"white"}}>
              {msg} </small>
          </div>
        )}

      )
    )

  }
  render() {

    const style= {
      backgroundColor: 'black',
      height: '400px',
    }

    return (
      <Row>
      <Col sm="12">
            <Card className="border-primary">
              {/*<CardHeader className="text-center">*/}
                {/*Console*/}
              {/*</CardHeader>*/}
              <CardBody className="console-scroll" style={style}>
                {this.displayConsoleMsgs()}
              </CardBody>
            </Card>
          </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => (
  { console_msgs: state.labgraderPods.console_msgs,
  });

export default connect(mapStateToProps, {})(GradeConsole);


