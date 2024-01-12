import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';


import { GetStarted, WelComeScreen } from './app/screens';
import AuthStack from './app/config/Navigation/AuthStack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      if (value === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
      await SplashScreen.hide();
    };

    fetchData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    // Show splash screen when isFirstLaunch is still not determined
    if (isFirstLaunch === null) {
      await SplashScreen.show();
    }
  }, [isFirstLaunch]);

  if (isFirstLaunch === null) {
    // Return a loading screen if isFirstLaunch is not determined
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName={
          isFirstLaunch ? 'WelComeScreen' : 'GetStarted'
        }>
        <Stack.Screen
          name="WelComeScreen"
          component={WelComeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

