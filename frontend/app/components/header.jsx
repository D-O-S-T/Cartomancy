import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    zIndex: 2,
  },
  headerContent: {
    width: '100%',
    maxWidth: 280,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
