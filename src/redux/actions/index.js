import axios from "axios"
import C from "./constants"
import config  from  "./config"
// import baseUrl  from  "./config"
// import wsUrl  from  "./config"
// import channelsUrl  from  "./config"




import fileDownload from "js-file-download"
import FormData from 'form-data'

import {WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_SEND} from '@giantmachines/redux-websocket'


// var download = require("downloadjs")
// var fileDownload = require('js-file-download');


// const API_URL = "http://localhost:8000/api"
// axios.defaults.timeout = 22000
// axios.defaults.baseURL = 'http://localhost:8000/api';

// const credentials = { 'username': 'guest', 'password': 'gCableNetw0rk5'};

let server = axios.create({
  // baseURL: 'http://localhost:8000/api'
  baseURL: config.baseUrl     //docker prod mode
});

server.defaults.timeout = 25000;

let virl = axios.create({
});
virl.defaults.timeout = 25000;

// export const wsUrl = 'ws://localhost:8090/ws';
// export const channelsUrl = 'http://localhost:8090';

// export const wsUrl = 'ws://10.0.146.53:8090/ws';  //docker prod mode
// export const channelsUrl = 'http://10.0.146.53:8090'; //docker prod mode


export const setUserID = id => ( { type: C.SET_USER_ID, id } );

export const authError = error => ({ type: C.AUTH_ERROR, payload: error });

export const requestUserInfo = () => ({ type: C.REQUEST_USER_INFO });

export const receiveUserInfo = data => ({ type: C.RECEIVE_USER_INFO, data, receivedAt: Date.now() });

export const requestCoursesInfo = () =>  ({ type: C.REQUEST_COURSES_INFO });

export const receiveCoursesInfo = courses => ({ type: C.RECEIVE_COURSES_INFO, courses });

export const receiveInitialData = (userData, coursesLabsData, coursesVlabsData, simulations) => {
  return ({
    type: C.RECEIVE_INITIAL_DATA,
    userData,
    coursesLabsData,
    coursesVlabsData,
    simulations,
  })
};

export const requestAllSimulations = () => ({ type: C.REQUEST_ALL_SIMULATIONS });

export const receiveAllSimulations = data => ({ type: C.RECEIVE_ALL_SIMULATIONS, data });

export const requestSimulations = (reducerType) => ({ type: C.REQUEST_SIMULATION, reducerType });

export const receiveSimulations = (reducerType,data) => ({ type: C.RECEIVE_SIMULATION, data, reducerType });

export const requestSimulationsMonitor = () => ({ type: C.REQUEST_SIMULATION_MONITOR });

export const receiveSimulationsMonitor = data => ({ type: C.RECEIVE_SIMULATION_MONITOR, data });

export const requestSimulationStart = () => ({ type: C.REQUEST_SIMULATION_START });

export const receiveSimulationStart = data => ({ type: C.RECEIVE_SIMULATION_START, data });

export const requestSimulationStop = (id, reducerType='dashboard') => ({ type: C.REQUEST_SIMULATION_STOP, id, reducerType });

export const receiveSimulationStop = () => ({ type: C.RECEIVE_SIMULATION_STOP });

export const requestSimulationStopAll = (reducerType='monitorboard') => ({ type: C.REQUEST_SIMULATION_STOP_ALL, reducerType });

export const receiveSimulationStopAll = (reducerType='monitorboard') => ({ type: C.RECEIVE_SIMULATION_STOP_ALL , reducerType});

export const requestSimulationNodes = (reducerType) => ({ type: C.REQUEST_SIMULATION_NODES, reducerType });

export const receiveSimulationNodes = (reducerType, data) => ({ type: C.RECEIVE_SIMULATION_NODES, reducerType, data });

export const requestSimulationNodesLinks = (reducerType, nodeType) => ({ type: C.REQUEST_SIMULATION_NODES_LINKS, reducerType, nodeType });

export const receiveSimulationNodesLinks = (reducerType, nodeType, data) => ({ type: C.RECEIVE_SIMULATION_NODES_LINKS, reducerType, nodeType,  data });

export const removeSimulation = (id, reducerType='dashboard') => ({ type:C.REMOVE_SIMULATION, id, reducerType });

// export const requestSimulationLogs = () => ({ type: C.REQUEST_SIMULATION })

export const receiveSimulationLogs = (data) => ({ type:C.RECEIVE_SIMULATION_LOGS, data });

export const requestSimulationInterfaces = (reducerType) => ({ type:C.REQUEST_SIMULATION_INTERFACES, reducerType });

export const receiveSimulationInterfaces = (reducerType, data) => ({ type:C.RECEIVE_SIMULATION_INTERFACES, reducerType, data });

export const requestSimulationCaptures = (reducerType) => ({ type:C.REQUEST_SIMULATION_CAPTURES, reducerType });

export const receiveSimulationCaptures = (reducerType, data) => ({ type:C.RECEIVE_SIMULATION_CAPTURES, reducerType, data });

export const receiveErrors = (errorType, errorMsg, info={}) => ({ type:C.RECEIVE_ERRORS, errorType, errorMsg, info });

export const resetAllData = (reducerType='dashboard') => ({ type: C.RESET_ALL_DATA, reducerType});

export const clearErrors = (errorType, id) => ({type:C.CLEAR_ERRORS, errorType, id});

