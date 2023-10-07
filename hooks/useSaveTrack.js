import { useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";
import { navigate } from "../src/navigationRef";
export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { name, locations },
    reset,
  } = useContext(LocationContext);
  const saveTrack = async () => {
    await createTrack(name, locations);
    reset();
    navigate("TrackListScreen");
  };
  return [saveTrack];
};
