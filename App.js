import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CertificationScreen from "./src/screens/Certification/index";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>홈화면</Text>
      <Button
        title="본인인증하러가기슝슝"
        onPress={() => navigation.navigate("phoneAuth")}
      />
    </View>
  );
}

function phoneAuthScreen({ navigation }) {
  return (
    <View>
      <Text>본인인증하기</Text>
      <Button
        title="본인인증하기"
        onPress={() => navigation.navigate("Certification")}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="phoneAuth" component={phoneAuthScreen} />
        <Stack.Screen name="Certification" component={CertificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
