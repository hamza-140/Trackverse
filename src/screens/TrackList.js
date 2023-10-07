import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context } from "../../context/TrackContext";
import { ListItem } from "@rneui/themed";
import Spacer from "../components/Spacer";

const TrackList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, fetchTracks } = useContext(Context);
  useEffect(() => {
    console.log("Fetching tracks...");
    fetchTracks()
      .then(() => {
        console.log("Tracks posts fetched successfully.");
        console.log("Current state:", state);
      })
      .catch((error) => {
        console.error("Error fetching track posts:", error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false regardless of success or error
      });

    const listener = navigation.addListener("focus", () => {
      fetchTracks();
    });

    return () => {
      if (listener) {
        listener.remove();
      } else {
        return listener;
      }
    };
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="blue" />
          <Text style={{ color: "grey", marginTop: 10 }}>Loading...</Text>
        </View>
      ) : state.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "grey", fontSize: 20 }}>
            Track your journey 🏃🗺️
          </Text>
        </View>
      ) : (
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TrackDetail", {
                    trackId: item._id,
                    name: item.name,
                  });
                }}
              >
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "bold" }}>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default TrackList;
