import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../auth/Login';
import Register from '../../auth/Register'
import AppStack from './AppStack';
import AdminStack from './AdminStack';

const Stack = createNativeStackNavigator()
function AuthStack() {
    return (
            <Stack.Navigator initialRouteName='Register'>
                <Stack.Screen
                    name='Register'
                    component={Register}
                    options={{
                        headerShown: false
                    }} />
                    <Stack.Screen
                    name='AppStack'
                    component={AppStack}
                    options={{
                        headerShown: false
                    }} />
                     <Stack.Screen
                    name='AdminStack'
                    component={AdminStack}
                    options={{
                        headerShown: false
                    }} />
               <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{
                        headerShown: false
                    }} />

            </Stack.Navigator>

    )
}

export default AuthStack