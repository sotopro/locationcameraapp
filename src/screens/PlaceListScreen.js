import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import { loadPlaces } from "../store/place.slices";

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
  const dispatch = useDispatch();
  const places = useSelector((state) => state.place.places);
  const onSelectPlace = (id) => {
    navigation.navigate("PlaceDetail", { placeId: id });
  }

  const renderItem = ({ item }) => {
    return <PlaceItem {...item} onSelect={onSelectPlace}/>;
  }

  const ListEmptyComponent = () => {
    return  (
      <View style={styles.emptyContainer}>
        <Text>No hay lugares</Text>
      </View>
    )
  }

  useEffect(() => {
    dispatch(loadPlaces());
  }, []);

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