export const receiveSocketMsg = (reducerType,data) => ({ type: C.RECEIVE_SOCKET_MSG, data, reducerType });


export const requestCohorts = (reducerType) => ({ type: C.REQUEST_COHORTS, reducerType });

export const receiveCohorts = (reducerType,data) => ({ type: C.RECEIVE_COHORTS, data, reducerType });


export const requestCoursesGroup = (reducerType) => ({ type: C.REQUEST_COURSES_GROUP, reducerType });

export const receiveCoursesGroup = (reducerType,data) => ({ type: C.RECEIVE_COURSES_GROUP, data, reducerType });

export const showModal = (type, modalType, modalProps) => ({ type, modalType, modalProps});






export const verifyTokenExists = () => localStorage.getItem("token") != null;


export const loginUser = ({ email, password }, history) => {
  return (dispatch, getState) => {
    server.post(`/api-token-auth/`, { username:email, password })
      .then(response => {
      //update state to  indicate the user is authenticated
      dispatch({ type: C.AUTH_USER});
      // store token in local storage
      localStorage.setItem("token", response.data.token);

      // dispatch({ type: C.SET_USER_ID, email})
      //redirect user to course page
      history.push("/courses")
  })
    .catch(error => {

          if (error.response) {
            // console.log(error.response.data['non_field_errors'][0])
              dispatch(authError(error.response.data['non_field_errors'][0]))
            }
          else if (error.request) {
            dispatch(authError("The Server may be busy or experiencing a downtime"))
          }
          else {
            dispatch(authError("Your login request could not be completed"))
          }
        })
  }
};


export const logoutUser = (history) => {
  return dispatch => {
    if (verifyTokenExists()) {
      localStorage.removeItem("token");
    }
    dispatch(socketDisconnect());
    dispatch({type:C.LOGOUT_USER});
    history.push("/login")
    }
};


export const verifyToken = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.post(`/api-token-verify/`, {token:token})
        .then( response => {
          dispatch({ type: C.AUTH_USER})
        })

        .catch(error => {
          // console.log("token expired!!")
          dispatch({ type: C.UNAUTH_USER})
        })

      }
    else {
      dispatch({ type: C.UNAUTH_USER})
        }
    }
};

//Get All User Information
// export const getUserInfo = () => {
//   return dispatch => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       console.log("NO TOKEN FOUND") // return early
//     }
//
//     if (token) {
//       server.post(`/api-token-verify/`, {token:token})
//         .then( response => {
//           dispatch({ type: C.AUTH_USER})
//
//         })
//         .catch(error => {
//           dispatch({ type: C.UNAUTH_USER})
//         })
//     }
//     else {
//       // console.log("no token found, so unauthing user")
//       dispatch({ type: C.UNAUTH_USER})
//     }
//   }
// }


export const fetchUserData = () => {
  return (dispatch, getState)  => {
    const token = localStorage.getItem("token");
    dispatch(requestUserInfo());
    console.log("BASEEEE", config.baseUrl)

    if (token) {
      server.get(`/user/`, {headers: { Authorization: `JWT ${token}` }})
        .then(response => {
          const {username, first_name, last_name, email,
          groups, courses_labs, courses_vlabs, is_staff} = response.data;

          dispatch(receiveInitialData({username, first_name, last_name, email, groups, is_staff},
            courses_labs, courses_vlabs))

        })
        .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
            }
            else {
              dispatch({type: C.RECEIVE_USER_INFO_ERROR});
              dispatch(showModal("SHOW_MODAL", "ERROR_MODAL", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch({type: C.RECEIVE_USER_INFO_ERROR});
            dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
              {error: "Request Timeout", detail: "The Server may be busy or experiencing a downtime"}))
          }
          else {
            // Something happened in setting up the request that triggered an Error
            dispatch({type: C.RECEIVE_USER_INFO_ERROR});
            dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
              {error: "Unknown Error", detail: "Your request could not be completed"}))
          }
        })
    }
  }
};


