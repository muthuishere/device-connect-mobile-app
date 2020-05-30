import {createReducer} from "../config/create-reducer";
import {closeSocket, createSocket} from './socketService';
import {printNetworkElements} from './networkService';

export const TOGGLE = "ui/toggle";
export const START_SERVER = "connection/start_server";
export const STOP_SERVER = "connection/stop_server";
export const SERVER_IN_PROGRESS = "connection/in_progress";

const initialState = {
    toggle: false,
    serverStarted: false,
    inProgress:false

};


const toggleSwitch =(state,action)=>{

    return { ...state,   toggle: !state.toggle }


};

const startServer =(state,action)=>{

    console.log("server started")
    return { ...state,    inProgress: false,serverStarted: true }


};

const stopServer =(state,action)=>{

    return { ...state,   inProgress: false,serverStarted: false }


};
const setProgress =(state,action)=>{

    return { ...state,   inProgress: true }


};

 const ConnectionReducer = createReducer(initialState, {
    [TOGGLE]: toggleSwitch,
    [START_SERVER]: startServer,
    [STOP_SERVER]: stopServer,
    [SERVER_IN_PROGRESS]: setProgress


})
export default ConnectionReducer;
//
//
// export default (state = initialState, action) => {
//     switch (action.type) {
//         case TOGGLE: {
//             return {
//                 ...state,
//                 toggle: !state.toggle
//             };
//         }
//
//         default: {
//             return { ...state };
//         }
//     }
// };

export const startWebSocketServer = (dispatch)  => {
    dispatch({ type: SERVER_IN_PROGRESS });

    console.log("starting")
  printNetworkElements(dispatch)

    createSocket(dispatch)
    dispatch({ type: START_SERVER });


};
export const stopWebSocketServer = (dispatch) => {
    dispatch({ type: SERVER_IN_PROGRESS });
    setTimeout(()=>{
      closeSocket(dispatch)
        dispatch({ type: STOP_SERVER });
    },100)
};

