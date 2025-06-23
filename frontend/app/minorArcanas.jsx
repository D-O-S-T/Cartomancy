import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function MinorArcanas() {
  const router = useRouter();
  const [cartasPorNaipe, setCartasPorNaipe] = useState({
    Paus: [],
    Copas: [],
    Espadas: [],
    Ouros: [],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/cartas")
      .then((response) => {
        const todas = response.data;

        const paus = todas.filter(c => c.name_short.startsWith("w"));
        const copas = todas.filter(c => c.name_short.startsWith("c"));
        const espadas = todas.filter(c => c.name_short.startsWith("s"));
        const ouros = todas.filter(c => c.name_short.startsWith("p"));

        const ordenar = (a, b) => a.name_short.localeCompare(b.name_short);

        setCartasPorNaipe({
          Paus: paus.sort(ordenar),
          Copas: copas.sort(ordenar),
          Espadas: espadas.sort(ordenar),
          Ouros: ouros.sort(ordenar),
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar cartas:", error);
      });
  }, []);

  const nomesAlternativos = {
    "Page of Wands": "Valete de Paus",
    "Page of Cups": "Valete de Copas",
    "Page of Swords": "Valete de Espadas",
    "Page of Pentacles": "Valete de Ouros",
    "Pajem de Paus": "Valete de Paus", 
    "Pajem de Copas": "Valete de Copas",
    "Pajem de Espadas": "Valete de Espadas",
    "Pajem de Ouros": "Valete de Ouros"
  };

  const renderCarta = ({ item }) => {
    const nomeBase = item.nome || item.name_pt || item.name;
    const nomeCorrigido = nomesAlternativos[nomeBase] || nomeBase;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/cartas/${item.slug}`)} // Navega para página do detalhe
      >
        {item.img_url && (
          <Image
            source={{ uri: item.img_url }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Text style={styles.cardText}>{nomeCorrigido}</Text>
      </TouchableOpacity>
    );
  };

  const renderNaipe = (titulo, data) => {
    const dataCompletada = [...data];
    const resto = dataCompletada.length % 3;
    if (resto !== 0) {
      for (let i = 0; i < 3 - resto; i++) {
        dataCompletada.push({ slug: `blank-${titulo}-${i}`, blank: true });
      }
    }

    return (
      <View key={titulo}>
        <Text style={styles.sectionTitle}>{titulo}</Text>
        <FlatList
          data={dataCompletada}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) =>
            item.blank ? <View style={[styles.card, { backgroundColor: "transparent" }]} /> : renderCarta({ item })
          }
          numColumns={3}
          scrollEnabled={false}
        />
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
        <Text style={styles.title}>Arcanos Menores</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {renderNaipe("Paus", cartasPorNaipe.Paus)}
        {renderNaipe("Copas", cartasPorNaipe.Copas)}
        {renderNaipe("Espadas", cartasPorNaipe.Espadas)}
        {renderNaipe("Ouros", cartasPorNaipe.Ouros)}
      </ScrollView>
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
    marginLeft: 10,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 30,
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
