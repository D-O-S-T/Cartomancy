import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Fundo geral roxo/rosa */}
      <LinearGradient
        colors={['#8E2DE2', '#C13584']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Imagem de brilho Eclipse (atrás de tudo) */}
      {/* <Image
        source={require('../assets/gradient.png')}
        style={styles.eclipse}
        resizeMode="contain"
      /> */}

      {/* Conteúdo em cima da imagem */}
      <View style={styles.content}>
        <Text style={styles.title}>Seja Bem Vindo(a){'\n'}ao Eremita!</Text>

        {/* Círculo com a logo dentro */}
        <View style={styles.logoPlaceholder}>
          <Image
            source={require('../assets/eremita-logo.png')}
            style={styles.logo}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Já Possuo Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Quero Me Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/home')}>
        <Text style={styles.footer}>Acessar sem cadastro</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eclipse: {
    position: 'absolute',
    width: height * 1.2,
    height: height * 1.2,
    top: height / 2 - (height * 1.2) / 2,
    left: width / 2 - (height * 1.2) / 2,
    zIndex: 0,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: 'bold',
  },
  logoPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
  },
  logo: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
  },
  button: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 55,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    marginTop: 70,
    color: '#fff',
    fontSize: 16,
  },
});