export const launchSimulation = (lab, history, file=null) => {

  if (file) {
      const uFile = file.accepted[0];
      let data = new FormData();
      data.append('file', uFile, uFile.name);
      data.append('lab','self_service');

      return (dispatch, getState)  => {
      const token = localStorage.getItem("token");
      dispatch(requestSimulationStart());
        server.post(`/simulations/create`,data,
      {headers: {Authorization: `JWT ${token}`,
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`} })
        .then(response => {
            dispatch(receiveSimulationStart(response.data));
            dispatch(showModal("SHOW_MODAL", "SUCCESS_MODAL",
              {success:`Topology was succesfully started`,
              detail: `Simulation Nodes may take several minutes to initialize, so please be patient. \n
                        ...You will now be redirected to the Dashboard.`}));
            history.push("/")
        })
        .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          dispatch(receiveErrors('simulation_launch', '' ));
          if (error.response.status === 401) {
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
          }
          else {
            dispatch(showModal("SHOW_MODAL", "ERROR_MODAL", error.response.data))
          }
        }
        else if (error.request) {
          // The request was made but no response was received
          dispatch(receiveErrors('simulation_launch', '' ));
          dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
            {error:"Request Timeout", detail:"The Server may be busy or experiencing a downtime"}))
        }
        else {
          // Something happened in setting up the request that triggered an Error
          console.log(error);
          dispatch(receiveErrors('simulation_launch', '' ));
          dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
            {error:"Unknown Error", detail:"Your request could not be completed"}))
        }
      })
  }
  }
//////////////////////////////////////////////////////////////////
  else  {
    return (dispatch, getState) => {
      const token = localStorage.getItem("token");
      dispatch(requestSimulationStart());
      server.post(`/simulations/create`, {lab: lab.code}, {headers: {Authorization: `JWT ${token}`}})
        .then(response => {
          dispatch(receiveSimulationStart(response.data));

          dispatch(showModal("SHOW_MODAL", "SUCCESS_MODAL",
            {
              success: `${lab.code} was succesfully started`,
              detail: `Simulation Nodes may take several minutes to initialize, so please be patient. \n
                        ...You will now be redirected to the Dashboard.`
            }));
          history.push("/")
        })
        .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            dispatch(receiveErrors('simulation_launch', ''));
            if (error.response.status === 401) {
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {
                  info: "Session Timeout",
                  detail: "Your session expired! Please login again",
                  buttonAction: C.LOGOUT_USER
                }))
            }
            else {
              dispatch(showModal("SHOW_MODAL", "ERROR_MODAL", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors('simulation_launch', ''));
            dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
              {error: "Request Timeout", detail: "The Server may be busy or experiencing a downtime"}))
          }
          else {
            // Something happened in setting up the request that triggered an Error
            console.log(error);
            dispatch(receiveErrors('simulation_launch', ''));
            dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
              {error: "Unknown Error", detail: "Your request could not be completed"}))
          }
        })
    }
  }
};



export const CloseSimulation = (simulation, id) => {

  return (dispatch, getState)  => {
    const token = localStorage.getItem("token");
    dispatch(requestSimulationStop(id, 'dashboard'));
    server.delete(`/simulations/${simulation.name}`,{headers: { Authorization: `JWT ${token}` }})
        .then(response => {
            dispatch(removeSimulation(id, 'dashboard'));
            dispatch(showModal("SHOW_MODAL", "SUCCESS_MODAL",
              {success:`${simulation.name} was succesfully Stopped`,
              detail: ``}))
        })
        .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          if (error.response.status === 401) {
              dispatch(removeSimulation(id, 'dashboard'));
              dispatch({type: C.RECEIVE_ERRORS});
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {
                info: "Session Timeout",
                detail: "Your session expired! Please login again",
                buttonAction:C.LOGOUT_USER
              }
              ))
          }

          else if (error.response.status === 404) {
            dispatch(removeSimulation(id, 'dashboard'));
            dispatch(receiveErrors("dashboard_simulations", error.response.data, {type:'stop', id:id}))
          }
          else {
            dispatch(receiveErrors("dashboard_simulations", error.response.data, {type:'stop', id:id}))
          }
        }
        else if (error.request) {
          // The request was made but no response was received
          dispatch(receiveErrors("dashboard_simulations", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}, {type:'stop', id:id}))
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(receiveErrors("dashboard_simulations", {error:"Unclassified Error", detail:"Your request could not be completed."}, {type:'stop', id:id}))
        }
      })
  }
};

export const CloseSimulationTroubleshootMode = (simulation, id) => {

  return (dispatch, getState)  => {
    const token = localStorage.getItem("token");
    dispatch(requestSimulationStop(id, 'troubleshoot'));
    server.delete(`/simulations/${simulation.name}`,{headers: { Authorization: `JWT ${token}` }})
        .then(response => {
            dispatch(removeSimulation(id, 'troubleshoot'));
            dispatch(showModal("SHOW_MODAL", "SUCCESS_MODAL",
              {success:`${simulation.name} was succesfully Stopped`,
              detail: ``}))
        })
        .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          if (error.response.status === 401) {
              dispatch(removeSimulation(id, 'troubleshoot'));
              dispatch({type: C.RECEIVE_ERRORS});
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {
                info: "Session Timeout",
                detail: "Your session expired! Please login again",
                buttonAction:C.LOGOUT_USER
              }
              ))
          }

          else if (error.response.status === 404) {
            dispatch(removeSimulation(id, 'troubleshoot'));
            dispatch(receiveErrors("troubleshoot_simulations", error.response.data, {type:'stop', id:id}))
          }
          else {
            dispatch(receiveErrors("troubleshoot_simulations", error.response.data, {type:'stop', id:id}))
          }
        }
        else if (error.request) {
          // The request was made but no response was received
          dispatch(receiveErrors("troubleshoot_simulations", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}, {type:'stop', id:id}))
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(receiveErrors("troubleshoot_simulations", {error:"Unclassified Error", detail:"Your request could not be completed."}, {type:'stop', id:id}))
        }
      })
  }
};




export const closeSimulationMonitorMode = (simulation, id) => {

  return (dispatch, getState)  => {
    const token = localStorage.getItem("token");
    dispatch(requestSimulationStop(id, 'monitorboard'));
    server.delete(`/simulations/${simulation.name}`,{headers: { Authorization: `JWT ${token}` }})
        .then(response => {
          // dispatch(receiveSimulationStop())
          dispatch(removeSimulation(id, 'monitorboard'));
            dispatch(fetchAllSimulations())
        })
        .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          if (error.response.status === 401) {
              dispatch(removeSimulation(id, 'monitorboard'));
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
          }

          else if (error.response.status === 404) {
            dispatch(removeSimulation(id, 'monitorboard'));
            dispatch(fetchAllSimulations());
            dispatch(receiveErrors("monitor_simulations", error.response.data), {type:'stop', id:id})
          }
          else {
            dispatch(receiveErrors("monitor_simulations", error.response.data, {type:'stop', id:id}))
          }
        }
        else if (error.request) {
          // The request was made but no response was received
          dispatch(receiveErrors("monitor_simulations", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}, {type:'stop', id:id}))
        } else {
          // Something happened in setting up the request that triggered an Error
          dispatch(receiveErrors("monitor_simulations", {error:"Unclassified Error", detail:"Your request could not be completed."}, {type:'stop', id:id} ))
        }
      })
  }
};

export const stopAllSimulations = () => {

  const token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(requestSimulationStopAll());
    server.get(`/simulations/stop-all`, {headers: { Authorization: `JWT ${token}`}})
      .then(response => {
        const allSimulations = response.data;
        dispatch(receiveSimulationStopAll());
        dispatch(fetchAllSimulations())
      })
      .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
                dispatch({type: C.RECEIVE_ERRORS});
                dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
            }

            else {
              dispatch(receiveErrors("monitor_simulations_stop_all", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors("monitor_simulations_stop_all", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(receiveErrors("monitor_simulations_stop_all", {error:"Unclassified Error", detail:"Your request could not be completed."}))
          }
        })
  }
};


export const fetchSimulations = () => {

  const token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(requestSimulations('dashboard'));
    server.get(`/simulations/`, {headers: { Authorization: `JWT ${token}`}})
      .then(response => {
        const simulations = response.data;
        dispatch(receiveSimulations('dashboard', simulations));
        if (simulations.length === 0) {
          dispatch(resetAllData('dashboard'))
        }
      })
      .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
                // dispatch(receiveErrors("dashboard_simulations", ''))
                dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
            }
            else {
              dispatch(receiveErrors("dashboard_simulations", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors("dashboard_simulations", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(receiveErrors("dashboard_simulations", {error:"Unclassified Error", detail:"Your request could not be completed."}))
          }
        })
  }
};


export const fetchAllSimulations = () => {

  const token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(requestAllSimulations());
    server.get(`/simulations/all`, {headers: { Authorization: `JWT ${token}`}})
      .then(response => {
        const allSimulations = response.data;
        dispatch(receiveAllSimulations(allSimulations))
      })
      .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
                dispatch({type: C.RECEIVE_ERRORS});
                dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
            }

            else {
              dispatch(receiveErrors("monitor_all_simulations", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors("monitor_all_simulations", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(receiveErrors("monitor_all_simulations", {error:"Unclassified Error", detail:"Your request could not be completed."}))
          }
        })
  }
};


export const fetchSimulationByID = (id) => {

  const token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(requestSimulations('monitorboard'));
    server.get(`/simulations/id/${id}`, {headers: { Authorization: `JWT ${token}`}})
      .then(response => {
        const simulation = response.data;
        dispatch(receiveSimulations('monitorboard', simulation))
      })
      .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
                dispatch({type: C.RECEIVE_ERRORS});
                dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
            }

            else {
              dispatch(receiveErrors("monitor_simulations", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors("monitor_simulations", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(receiveErrors("monitor_simulations", {error:"Unclassified Error", detail:"Your request could not be completed."}))
          }
        })
  }
};




export const getNodesLinks = (reducerType, sim, id, mode) => {

  const token = localStorage.getItem("token");
  return (dispatch, getState) => {

    dispatch(requestSimulationNodesLinks(reducerType, mode));

    if (reducerType === 'dashboard' || reducerType === 'monitorboard_con1') {
      server.get(`/simulations/${sim.name}/nodes_links?mode=${mode}`, {headers: {Authorization: `JWT ${token}`}})

        .then(response => {
            dispatch(receiveSimulationNodesLinks(reducerType, mode, response.data))
        })

        .catch(error => {

          if (error.response) {
            if (error.response.status === 401) {
              dispatch({type: C.RECEIVE_ERRORS});
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {
                  info: "Session Timeout",
                  detail: "Your session expired! Please login again",
                  buttonAction: C.LOGOUT_USER
                }))
            }
            else if (error.response.status === 404) {
              dispatch(resetAllData(reducerType));
              dispatch(receiveErrors(reducerType+"_nodes_"+mode, error.response.data))
            }

            else {
              dispatch(receiveErrors(reducerType+"_nodes_"+mode, error.response.data,))
            }
          }

          else if (error.request) {
            // The request was made but no response was received
              dispatch(receiveErrors(reducerType+"_nodes_"+mode, {
                error: "Request Timeout!",
                detail: "The Server may be busy or experiencing a downtime."
              }))

          }
          else {
            // Something happened in setting up the request that triggered an Error
              dispatch(receiveErrors(reducerType+"_nodes_"+mode, {
                error: "Unclassified Error",
                detail: "Your request could not be completed."
              }))

          }
        })
    }

    else if (reducerType === 'monitorboard') {

      server.get(`/simulations/${sim.name}/nodes_links?mode=${mode}&port=1`, {headers: {Authorization: `JWT ${token}`}})

        .then(response => {
            dispatch(receiveSimulationNodesLinks(reducerType, mode, response.data))
        })

        .catch(error => {

          if (error.response) {
            if (error.response.status === 401) {
              dispatch({type: C.RECEIVE_ERRORS});
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {
                  info: "Session Timeout",
                  detail: "Your session expired! Please login again",
                  buttonAction: C.LOGOUT_USER
                }))
            }
            else if (error.response.status === 404) {
              dispatch(resetAllData(reducerType));
              dispatch(receiveErrors(reducerType+"_nodes_"+mode, error.response.data))
            }

            else {
              dispatch(receiveErrors(reducerType+"_nodes_"+mode, error.response.data,))
            }
          }

          else if (error.request) {
            // The request was made but no response was received
              dispatch(receiveErrors(reducerType+"_nodes_"+mode, {
                error: "Request Timeout!",
                detail: "The Server may be busy or experiencing a downtime."
              }))

          }
          else {
            // Something happened in setting up the request that triggered an Error
              dispatch(receiveErrors(reducerType+"_nodes_"+mode, {
                error: "Unclassified Error",
                detail: "Your request could not be completed."
              }))

          }
        })}

  }
};




export const getNodes = (reducerType, sim) => {

  const token = localStorage.getItem("token");
  // console.log("credential:==>  ", credentials);
    return (dispatch, getState) => {

      dispatch(requestSimulationNodes(reducerType));
      server.get(`/simulations/${sim.name}/nodes/`, {headers: {Authorization: `JWT ${token}`}})
      // virl.get(`http://${sim.virl_host}:19399/simengine/rest/nodes/${sim.name}`,
      //             {auth: credentials})

        .then(response => {
          // const data = response.data[sim.name]
          // if ("~mgmt-lxc" in data) {
          //   delete data["~mgmt-lxc"]
          // }
          dispatch(receiveSimulationNodes(reducerType, response.data))
        })

        .catch(error => {

          if (error.response) {

            if (error.response.status === 401) {
              dispatch({type: C.RECEIVE_ERRORS});
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {
                  info: "Session Timeout",
                  detail: "Your session expired! Please login again",
                  buttonAction: C.LOGOUT_USER
                }))
            }
            else if (error.response.status === 404) {
              console.log('404 here' ,error.response.data);
              dispatch(resetAllData(reducerType));
                dispatch(receiveErrors(reducerType+"_nodes", error.response.data))

            }
            else {
                dispatch(receiveErrors(reducerType+"_nodes", error.response.data))

            }
          }

          else if (error.request) {
            // The request was made but no response was received
              dispatch(receiveErrors(reducerType+"_nodes", {
                error: "Request Timeout!",
                detail: "The Server may be busy or experiencing a downtime."}))
          }
          else {
            // Something happened in setting up the request that triggered an Error
              dispatch(receiveErrors(reducerType+"_nodes", {
              error: "Unclassified Error",
              detail: "Your request could not be completed."}))

          }
        })
    }
};



export const nodeOperation = (sim, operation, node, reducerType) => {

  const token = localStorage.getItem("token");
    return (dispatch, getState) => {
    console.log("modeNode", reducerType);

      // dispatch(requestSimulationNodes('dashboard'))
        server.get(`/simulations/${sim.name}/nodes/${operation}/${node}`, {headers: {Authorization: `JWT ${token}`}})

          .then(response => {
            // dispatch(receiveSimulationNodes('dashboard', response.data))
            const msg = {
              error: `Request to ${operation} ${node} node was successful!`,
              detail: `The switch button will turn the opposite direction in a few seconds to confirm the operation `
            };
            dispatch(receiveErrors(reducerType+"_nodes_operation", msg, {info: 'info'}))
          })

          .catch(error => {

            if (error.response) {
              if (error.response.status === 401) {
                dispatch({type: C.RECEIVE_ERRORS});
                dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                  {
                    info: "Session Timeout",
                    detail: "Your session expired! Please login again",
                    buttonAction: C.LOGOUT_USER
                  }))
              }
              else if (error.response.status === 404) {
                console.log('404 here', error.response.data);
                dispatch(resetAllData(reducerType));
                dispatch(receiveErrors(reducerType+"_nodes_operation", error.response.data))

              }
              else {
                dispatch(receiveErrors(reducerType+"_nodes_operation", error.response.data))

              }
            }

            else if (error.request) {
              // The request was made but no response was received
              dispatch(receiveErrors(reducerType+"_nodes_operation", {
                error: "Request Timeout!",
                detail: "The Server may be busy or experiencing a downtime."
              }))
            }
            else {
              // Something happened in setting up the request that triggered an Error
              dispatch(receiveErrors(reducerType+"_nodes_operation", {
                error: "Unclassified Error",
                detail: "Your request could not be completed."
              }))

            }
          })
    }

};




