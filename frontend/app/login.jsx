import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const handleLogin = async () => {
    console.log("handleLogin chamado");
    if (!email || !senha) {
      setMessageColor("red");
      setMessage("Preencha email e senha.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha_hash: senha }),
      });

      const json = await response.json();

      if (!response.ok) {
        setMessageColor("red");
        setMessage(json.erro || "Erro no login.");
        return;
      }

      setMessageColor("green");
      setMessage(`Bem-vindo, ${json.usuario.nome}!`);

      setTimeout(() => router.push("/lectures"), 1000);
    } catch (error) {
      console.error(error);
      setMessageColor("red");
      setMessage("Não foi possível conectar ao servidor.");
    }
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
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        {message ? (
          <Text
            style={{
              color: messageColor,
              marginTop: 20,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {message}
          </Text>
        ) : null}

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 80, // <-- isso joga tudo pra cima
  },
  title: {
    color: "#fff",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
  input: {
    width: 280,
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 60,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
    forgotPassword: {
    color: "#ccc",
    fontSize: 14,
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 30,
  },
  backButton: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 20,
  },
});
