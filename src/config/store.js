import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';

import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
};




export const store = () => {
    //const middlewares = [thunk,saveEnvironmentVariable];
    const middlewares = [thunk];
    const enhancer = applyMiddleware(...middlewares);
    const persistedReducer = persistReducer(persistConfig, reducers);

    // create store
    return createStore(persistedReducer, enhancer);
};

export const persistor = persistStore(store());


//
// const persistConfig = {
//     key: 'root',
//     storage,
// }
//
// const persistedReducer = persistReducer(persistConfig, reducers)
//
// export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
// }