export const fetchSimulationLogs = simName => {

  return (dispatch, getState) => {
    const token = localStorage.getItem("token");
    server.get(`/simulations/${simName.name}/logs`,{headers: { Authorization: `JWT ${token}` }})

      .then(response => {
        const {events} = response.data;
        dispatch(receiveSimulationLogs(events))
      })

      .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          if (error.response.status === 401) {
              dispatch({type: C.UNAUTH_USER})
          } else {

          }
        }
        else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);

        }
      })
  }
};

export const fetchSimulationLogs2 = sim => {

  return (dispatch, getState) => {
    virl.get(`http://${sim.virl_host}:19399/simengine/rest/events/${sim.name}`,
      { auth: config.credentials})

      .then(response => {
        const {events} = response.data;
        console.log("events", events);
        dispatch(receiveSimulationLogs(events))
      })

      .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          if (error.response.status === 401) {
          }
        }
        else if (error.request) {
          // The request was made but no response was received
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
  }
};


export const getInterfaces = (reducerType, sim) => {


    return (dispatch, getState) =>  {
      const token = localStorage.getItem("token");
      dispatch(requestSimulationInterfaces(reducerType));

      server.get(`/simulations/${sim.name}/interfaces`, {headers: {Authorization: `JWT ${token}`}})

        .then(response => {
          dispatch(receiveSimulationInterfaces(reducerType, response.data))
        })

        .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {
                  info: "Session Timeout",
                  detail: "Your session expired! Please login again",
                  buttonAction: C.LOGOUT_USER
                }))
            }
            else if (error.response.status === 404) {
              dispatch(resetAllData(reducerType));
              dispatch(receiveErrors(reducerType+"_interfaces", error.response.data))

            }
            else {
              dispatch(receiveErrors(reducerType+"_interfaces", error.response.data))

            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors(reducerType+"_interfaces", {
              error: "Request Timeout!",
              detail: "The Server may be busy or experiencing a downtime."
            }))
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(receiveErrors(reducerType+"_interfaces", {
              error: "Unclassified Error",
              detail: "Your request could not be completed."
            }))
          }
        })
    }

};



