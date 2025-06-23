import { Stack } from "expo-router";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ navigation, back }) => (
          <View style={styles.headerWrapper}>
            {back ? (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.headerBackButton}
              >
                <AntDesign name="arrowleft" size={20} color="#fff" />
                <Text style={styles.backButtonText}>Voltar</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 70 }} /> // spacer to balance the header when no back button
            )}

            <View style={styles.headerTitle}>
              <Image
                source={require("../assets/eremita-logo.png")}
                style={styles.topLogo}
                resizeMode="contain"
              />
            </View>

            <View style={{ width: 70 }} /> {/* right side spacer */}
          </View>
        ),
        contentStyle: styles.container,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ title: "Painel Admin" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 430,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#000",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#8E2DE2",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  topLogo: {
    width: 120,
    height: 35,
  },
  headerTitle: {
    flex: 1,
    alignItems: "center",
  },
  headerBackButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
});
