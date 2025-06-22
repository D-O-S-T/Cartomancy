import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const majorArcanaCards = [
  "O Louco", "O Mago", "A Sacerdotisa", "A Imperatriz", "O Imperador",
  "O Hierofante", "Os Amantes", "O Carro", "A Força", "O Eremita",
  "A Roda da Fortuna", "A Justiça", "O Enforcado", "A Morte", "A Temperança",
  "O Diabo", "A Torre", "A Estrela", "A Lua", "O Sol", "O Julgamento", "O Mundo"
];

export default function MajorArcanas() {
  const router = useRouter();

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
        data={majorArcanaCards}
        keyExtractor={(item) => item}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
          </View>
        )}
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
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
  },
});
