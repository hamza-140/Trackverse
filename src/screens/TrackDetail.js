import React, { useContext } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context } from "../../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetail = ({ route }) => {
  const { state } = useContext(Context);
  const trackId = route.params.trackId;

  const selectedTrack = state.find((track) => track._id === trackId);
  const initialCoords = selectedTrack.locations[0].coords;
  if (selectedTrack) {
    console.log(selectedTrack.name);
  } else {
    console.log("Track not found");
  }

  return (
    <SafeAreaView>
      <MapView
        style={{ height: 300 }}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polyline
          coordinates={selectedTrack.locations.map((loc) => loc.coords)}
        ></Polyline>
      </MapView>
    </SafeAreaView>
  );
};

export default TrackDetail;
