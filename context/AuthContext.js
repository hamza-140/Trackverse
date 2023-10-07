import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../src/navigationRef";

// Define action types
const ADD_ERROR = "add_error";
const SIGNUP = "signup";
const CLEAR = "clear_errorMessage";
const SIGNOUT = "signout";

const authReducer = (state, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    case SIGNUP:
      return { errorMessage: "", token: action.payload };
    case SIGNOUT:
      return { token: null, errorMessage: "" };
    case CLEAR:
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_errorMessage" });
};
const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerAPI.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: SIGNUP, payload: response.data.token });
      navigate("AppTabNavigator");
    } catch (err) {
      console.error(err);
      dispatch({
        type: ADD_ERROR,
        payload: "Something went wrong. ",
      });
    }
  };

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: SIGNUP, payload: token });
    navigate("AppTabNavigator");
  } else {
    navigate("SignUp");
  }
};

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerAPI.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: SIGNUP, payload: response.data.token });
      navigate("AppTabNavigator");
    } catch (err) {
      console.error(err);
      dispatch({
        type: ADD_ERROR,
        payload: "Unable to sign in. ",
      });
    }
  };

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch({ type: SIGNOUT });
    navigate("AppStackNavigator");
  } catch (err) {
    console.error(err);
    dispatch({
      type: ADD_ERROR,
      payload: "Unable to sign out. Please try again.",
    });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignIn, signout },
  { token: null, errorMessage: "" }
);
