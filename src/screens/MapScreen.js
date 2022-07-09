import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IonicIcon from '@expo/vector-icons/Ionicons'
import colors from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MapScreen = ({ navigation }) => {
  const initialRegion = {
    latitude: 40.712784,
    longitude: -74.005941,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  const [selectedLocation, setSelectedLocation] = useState();

  const handlerPickLocation = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  }

  const handleSaveLocation = () => {
    if(selectedLocation) {
      navigation.navigate('NewPlace', { mapLocation: selectedLocation });
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveLocation}>
          <IonicIcon name="md-save-sharp" size={20} color={colors.black} />
        </TouchableOpacity>
      )
    });
  }
  , [navigation, handleSaveLocation]);
  
  return (
    <MapView 
      style={styles.container}
      initialRegion={initialRegion}
      onPress={(e) => handlerPickLocation(e)}
    >
      {selectedLocation && (
        <Marker
          title="Ubicacion seleccionada"
          coordinate={{
            ...selectedLocation,
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          />
      )}
    </MapView>
  );
};

export default MapScreen;
