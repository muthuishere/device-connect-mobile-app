import {createReducer} from "../config/create-reducer";
import {createSocket} from "./socketService";


export const APPEND_LOG = "log/append";


const initialState = {
    content: ""

};


const appendLog =(state,action)=>{

    const text =action.payload + "<br/>" + state.content;

    return { ...state,   content:  text  }

};

const LogReducer = createReducer(initialState, {
    [APPEND_LOG]: appendLog
})

export default LogReducer;

