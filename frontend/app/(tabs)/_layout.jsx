import { Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function AppLayout() {
  // Load custom font
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <Tabs
      screenOptions={{
        // Header (top bar)
        headerStyle: {
          backgroundColor: "#8E2DE2",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "SpaceMono",
          fontSize: 22,
        },

        // Bottom tab bar
        tabBarStyle: {
          backgroundColor: "#8E2DE2",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ccc",
      }}
    >
      {/* Lectures Tab */}
      <Tabs.Screen
        name="lectures"
        options={{
          title: "Lectures",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="video-library" size={size} color={color} />
          ),
        }}
      />

      {/* Notes Tab */}
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notes" size={size} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
