
// React Components
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// Dropdown and Image picker
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";


// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";


// Dropdown options for condition
const condition = [
  "New",
  "Like-new",
  "Good",
  "Fair",
  "Poor",
  "Used",
  "Refurbished",
  "Other",
];

//Firebase credentials (These are meant to be exposed so its fine)
const firebaseConfig = {
    apiKey: "AIzaSyAS_WyLglUHaJzoCdcD5ndYN3bDKFjuzvg",
    authDomain: "techcycle-eefe8.firebaseapp.com",
    projectId: "techcycle-eefe8",
    storageBucket: "techcycle-eefe8.appspot.com",
    messagingSenderId: "841371061773",
    appId: "1:841371061773:web:0fc161db3fb12d974dcf44"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initilizing Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = firebase.storage();


// Main Function
export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [url2, seturl2] = useState(null);

  // Image picker funtion
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const ref = storage.ref().child("example.jpg");
      await ref.put(blob);
    }
  };
// Variables for storing user input then sending it to firebase
  const [deviceName, setDeviceName] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [condition2, setCondition2] = useState("");

  // Uploading image and sending the URL of the image + the rest to a firestore(no-SQL database)
  const handleSubmit = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      // catch case
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      // Sending the image as a blob
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(`Pictures/${new Date().getTime()}`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download URL: ", url);
          // Finishing by uploading and keeping the URL of the image
          seturl2(url);
          blob.close();
          return url;
        });
      }
    );
      // Sending the rest of the data + the URL to a firestore database
    try {
      const docRef = await addDoc(collection(db, "store"), {
        title: deviceName,
        desc: notes,
        price: price,
        imageURL: url2,
        condition: condition2,
      });

      console.log("Document written with ID: ", docRef.id);

      // Catch Case
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // If it succsessfully uploads it will alert the user that it was succsessfull
    Alert.alert("Succsessful", "Uploaded item to server!");
  };

  return (
        <View style={styles.container}>
            <Text style={{fontSize: 40, textAlign: 'center', marginBottom: 90}}>
                Upload an item!

            </Text>

<Text style={styles.label}>Title:</Text>
    {/* Input which modifies deviceName */}

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={deviceName}
        onChangeText={setDeviceName}
      />
<Text style={styles.label}>Select Condition:</Text>

<View style={{ alignItems: "center", justifyContent: "center", }}>
      {/* DropDown for Condition */}

            <SelectDropdown
              data={condition}
              defaultButtonText={"Condition"}
              onSelect={(selectedItem, index) => {}}
              buttonTextAfterSelection={(selectedItem, index) => {
                setCondition2(selectedItem);
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>


          <Text style={styles.label}>Notes:</Text>

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={notes}
        onChangeText={setNotes}
      />


<Text style={styles.label}>Price:</Text>


      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
      />

    {/* Add image button and submit button */}
<TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
        </View>         
  );
}
// CSS 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 25,
    textAlign: 'center'
  },
  imageUploadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CD964',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    borderColor: "#3EB489",
    fontVariant: "bold",
    color: "#000000",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  biginput: {
    height: 60,
    borderColor: "#3EB489",
    color: "#FFFFFF",
    borderWidth: 1,
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 2,
    resizeMode: "cover", // or 'stretch'
  },
});