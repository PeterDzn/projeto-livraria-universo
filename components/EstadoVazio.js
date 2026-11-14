import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EstadoVazio({ icone, mensagem, escuro, children }) {
  return (
    <View style={styles.vazio}>
      <Ionicons name={icone} size={56} color={escuro ? '#1c3a56' : '#c9c2b8'} />
      <Text style={[styles.texto, escuro && styles.textoEscuro]}>{mensagem}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  texto: {
    color: '#6b7785',
    fontSize: 15,
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  textoEscuro: {
    color: '#8a9bb0',
  },
});