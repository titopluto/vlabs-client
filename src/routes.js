import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';


function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard/Dashboard'),
  loading: Loading,
});

const MonitorBoard = Loadable({
  loader: () => import('./views/Monitorboard/Monitorboard'),
  loading: Loading,
});

const SimulationTroubleshoot = Loadable({
  loader: () => import('./views/Troubleshoot/SimulationTroubleshoot'),
  loading: Loading,
});

const Courses = Loadable({
  loader: () => import('./views/Courses/Courses'),
  loading: Loading,
});

const Labs = Loadable({
  loader: () => import('./views/Labs/Labs'),
  loading: Loading,
});

const VirlLabs = Loadable({
  loader: () => import('./containers/Vlabs/AllVlabs'),
  loading: Loading,
});

const SelfService = Loadable({
  loader: () => import('./containers/SelfServe/SelfServe'),
  loading: Loading,
});

const AdminTools = Loadable({
  loader: () => import('./views/AdminTools/AdminTools'),
  loading: Loading,
});

const AutoStart = Loadable({
  loader: () => import('./containers/AutoStart/Layout'),
  loading: Loading,
});

const AutoGrader = Loadable({
  loader: () => import('./containers/AutoGrader/Layout'),
  loading: Loading,
});

const ReportsBrowser = Loadable({
  loader: () => import('./containers/ReportsBrowser/Layout'),
  loading: Loading,
});

const AutoGraderPods = Loadable({
  loader: () => import('./containers/AutoGraderPods/Layout'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, exact: true},
  { path: '/monitorboard', name: 'Monitorboard', component: MonitorBoard, exact: true, staff:true },
  { path: '/monitorboard/:labID', name: 'LabDetail', component: SimulationTroubleshoot, staff:true},
  { path: '/courses', name: 'Courses', component: Courses, exact: true },
  { path: '/courses/labs/:courseCode', name: 'Labs', component: Labs },
  { path: '/vlabs/labs', name: 'VirlLabs', component: VirlLabs, exact: true },
  { path: '/selfservice', name: 'SelfService', component: SelfService, exact: true },
  { path: '/admin-tools', name: 'AdminTools', component: AdminTools, exact: true, staff:true },
  { path: '/admin-tools/autostart', name: 'AutoStart', component: AutoStart, staff:true},
  { path: '/admin-tools/autograder', name: 'AutoGrader', component: AutoGrader, staff:true},
  { path: '/admin-tools/reports', name: 'ReportsBrowser', component: ReportsBrowser, staff:true},
  { path: '/admin-tools/autograder-pods', name: 'AutoGraderPods', component: AutoGraderPods, staff:true},


];

export default routes;




{/*<Route path="/dashboard" name="Dashboard" component={Dashboard}/>*/}
                  {/*{ is_staff && <Route path="/monitorboard/:labID" name="LabDetail" component={SimulationTroubleshoot}/> }*/}
                  {/*{ is_staff && <Route path="/monitorboard" name="Monitorboard" component={MonitorBoard}/> }*/}
                {/*<Route path="/courses/labs/:courseCode" name="Labs" component={LabsView} />*/}
                {/*<Route path="/courses" name="Courses" component={CoursesView}/>*/}
                {/*<Route path="/vlabs/labs" name="Vlabs" component={AllVlabs}/>*/}
                {/*<Route path="/selfservice" name="SelfServe" component={SelfServe}/>*/}
                {/*{ auth ?*/}
                  {/*<Redirect from="/" to="/dashboard"/>*/}
                  {/*:*/}
                  {/*<Redirect from="/" to="/login"/>*/}
                {/*}*/}
