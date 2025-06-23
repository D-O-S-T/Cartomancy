import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

export default function Profile() {
  // Mock do usuário
  const user = {
    name: "Visitante",
    avatar: require("../../assets/avatar-placeholder.jpg"),
    // email: "dora.araujo@example.com",
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <TouchableOpacity style={styles.button}>
          <Feather name="edit-2" size={20} color="#fff" />
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Feather name="log-out" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 20,
    backgroundColor: "#aaa", // placeholder se a imagem não carregar
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: "#C13584",
  },
});
