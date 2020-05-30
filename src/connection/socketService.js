import TcpSocket from 'react-native-tcp-socket';
import {APPEND_LOG} from './log-store';
import { NativeModules } from 'react-native';
//import {createWebSocket} from './WebSocketService';

const { RNWebsocketServer } = NativeModules;


let server;

export const closeSocket = (dispatch)=>{
    server.destroy();




}
export const createSocket = (dispatch)=>{


  if(1 == 1)
    return

     server = TcpSocket.createServer((socket)=> {
        socket.on('data', (data) => {
            socket.write('Echo server', data);
        });

        socket.on('connect', (info) => {

          dispatch({ type: APPEND_LOG,payload:'connect '+ JSON.stringify(info)  });
        });

        socket.on('open', (info) => {

          dispatch({ type: APPEND_LOG,payload:'open '+ JSON.stringify(info)  });
        });

        socket.on('error', (error) => {
            //console.log();
          dispatch({ type: APPEND_LOG,payload:'An error ocurred with client socket '+ JSON.stringify(error)  });
        });

        socket.on('close', (info) => {
            console.log();
          dispatch({ type: APPEND_LOG,payload:'Closed connection with '+ JSON.stringify(info)  });
          dispatch({ type: APPEND_LOG,payload:'Closed connection with '+ JSON.stringify(socket.address())  });
        });
    });

  server.listen({
    port:2121,
    host:'0.0.0.0'
  },response => {
    dispatch({ type: APPEND_LOG,payload:'connection with '+ JSON.stringify(response)  });
  })


    server.on('error', (error) => {
      dispatch({ type: APPEND_LOG,payload:'An error ocurred with server '+ JSON.stringify(error)  });

    });

    server.on('close', () => {

      dispatch({ type: APPEND_LOG,payload:'Server closed connection' });

    });
    return server;
}
