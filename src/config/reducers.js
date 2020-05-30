import { combineReducers } from 'redux';
import connection from '../connection/connection-store'
import log from '../connection/log-store'

export default combineReducers({
    connection,
    log

})


