import C from "../actions/constants"
import {WEBSOCKET_CLOSED, WEBSOCKET_OPEN} from "@giantmachines/redux-websocket/dist/index";

const initialState = {
  is_fetching_user_info:false,
  info: {},
  channels_socket:false
}

const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case C.SET_USER_ID:
      return Object.assign({}, state, {user_id: action.email})

    case C.REQUEST_USER_INFO:
      return Object.assign({}, state, {is_fetching_user_info:true})

    case C.RECEIVE_USER_INFO:
      return Object.assign({}, state, {is_fetching_user_info:false,
        lastUpdated: action.receivedAt,
        info: action.data,})

    case C.RECEIVE_USER_INFO_ERROR:
      return Object.assign({}, state, {is_fetching_user_info:false})

    case C.RECEIVE_INITIAL_DATA:
      return Object.assign({}, state, {is_fetching_user_info:false,
        lastUpdated: action.receivedAt,
        info: action.userData,})

    case WEBSOCKET_OPEN:
        return Object.assign({}, state, {channels_socket: true});

    case WEBSOCKET_CLOSED:
        return Object.assign({}, state, {channels_socket: false});


    default:
        return state
    }
}

export default userReducer
