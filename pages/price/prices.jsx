import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Prices() {
  const [userInput, setUserInput] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');

  const API_URL = "https://api.openai.com/v1/chat/completions"
  const apiKey = "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"
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
                  content: `Give me a detailed price estimation on this: ${userInput}, act as a potential buyer who needs cheap electornic parts at the `, // Add the risk information to the message
                },
              ],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );

          const { choices } = response.data;
          const test = choices[0].message.content
          setEstimatedValue(test);
          console.log(userInput)

          console.log(test)

          return choices[0].message.content;

    } catch (error) {
        console.error('Error sending message:', error);
      }
    };

  return (
    <SafeAreaView >
        <Text style={{textAlign: 'center', fontSize: 25, marginTop: 20}}>
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
        onChangeText={text => setUserInput(text)} // Use onChangeText
        placeholderTextColor="gray"
      />
      
    </View>

    </View>
      <Button title="Estimate Value" onPress={handleEstimateValue} />
      <Text style={{fontSize: 20, marginLeft: 20, marginTop: 30}}>Estimated Value: {estimatedValue}</Text>
    </SafeAreaView>
  );
}

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