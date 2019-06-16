import React, {Component} from 'react'
import {connect} from "react-redux"
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Footer from '../../components/Footer/Footer';

import Dashboard from '../../views/Dashboard/Dashboard';
import MonitorBoard from '../../views/Monitorboard/Monitorboard'
import SimulationTroubleshoot from '../../views/Troubleshoot/SimulationTroubleshoot'
import CoursesView from '../../views/Courses/Courses'
import LabsView from "../../views/Labs/Labs"
import AllVlabs from "../../containers/Vlabs/AllVlabs"
import SelfServe from "../../containers/SelfServe/SelfServe"
import ModalRoot from "../../components/Modal/ModalRoot"

import {fetchUserData} from "../../redux/actions"


class Full extends Component {



  componentWillMount() {
    this.props.fetchUserData()
  }

  render() {
    const {auth, is_staff} = this.props
    return (

      <div className="app">
        <ModalRoot/>
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                  <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                  { is_staff && <Route path="/monitorboard/:labID" name="LabDetail" component={SimulationTroubleshoot}/> }
                  { is_staff && <Route path="/monitorboard" name="Monitorboard" component={MonitorBoard}/> }
                <Route path="/courses/labs/:courseCode" name="Labs" component={LabsView} />
                <Route path="/courses" name="Courses" component={CoursesView}/>
                <Route path="/vlabs/labs" name="Vlabs" component={AllVlabs}/>
                <Route path="/selfservice" name="SelfServe" component={SelfServe}/>
                { auth ?
                  <Redirect from="/" to="/dashboard"/>
                  :
                  <Redirect from="/" to="/login"/>
                }
              </Switch>
            </Container>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    // user_id: state.user_data.user_id,
    auth: state.auth.authenticated,
    is_staff: state.user_data.info.is_staff
  }
)

export default connect(mapStateToProps, {fetchUserData})(Full);
