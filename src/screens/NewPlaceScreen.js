import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from "react-native";
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
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Titulo</Text>
        <TextInput style={styles.input} />
        <Button
          title="Grabar Dirección"
          color={colors.primary}
          onPress={() => null}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceSreen;
