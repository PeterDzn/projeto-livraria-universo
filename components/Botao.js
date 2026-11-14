import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Botao({ texto, aoPressionar, icone, estilo }) {
  return (
    <TouchableOpacity
      style={[styles.botao, estilo]}
      activeOpacity={0.8}
      onPress={aoPressionar}>
      {icone && <Ionicons name={icone} size={22} color="#031220" />}
      <Text style={[styles.texto, icone && styles.textoComIcone]}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    backgroundColor: '#F6D057',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#031220',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoComIcone: {
    marginLeft: 8,
  },
});