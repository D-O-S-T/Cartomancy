import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Home() {
    return (
        <View style={styles.container}>

          <View style={styles.topCapsule}>
    <Image
      source={require('../assets/EREMITA.png')}
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
                source={require('../assets/Eclipse.png')}
                style={styles.eclipse}
                resizeMode="contain"
        />

            <Text style={styles.title}>Home Screen</Text>
            <Text style={styles.description}>ANA PAULA SAPATÃO</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: 'pink',
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