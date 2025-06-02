import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function TabsLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C33A3" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'SpaceMono',
          fontSize: 22,
          fontWeight: 'bold',
        },
        tabBarLabelStyle: {
          fontFamily: 'SpaceMono',
          fontSize: 14,
        },
        tabBarActiveTintColor: '#94399B',
        tabBarInactiveTintColor: '#999',
      }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
