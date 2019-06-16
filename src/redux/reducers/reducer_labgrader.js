import _ from 'lodash'
import C from "../actions/constants"
import {WEBSOCKET_CLOSED, WEBSOCKET_MESSAGE, WEBSOCKET_OPEN} from '@giantmachines/redux-websocket'


const initialState = {
    is_fetching_labs: false,
    is_fetching_lab_nodes:false,

    running_labs: [],
    nodes: {},
    socket_connection: false,
    job_count: 0,
    console_msgs: [],
    notification_msgs: [],
    grader_update_msgs:{total:0, completed:0, failed:0, no_check:0, no_connection_data:0},

    folder_name: "",
    lab_name: "",

    grader_report: {
      no_conection: [],
      no_check: [],
      failed_connections: {},
      failed_parse: [],
      failed_passwords: [],
    }

};

const labGraderReducer = (state=initialState, action) => {
    switch (action.type) {
      case C.REQUEST_RUNNING_LABS:
        return Object.assign({}, state, {is_fetching_labs: true, })

      case C.RECEIVE_RUNNING_LABS:
        return Object.assign({}, state, {is_fetching_labs: false, running_labs: action.data, })

      case C.REQUEST_RUNNING_LAB_NODES:
        return Object.assign({}, state, {is_fetching_lab_nodes: true, nodes:{} })

      case C.RECEIVE_RUNNING_LAB_NODES:
        return Object.assign({}, state, {is_fetching_lab_nodes: false, nodes: action.data, })

      case C.CLEAR_GRADER_NOTIFY_MSG:
        return Object.assign({}, state, {
              notification_msgs: state.notification_msgs.filter((err, index) => index !== action.index)
            });

       case C.RESET_GRADER_CONTENTS:
         if(state.job_count === 0) {
           if (action.data.mode === 'retry') {
              return Object.assign({}, state, {
             grader_update_msgs: initialState.grader_update_msgs,
             console_msgs: []
           })
           }
           else {
             return Object.assign({}, state, {
             grader_update_msgs: initialState.grader_update_msgs,
             grader_report: initialState.grader_report,
             console_msgs: []
           })
           }
         }
         else return state


      case C.SET_FOLDER_NAME:
        if (action.mode === 'normal' ){
          return Object.assign({}, state, {folder_name: action.data})
        }
        else return state

      case C.SET_LAB_NAME:
        return Object.assign({}, state, {lab_name:action.data})

      case C.REMOVE_FAILED_ENTITY:
        return Object.assign({}, state,
          {grader_report: Object.assign({}, state.grader_report,
              {[action.data.key]: _.pickBy(state.grader_report[action.data.key], (value, key) => key !== action.data.username ) }
              )  });

      case C.REMOVE_ALL_FAILED_ENTITY:
        return Object.assign({}, state,
          {grader_report: Object.assign({}, state.grader_report,
              {[action.data.key]: {} }
              )  });

      case C.SEND_NOTIFICATION:
        if (action.data.reducerType === "labgrader") {
          return {...state, notification_msgs: [...state.notification_msgs, action.data.msg]}
        }
        else {
          return state
        }

      case C.RESET_CONSOLE:
          if (action.data.reducerType === 'labgrader') {
            return Object.assign({}, state, {console_msgs:[]});
          }
          else return state


      case WEBSOCKET_OPEN:
        // if (action.source === "autograder") {
          // console.log("socket-GRADER-OPEN", action.payload)
          return Object.assign({}, state, {socket_connection: true});
        // }
        // return state

      case WEBSOCKET_CLOSED:
          // console.log("socket-GRADER-CLOSED", action.payload)
          return Object.assign({}, state, {socket_connection:false});

      case WEBSOCKET_MESSAGE:
        const json_data = JSON.parse(action.payload.data)
        if (json_data['destination'] === "autograder") {
          console.log(json_data)

          if (json_data['display'] === 'console') {
            return {...state, console_msgs: [...state.console_msgs, json_data['message']]}
          }

          else if (json_data['display'] === 'notification') {
            return {...state, notification_msgs: [...state.notification_msgs, json_data['message']]}
          }

          else if (json_data['display'] === 'grader_update') {
            const keys = Object.keys(json_data['message'])
            // console.log("keys==.>", keys)
            const newObj = {}
            for(let i in keys) {
              if (keys[i] in state.grader_update_msgs){
                // console.log('DDD', state.grader_update_msgs[keys[i]])
                newObj[keys[i]] = state.grader_update_msgs[keys[i]] + json_data['message'][keys[i]]
              }
            }
              return Object.assign({}, state,
              {grader_update_msgs: Object.assign({}, state.grader_update_msgs, newObj )  });

          }

          else if (json_data['display'] === 'grader_report') {

            const keys = Object.keys(json_data['message'])
            console.log(keys, json_data['message'])

            let newObj = {}
            for(let i in keys) {
              if (keys[i] in state.grader_report){
                // console.log('DDD', state.grader_update_msgs[keys[i]])
                // console.log(keys[i])
                newObj[keys[i]] = {...state.grader_report[keys[i]], ...json_data['message'][keys[i]]}
                // console.log(newObj)

                // for (let j in json_data['message']) {
                //   arr.push(json_data['message'][key[i]])
                // }
                // newObj[keys[i]] = [ ...state.grader_report[keys[i]],  json_data['message'][keys[i]]]
              }
            }
              return Object.assign({}, state,
              {grader_report: Object.assign({}, state.grader_report, {...newObj}  )  });
          }

          else if (json_data['display'] === 'job_count') {
            return {...state, job_count: json_data['message']}
          }
        }
        return state;


      default:
        return state
    }
}

export default labGraderReducer
