import C from "../actions/constants"

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

  is_launching_simulation: false,
  is_stopping_simulation: false,
  is_fetching_simulation: false,

  is_fetching_nodes: false,
  is_fetching_nodes_webpage: false,
  is_fetching_nodes_telnet: false,
  is_fetching_captures: false,
  is_fetching_interfaces: false,

  info:[],
  nodes: {},
  nodes_webpage: {},
  nodes_telnet: {},
  interfaces:{},
  traffic_capture: {},
  logs: null

}

const DashboardReducer = (state=initialState, action) => {
    switch (action.type) {
      case C.RECEIVE_INITIAL_DATA:
      return Object.assign({}, state, { nodes: {}, nodes_webpage: {}, nodes_telnet: {}, interfaces:{}, traffic_capture: {}})

      case C.REQUEST_SIMULATION:
        if (action.reducerType === 'dashboard') {
          return Object.assign({}, state, {is_fetching_simulation: true})
        }
        else return state

      case C.RECEIVE_SIMULATION:
        if (action.reducerType === 'dashboard') {
          return Object.assign({}, state, {is_fetching_simulation: false, info: action.data})
        }
        else return state


      case C.REQUEST_SIMULATION_START:
        return Object.assign({}, state, {is_launching_simulation:true})

      case C.RECEIVE_SIMULATION_START:
        return Object.assign({}, state, {is_launching_simulation:false, info:[action.data]})

      case C.REQUEST_SIMULATION_STOP:
        if (action.reducerType === 'dashboard') {
          return Object.assign({}, state, {
          info: state.info.map( (simulation, index) => {
              if(index === action.id) {
                return Object.assign({}, simulation, { is_stopping: true})
              }
              return simulation })
          })
        }
        else return state

      case C.RECEIVE_SIMULATION_STOP:
        return Object.assign({}, state, {is_stopping_simulation:false})


      case C.RECEIVE_ERRORS:

        if (action.errorType === "simulation_launch") {
          return Object.assign({}, state, { is_launching_simulation:false,})
        }

        if (action.errorType === "dashboard_simulations") {
          if (action.info.type === 'stop') {
            return Object.assign({}, state, {
              info: state.info.map( (simulation, index) => {
                  if(index == action.info.id) {
                    return Object.assign({}, simulation, { is_stopping: false })
                  }
                  return simulation
                })}
              )
          }
          return Object.assign({}, state, { is_fetching_simulation:false, is_stopping_simulation: false, })}

        if (action.errorType === "dashboard_nodes") {
          return Object.assign({}, state, { is_fetching_nodes:false })
        }

        if (action.errorType === "dashboard_nodes_webpage") {
          return Object.assign({}, state, { is_fetching_nodes_webpage:false })
        }
        if (action.errorType === "dashboard_nodes_telnet") {
          return Object.assign({}, state, { is_fetching_nodes_telnet:false})
        }

        if (action.errorType === "dashboard_interfaces") {
          return Object.assign({}, state, { is_fetching_interfaces:false })
        }

        if (action.errorType === "dashboard_capture") {
          return Object.assign({}, state, { is_fetching_captures: false })
        }

        return state


      case C.REMOVE_SIMULATION:
        if (action.reducerType === 'dashboard') {
          return initialState
        } else {
          return state
        }

      case C.RESET_ALL_DATA:
        if (action.reducerType === 'dashboard') {
          return Object.assign({}, state, { info:[], nodes_webpage: {}, nodes_telnet: {}, interfaces:{}, traffic_capture: {},
            logs: null })
        } else {
          return state
        }


      case C.REQUEST_SIMULATION_NODES:
        if (action.reducerType === "dashboard") {
          return Object.assign({}, state, {is_fetching_nodes: true})
        } else {
          return state
        }

      case C.RECEIVE_SIMULATION_NODES:
        if (action.reducerType === "dashboard") {
          return Object.assign({}, state, {is_fetching_nodes: false, nodes: action.data})
        }
        else return state

      case C.REQUEST_SIMULATION_NODES_LINKS:
        if (action.reducerType === "dashboard" && action.nodeType ==="webpage" ) {
          return Object.assign({}, state, {is_fetching_nodes_webpage: true})
        }
        else if (action.reducerType === "dashboard" && action.nodeType ==="telnet" ) {
          return Object.assign({}, state, {is_fetching_nodes_telnet: true})
        }
        else return state


      case C.RECEIVE_SIMULATION_NODES_LINKS:
        if (action.reducerType === "dashboard" && action.nodeType === "webpage") {
          return Object.assign({}, state, {is_fetching_nodes_webpage: false, nodes_webpage: action.data})
        }
        else if (action.reducerType === "dashboard" && action.nodeType === "telnet" ) {
          return Object.assign({}, state, {is_fetching_nodes_telnet: false, nodes_telnet: action.data})
        }
        else return state

      case C.REQUEST_SIMULATION_INTERFACES:
        if (action.reducerType === "dashboard") {
          return Object.assign({}, state, {is_fetching_interfaces: true})
        }
        else return state

      case C.RECEIVE_SIMULATION_INTERFACES:
        if (action.reducerType === "dashboard") {
          return Object.assign({}, state, {is_fetching_interfaces: false, interfaces: action.data})
        }
        else return state

      case C.REQUEST_SIMULATION_CAPTURES:
        if (action.reducerType === "dashboard") {
          console.log("mmoodddee", action.reducerType )
          return Object.assign({}, state, {is_fetching_captures: true})
        }
        else return state

      case C.RECEIVE_SIMULATION_CAPTURES:
        if (action.reducerType === "dashboard") {
          // const dataArr = Object.keys(action.data).map(i => action.data[i])
          const dataSorted = Object.entries(action.data).sort(compare)
          return Object.assign({}, state, {is_fetching_captures: false, traffic_capture: dataSorted})
        }
        else return state

      case C.RECEIVE_SIMULATION_LOGS:
        return Object.assign({}, state, {logs:action.data})

      default:
            return state
    }
}

export default DashboardReducer
