import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function MajorArcanas() {
  const router = useRouter();
  const [cartas, setCartas] = useState([]);

useEffect(() => {
  axios.get("http://localhost:5000/api/cartas")
    .then((response) => {
      const ordemArcanosMaiores = [
        "the-fool", "the-magician", "the-high-priestess", "the-empress",
        "the-emperor", "the-hierophant", "the-lovers", "the-chariot",
        "strength", "the-hermit", "wheel-of-fortune", "justice",
        "the-hanged-man", "death", "temperance", "the-devil",
        "the-tower", "the-star", "the-moon", "the-sun", "judgement", "the-world"
      ];

      let cartasValidas = ordemArcanosMaiores
        .map(slug => response.data.find(carta => carta.slug === slug))
        .filter(Boolean);

      // Completa a última linha se necessário
      const resto = cartasValidas.length % 3;
      if (resto !== 0) {
        const faltando = 3 - resto;
        for (let i = 0; i < faltando; i++) {
          cartasValidas.push({ slug: `blank-${i}`, blank: true });
        }
      }

      setCartas(cartasValidas);
    })
    .catch((error) => {
      console.error("Erro ao buscar cartas:", error);
    });
}, []);

const renderItem = ({ item }) => {
  if (item.blank) {
    return <View style={[styles.card, { backgroundColor: "transparent" }]} />;
  }

  return (
    <View style={styles.card}>
      {item.img_url && (
        <Image
          source={{ uri: item.img_url }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.cardText}>{item.name_pt || item.name}</Text>
    </View>
  );
};

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Arcanos Maiores</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartas}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  grid: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: width / 3.5,
    height: 140,
    borderRadius: 8,
  },
  cardText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
});
