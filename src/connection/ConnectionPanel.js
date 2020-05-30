import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    TOGGLE,
    START_SERVER,
    STOP_SERVER,
    startWebSocketServer, stopWebSocketServer
} from "./connection-store";
import {Platform, StyleSheet, Text, View} from "react-native";
import {MonoText} from "../components/StyledText";
import {ScrollView} from "react-native-gesture-handler";
import {CheckBox, Button} from 'react-native-elements'
import log from './log-store';
import WebSocketService from './WebSocketService';

function ServerStatusButton({title, pressHandler, dispatch}) {


    return <Button
        title={title}
        onPress={() => pressHandler(dispatch)}

    />
}

function InProgress(serverStarted) {


    const results =
        {
            true: "Starting",
            false: "Stopping"

        }

    const text = results[serverStarted];
    return <Button
        title={text}
        loading
    />
}
//
// const ServerStatus = ({dispatch}) => {
//
//     const connection = useSelector(state => state.connection);
//     if (connection.inProgress)
//         return InProgress();
//
//     const serverStarted = "" + connection.serverStarted;
//
//     const results =
//         {
//             "true": {"title": "Stop Server", "pressHandler": stopWebSocketServer, dispatch},
//             "false": {"title": "Start Server", "pressHandler": startWebSocketServer, dispatch},
//
//         }
//
//     return ServerStatusButton(results[serverStarted]);
// }

function ServerStatus() {
    const connection = useSelector(state => state.connection);
    const serverStarted = connection.serverStarted;
    const dispatch = useDispatch();

     if (connection.inProgress)
       return InProgress(serverStarted);

    if (serverStarted) {
        return <Button
            title="Stop Server"
            onPress={() => stopWebSocketServer(dispatch)}
        />
    }
    return <Button
        title="Start Socket"
        onPress={() => startWebSocketServer(dispatch)}
    />;
}

const LogPanel = () => {
    const log = useSelector(state => state.log);

    return (
      <ScrollView style={styles.logcontainer}>
          <Text>{log.content}</Text>
      </ScrollView>

    );
};


const ConnectionPanel = () => {
    const connection = useSelector(state => state.connection);
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>


            <Text>Start Connection {JSON.stringify(connection)}</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                <MonoText>Websocket </MonoText>
            </View>

            <ServerStatus dispatch={dispatch}></ServerStatus>

           <LogPanel></LogPanel>

            <WebSocketService></WebSocketService>
        </View>

    );
};

export default ConnectionPanel;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logcontainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
