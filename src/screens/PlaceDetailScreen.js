import React from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import MapPreview from "../components/MapPreview";
import { useSelector } from "react-redux";
import colors from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    height: "40%",
    minHeight: 300,
    width: "100%",
  },
  location: {
    margin: 20,
    width: "90%",
    maxWidth: 350,
    backgroundColor: colors.white,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary,
    textAlign: "center",
  },
  map: {
    height: 300
  },
});

const PlaceDetailScreen = ({ navigation, route }) => {
  const { placeId } = route.params;
  const place = useSelector((state) => state.place.places.find((place) => place.id === placeId));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: place?.image }} style={styles.image}/>
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview style={styles.map} location={{ lat: place.lat, lng: place.lng }}>
          <Text>Ubicacion no disponible </Text>
        </MapPreview>
      </View>
    </ScrollView>
  );
};

export default PlaceDetailScreen;
