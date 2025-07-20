import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import MapScreen from '../components/MapScreen';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>OurVote Today</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationText}>📍</Text>
        </TouchableOpacity>
      </View>
      <MapScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuButton: { padding: 4 },
  menuIcon: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1 },
  locationButton: { padding: 4 },
  locationText: { fontSize: 20 },
}); 