// React Components
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// For sending requests
import axios from 'axios';

// For Search Icon
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Prices() {
  // Variables to store User Input and Estimated Value
  const [userInput, setUserInput] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');

  // Constants for api
  const API_URL = "https://api.openai.com/v1/chat/completions"
  const apiKey = "Get your own OpenAPI key lol"


  // Sending request function(async means that it wont update anything until everything completes)
  const handleEstimateValue = async () => {
    try {
        const response = await axios.post(
            API_URL,
            {
              model: 'gpt-3.5-turbo',
              temperature: 0.5,
              messages: [
                {
                  role: 'user',
                  // Simple prompt to get a semi-accurate estimation, not a certified prompt engineer
                  content: `Give me a price estimation on this: ${userInput}, dont tell the user to research just give them multiple price estimations with each level of condition`, // Add the risk information to the message
                },
              ],
            },
            // Headers for authentication
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );
          // Getting response and putting it in variable
          const { choices } = response.data;
          const test = choices[0].message.content
          setEstimatedValue(test);
          return choices[0].message.content;


            // Catch Case
    } catch (error) {
        console.error('Error sending message:', error);
      }
    };

  return (
        <ScrollView style={{backgroundColor: '#8AE3A8'}}>
        <Text style={{textAlign: 'center', fontSize: 25, marginTop: 230}}>
            Welcome to the Price estimate Page!


        </Text>
        <Text style={{textAlign: 'center', fontSize: 18, marginTop: 20, marginBottom: 20}}>
            The more detailed the better!

        </Text>
        
    <View style={styles.iconContainer}>
    <View style={styles.container}>
      {/* Search Icon on the Left */}
      <View style={styles.iconContainer}>
        <Ionicons name="search" size={20} color="gray" />
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="ex. iPhone 11 Battery"
        onChangeText={text => setUserInput(text)}
        placeholderTextColor="gray"
      />
      
    </View>

    </View>
      <Button title="Estimate Value" onPress={handleEstimateValue} />
      <Text style={{fontSize: 20, marginLeft: 20, marginTop: 30}}>Estimated Value: {estimatedValue}</Text>
      </ScrollView>
  );
}
// CSS
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
});