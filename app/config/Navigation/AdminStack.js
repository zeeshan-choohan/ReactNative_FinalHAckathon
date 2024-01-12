import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Admin from '../../admin/screen/Admin';

const Stack = createNativeStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator initialRouteName='Admin'>
      <Stack.Screen
        name='Admin'
        component={Admin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AdminStack;
