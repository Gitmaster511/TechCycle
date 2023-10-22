//All imported Libraries

//React Libraries
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput,StyleSheet, TouchableOpacity, ScrollView, FlatList, Image, Dimensions } from 'react-native';
import Animated, {interpolate, Extrapolate, useSharedValue, useAnimatedStyle} from "react-native-reanimated";


//Firebase/Firestore
import { app, db } from '../../firebase'; // Adjust the path to match your project structure
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods

// Navigation
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

// Fonts/Icons
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts,
  InterTight_100Thin,
  InterTight_400Regular,
  Inter_100Thin,
  Inter_500Medium
} from "@expo-google-fonts/dev";


//Import Pages
import ItemDetailsScreen from "./itemdetails";
import Prices from "../price/prices";


//Constants for Carousels
const SRC_WIDTH = Dimensions.get("window").width;
const CARD_LENGTH = SRC_WIDTH * 0.8;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;

// For custom Carousel
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function CarouselItem() {

  // Loading Custom fonts
  let [fontsLoaded] = useFonts({
    InterTight_100Thin,
  InterTight_400Regular,
  Inter_100Thin,
  Inter_500Medium
  });






  //Hooks/ Variables
  const [searchText, setSearchText] = useState('');
  const [trendingData, setTrendingData] = useState([]);
  const [forYouData, setForYouData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  // For navigation  (When you press on a image it should navigate to another page)
  const navigation = useNavigation();

  // Sending info along with it when it navigates
  const navigateToDetails = (item) => {
    if (item) {
      navigation.navigate('ItemDetailsScreen', {
        title: item.title,
        imageUrl: item.imageURL,
        desc: item.desc, 
        date2: item.date,
        price: item.price,
        condition: item.condition
      });

    }
  };

  // Fetch trending data from Firebase
  const [activeIndex, setActiveIndex] = useState(0);useEffect(() => {
    const fetchTrendingData = async () => {

      {/* Search for data collection called trending */}
      const trendingCollectionRef = collection(db, 'trending'); // Reference to the 'trending' collection
      try {
         {/* Get all the data in the trending collection, map it and put it into a useState hook / variabel */}
        const trendingQuerySnapshot = await getDocs(trendingCollectionRef);
        const trendingData = trendingQuerySnapshot.docs.map((doc) => doc.data());
        setTrendingData(trendingData);
      } catch (error) {
        console.error('Error fetching trending data:', error);
      }
    };
    // Fetch for you data from Firebase (fetch process is the same)

    const fetchForYouData = async () => {
      const forYouCollectionRef = collection(db, 'foryou'); // Reference to the 'forYou' collection
      try {
        const forYouQuerySnapshot = await getDocs(forYouCollectionRef);
        const forYouData = forYouQuerySnapshot.docs.map((doc) => doc.data());
        setForYouData(forYouData);
      } catch (error) {
        console.error('Error fetching "For You" data:', error);
      }
    };
    // Fetch similiar data from Firebase (fetch process is the same)
    const fetchsimiliarData = async () => {
      const storeCollectionRef = collection(db, 'store'); // Reference to the 'forYou' collection
      try {
        const storeQuerySnapshot = await getDocs(storeCollectionRef);
        const storeData = storeQuerySnapshot.docs.map((doc) => doc.data());
        setStoreData(storeData);
      } catch (error) {
        console.error('Error fetching "For You" data:', error);
      }
    };
    // Running all three functions
    fetchForYouData();
    fetchsimiliarData();
    fetchTrendingData();

  }, []);

  // Catch case for loading fonts
  if (!fontsLoaded) {
    return <View/>;
  } else {

  return (
    <ScrollView>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#8AE3A8' }}>

    
    <View style={styles.iconContainer} >
    <View style={styles.container}>
      {/* Search Icon on the Left */}
      <View style={styles.iconContainer}>
        <Ionicons name="search" size={20} color="gray" />
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChange={setSearchText}
        placeholderTextColor="gray"
      />
    </View>

    {/* Welcome Text */}

    <Text style={{textAlign: 'center', fontSize: 30, fontFamily: "InterTight_400Regular"}}>
        Welcome Back Alaap! 
      </Text>
    
    {/* Cart Icon on the Right */}
    <TouchableOpacity style={styles.cartIconContainer}>
      <Ionicons name="cart-outline" size={24} color="gray" />
    </TouchableOpacity>

    </View>

      {/* Trending TExt with custom font */}

      <Text style={{fontSize: 24,margin: 16, fontFamily: 'InterTight_400Regular'}}>Trending</Text>

      {/* First of three carousels, parameters should be pretty self explanatory*/}
    <Animated.View>
      <AnimatedFlatList 
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={CARD_LENGTH + (SPACING * 1.5)}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment={"center"}
        data={trendingData}
        horizontal={true}
        // This render item loops through the trendingData hook and shows all the data in the carousel
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}> 
          <View style={styles.carouselItem}>
            <Image source={{ uri: item.imageURL }} style={styles.carouselImage} />
            <Text style={styles.carouselText}>{item.title}</Text>
          </View>
        </TouchableOpacity>          
          )}

        keyExtractor={(item) => item.id}

      />
    </Animated.View>

      {/* For You Carousel of images */}
      {/* Same thing as the other carousel*/}

      <Text style={{fontSize: 24,margin: 16, fontFamily: 'InterTight_400Regular'}}>For You</Text>
      <Animated.View>
      <AnimatedFlatList 
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={CARD_LENGTH + (SPACING * 1.5)}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment={"center"}
        data={forYouData}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}> 
          <View style={styles.carouselItem}>
            <Image source={{ uri: item.imageURL }} style={styles.carouselImage} />
            <Text style={styles.carouselText}>{item.title}</Text>
          </View>
        </TouchableOpacity>          
          )}
        //@ts-ignore
        keyExtractor={(item) => item.id}

      />
    </Animated.View>
      {/* Similiar to Recently Searched Carousel of images */}
      {/* Same thing as the other carousel*/}

    <Text style={{fontSize: 24,margin: 16, fontFamily: 'InterTight_400Regular'}}>Similiar to Recently Searched</Text>
      <Animated.View>
      <AnimatedFlatList 
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={CARD_LENGTH + (SPACING * 1.5)}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment={"center"}
        data={storeData}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}> 
                <View style={styles.carouselItem}>
                  <Image source={{ uri: item.imageURL }} style={styles.carouselImage} />
                  <Text style={styles.carouselText}>{item.title}</Text>
                </View>
              </TouchableOpacity>  
     
          )}
        keyExtractor={(item) => item.id}

      />
    </Animated.View>
    <View style={{height: 90}}/>
    </SafeAreaView>

    </ScrollView>
  );
}

}

// I need a navigation since this navigates between two pages (Home and ItemDetails)
export default function HomeScreen() {
    const Stack = createStackNavigator();
    return (
      // independant=true seperates it from the other navigation container
      <NavigationContainer independent={true} >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={CarouselItem}
          options={{ headerShown: false }}
        />
      <Stack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    )


}

// Again CSS
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginVertical: 16,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2, // For Android
      },
      iconContainer: {
        padding: 8,
      },
      input: {
        flex: 1,
        fontSize: 16,
        color: 'black',
      },
      cartIconContainer: {
        position: 'absolute',
        top: 30,
        right: 30,
        padding: 8,
      },
  header: {
    padding: 16,
    backgroundColor: 'skyblue',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },

  carouselItem: {
    padding: 16,
    alignItems: 'center',
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
  carouselText: {
    fontSize: 18,
    marginTop: 8,
  },
  card: {
    width: CARD_LENGTH,
    height: 150,
    overflow: "hidden",
    borderRadius: 15,
  }
});