export const fetchTrafficCaptures = (reducerType, simName) => {

  return (dispatch, getState) => {
        console.log("at inde capture", reducerType, simName);

    const token = localStorage.getItem("token");
    dispatch(requestSimulationCaptures(reducerType));
    server.get(`/simulations/${simName}/captures`,{headers: { Authorization: `JWT ${token}` }})

      .then(response => {

        dispatch(receiveSimulationCaptures(reducerType, response.data))
      })

      .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          if (error.response.status === 401) {
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
          }
          else if (error.response.status === 404) {
            // dispatch(resetAllData(mode))
            dispatch(receiveErrors(reducerType+"_capture", error.response.data))

          }
          else {
            dispatch(receiveErrors(reducerType+"_capture", error.response.data))
          }
        }

        else if (error.request) {
          // The request was made but no response was received
          dispatch(receiveErrors(reducerType+"_capture", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))
        }
        else {
          // Something happened in setting up the request that triggered an Error
          console.log("err", error.data);
          dispatch(receiveErrors(reducerType+"_capture", {error:"Unclassified Error", detail:"Your request could not be completed."}))

        }
      })
  }
};


export const TrafficCaptureDownload = (reducerType, sim, captureID, download_name) => {

  return (dispatch, getState) => {
    const token = localStorage.getItem("token");
    server.get(`/simulations/${sim.name}/captures/${captureID}`,
      {
        headers: {
          "Content-Type":"application/vnd.tcpdump.pcap",
          Authorization: `JWT ${token}` },
          responseType: 'blob'
      })

      .then(response => {
        fileDownload(response.data, `${download_name}.pcap`, "application/vnd.tcpdump.pcap" )
      })

      .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          if (error.response.status === 401) {
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
          }
          else if (error.response.status === 404) {
            // dispatch(resetAllData('dashboard'))
            console.log("tafcap", error.response.data);
            dispatch(receiveErrors(reducerType+"_capture", {error:"Capture Not Found", detail:"Capture does not exist on server, sanitization was performed"}));
            dispatch(fetchTrafficCaptures(reducerType, sim.name))

          }
          else {
            console.log(error.response);
            dispatch(receiveErrors(reducerType+"_capture", {error:"Capture Retrieve Error", detail:"Please delete this capture and try again"}))
          }
        }

        else if (error.request) {
          // The request was made but no response was received
          dispatch(receiveErrors(reducerType+"_capture", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))

        }
        else {
          // Something happened in setting up the request that triggered an Error
          dispatch(receiveErrors(reducerType+"_capture", {error:"Unclassified Error", detail:"Your request could not be completed."}))
        }
      })
  }
};



