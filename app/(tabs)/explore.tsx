import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

const BiteMe = () => {
  const [location, setLocation] = useState(null);
  const [activeTab, setActiveTab] = useState('menu');
  const [restaurants] = useState([
    {
      id: '1',
      name: 'Reading Cafe',
      rating: 4.2,
      cuisines: ['Italian', 'French'],
      distance: '1.3 km',
      discount: '10%',
      image: 'https://picsum.photos/400/200'
    },
    {
      id: '2',
      name: 'Jam Book',
      rating: 4.5,
      cuisines: ['Italian', 'Japanese'],
      distance: '1.6 km',
      discount: '10%',
      image: 'https://picsum.photos/400/200'
    }
  ]);

  const menuItems = [
    {
      id: '1',
      name: 'Neapolitan',
      description: 'Tomatoes, basil leaves, olives, mozzarella, champignons',
      price: '$12',
      size: 'Large',
      glutenFree: true,
      image: 'https://picsum.photos/100/100'
    },
    {
      id: '2',
      name: 'Margarita',
      description: 'Cheese, onion, salami, & tomato pure',
      price: '$9',
      size: 'Meduim',
      glutenFree: true,
      image: 'https://picsum.photos/100/100'
    }
  ];

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Please enable location services to use this feature.');
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        Alert.alert('Error', 'Failed to get your location.');
      }
    })();
  }, []);

  const WelcomeScreen = () => (
    <View style={styles.welcomeContainer}>
      <Image
        source={{ uri: 'https://picsum.photos/400/400' }}
        style={styles.welcomeImage}
      />
      <Text style={styles.welcomeTitle}>Welcome to BiteMe</Text>
      <Text style={styles.welcomeHeading}>Find food{'\n'}for your special taste</Text>
      <Text style={styles.welcomeText}>
        We can help you to find the place{'\n'}to eat - perfectly fit at your preferences
      </Text>
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.loginLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const MapScreen = () => (
    <View style={styles.mapContainer}>
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Nearby</Text>
          <Ionicons name="close" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Open now</Text>
          <Ionicons name="close" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Italian</Text>
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
      </MapView>

      <View style={styles.suggestedContainer}>
        <View style={styles.suggestedHeader}>
          <Text style={styles.suggestedTitle}>Suggested restaurants</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {restaurants.map(restaurant => (
            <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{restaurant.discount}</Text>
              </View>
              <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{restaurant.rating}</Text>
                </View>
                <Text style={styles.cuisineText}>
                  {restaurant.cuisines.join(' • ')}
                </Text>
                <View style={styles.distanceContainer}>
                  <Ionicons name="location" size={16} color="#FF4B55" />
                  <Text style={styles.distanceText}>{restaurant.distance}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const RestaurantScreen = () => (
    <View style={styles.restaurantContainer}>
      <View style={styles.restaurantHeader}>
        <View style={styles.flagContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/30' }}
            style={styles.flagIcon}
          />
        </View>
        <Text style={styles.restaurantTitle}>The James SoHo</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FF4B55" />
          <Text style={styles.rating}>4.7</Text>
        </View>
        <Text style={styles.cuisineTypes}>Italian • Spanish</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'info' && styles.activeTab]}
          onPress={() => setActiveTab('info')}
        >
          <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={[styles.tabText, activeTab === 'menu' && styles.activeTabText]}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'comments' && styles.activeTab]}
          onPress={() => setActiveTab('comments')}
        >
          <Text style={[styles.tabText, activeTab === 'comments' && styles.activeTabText]}>Comments</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map(item => (
          <View key={item.id} style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.menuItemImage} />
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              {item.glutenFree && (
                <View style={styles.glutenFreeContainer}>
                  <Ionicons name="checkmark-circle" size={16} color="#FF4B55" />
                  <Text style={styles.glutenFreeText}>Gluten free dough</Text>
                </View>
              )}
              <View style={styles.menuItemFooter}>
                <Text style={styles.menuItemSize}>{item.size}</Text>
                <Text style={styles.menuItemPrice}>{item.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book a table</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <RestaurantScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  welcomeContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FF4B55',
  },
  welcomeImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  welcomeHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    lineHeight: 40,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 30,
    lineHeight: 24,
  },
  signUpButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FF4B55',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#FFF',
  },
  loginLink: {
    color: '#FFF',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
  },
  filterBar: {
    flexDirection: 'row',
    padding: 15,
    zIndex: 1,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterChipText: {
    marginRight: 5,
  },
  map: {
    flex: 1,
  },
  suggestedContainer: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  suggestedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  suggestedTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#666',
  },
  restaurantContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  restaurantHeader: {
    padding: 20,
    alignItems: 'center',
  },
  flagIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginBottom: 10,
  },
  restaurantTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    marginLeft: 5,
    color: '#FF4B55',
    fontWeight: '600',
  },
  cuisineTypes: {
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF4B55',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#FF4B55',
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  menuItemDescription: {
    color: '#666',
    marginBottom: 5,
  },
  glutenFreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  glutenFreeText: {
    marginLeft: 5,
    color: '#FF4B55',
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemSize: {
    color: '#666',
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF4B55',
  },
  bookButton: {
    backgroundColor: '#0F172A',
    margin: 20,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BiteMe;