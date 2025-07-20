import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';

function PlaceholderScreen({ title }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>{title}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Today">
      <Tab.Screen name="Today" component={HomeScreen} />
      <Tab.Screen name="Week" children={() => <PlaceholderScreen title="Week" />} />
      <Tab.Screen name="Month" children={() => <PlaceholderScreen title="Month" />} />
      <Tab.Screen name="Calendar" children={() => <PlaceholderScreen title="Calendar" />} />
      <Tab.Screen 
        name="Search" 
        children={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('SearchModal')}
              style={{ padding: 16, backgroundColor: '#007AFF', borderRadius: 8 }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>Open Search</Text>
            </TouchableOpacity>
          </View>
        )} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen 
          name="SearchModal" 
          component={SearchScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="EventDetails" 
          component={EventDetailsScreen}
          options={{ presentation: 'card' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 