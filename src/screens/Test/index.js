
import React, { useEffect } from "react";
import { View, Text,Button } from "react-native";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const Test = ({ route, navigation }) => {

  const firebaseConfig = {
    
  };

  useEffect(() => {
    initializeApp(firebaseConfig);
    ImagePicker.requestMediaLibraryPermissionsAsync()
      .then((response) => {
        console.log(response);
      })
  }, [])

  takePhoto = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })
    .then((response) => {
      alert(respnse.pickerResult)
      console.log(response)
    })

    //this._handleImagePicked(pickerResult);
  };

  return (
    <View>
      <Text>test</Text>
      <Button
        title="Take Photo"
        onPress={takePhoto}
      />
    </View>
  );
}

export default Test;
