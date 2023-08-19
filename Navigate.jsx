//Page to handle the Navigation including the bottom bar

import { React, useEffect } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import Map from "./pages/map/map";
import Prices from "./pages/price/prices";
import HomeScreen from "./pages/Home/Home";
const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function Navigate() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

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
      component={() => <Screen1 />}
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
  </CurvedBottomBarExpo.Navigator>
</NavigationContainer>

  );
}

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
    backgroundColor: "#BFEFFF",
  },
  screen2: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
});