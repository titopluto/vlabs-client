import React, {Component} from "react"
import {connect} from "react-redux";
import {resetConsole} from "../../redux/actions";
import {Button, Card, CardBody, Col, Row,} from 'reactstrap';


class AutoHelperTools extends Component {

  constructor(props){
    super(props);
  };

  consoleOnClick = e => {
    this.props.resetConsole('controlboard');
  };


  render() {
    return (
      <Row>
        <Col>
          <Card className="border-info">
            <CardBody className='d-flex justify-content-center'>

                <Button color="danger"
                        size='sm'
                        className="btn-pill "
                        onClick={this.consoleOnClick}>
                  <i className="fa fa-lightbulb-o"> </i>&nbsp;Clear Console
                </Button>

            </CardBody>
          </Card>
        </Col>
      </Row>

    )
  }
}

const mapStateToProps = state => (
  { socket_connection: state.controlboard.socket_connection,
  });

export default connect(mapStateToProps, {resetConsole})(AutoHelperTools);


