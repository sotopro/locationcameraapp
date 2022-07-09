import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import MapPreview from "./MapPreview";

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
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
})

const LocationSelector = ({ onLocation }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [pickedLocation, setPickedLocation] = useState();

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
    
    const handlePickLocation = async () => {
        const isLocationGranted = await verifyPermissions();
        if(!isLocationGranted) return;
        navigation.navigate('Map')
    }

    const mapLocation = route?.params?.mapLocation;

    useEffect(() => {
        if(mapLocation) {
            setPickedLocation({
                lat: mapLocation.latitude,
                lng: mapLocation.longitude,
            });
            onLocation({
                lat: mapLocation.latitude,
                lng: mapLocation.longitude,
            });
        }
    }, [mapLocation])

    return (
        <View style={styles.container}>
            <MapPreview location={pickedLocation} style={styles.preview}>
                <Text>Esperando ubicacion...</Text>
            </MapPreview>
            <View style={styles.buttons}>
            <Button title="Obtener ubicacion" onPress={handleGetLocation} color={colors.primary} />
            <Button title="Elegir del mapa" onPress={handlePickLocation} color={colors.primary} />
            </View>
        </View>
    )
}

export default LocationSelector;