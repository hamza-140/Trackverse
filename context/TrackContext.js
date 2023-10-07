import trackerAPI from "../api/tracker";
import createDataContext from "./createDataContext";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};
const fetchTracks = (dispatch) => async () => {
  const response = await trackerAPI.get("/tracks");
  dispatch({ type: "fetch_tracks", payload: response.data });
};
const createTrack = (dispatch) => async (name, locations) => {
  try {
    await trackerAPI.post("/tracks", { name, locations });
  } catch (err) {
    if (err.response) {
      console.log("Server Error Data:", err.response.data);
      console.log("Server Error Status:", err.response.status);
    } else if (err.request) {
      console.error("Request Error:", err.request);
    } else {
      console.error("Error:", err.message);
    }
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  {
    fetchTracks,
    createTrack,
  },
  []
);
