import C from "../actions/constants"
import _ from 'lodash'

// helper function to sort by datetime
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const timeA = new Date(a[1].created);
  const timeB = new Date(b[1].created);

  console.log(a, '--', b)

  let comparison = 0;
  if (timeA > timeB) {
    comparison = 1;
  } else if (timeA < timeB) {
    comparison = -1;
  }
  return comparison * -1;
}
const initialState = {

  is_fetching_all_simulations: false,
  is_stopping_simulation: false,
  is_stopping_all_simulations: false,
  is_fetching_simulation: false,
  is_fetching_nodes: false,
  is_fetching_interfaces : false,
  is_fetching_nodes_webpage: false,
  is_fetching_nodes_telnet : false,
  is_fetching_nodes_telnet_con1: false,
  is_fetching_nodes_webpage_con1: false,
  is_fetching_captures: false,

  info: null,
  all_info: [],
  all_info_last_update: "",

  nodes_webpage: {},
  nodes_telnet: {},
  nodes_webpage_con1: {},
  nodes_telnet_con1: {},
  interfaces:{},
  traffic_capture: {},
  logs: null,

  socket_msgs: []

}



const MonitorReducer = (state=initialState, action) => {
    switch (action.type) {

      case C.RECEIVE_ERRORS:
        if (action.errorType === "monitorboard_nodes_webpage") {
          return Object.assign({}, state, { is_fetching_nodes_webpage: false })
        }
        if (action.errorType === "monitorboard_nodes_telnet") {
          return Object.assign({}, state, { is_fetching_nodes_telnet : false })
        }
        if (action.errorType === "monitorboard_con1_nodes_telnet") {
          return Object.assign({}, state, { is_fetching_nodes_telnet_con1 : false })
        }
        if (action.errorType === "monitorboard_con1_nodes_webpage") {
          return Object.assign({}, state, { is_fetching_nodes_webpage_con1 : false })
        }

        if (action.errorType === "monitorboard_interfaces") {
          return Object.assign({}, state, { is_fetching_interfaces : false })
        }
        if (action.errorType === 'monitor_simulations') {
          if (action.info.type === 'stop') {
            return Object.assign({}, state, {
              all_info: state.all_info.map( (simulation, index) => {
                  if(index == action.info.id) {
                    return Object.assign({}, simulation, { is_stopping: false })
                  }
                  return simulation
                })}
              )}
        }
        if(action.errorType === 'troubleshoot_simulations') {
          if (action.info.type === 'stop') {
            return Object.assign({}, state, { info: Object.assign( {}, state.info, {is_stopping: false}) })
          }

          return Object.assign({}, state, { is_fetching_simulation: false, info: null })
        }
        if (action.errorType === 'monitor_all_simulations') {
          return Object.assign({}, state, { is_fetching_all_simulations: false, all_info:[]})
        }
        if (action.errorType === "monitorboard_nodes") {
          return Object.assign({}, state, { is_fetching_nodes:false })
        }
        if (action.errorType === "monitorboard_capture") {
          return Object.assign({}, state, { is_fetching_captures: false })
        }
        if (action.errorType === "monitor_simulations_stop_all") {
          return Object.assign({}, state, { is_stopping_all_simulations: false })
        }
        return state


      case C.REMOVE_SIMULATION:
        if (action.reducerType === 'monitorboard') {
          return Object.assign({}, state, {
          all_info: state.all_info.filter((sim, index) => index !== action.id )})
        }
        if (action.reducerType === 'troubleshoot') {
            return Object.assign({}, state, { info:null, nodes_webpage: {}, nodes_telnet: {}, nodes_webpage_con1: {}, nodes_telnet_con1: {}, interfaces:{},
            traffic_capture: {}, logs: null })
        }

        else {
          return state
        }


      case C.REQUEST_SIMULATION:
        if (action.reducerType === 'monitorboard') {
          return Object.assign({}, state, {is_fetching_simulation: true, info:null, nodes_webpage: {}, nodes_telnet: {},
                                          nodes_webpage_con1: {}, nodes_telnet_con1: {}, interfaces: {}, traffic_capture: {},})
        } else {
          return state
        }

      case C.RECEIVE_SIMULATION:
        if (action.reducerType === 'monitorboard') {
          return Object.assign({}, state, {is_fetching_simulation: false, info: action.data, })
        } else {
          return state
        }


      case C.REQUEST_ALL_SIMULATIONS:
        return Object.assign({}, state, {is_fetching_all_simulations:true})


      case C.RECEIVE_ALL_SIMULATIONS:
        const date = new Date();
        const simulations = action.data
        const modifiedSims = _.map(simulations, simulation => _.extend({}, simulation, { is_stopping:false }) )
        return Object.assign({}, state, {is_fetching_all_simulations:false, all_info: modifiedSims, all_info_last_update: date.toLocaleString()})
        // return Object.assign({}, state, {
        //     all_info: state.all_info.map( (simulation, index) => {
        //           return Object.assign({}, simulation, { is_stopping: true})
        //     }),
        //   is_fetching_all_simulations:false
        //     }
        //   )

      case C.REQUEST_SIMULATION_STOP:
        if (action.reducerType === 'monitorboard') {
          return Object.assign({}, state, {
              all_info: state.all_info.map((simulation, index) => {
                if (index === action.id) {
                  return Object.assign({}, simulation, {is_stopping: true})
                }
                return simulation
              })
            })
        }
        else if (action.reducerType === 'troubleshoot') {
          return Object.assign({}, state, { info: Object.assign( {}, state.info, {is_stopping: true}) })
        }
        else return state

      case C.REQUEST_SIMULATION_STOP_ALL:
        if (action.reducerType === "monitorboard") {
          return Object.assign({}, state, {is_stopping_all_simulations: true})
        } else {
          return state
        }


      case C.RECEIVE_SIMULATION_STOP_ALL:
        if (action.reducerType === "monitorboard") {
          return Object.assign({}, state, {is_stopping_all_simulations: false})
        } else {
          return state
        }


      case C.RESET_ALL_DATA:
        if (action.reducerType === 'monitorboard') {
          return Object.assign({}, state, { info:null, nodes_webpage: {}, nodes_telnet: {},
            nodes_webpage_con1: {}, nodes_telnet_con1: {}, interfaces:{}, traffic_capture: {},
            traffic_capture: {}, logs: null })
        }
        else {
          return state
        }

        case C.REQUEST_SIMULATION_NODES:
        if (action.reducerType === "monitorboard") {
          return Object.assign({}, state, {is_fetching_nodes: true})
        } else {
          return state
        }

      case C.RECEIVE_SIMULATION_NODES:
        if (action.reducerType === "monitorboard") {
          return Object.assign({}, state, {is_fetching_nodes: false, nodes: action.data})
        }
        else return state

      case C.REQUEST_SIMULATION_INTERFACES:
        if (action.reducerType === "monitorboard") {
          return Object.assign({}, state, {is_fetching_interfaces: true})
        }
        else return state

      case C.RECEIVE_SIMULATION_INTERFACES:
        if (action.reducerType === "monitorboard") {
          return Object.assign({}, state, {is_fetching_interfaces: false, interfaces: action.data})
        }
        else return state

      case C.REQUEST_SIMULATION_NODES_LINKS:
        if (action.reducerType === "monitorboard" && action.nodeType ==="webpage" ) {
          return Object.assign({}, state, {is_fetching_nodes_webpage: true})
        }
        else if (action.reducerType === "monitorboard" && action.nodeType ==="telnet" ) {
          return Object.assign({}, state, {is_fetching_nodes_telnet: true})
        }
        else if (action.reducerType === "monitorboard_con1" && action.nodeType ==="webpage" ) {
          return Object.assign({}, state, {is_fetching_nodes_webpage_con1: true})
        }
        else if (action.reducerType === "monitorboard_con1" && action.nodeType ==="telnet" ) {
          return Object.assign({}, state, {is_fetching_nodes_telnet_con1: true})
        }

        else return state


      case C.RECEIVE_SIMULATION_NODES_LINKS:
        if (action.reducerType === "monitorboard" && action.nodeType === "webpage") {
          return Object.assign({}, state, {is_fetching_nodes_webpage: false, nodes_webpage: action.data})
        }
        else if (action.reducerType === "monitorboard" && action.nodeType === "telnet" ) {
          return Object.assign({}, state, {is_fetching_nodes_telnet: false, nodes_telnet: action.data})
        }
        else if (action.reducerType === "monitorboard_con1" && action.nodeType === "webpage") {
          return Object.assign({}, state, {is_fetching_nodes_webpage_con1: false, nodes_webpage_con1: action.data})
        }
        else if (action.reducerType === "monitorboard_con1" && action.nodeType === "telnet" ) {
          return Object.assign({}, state, {is_fetching_nodes_telnet_con1: false, nodes_telnet_con1: action.data})
        }
        else return state

      case C.REQUEST_SIMULATION_CAPTURES:
        if (action.reducerType === "monitorboard") {
          return Object.assign({}, state, {is_fetching_captures: true})
        }
        else return state

      case C.RECEIVE_SIMULATION_CAPTURES:
        if (action.reducerType === "monitorboard") {
          const dataSorted = Object.entries(action.data).sort(compare)
          return Object.assign({}, state, {is_fetching_captures: false, traffic_capture: dataSorted})
        }
        else return state


      default:
            return state
    }
}

export default MonitorReducer
