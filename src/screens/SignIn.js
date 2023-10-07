import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const SignIn = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Sign In");

  useFocusEffect(
    React.useCallback(() => {
      clearErrorMessage();
    }, [])
  );

  useEffect(() => {
    console.log("Current state:", state);
  }, [state]);

  // Function to validate email using a regular expression
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  // Function to check if the sign-in button should be enabled
  const checkButtonState = () => {
    if (isValidEmail(email) && password.trim() !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  useEffect(() => {
    checkButtonState();
  }, [email, password]);

  const handleSignIn = async () => {
    if (!buttonDisabled) {
      setButtonText("Signing In...");
      await signin({ email, password });
      setButtonText("Sign In"); // Reset button text after sign-in attempt
      setPassword("");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    >
      <View style={{ marginBottom: 250, marginTop: 50 }}>
        <Spacer>
          <Text h3>Sign In for Tracker</Text>
        </Spacer>
        <Spacer>
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              checkButtonState();
            }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
        </Spacer>
        <Spacer>
          <Input
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              checkButtonState();
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Spacer>
        {state.errorMessage ? (
          <Text
            style={{
              marginLeft: 15,
              color: "red",
              fontSize: 16,
            }}
          >
            {state.errorMessage}
          </Text>
        ) : null}
        <Spacer>
          <Button
            title={buttonText}
            onPress={handleSignIn}
            disabled={buttonDisabled}
            buttonStyle={{
              backgroundColor: buttonDisabled ? "grey" : "#00bfff",
            }}
          />
        </Spacer>
        <Spacer>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text h5 style={{ color: "grey", fontWeight: "bold" }}>
                Don't have an account?
              </Text>
              <Text>{} </Text>
              <Text style={{ color: "#00bfff", fontWeight: "bold" }}>
                Sign up instead.
              </Text>
            </View>
          </TouchableOpacity>
        </Spacer>
      </View>
    </ScrollView>
  );
};

export default SignIn;
