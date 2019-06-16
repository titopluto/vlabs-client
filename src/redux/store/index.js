import {applyMiddleware, compose, createStore} from "redux"
import reduxThunk from "redux-thunk"
import {autoRehydrate} from 'redux-persist'
import websocket from '../actions/redux-websocket/src'


import appReducer from "../reducers"


// const storeFactory = (initialState={}) => {
// 	return compose(applyMiddleware(reduxThunk), autoRehydrate(),
//                 window.devToolsExtension ? window.devToolsExtension() : f => f)
//                   (createStore)(appReducer, initialState)
// }

const middlewares = [ reduxThunk, websocket ]

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  autoRehydrate(),
  // window.devToolsExtension ? window.devToolsExtension() : f => f
);




// const store = compose(...enhancers)(createStore)(appReducer)
const store = createStore(appReducer, enhancer )



// persistStore(store)

export default store
