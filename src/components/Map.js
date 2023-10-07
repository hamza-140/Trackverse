import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <MapView
      style={{ height: 300 }}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,0.3)"
      ></Circle>
      <Polyline coordinates={locations.map((loc) => loc.coords)}></Polyline>
    </MapView>
  );
};

export default Map;
