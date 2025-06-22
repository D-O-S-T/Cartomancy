import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 430,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#000'
  },
  tabBarStyle: {
    backgroundColor: "#8E2DE2",
    borderTopWidth: 0,
    maxWidth: 430,
    alignSelf: 'center',
    width: '100%',
    height: 56,
  }
});
