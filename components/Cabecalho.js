import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Cabecalho({ titulo, aoVoltar, semLinha }) {
  return (
    <View style={[styles.cabecalho, semLinha && styles.semLinha]}>
      {aoVoltar && (
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={aoVoltar}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={28} color="#ffffff" />
        </TouchableOpacity>
      )}
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    paddingTop: 50,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#1c3a56',
  },
  semLinha: {
    borderBottomWidth: 0,
  },
  botaoVoltar: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    padding: 4,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});