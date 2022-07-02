import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import ImageSelector from "../components/ImageSelector";
import { savePlace } from "../store/place.slices";
import colors from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    margin: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 5,
  },
});

const NewPlaceSreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();

  const handleTitleChange = (text) => setTitle(text);

  const handleSave = () => {
    dispatch(savePlace(title, image));
    navigation.navigate("Place");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Titulo</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handleTitleChange}
        />
        <ImageSelector
          onImage={(image) => {
            setImage(image);
          }}
        />
        <Button
          title="Grabar Dirección"
          color={colors.primary}
          onPress={() => handleSave()}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceSreen;
