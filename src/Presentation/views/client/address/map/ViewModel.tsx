import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Camera } from "react-native-maps";

const ClientAddressMapViewModel = () => {
  // Nuevo state para la posición:
  const [messagePermissions, setMessagePermissions] = useState("");
  const [refPoint, setRefPoint] = useState({
    name: "",
    latitude: 0.0,
    longitude: 0.0,
  });
  const [position, setPosition] = useState<Location.LocationObjectCoords>();
  const mapRef = useRef<MapView | null>(null);

  // Con un useEffect disparamos el código para obtener location apenas llamemos al ViewModel
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();

      if (foreground.granted) {
        // Vemos si el usuario ha concedido el permiso
        startForegroundUpdate();
      }
    };

    requestPermissions();
  }, []);

  // Método para ver lo del cambio de punto de referencia
  const onRegionChangeComplete = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const place = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });
      let city;
      let street;
      let streetNumber;

      place.find((p) => {
        city = p.city;
        street = p.street;
        streetNumber = p.streetNumber;
        setRefPoint({
          name: `${street}, ${streetNumber}, ${city}`,
          latitude: latitude,
          longitude: longitude,
        });
      });
    } catch (error) {
      console.log("ERROR: " + error);
    }
  };

  // Ahora obtenenemos la ubicación:
  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();

    // Averiguamos si el usuario no habilitó los permisos
    if (!granted) {
      setMessagePermissions("Permiso de ubicación denegado");
      return;
    }
    // En caso de que sí, obtenemos la ultima ubicación conocida
    const location = await Location.getLastKnownPositionAsync(); // UBICACION UNA SOLA VEZ
    setPosition(location?.coords); // obtenemos las coordenadas en las que estamos ubicados

    const newCamera: Camera = {
      center: {
        latitude: location?.coords.latitude!,
        longitude: location?.coords.longitude!,
      },
      zoom: 15, // Qué tan cerca queremos que el punto se muestre (1-20)
      heading: 0,
      pitch: 0,
      altitude: 0,
    };

    mapRef.current?.animateCamera(newCamera, { duration: 2000 });
  };

  return {
    messagePermissions,
    position,
    mapRef,
    ...refPoint, // Pasaremos las 3 variables dentro del objeto refPoint
    onRegionChangeComplete,
  };
};

export default ClientAddressMapViewModel;
