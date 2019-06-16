const initialState = {
  modalType: null,
  modalProps: {isOpen:false}
}

const modalReducer = (state = initialState, action)  => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        modalType: action.modalType,
        modalProps: Object.assign({}, state.modalProps, {isOpen:true}, {...action.modalProps})
      }
    case 'HIDE_MODAL':
      return initialState
    default:
      return state
  }
}

export default modalReducer