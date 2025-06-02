import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const [selectedDeck, setSelectedDeck] = useState(null);

  return (
    <View style={styles.container}>
      {/* Gradient background */}
      <LinearGradient
        colors={["#8E2DE2", "#C13584"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Circular Eclipse */}
      <Image
        source={require("../assets/gradient.png")}
        style={styles.eclipse}
        resizeMode="contain"
      />

      {/* Top capsule with logo */}
      <View style={styles.topCapsule}>
        <Image
          source={require("../assets/eremita-logo.png")}
          style={styles.topLogo}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Para iniciar a sua jornada, escolha o baralho:
        </Text>

        <View style={styles.pickerWrapper}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedDeck(value)}
            placeholder={{ label: "Selecione um baralho...", value: null }}
            style={{
              inputIOS: {
                ...styles.picker,
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: 8,
              },
              inputAndroid: {
                ...styles.picker,
                color: "#000",
                backgroundColor: "#fff",
              },
              inputWeb: {
                ...styles.picker,
                color: "#000",
                backgroundColor: "#fff",
                width: "100%",
              },
              placeholder: {
                color: "#888",
              },
            }}
            useNativeAndroidPickerStyle={false}
            items={[
              { label: "Tarot de Rider-Waite", value: "rider" },
              { label: "Tarot de Marselha", value: "marselha" },
              { label: "Baralho Cigano", value: "cigano" },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    backgroundColor: "#000",
  },
  content: {
    marginTop: 180,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  pickerWrapper: {
    width: "80%",
    maxWidth: 320,
    alignSelf: "center",
    borderRadius: 10,
    padding: 0,
    marginBottom: 30,
    overflow: "hidden",
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    outlineStyle: "none", // web only
  },
  eclipse: {
    position: "absolute",
    width: height * 1.2,
    height: height * 1.2,
    top: height / 2 - (height * 1.2) / 2 + 205,
    left: width / 2 - (height * 1.2) / 2,
    zIndex: 0,
    opacity: 0.2,
  },
  topCapsule: {
    backgroundColor: "#94399B",
    width: "100%",
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    position: "absolute",
    top: 0,
    zIndex: 3,
  },
  topLogo: {
    width: 50,
    height: 50,
  },
});
