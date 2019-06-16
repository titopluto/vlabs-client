import C from "../actions/constants"


const initialState = {

    node_commands: {},
    node_commands_pods: {},


};

const graderWhiteboardReducer = (state=initialState, action) => {
    switch (action.type) {
      case C.RECEIVE_GRADER_WHITEBOARD_DATA:
        if (action.mode === 'normal') {
          return Object.assign({}, state,
            {node_commands: Object.assign({}, state.node_commands, action.data)});
        }
        else if (action.mode === 'pods') {
          return Object.assign({}, state,
            {node_commands_pods: Object.assign({}, state.node_commands_pods, action.data)});
        }
        else
        return state

      case C.CLEAR_WHITEBOARD_DATA:
        if (action.mode === 'normal') {
          return Object.assign({}, state, {node_commands: {}});
        }
        else if (action.mode === 'pods') {
          return Object.assign({}, state, {node_commands_pods: {}});
        }
        else return state
      default:
        return state
    }
}

export default graderWhiteboardReducer
