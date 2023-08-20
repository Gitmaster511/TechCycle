
// React Components
import { React, useEffect } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";


// Handling the Navigation Part
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


// Other Pages/ Features that are navigated to
import Map from "./pages/map/map";
import Prices from "./pages/price/prices";
import HomeScreen from "./pages/Home/Home";
import Upload from "./pages/upload/upload";


// Main Function for navigation
export default function Navigate({ navigation }) {

  // Code for bottom Bar
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

  // Icons for bottom bar
    switch (routeName) {
      case "Saved":
        icon = "bookmark-outline";
        break;
      case "Home":
        icon = "home-outline";
        break;
      case "Notifications":
        icon = "map-outline";
        break;
      case "Chat":
        icon = "pricetag-outline";
        break;

    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? "black" : "gray"}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  // I can't comment inside the render function but I can explain from up here

    // CurvedBottomBarExpo.Navigator is for the curved bottom bar

    // The render circle handles the middle plus sign

    // Under that are all pages being navigated too
  return (

    <NavigationContainer>

  <CurvedBottomBarExpo.Navigator
    type="DOWN"
    screenOptions={{headerShown:false}}
    style={styles.bottomBar}
    shadowStyle={styles.shawdow}
    height={55}
    circleWidth={50}
    bgColor="white"
    initialRouteName="Home"
    borderTopLeftRight
    renderCircle={({ selectedTab, navigate }) => (
      <Animated.View style={styles.btnCircleUp}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("Upload")}
          >
          <Ionicons name={"add-outline"} color="gray" size={25} />
        </TouchableOpacity>
      </Animated.View>
    )}
    tabBar={renderTabBar}
  >

    <CurvedBottomBarExpo.Screen
      name="Home"
      component={() => <HomeScreen />}
      position="LEFT"
      options={{ headerShown: false }}
    />


    <CurvedBottomBarExpo.Screen
      name="Saved"
      component={() => <View style={styles.screen1} />}
      position="LEFT"
      options={{ headerShown: false }} 
    />
    <CurvedBottomBarExpo.Screen
      name="Notifications"
      position="RIGHT"
      options={{ headerShown: false }} 
      component={() => <Map />}
    />
    <CurvedBottomBarExpo.Screen
      name="Chat"
      component={() => <Prices />}
      position="RIGHT"
      options={{ headerShown: false}}
    />
    <CurvedBottomBarExpo.Screen
      name="Upload"
      component={() => <Upload />}
    />

  </CurvedBottomBarExpo.Navigator>
    </NavigationContainer>

  );
}


// This is a stylesheet, you can think of it as as CSS sheet
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 2,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: "#8AE3A8",
  },
  screen2: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
});