import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Abertura({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/fundo-abertura.jpg')}
        style={styles.fundo}
      />

      {/* Camada escura para o texto ficar legível */}
      <View style={styles.escurecer} />

      <View style={styles.conteudo}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.frase}>
          Mais que livros,{'\n'}novos mundos.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        activeOpacity={0.8}
        onPress={() => navigation.replace('Abas')}>
        <Text style={styles.textoBotao}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031220',
  },
  fundo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  escurecer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(3, 18, 32, 0.55)',
  },
  conteudo: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 90,
  },
  logo: {
    width: 260,
    height: 260,
  },
  frase: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 20,
  },
  botao: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 50,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#F6D057',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#031220',
    fontSize: 17,
    fontWeight: 'bold',
  },
});