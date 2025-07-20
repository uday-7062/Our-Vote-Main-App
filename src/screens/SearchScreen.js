import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [selectedEventTypes, setSelectedEventTypes] = useState(['watch-party', 'canvass']);
  const [favoriteCandidate, setFavoriteCandidate] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');

  const eventTypes = [
    { id: 'watch-party', label: 'Watch Party' },
    { id: 'community', label: 'Community Event' },
    { id: 'house-party', label: 'House Party' },
    { id: 'canvass', label: 'Canvass' },
    { id: 'phone-bank', label: 'Phone Bank' },
    { id: 'meet-greet', label: 'Meet-&-Greet' },
  ];

  const toggleEventType = (typeId) => {
    setSelectedEventTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSearch = () => {
    // TODO: Implement search logic
    console.log('Search with:', { selectedEventTypes, favoriteCandidate, globalSearch });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Events</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Event Type Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Type</Text>
          {eventTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={styles.checkboxRow}
              onPress={() => toggleEventType(type.id)}
            >
              <View style={[
                styles.checkbox,
                selectedEventTypes.includes(type.id) && styles.checkboxSelected
              ]}>
                {selectedEventTypes.includes(type.id) && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Favorite Candidate */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorite Candidate</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter candidate name"
            value={favoriteCandidate}
            onChangeText={setFavoriteCandidate}
          />
        </View>

        {/* Global Search */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Search</Text>
          <TextInput
            style={styles.input}
            placeholder="Search events..."
            value={globalSearch}
            onChangeText={setGlobalSearch}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSearch}>
          <Text style={styles.submitButtonText}>Search</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    color: '#007AFF',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 