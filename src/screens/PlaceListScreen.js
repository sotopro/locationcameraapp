import React from "react";
import { FlatList, StyleSheet, Text, View} from "react-native";
import { useSelector } from "react-redux";
import PlaceItem from "../components/PlaceItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  }
});

const PlaceListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.place.places);
  console.log(places)
  const onSelectPlace = (place) => {
    navigation.navigate("PlaceDetail", { placeId: place.id });
  }

  const renderItem = ({ item }) => {
    return <PlaceItem {...item} address='123 Street, City, Country' onSelect={onSelectPlace}/>;
  }

  const ListEmptyComponent = () => {
    return  (
      <View style={styles.emptyContainer}>
        <Text>No hay lugares</Text>
      </View>
    )
  }

  return (
    <FlatList 
      style={styles.container}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default PlaceListScreen;
