import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from "react-redux";

import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './config/store'
import { Container } from '../Container'

const appstore = store();


//https://codesandbox.io/s/react-redux-hook-by-indrek-lasn-utc6h?file=/src/Store.js
const Stack = createStackNavigator();

 export  default function App(props) {

    return (

        <Provider store={appstore}>
          <PersistGate loading={null} persistor={persistor}>
            <Container />
          </PersistGate>
        </Provider>


    );

}



//
// const Wrapped = props => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// )
//
// export default Wrapped; // wrong!
