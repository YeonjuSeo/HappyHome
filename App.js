import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import KakaoWebView from './src/components/atoms/KakaoWebView';


export default function App() {
  return (
    <View style={styles.container}>
      <KakaoWebView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
