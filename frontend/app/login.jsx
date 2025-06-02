import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Fundo com gradiente */}
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Imagem de brilho ao fundo */}
      <Image
        source={require("../assets/gradient.png")}
        style={styles.eclipse}
        resizeMode="contain"
      />

      {/* Cabeçalho com botão de voltar */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Entrar</Text>
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
  eclipse: {
    position: "absolute",
    width: height * 1.2,
    height: height * 1.2,
    top: height / 2 - (height * 1.2) / 2,
    left: width / 2 - (height * 1.2) / 2,
    zIndex: 0,
    opacity: 0.2,
  },
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
  content: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
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
  forgotPassword: {
    color: "#ccc",
    fontSize: 14,
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 30,
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
});
