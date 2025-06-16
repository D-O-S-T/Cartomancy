import { View, Text, StyleSheet } from "react-native";

export default function Lectures() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lições 📚</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140f44",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "SpaceMono",
  },
});