export const TrafficCaptureCreate = (reducerType, simName, node, int, pcapFilter) => {

  return (dispatch, getState) => {
        console.log("at inde create", reducerType, simName);

    const token = localStorage.getItem("token");
    server.post(`/simulations/${simName}/captures`,{ node:node, interface:int, 'pcap-filter':pcapFilter }, {headers: {Authorization: `JWT ${token}`} })

      .then(response => {
          dispatch({type:C.HIDE_MODAL});
          dispatch(showModal("SHOW_MODAL", "SUCCESS_MODAL",
              {success:`Traffic Capture Started`,
              detail: `Your Traffic Capture on ${node} was started successfully. `}));
        dispatch(fetchTrafficCaptures(reducerType, simName))
      })

      .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          if (error.response.status === 401) {
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
          }
          else if (error.response.status === 404) {
            // dispatch(resetAllData('dashboard'))
            // dispatch(receiveErrors("traffic_capture", error.response.data))
            dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
            {error:"Traffic Capture Error", detail:"The simulation was not found on server"}))

          }
          else {
            dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
              {error:"Invalid PCAP Filter OR interface is not up", detail:" Refresh your traffic captures and delete it"}))
          }
        }

        else if (error.request) {
          // The request was made but no response was received
          dispatch({type:C.HIDE_MODAL});
          dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
            {error:"Traffic Capture Error", detail:"Error starting Traffic Capture "}))

        }
        else {
          // Something happened in setting up the request that triggered an Error
          dispatch({type:C.HIDE_MODAL});
          dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
            {error:"Traffic Capture Error", detail:"Error starting Traffic Capture"}))
        }
      })
  }
};


