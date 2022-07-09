import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    preview: {
        width: "100%",
        height: 250,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.primary,
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    }
})

const LocationSelector = ({ onLocation }) => {
    const [pickedLocation, setPickedLocation] = React.useState();

    const handleGetLocation = async () => {
        const isLocationGranted = await verifyPermissions();

        if(!isLocationGranted) return

        const location = await Location.getCurrentPositionAsync({
            timeInterval: 5000,
        });

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })

        onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
    }

    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permisos Insuficientes",
                "Por favor, habilita la localización para continuar",
                [{ text: "Okay" }]
            );
            return false;
        }

        return true;
    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {pickedLocation ? (
                    <Text>{`latitud: ${pickedLocation.lat}, longitud: ${pickedLocation.lng}`}</Text>
                ) : (
                    <Text>Esperando ubicacion...</Text>
                )}
            </View>
            <Button title="Obtener ubicacion" onPress={handleGetLocation} color={colors.primary} />
        </View>
    )
}

export default LocationSelector;