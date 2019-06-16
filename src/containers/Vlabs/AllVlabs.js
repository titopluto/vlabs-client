import _ from "lodash"
import React, {Component} from "react"
import {connect} from "react-redux"
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Row} from "reactstrap";
import {launchSimulation} from '../../redux/actions'
import LaddaButton, {ZOOM_IN} from 'react-ladda';
import 'spinkit/css/spinkit.css';


class Labs extends Component {

  getLabsFromCourse(course) {
    return (_.map(course, 'vlabs'))
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
      <div key={index} className="animated fadeIn">
        <Row>
      {
        _.map(vlabs, (vlab, i) => (
          <Col key={i} xs="12" sm="6" md="4">
            <Card className="">
              <CardHeader className="bg-foursquare text-white font-weight-bold">
                {vlab.title}
              </CardHeader>
              <CardBody className="card-body">
                {vlab.synopsis} <br/>
                 <Button color="link" onClick={()=>window.open(vlab.document, '_blank')} className="card-link">View Lab Manual</Button>
              </CardBody>
              <CardFooter >

                <LaddaButton key={i}
                    className="btn btn-foursquare  btn-ladda pull-right"
                    loading={isFetching}
                    onClick={ ()=> launchSimulation(vlab, history)}
                    data-color="green"
                    data-style={ZOOM_IN}
                  >
                    Start Lab
                  </LaddaButton>
              </CardFooter>
            </Card>
          </Col>

          )
        )
      }
        </Row>
      </div>
    )
  }

  render() {
    const { courses_vlabs } = this.props
    const labs = this.getLabsFromCourse(courses_vlabs)
    return(
      <div>
        {
          _.map(labs, this.renderLabs.bind(this) )
        }

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