export const TrafficCaptureDelete = (reducerType, sim, captureID) => {

  return (dispatch, getState) => {
    const token = localStorage.getItem("token");
    server.delete(`/simulations/${sim.name}/captures/${captureID}`, {headers: {Authorization: `JWT ${token}`} })

      .then(response => {
        dispatch(fetchTrafficCaptures(reducerType, sim.name))
      })

      .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          if (error.response.status === 401) {
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
          }
          else if (error.response.status === 404) {
            // dispatch(resetAllData('dashboard'))
            dispatch(fetchTrafficCaptures(reducerType, sim.name))
            // dispatch(receiveErrors(mode+"_capture", error.response.data))

          }
          else {
            dispatch(showModal("SHOW_MODAL", "ERROR_MODAL", error.response.data))
          }
        }

        else if (error.request) {
          // The request was made but no response was received
          dispatch({type:C.HIDE_MODAL});
          dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
            {error:"Traffic Capture Error", detail:"Error deleting Traffic Capture "}))

        }
        else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          dispatch({type:C.HIDE_MODAL});
          dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
            {error:"Traffic Capture Error", detail:"Error deleting Traffic Capture"}))
        }
      })
  }
};


export const simulationLive = sim => {

  const url = `http://guest:Meilab123@${sim.virl_host}:19402/?sim_id=${sim.name}`;
  return (dispatch, getState) => {
    window.open(url, 'blank')
  }
};


