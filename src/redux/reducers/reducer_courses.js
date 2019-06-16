import C from "../actions/constants"

export const coursesLabsReducer = (state={ is_fetching:"false", info: {}}, action) => {
  switch (action.type) {
    case C.REQUEST_COURSES_LAB_INFO:
      return Object.assign({}, state, {is_fetching:true})

    case C.RECEIVE_COURSES_LAB_INFO:
      return Object.assign({}, state, {is_fetching:false, info: action.coursesLabsData,})

    case C.RECEIVE_INITIAL_DATA:
      return Object.assign({}, state, {is_fetching:false, info: action.coursesLabsData,})

    default:
        return state
    }
}

export const coursesVlabsReducer = (state={ is_fetching:"false", info: {}}, action) => {
  switch (action.type) {
    case C.REQUEST_COURSES_VLAB_INFO:
      return Object.assign({}, state, {is_fetching:true})

    case C.RECEIVE_COURSES_VLAB_INFO:
      return Object.assign({}, state, {is_fetching:false, info: action.coursesVlabsData,})

    case C.RECEIVE_INITIAL_DATA:
      return Object.assign({}, state, {is_fetching:false, info: action.coursesVlabsData,})

    default:
        return state
    }

}

