import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrackList from "./src/screens/TrackList";
import TrackDetail from "./src/screens/TrackDetail";
import TrackCreate from "./src/screens/TrackCreate";
import Account from "./src/screens/Account";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as LocationProvider } from "./context/LocationContext";
import { Provider as TrackProvider } from "./context/TrackContext";
import { setNavigator } from "./src/navigationRef";
import Checker from "./src/screens/Checker";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Define the stack navigator
function AppStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Checker">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checker"
        component={Checker}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TrackFlow() {
  return (
    <Stack.Navigator initialRouteName="TrackListScreen">
      <Stack.Screen
        name="TrackListScreen"
        component={TrackList}
        options={{
          title: "Tracks",
          headerLeft: () => null,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="TrackDetail"
        component={TrackDetail}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}

// Define the tab navigator
function AppTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TrackListTab"
        component={TrackFlow}
        options={{
          headerShown: false,
          tabBarLabel: "Track List",
          tabBarStyle: { paddingBottom: 10 },
        }}
      />
      <Tab.Screen
        name="TrackCreate"
        component={TrackCreate}
        options={{
          headerShown: false,
          tabBarLabel: "Create Track",
          tabBarStyle: { paddingBottom: 10 },
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarLabel: "Account",
          tabBarStyle: { paddingBottom: 10 },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <NavigationContainer ref={(navigator) => setNavigator(navigator)}>
            <Stack.Navigator
              initialRouteName="AppStackNavigator"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="AppStackNavigator"
                component={AppStackNavigator}
              />
              <Stack.Screen
                name="AppTabNavigator"
                component={AppTabNavigator}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
}

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function MainFlow() {
//   return (
//     <Tab.Navigator>

//     </Tab.Navigator>
//   );
// }

// function App() {
//   return (

//           <NavigationContainer ref={(navigator) => setNavigator(navigator)}>
//             <Stack.Navigator initialRouteName="Checker">
//               <Stack.Screen
//                 name="Checker"
//                 component={Checker}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="SignUp"
//                 component={SignUp}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="SignIn"
//                 component={SignIn}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="MainFlow"
//                 component={MainFlow}
//                 options={{ headerShown: false }}
//               />
//             </Stack.Navigator>
//           </NavigationContainer>
//         </AuthProvider>
//       </LocationProvider>
//     </TrackProvider>
//   );
// }

// export default () => {
//   return <App></App>;
// };
