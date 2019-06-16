import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import DefaultSidebarHeader from './DefaultSidebarHeader';
import {fetchUserData, socketConnect} from "../../redux/actions";
import config from "../../redux/actions/config";

import {connect} from "react-redux";

import ModalRoot from "../Modal/ModalRoot"
import Modal from "react-modal";
import AutoNotification from "../AutoStart/AutoNotification"
import GraderNotification from "../AutoGrader/GraderNotification"
import GraderPodsNotification from "../AutoGraderPods/GraderNotification"


import 'react-toastify/dist/ReactToastify.css';


class DefaultLayout extends Component {

  constructor(props) {
    super(props)
    this.initialiseSocket()
  }

  initialiseSocket() {
    this.waitForFetchUserData((url)=>this.props.socketConnect(url, 'main'))
  }

  waitForFetchUserData(callback) {
    const component = this; // not sure why but for some reason it works.. need to read up on it
    const username = component.props.user.username
    console.log(username)
    setTimeout(function() {
      if (username) {
        console.log("Connection is made");
        const url = `${config.wsUrl}/vlabs-channels/${username}/`;
        callback(url);
      } else {
        console.log("wait for connection...");
        component.waitForFetchUserData(callback);
      }
    }, 100);
  }

  componentDidMount() {
    this.props.fetchUserData()
    Modal.setAppElement('body');
  }

  render() {
    const {auth, is_staff} = this.props
    return (
      <div className="app">
        <AutoNotification/>
        <GraderNotification/>
        <GraderPodsNotification/>
        <ModalRoot/>
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader>
              <DefaultSidebarHeader />
            </AppSidebarHeader>

            {/*<AppSidebarHeader />*/}
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            {/*<Sidebar/>*/}
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              {auth ?
                <Switch>
                  {
                    routes.map((route, idx) => {
                        return route.component && !route.staff ? (
                            <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                              <route.component {...props} />
                            )}/>)
                          : (null);
                      },
                    )}
                  {
                    is_staff ?
                      routes.map((route, idx) => {
                          return route.component && route.staff ? (
                              <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                <route.component {...props} />
                              )}/>)
                            : (null);
                        },
                      ) : (null)

                  }
                  <Redirect from="/" to="/dashboard"/>
                </Switch>
                :
                <Redirect from="/" to="/login"/>
              }
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    // user_id: state.user_data.user_id,
    auth: state.auth.authenticated,
    is_staff: state.user_data.info.is_staff,
    user: state.user_data.info,
  }
)

export default connect(mapStateToProps, {fetchUserData, socketConnect})(DefaultLayout);
