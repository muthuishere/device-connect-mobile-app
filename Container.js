import {StatusBar, StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LinkingConfiguration from "./src/navigation/LinkingConfiguration";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import * as React from 'react';
const Stack = createStackNavigator();

export const Container = () => {
    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            <NavigationContainer linking={LinkingConfiguration}>
                <Stack.Navigator>
                    <Stack.Screen name="Root" component={BottomTabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
