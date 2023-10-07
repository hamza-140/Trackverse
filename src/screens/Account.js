import React, { useContext } from "react";
import { Button, Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Account = ({ navigation }) => {
  const { signout } = useContext(Context);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Spacer>
        <Text h3>Account Screen</Text>
      </Spacer>
      <Spacer>
        <Button title="Sign Out" onPress={signout}></Button>
      </Spacer>
    </SafeAreaView>
  );
};

export default Account;
