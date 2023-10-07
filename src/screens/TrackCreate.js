import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
// import "../_mockLocation";
import { Context as LocationContext } from "../../context/LocationContext";
import useLocation from "../../hooks/useLocation";
import { useIsFocused } from "@react-navigation/native";
import TrackForm from "../components/TrackForm";

const TrackCreate = () => {
  const { addLocation, state } = useContext(LocationContext);
  const isFocused = useIsFocused();
  const callback = useCallback(
    (location) => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );
  const [err] = useLocation(isFocused || state.recording, callback);
  return (
    <SafeAreaView>
      <Text h2>Create a Track</Text>
      <Map></Map>
      {err ? <Text>Location services are disabled</Text> : null}
      <TrackForm></TrackForm>
    </SafeAreaView>
  );
};

export default TrackCreate;
