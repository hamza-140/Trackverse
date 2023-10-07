import { useContext, useEffect } from "react";
import { Context } from "../../context/AuthContext";

const Checker = () => {
  const { state, signup, clearErrorMessage, tryLocalSignIn } =
    useContext(Context);

  useEffect(() => {
    tryLocalSignIn();
  }, []);
  return null;
};

export default Checker;