export const  virlFileUpload = file => {

  const uFile = file.accepted[0];
  let data = new FormData();
  data.append('file', uFile, uFile.name);
  data.append('lab','self_service');

  console.log(data);

    return (dispatch, getState) => {
    const token = localStorage.getItem("token");
    server.post(`/selfservice/validate`,data,
      {headers: {Authorization: `JWT ${token}`,
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`} })

      .then(response => {
            dispatch(receiveSimulationStart(response.data));
            dispatch(showModal("SHOW_MODAL", "SUCCESS_MODAL",
              {success: `Launch was succesfully started`,
              detail: `Simulation Nodes may take several minutes to initialize, so please be patient. \n
                        ...You will now be redirected to the Dashboard.`}))
            // history.push("/")
        })
        .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          dispatch(receiveErrors('simulation_launch', '' ));
          if (error.response.status === 401) {
              dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
              {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
          }
          else {
            dispatch(showModal("SHOW_MODAL", "ERROR_MODAL", error.response.data))
          }
        }
        else if (error.request) {
          // The request was made but no response was received
          dispatch(receiveErrors('simulation_launch', '' ));
          dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
            {error:"Request Timeout", detail:"The Server may be busy or experiencing a downtime"}))
        }
        else {
          // Something happened in setting up the request that triggered an Error
          console.log(error);
          dispatch(receiveErrors('simulation_launch', '' ));
          dispatch(showModal("SHOW_MODAL", "ERROR_MODAL",
            {error:"Unknown Error", detail:"Your request could not be completed"}))
        }
      })
  }


};

export const fetchCohorts = (reducerType) => {
    return (dispatch, getState) => {
    const token = localStorage.getItem("token");
      dispatch(requestCohorts(reducerType));

    server.get(`/cohorts/`, {headers: {Authorization: `JWT ${token}`} })

      .then(response => {
        const data = response.data;
        dispatch(receiveCohorts(reducerType, data ))
      })

      .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
                // dispatch(receiveErrors("dashboard_simulations", ''))
                dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
            }
            else {
              dispatch(receiveErrors("controlboard_cohorts", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors("controlboard_cohorts", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(receiveErrors("controlboard_cohorts", {error:"Unclassified Error", detail:"Your request could not be completed."}))
          }
        })


  }

};


export const fetchCoursesByGroupPerm = (reducerType, group) => {
    return (dispatch, getState) => {
    const token = localStorage.getItem("token");
      dispatch(requestCoursesGroup(reducerType));

    server.get(`/courses-group/${group}`, {headers: {Authorization: `JWT ${token}`} })

      .then(response => {
        const data = response.data;
        console.log(data);
        dispatch(receiveCoursesGroup(reducerType, data ))
      })

      .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
                // dispatch(receiveErrors("dashboard_simulations", ''))
                dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
            }
            else {
              dispatch(receiveErrors("controlboard_courses_group", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors("controlboard_courses_group", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(receiveErrors("controlboard_courses_group", {error:"Unclassified Error", detail:"Your request could not be completed."}))
          }
        })


  }

};

export const resetControlboard = () => {
  return (dispatch, getState) => {
  dispatch({ type: C.RESET_CONTROLBOARD})  }
};

export const resetControlboardForm = () => {
  return (dispatch, getState) => {
  dispatch({ type: C.RESET_CONTROLBOARD_FORM})  }
};

export const resetControlboardMsgs = () => {
  return (dispatch, getState) => {
  dispatch({ type: C.RESET_CONTROLBOARD_MSG})  }
};

export const resetConsole = (reducerType) => {
  return (dispatch, getState) => {
  dispatch({ type: C.RESET_CONSOLE, data:{reducerType}})  }
};


export const clearControlNotifyMsg = (index) => {
  return (dispatch, getState) => {
  dispatch({ type: C.CLEAR_CONTROL_NOTIFY_MSG, index:index})  }
};

export const clearGraderNotifyMsg = (index) => {
  return (dispatch, getState) => {
  dispatch({ type: C.CLEAR_GRADER_NOTIFY_MSG, index:index})  }
};



// AutoGrader
export const fetchRunningLabs = () => {
    return (dispatch) => {
    const token = localStorage.getItem("token");

      dispatch({ type: C.REQUEST_RUNNING_LABS}) ;

    server.get(`simulations/all/unique/lab`, {headers: {Authorization: `JWT ${token}`} })

      .then(response => {
        const data = response.data;
        dispatch({ type: C.RECEIVE_RUNNING_LABS, data}) ;
      })

      .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
                dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
            }
            else {
              dispatch(receiveErrors("labgrader_fetch_labs", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors("labgrader_fetch_labs", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(receiveErrors("labgrader_fetch_labs", {error:"Unclassified Error", detail:"Your request could not be completed."}))
          }
        })
  }

};


export const fetchRunningLabNodes = (lab) => {
    return (dispatch, getState) => {
    const token = localStorage.getItem("token");

      dispatch({ type: C.REQUEST_RUNNING_LAB_NODES}) ;

    server.get(`simulations/lab/${lab}/nodes`, {headers: {Authorization: `JWT ${token}`} })

      .then(response => {
        const data = response.data;
        // console.log(data);
        dispatch({ type: C.RECEIVE_RUNNING_LAB_NODES, data}) ;
        dispatch({ type: C.SET_LAB_NAME, data:lab});
        dispatch({ type: C.CLEAR_WHITEBOARD_DATA, mode:'normal'})
      })

      .catch(error => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response) {
            if (error.response.status === 401) {
                dispatch(showModal("SHOW_MODAL", "INFO_MODAL",
                {info: "Session Timeout", detail: "Your session expired! Please login again", buttonAction:C.LOGOUT_USER}))
            }
            else {
              dispatch(receiveErrors("labgrader_lab_nodes", error.response.data))
            }
          }
          else if (error.request) {
            // The request was made but no response was received
            dispatch(receiveErrors("labgrader_lab_nodes", {error:"Request Timeout!", detail:"The Server may be busy or experiencing a downtime."}))
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(receiveErrors("labgrader_lab_nodes", {error:"Unclassified Error", detail:"Your request could not be completed."}))
          }
        })
  }

};

export const resetReportContents = () => {
  return (dispatch) => {
    dispatch({type: C.RESET_REPORT_CONTENTS})
  }
};

export const resetGraderContents = () => {
  return (dispatch) => {
    dispatch({type: C.RESET_GRADER_CONTENTS,
              data:{mode:'normal'}
    })
  }
};


export const graderWhiteboardData = (mode, node, command_list) => {
  const data = { [node]:command_list };
  return (dispatch) => {
    dispatch({type: C.RECEIVE_GRADER_WHITEBOARD_DATA, mode, data})
  }
};

export const setFolderName = (mode,value) => {
  return (dispatch) => {
    dispatch({type: C.SET_FOLDER_NAME, mode, data:value})
  }
};

export const reportFileDownload = (url_path, download_name, fileType) => {

  const data = {url:url_path}
  // console.log(download_name, fileType)

  return (dispatch) => {
    virl.post(`${config.channelsUrl}/api/mediabrowser/folder-download`,
      data, {responseType: 'blob'}
      // {headers: {"Content-Type":"text/plain",}, responseType: 'blob'}
      )

      .then(response => {
        if (fileType === 'file') {
          fileDownload(response.data, `${download_name}.txt`, "text/plain")
        }
        else {
          fileDownload(response.data, `${download_name}.zip`, "application/zip")
        }
      })

      .catch(error => {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response) {
          console.log(error.response)
        }

        else if (error.request) {
          // The request was made but no response was received
            console.log(error.request)
        }
        else {
          // Something happened in setting up the request that triggered an Error
          console.log("Unknown Error downloading file")
        }
      })
  }
};




export const socketConnect = (url, source) => {
  return (dispatch) => {
    dispatch({type: WEBSOCKET_CONNECT, payload: {url}, source })
  }
};


export const socketSend = (source, payload) => {
  // console.log(typeof(payload), payload)
  return (dispatch) => {
    dispatch({type: WEBSOCKET_SEND, payload: {...payload, source} })
  }
};


export const socketDisconnect = () => {
  return (dispatch) => {
    dispatch({type: WEBSOCKET_DISCONNECT,  })
  }
};





// export const socketConnect = (reducerType, socketInstance, url) => {
//   console.log("reducer socket connected");
//   return (dispatch, getState) => {
//     socketInstance.connect(url)
//   }
// }
//
// export const socketReceive = (reducerType, socketInstance) => {
//
//   return (dispatch, getState) => {
//       socketInstance.socketRef.onmessage = e => {
//       // console.log("redux receiver here",e.data);
//       dispatch(receiveSocketMsg(reducerType, e.data))
//     };
//   }
//
// }
//
// export const socketClose = (reducerType, socketInstance,url) => {
//
//   return (dispatch, getState) => {
//       socketInstance.socketRef.onclose = e => {
//       console.log("redux close here",e.data);
//       // dispatch(socketConnect(reducerType, socketInstance,url))
//     };
//   }
//
// }































