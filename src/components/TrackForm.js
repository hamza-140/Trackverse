import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context } from "../../context/LocationContext";
import useSaveTrack from "../../hooks/useSaveTrack";
const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(Context);
  const [saveTrack] = useSaveTrack();
  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={changeName}
          placeholder="Enter name"
        ></Input>
      </Spacer>
      <Spacer>
        {recording ? (
          <Button title="Stop" onPress={stopRecording}></Button>
        ) : (
          <Button onPress={startRecording} title="Start Recording"></Button>
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button onPress={saveTrack} title="Save Recording"></Button>
        ) : null}
      </Spacer>
    </>
  );
};

export default TrackForm;
