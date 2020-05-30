

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

var httpBridge = require('react-native-http-bridge');

export default class WebSocketService extends Component{

  constructor(props){
    super(props);
    this.state = {
      urls: [],
      status: 'stopped',
      clients: 0,
      error: ''
    }
    this.subscriptions = [];
  }

  componentWillMount() {
    // initalize the server (now accessible via localhost:1234)
    httpBridge.start(5561, 'http_service', request => {

      const urls= this.state.urls;
      urls.push(request.url)
      this.setState({
        urls
      })
      // you can use request.url, request.type and request.postData here
      if (request.type === "GET" && request.url.split("/")[1] === "users") {
        httpBridge.respond(request.requestId, 200, "application/json", "{\"message\": \"OK\"}");
      } else {
        httpBridge.respond(request.requestId, 400, "application/json", "{\"message\": \"Bad Request\"}");
      }

    });
  }

  componentWillUnmount(){
    httpBridge.stop();
  }

  renderMessages(){
    if(this.state.urls.length){
      const messages =  this.state.urls.map((msg, i)=>(<Text key={`msg_${i}`} style={styles.instructions}>{msg}}</Text>));
      return (<React.Fragment>
          <Text style={styles.msgTitle}>Urls:</Text>
          <View style={styles.messages}>
            {messages}
          </View>
        </React.Fragment>
      );
    }

    return null;

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>http server</Text>
        <Text style={styles.instructions}>Client(s) connected: {this.state.clients.toString()}</Text>
        { this.renderMessages() }

      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    flexDirection: 'column',
    width: '100%',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  messages:{
    flexDirection: 'column',
  },
  msg: {
    flex: 1,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  msgTitle: {
    marginVertical: 15,
  }
});
