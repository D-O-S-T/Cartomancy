import { Tabs, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function AppLayout() {
  const router = useRouter();

  // Carrega fonte customizada
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  // Componente logo centralizado no header
  const HeaderTitle = () => (
    <View style={styles.headerTitle}>
      <Image
        source={require("../../assets/eremita-logo.png")}
        style={styles.topLogo}
        resizeMode="contain"
      />
    </View>
  );

  // Botão voltar customizado no header
  const HeaderBackButton = () => (
    <TouchableOpacity
      style={styles.headerBackButton}
      onPress={() => router.back()}
      activeOpacity={0.7}
    >
      <AntDesign name="arrowleft" size={20} color="#fff" />
      <Text style={styles.backButtonText}>Voltar</Text>
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8E2DE2",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "SpaceMono",
          fontSize: 22,
        },
        tabBarStyle: {
          backgroundColor: "#8E2DE2",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ccc",
      }}
    >
      <Tabs.Screen
        name="lectures"
        options={{
          title: "lições",
          headerTitle: () => <HeaderTitle />,
          headerLeft: () => <HeaderBackButton />,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "anotações",
          headerTitle: () => <HeaderTitle />,
          headerLeft: () => <HeaderBackButton />,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notes" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "perfil",
          headerTitle: () => <HeaderTitle />,
          headerLeft: () => <HeaderBackButton />,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />

    <Tabs.Screen
      name="materiais"
      options={{
        title: "materiais",
        headerTitle: () => <HeaderTitle />,
        headerLeft: () => <HeaderBackButton />,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="play-circle-outline" size={size} color={color} />
        ),
      }}
    />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  topLogo: {
    width: 120,
    height: 35,
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerBackButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
});
