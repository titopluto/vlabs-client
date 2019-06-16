import C from "../actions/constants"
import {WEBSOCKET_CLOSED, WEBSOCKET_MESSAGE, WEBSOCKET_OPEN} from '@giantmachines/redux-websocket'


const initialState = {
    is_fetching: false,
    socket_connection: false,
    contents: [],


};

const reportsReducer = (state=initialState, action) => {
    switch (action.type) {

      case C.RESET_REPORT_CONTENTS:
        return Object.assign({}, state, {contents: []});

      // case WEBSOCKET_OPEN:
      //     // console.log("socket-REPORTS-OPEN", action.payload)
      //   return Object.assign({}, state, {socket_connection: true});

      // case WEBSOCKET_CLOSED:
      //   if (action.source === "reportsBrowser") {
      //     console.log("socket-REPORTS-CLOSED", action.payload)
      //     return Object.assign({}, state, {socket_connection: false});
      //   }
      //   return state

      case WEBSOCKET_MESSAGE:
        const json_data = JSON.parse(action.payload.data);
        if (json_data['destination'] === "reportsBrowser") {
          const directories = json_data['directories'];
          const files = json_data['files'];
          const contents = directories.concat(files)
          return Object.assign({}, state, {contents});
        }
        return state;

      default:
        return state;
    }
}

export default reportsReducer
