import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, SectionList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// Minor Arcana by suits
const minorArcanaData = [
  {
    title: "Paus",
    data: ["Ás de Paus", "Dois de Paus", "Três de Paus", "Quatro de Paus", "Cinco de Paus", "Seis de Paus", "Sete de Paus", "Oito de Paus", "Nove de Paus", "Dez de Paus", "Pajem de Paus", "Cavaleiro de Paus", "Rainha de Paus", "Rei de Paus"]
  },
  {
    title: "Copas",
    data: ["Ás de Copas", "Dois de Copas", "Três de Copas", "Quatro de Copas", "Cinco de Copas", "Seis de Copas", "Sete de Copas", "Oito de Copas", "Nove de Copas", "Dez de Copas", "Pajem de Copas", "Cavaleiro de Copas", "Rainha de Copas", "Rei de Copas"]
  },
  {
    title: "Espadas",
    data: ["Ás de Espadas", "Dois de Espadas", "Três de Espadas", "Quatro de Espadas", "Cinco de Espadas", "Seis de Espadas", "Sete de Espadas", "Oito de Espadas", "Nove de Espadas", "Dez de Espadas", "Pajem de Espadas", "Cavaleiro de Espadas", "Rainha de Espadas", "Rei de Espadas"]
  },
  {
    title: "Ouros",
    data: ["Ás de Ouros", "Dois de Ouros", "Três de Ouros", "Quatro de Ouros", "Cinco de Ouros", "Seis de Ouros", "Sete de Ouros", "Oito de Ouros", "Nove de Ouros", "Dez de Ouros", "Pajem de Ouros", "Cavaleiro de Ouros", "Rainha de Ouros", "Rei de Ouros"]
  }
];

export default function MinorArcanas() {
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
        <Text style={styles.title}>Arcanos Menores</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={minorArcanaData}
        keyExtractor={(item) => item}
        contentContainerStyle={{ padding: 20 }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
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
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 18,
    borderRadius: 18,
    marginBottom: 10,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
  },
});
