import C from "../actions/constants"

const initialState = {
    auth: [],
    courses: [],
    dashboard_simulations:[],
    nodes: [],
    nodes_webpage: [],
    nodes_telnet: [],
    dashboard_nodes: [],
    dashboard_nodes_telnet: [],
    dashboard_nodes_webpage: [],
    dashboard_nodes_operation: [],
    dashboard_interfaces: [],
    dashboard_traffic_capture: [],

    monitor_interfaces:[],
    monitor_simulations:[],
    monitor_nodes_webpage: [],
    monitor_nodes_telnet: [],
    monitor_nodes_webpage_con1: [],
    monitor_nodes_telnet_con1: [],
    monitor_nodes: [],
    monitor_nodes_operation: [],

    controlboard_cohorts: [],
    controlboard_courses: [],

    labgrader_fetch_labs: [],

}

const errorReducer = (state=initialState, action) => {
    switch (action.type) {
      case C.RECEIVE_ERRORS:
        if (action.info) {
          const errorMsg = Object.assign({}, action.errorMsg, action.info)
          return Object.assign({}, state, {[action.errorType]:[errorMsg]})
        }
        else return Object.assign({}, state, {[action.errorType]:[action.errorMsg]})

      case C.CLEAR_ERRORS:
        return Object.assign({}, state, {
          [action.errorType]: state[action.errorType].filter((err, index) => index !== action.id )
        })

      case C.REQUEST_SIMULATION:
        if (action.reducerType === 'monitorboard') {
          return Object.assign({}, state, {monitor_simulations:[], monitor_nodes_webpage: [], monitor_nodes_telnet: [],
                                 monitor_interfaces:[], monitor_nodes_webpage_con1: [], monitor_nodes_telnet_con1: [],   })
        } else {
          return state
        }

      case C.RECEIVE_SIMULATION_NODES:
        if (action.reducerType === "dashboard") {
          return Object.assign({}, state, {dashboard_nodes: [], dashboard_nodes_operation: []})
        }
        if (action.reducerType === "monitorboard") {
          return Object.assign({}, state, {monitor_nodes: []})
        }
        return state

      case C.RECEIVE_SIMULATION_NODES_LINKS:
        if (action.reducerType === "dashboard" && action.nodeType === "webpage") {
          return Object.assign({}, state, {dashboard_nodes_webpage: [], dashboard_nodes_telnet: []})
        }
        if (action.reducerType === "dashboard" && action.nodeType === "telnet" ) {
          return Object.assign({}, state, {dashboard_nodes_telnet: [],dashboard_nodes_webpage: []})
        }
        if (action.reducerType === "monitorboard" && action.nodeType === "webpage") {
          return Object.assign({}, state, {monitor_nodes_webpage: [], monitor_nodes_telnet: []})
        }
        if (action.reducerType === "monitorboard" && action.nodeType === "telnet" ) {
          return Object.assign({}, state, {monitor_nodes_telnet: [], monitor_nodes_webpage: []})
        }
        if (action.reducerType === "monitorboard_con1" && action.nodeType === "webpage") {
          return Object.assign({}, state, {monitor_nodes_webpage_con1: [], monitor_nodes_telnet_con1:[]})
        }
        if (action.reducerType === "monitorboard_con1" && action.nodeType === "telnet" ) {
          return Object.assign({}, state, {monitor_nodes_telnet_con1:[], monitor_nodes_webpage_con1: []})
        }
        else return state

      case C.RECEIVE_SIMULATION_INTERFACES:
        if (action.reducerType === "dashboard") {
          return Object.assign({}, state, {dashboard_interfaces: []})
        }
        if (action.reducerType === "monitorboard") {
          return Object.assign({}, state, {monitor_interfaces:[],})
        }
        else return state

      case C.RECEIVE_SIMULATION_CAPTURES:
        return Object.assign({}, state, {dashboard_traffic_capture:[]})

      case C.RECEIVE_INITIAL_DATA:
      case C.REMOVE_SIMULATION:
        return initialState


        default:
            return state
    }
}

export default errorReducer
