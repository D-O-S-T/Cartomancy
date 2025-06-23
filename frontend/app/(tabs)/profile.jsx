import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const carregarUsuario = async () => {
      const usuarioString = await AsyncStorage.getItem("usuarioLogado");
      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        setUser(usuario);
      } else {
        setUser({
          nome: "Visitante",
          tipo_usuario: "guest",
          avatar: require("../../assets/avatar-placeholder.jpg"),
        });
      }
    };

    carregarUsuario();
  }, []);

  if (!user) {
    return null; // ou um loading
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <Image
          source={user.avatar || require("../../assets/avatar-placeholder.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.nome}</Text>
        {user.email && <Text style={styles.email}>{user.email}</Text>}

        {/* Só mostra o botão de editar se não for visitante */}
        {user.tipo_usuario !== "guest" && (
          <TouchableOpacity style={styles.button}>
            <Feather name="edit-2" size={20} color="#fff" />
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        )}

        {/* Se for admin, mostra o botão de administração e leva pra /admin */}
        {user.tipo_usuario === "admin" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/admin")}
          >
            <Feather name="settings" size={20} color="#fff" />
            <Text style={styles.buttonText}>Administração</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={async () => {
            await AsyncStorage.removeItem("usuarioLogado");
            setUser({
              nome: "Visitante",
              tipo_usuario: "guest",
              avatar: require("../../assets/avatar-placeholder.jpg"),
            });
            router.replace("/"); // Redireciona para a tela inicial
          }}
        >
          <Feather name="log-out" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8E2DE2",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#C13584",
    marginTop: 32,
  },
});
