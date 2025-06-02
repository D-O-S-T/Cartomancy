import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const [selectedDeck, setSelectedDeck] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.topCapsule}>
        <Image
          source={require('../assets/eremita-logo.png')}
          style={styles.topLogo}
          resizeMode="contain"
        />
      </View>

      <LinearGradient
        colors={['#8E2DE2', '#C13584']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Image
        source={require('../assets/gradient.png')}
        style={styles.eclipse}
        resizeMode="contain"
      />

      <Text style={styles.title}>Para iniciar a sua jornada, escolha o baralho:</Text>

      <View style={styles.pickerWrapper}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedDeck(value)}
          placeholder={{ label: 'Selecione um baralho...', value: null }}
          style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
            placeholder: { color: '#ddd' },
          }}
          items={[
            { label: 'Tarot de Rider-Waite', value: 'rider' },
            { label: 'Tarot de Marselha', value: 'marselha' },
            { label: 'Baralho Cigano', value: 'cigano' },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pickerWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    width: '80%',
    padding: 12,
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  eclipse: {
    position: 'absolute',
    width: height * 1.2,
    height: height * 1.2,
    top: height / 2 - (height * 1.2) / 2 + 205,
    left: width / 2 - (height * 1.2) / 2,
    zIndex: 0,
  },
  topCapsule: {
    backgroundColor: '#94399B',
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  topLogo: {
    width: 50,
    height: 50,
  },
});