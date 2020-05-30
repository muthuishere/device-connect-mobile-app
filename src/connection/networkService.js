
import {NetworkInfo} from 'react-native-network-info';
import {APPEND_LOG} from './log-store';

export async function printNetworkElements(dispatch) {

  const ipAddress = await NetworkInfo.getIPAddress();

  dispatch({ type: APPEND_LOG,payload:"ipAddress " + ipAddress });

//
// // Get IPv4 IP (priority: WiFi first, cellular second)
//   NetworkInfo.getIPV4Address().then(ipv4Address => {
//     console.log(ipv4Address);
//   });
//
// // Get Broadcast
//   NetworkInfo.getBroadcast().then(broadcast => {
//     console.log(broadcast);
//   });
//
// // Get SSID
//   NetworkInfo.getSSID().then(ssid => {
//     console.log(ssid);
//   });
//
// // Get BSSID
//   NetworkInfo.getBSSID().then(bssid => {
//     console.log(bssid);
//   });
//
// // Get Subnet
//   NetworkInfo.getSubnet().then(subnet => {
//     console.log(subnet);
//   });
//
// // Get Default Gateway IP
//   NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
//     console.log(defaultGateway);
//   });
}
