// Import React and necessary components
import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

// Import navigation dependencies
import { Navigation } from "@react-navigation/native";

// Import ScrollView from react-native-gesture-handler
import { ScrollView } from 'react-native-gesture-handler';

// ItemDetailsScreen component

// To explain this simply, everytime a user selects a image on the carousel it navigates to this page and sends data pulled from firebase(desciption, condition) with it
const ItemDetailsScreen = ({ route }) => {
  // Destructure data from route parameters
  const { title, imageUrl, desc, date2, price, condition } = route.params;

  return (
    <ScrollView>

    <View style={styles.container}>

      {/* For the Image and title*/}
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/>

      {/* Displaying Description, Condition and Price */}

      <Text style={styles.desc}>
      {desc}
      </Text>

      <Text style={styles.desc}>
      Condition: {condition}
      </Text>

      <Text style={styles.price}>
      {price}
      </Text>

      {/* Search Bar and Send Button */}

      <View style={{flex: 1}}/>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => {
          null
        }}
      >
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>


      {/* Message send bar */}

      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Send a Message"
          style={styles.input}
        />
        <Button title="Send" color="blue" onPress={() => {null}} />
      </View>
    </View>
    </ScrollView>

);
};

// Again CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  desc : {
    fontSize: 20,
    marginTop: 20,
    margin: 16,

  },
  price: {
    fontSize: 40,
    color: "blue",
    marginTop: 20,
    margin: 16,


  },
  title: {

    fontSize: 30,
    margin: 16,
    alignItems: 'center',
    textAlign: 'left',
    color: "blue"
  },
  image: {
    width: 600,
    height: 400,
  },
  buyButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 8,
  },
  buyButtonText: {
    fontSize: 18,
    color: 'white',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'black',
    marginBottom: 80
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginRight: 16,
  },
});

export default ItemDetailsScreen;
