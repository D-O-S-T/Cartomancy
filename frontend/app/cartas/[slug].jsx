import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function CardScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const [carta, setCarta] = useState(null);

  useEffect(() => {
    axios
      // (Talvez seja necessário alterar de localhost para o IP da máquina na hora de apresentar)
      .get("http://localhost:5000/api/cartas")
      .then((response) => {
        const cartaEncontrada = response.data.find((c) => c.slug === slug);
        setCarta(cartaEncontrada);
      })
      .catch((error) => {
        console.error("Erro ao buscar carta:", error);
      });
  }, [slug]);

  if (!carta) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando carta...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{carta.nome}</Text>

        {carta.img_url && (
          <Image
            source={{ uri: carta.img_url }}
            style={styles.image}
            resizeMode="contain"
          />
        )}

        <Text style={styles.description}>{carta.descricao}</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  content: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 300, // 2:3 aspect ratio
    borderRadius: 12,
    marginBottom: 30,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
