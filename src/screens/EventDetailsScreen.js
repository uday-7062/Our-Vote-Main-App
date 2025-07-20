import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import apiService from '../services/api';

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;
  const [isRegistered, setIsRegistered] = useState(event.attendees?.includes(apiService.token) || false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      if (isRegistered) {
        await apiService.unregisterFromEvent(event._id);
        setIsRegistered(false);
        Alert.alert('Success', 'Unregistered from event');
      } else {
        await apiService.registerForEvent(event._id);
        setIsRegistered(true);
        Alert.alert('Success', 'Registered for event');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', error.message || 'Failed to update registration');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.eventTitle}>{event.name}</Text>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <Text style={styles.infoText}>{formatDate(event.date)}</Text>
        </View>

        {event.description && (
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.infoText}>{event.description}</Text>
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.infoText}>
            {event.location.coordinates[1].toFixed(4)}, {event.location.coordinates[0].toFixed(4)}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Attendees</Text>
          <Text style={styles.infoText}>
            {event.attendees?.length || 0} people registered
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.registerButton,
            isRegistered && styles.unregisterButton,
            loading && styles.loadingButton
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'Loading...' : (isRegistered ? 'Unregister' : 'Register for Event')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 60,
  },
  content: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  unregisterButton: {
    backgroundColor: '#FF3B30',
  },
  loadingButton: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 