import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Navigate from "./Navigate";
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";


SplashScreen.preventAutoHideAsync()


export default function App() {

  
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      // Keep the splash screen visible
      await SplashScreen.preventAutoHideAsync();

      // Simulate a 2-second delay
      setTimeout(async () => {
        // Do any other setup tasks here

        // Hide the splash screen after the delay
        await SplashScreen.hideAsync();

        // Then tell the application to render
        setAppIsReady(true);
      }, 1000);
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
      <Navigate/>
  );
}
