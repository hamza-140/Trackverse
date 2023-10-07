import createDataContext from "./createDataContext";

const ADD = "add_current_location";
const ADD_LOCATION = "add_location";
const START = "start_recording";
const STOP = "stop_recording";
const NAME = "change_name";
const RESET = "reset";

const locationReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, currentLocation: action.payload };
    case START:
      return { ...state, recording: true };
    case STOP:
      return { ...state, recording: false };
    case ADD_LOCATION:
      return { ...state, locations: [...state.locations, action.payload] };
    case NAME:
      return { ...state, name: action.payload };
    case RESET:
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

const changeName = (dispatch) => (name) => {
  dispatch({ type: NAME, payload: name });
};

const startRecording = (dispatch) => () => {
  dispatch({ type: START });
};
const stopRecording = (dispatch) => () => {
  dispatch({ type: STOP });
};
const addLocation = (dispatch) => (location, recording) => {
  console.log(location);
  dispatch({ type: ADD, payload: location });
  if (recording) {
    dispatch({ type: ADD_LOCATION, payload: location });
  }
};

const reset = (dispatch) => () => {
  dispatch({ type: RESET });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    startRecording,
    stopRecording,
    addLocation,
    changeName,
    reset,
  },
  { recording: false, name: "", locations: [], currentLocation: null }
);
