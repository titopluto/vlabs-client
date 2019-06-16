import React, {Component} from "react"
import {connect} from "react-redux";
import {Card, CardBody, Col,} from 'reactstrap'
import "./styles.css"


class AutoConsole extends Component{

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
    )
  }
}

const mapStateToProps = state => (
  { console_msgs: state.controlboard.console_msgs,
  });

export default connect(mapStateToProps, {})(AutoConsole);


