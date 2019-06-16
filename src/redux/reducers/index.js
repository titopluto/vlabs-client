import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import C from "../actions/constants"
import authReducer from "./reducer_auth"
import userReducer from "./reducer_user_data"
import {coursesLabsReducer, coursesVlabsReducer} from "./reducer_courses"
import dashboardReducer from "./reducer_dashboard"
import monitorboardReducer from "./reducer_monitorboard"
import modalReducer from "./reducer_modal"
import errorReducer from "./reducer_errors"
import controlBoardReducer from "./reducer_controlboard"
import labGraderReducer from "./reducer_labgrader"
import reportsReducer from "./reducer_reports"
import graderWhiteboardReducer from "./reducer_grader_whiteboard"
import labGraderPodsReducer from "./reducer_labgrader_pods"


const appReducer = combineReducers(
  {
    form: formReducer,
    // dialogReducer: dialogReducer,
    modal: modalReducer,
    auth: authReducer,
    user_data: userReducer,
    courses_labs: coursesLabsReducer,
    courses_vlabs: coursesVlabsReducer,
    dashboard: dashboardReducer,
    monitorboard: monitorboardReducer,
    controlboard: controlBoardReducer,
    errors: errorReducer,
    labgrader: labGraderReducer,
    reports: reportsReducer,
    graderWhiteBoard: graderWhiteboardReducer,
    labgraderPods : labGraderPodsReducer,
  }
)

const rootReducer = (state, action) => {
  if (action.type === C.LOGOUT_USER) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
