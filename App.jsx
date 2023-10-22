
// React Packages
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

// Expo Packages (Font, Splashscreen) 
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync()


import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();




// Setting up for the Navigation screen
import { NavigationContainer } from '@react-navigation/native';
import Navigate from "./Navigate";






export default function App() {

  // Setting up a one second Splashscreen

  //For seeing if splashscreen is down or not
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      // Keep the splash screen visible
      await SplashScreen.preventAutoHideAsync();

      setTimeout(async () => {

        await SplashScreen.hideAsync();

        // Then tell the application to render
        setAppIsReady(true);
      }, 2000);
    }
    prepare();
  }, []);

  // Catch Case
  if (!appIsReady) {
    return null;
  }

  // Just returning the Navigate component
  return (
      <Navigate/>
  );
}
