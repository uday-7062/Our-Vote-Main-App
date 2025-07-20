import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_TOKEN } from '../config';
import apiService from '../services/api';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState([78.9629, 20.5937]); // Default to India center
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Request location permission and get user location
    MapboxGL.requestAndroidLocationPermissions().then((isGranted) => {
      if (isGranted) {
        MapboxGL.locationManager.start();
      }
    });

    // Fetch events from backend
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await apiService.getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
      Alert.alert('Error', 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyEvents = async (lng, lat) => {
    try {
      const nearbyEvents = await apiService.getNearbyEvents(lng, lat);
      setEvents(nearbyEvents);
    } catch (error) {
      console.error('Error fetching nearby events:', error);
    }
  };

  const handleLocationUpdate = (location) => {
    const newLocation = [location.coords.longitude, location.coords.latitude];
    setUserLocation(newLocation);
    
    // Fetch nearby events when user location changes
    fetchNearbyEvents(location.coords.longitude, location.coords.latitude);
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={userLocation}
        />
        
        {/* User location */}
        <MapboxGL.UserLocation
          visible={true}
          onUpdate={handleLocationUpdate}
        />

        {/* Circle radius for nearby events */}
        <MapboxGL.CircleLayer
          id="radius"
          style={{
            circleRadius: 5000, // 5km radius
            circleColor: 'rgba(0, 100, 255, 0.1)',
            circleStrokeColor: 'rgba(0, 100, 255, 0.3)',
            circleStrokeWidth: 2,
          }}
        />

        {/* Event markers */}
        {events.map((event) => (
          <MapboxGL.PointAnnotation
            key={event._id}
            id={event._id}
            coordinate={event.location.coordinates}
            title={event.name}
            snippet={event.description}
            onSelected={() => navigation.navigate('EventDetails', { event })}
          >
            <View style={styles.marker}>
              <View style={styles.markerDot} />
            </View>
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    borderWidth: 2,
    borderColor: '#00ff00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ff00',
  },
}); 