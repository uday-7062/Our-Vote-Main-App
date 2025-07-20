import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import MapScreen from '../components/MapScreen';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>OurVote - Election Map</Text>
      <MapScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', margin: 16 }
}); 