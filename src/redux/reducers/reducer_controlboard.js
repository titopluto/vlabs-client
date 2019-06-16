import C from "../actions/constants"
import {WEBSOCKET_CLOSED, WEBSOCKET_MESSAGE, WEBSOCKET_OPEN} from '@giantmachines/redux-websocket'


const initialState = {
    is_fetching_cohorts: false,
    is_fetching_courses: false,

    cohorts: [],
    courses: [],
    console_msgs: [],
    sim_update_msgs: {done:0, total:0},
    notification_msgs: [],
    job_count: 0,
    socket_connection: false

};

const controlBoardReducer = (state=initialState, action) => {
    switch (action.type) {
      case C.REQUEST_COHORTS:
        if (action.reducerType === 'controlboard') {
          return Object.assign({}, state, {is_fetching_cohorts: true, })
        } else {
          return state
        }

      case C.RECEIVE_COHORTS:
        if (action.reducerType === 'controlboard') {
          return Object.assign({}, state, {is_fetching_cohorts: false, cohorts: action.data, })
        } else {
          return state
        }

      case C.REQUEST_COURSES_GROUP:
        if (action.reducerType === 'controlboard') {
          return Object.assign({}, state, {is_fetching_courses: true, })
        } else {
          return state
        }

      case C.RECEIVE_COURSES_GROUP:
        if (action.reducerType === 'controlboard') {
          return Object.assign({}, state, {is_fetching_courses: false, courses: action.data, })
        } else {
          return state
        }

      case C.RESET_CONTROLBOARD:
          return Object.assign({}, state, {...initialState});

      case C.RESET_CONTROLBOARD_FORM:
          return Object.assign({}, state, {courses:[], cohorts:[]});

      case C.RESET_CONTROLBOARD_MSG:
          return Object.assign({}, state, {console_msgs:[], sim_update_msgs: initialState['sim_update_msgs'], notification_msgs: []});

      case C.RESET_CONSOLE:
          if (action.data.reducerType === 'controlboard') {
            return Object.assign({}, state, {console_msgs:[]});
          }
          else return state


      case C.CLEAR_CONTROL_NOTIFY_MSG:
        return Object.assign({}, state, {
              notification_msgs: state.notification_msgs.filter((err, index) => index !== action.index)
            });
        //  console.log("deleting ntoficaition", action.index)
        // return state


      case WEBSOCKET_MESSAGE:
        const json_data = JSON.parse(action.payload.data)
        if (json_data['destination'] === "autostart") {

          if (json_data['display'] === 'console') {
            return Object.assign({}, state, {console_msgs: [...state.console_msgs, json_data['message']]});
            // return {...state, console_msgs: [...state.console_msgs, json_data['message']]}
          }

          else if (json_data['display'] === 'notification') {
            return Object.assign({}, state, {notification_msgs: [json_data['message']]});
            // return {...state, notification_msgs: [json_data['message']]}
          }

          else if (json_data['display'] === 'sim_update') {
            return Object.assign({}, state, {sim_update_msgs: json_data['message']});
            // return {...state, sim_update_msgs: json_data['message']}
          }
          else if (json_data['display'] === 'job_count') {
            return Object.assign({}, state, {job_count: json_data['message']});
            // return {...state, job_count: json_data['message']}
          }
        }

        return state;

      // case WEBSOCKET_OPEN:
      //     if (action.source === "autostart") {
      //       console.log("socket-OPEN-AUTOSTART", action.payload)
      //       return Object.assign({}, state, {socket_connection: true});
      //     }
      //     return state
      //
      // case WEBSOCKET_CLOSED:
      //   if (action.source === "autostart") {
      //     console.log("socket-CLOSED==autostart", action)
      //     return Object.assign({}, state, {socket_connection: false});
      //   }
      //   return state


      default:
        return state
    }
}

export default controlBoardReducer
