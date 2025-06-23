import React, { useState } from "react";
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
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function CadastroScreen() {
  const router = useRouter();

  // Estados para os campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const handleCadastro = async () => {
    // Validação básica
    if (!nome || !email || !senha || !confirmarSenha) {
      setMessageColor("red");
      setMessage("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMessageColor("red");
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/usuarios/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          senha,
          tipo_usuario: "estudante", // ou "admin" se quiser
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setMessageColor("red");
        setMessage(json.erro || "Erro ao cadastrar.");
        return;
      }

      setMessageColor("green");
      setMessage(`Conta criada para ${json.usuario.nome}!`);

      setTimeout(() => router.push("/"), 1500);
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
        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

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

        <TextInput
          placeholder="Confirmar Senha"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleCadastro}>
          <Text style={styles.registerButtonText}>Cadastrar</Text>
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
  registerButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 60,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  backButton: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 20,
  },
});
