import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { livros } from '../services/Livros';
import CartaoResultado from '../components/CartaoResultado';
import Cabecalho from '../components/Cabecalho';
import EstadoVazio from '../components/EstadoVazio';

const categorias = [
  { nome: 'Ficção', descricao: 'Histórias que despertam a imaginação.', icone: 'book-outline' },
  { nome: 'Fantasia', descricao: 'Mundos mágicos e aventuras épicas.', icone: 'sparkles-outline' },
  { nome: 'Terror', descricao: 'Para quem gosta de emoção e mistério.', icone: 'skull-outline' },
  { nome: 'Suspense', descricao: 'Reviravoltas que prendem até o final.', icone: 'search-outline' },
  { nome: 'Romance', descricao: 'Amor em todas as suas formas.', icone: 'heart-outline' },
  { nome: 'Autoajuda', descricao: 'Mais equilíbrio para o seu dia a dia.', icone: 'leaf-outline' },
  { nome: 'Não Ficção', descricao: 'Conhecimento que transforma.', icone: 'document-text-outline' },
  { nome: 'Infantil e Juvenil', descricao: 'Leitura para todas as idades.', icone: 'happy-outline' },
];

export default function Categorias({ navigation, route }) {
  const [escolhida, setEscolhida] = useState(null);

  // Quando a Home envia uma categoria, abre direto a lista dela.
  // O "t" muda a cada toque, então o efeito roda mesmo com a mesma categoria.
  useEffect(() => {
    if (route.params?.categoria !== undefined) {
      setEscolhida(route.params.categoria);
    }
  }, [route.params?.categoria, route.params?.t]);

  const lista = livros.filter((livro) => livro.categoria === escolhida);

  function voltar() {
    if (escolhida) {
      setEscolhida(null);
    } else {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Cabecalho titulo={escolhida || 'Categorias'} aoVoltar={voltar} />

      <View style={styles.conteudo}>
        {escolhida === null ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat.nome}
                style={styles.item}
                activeOpacity={0.7}
                onPress={() => setEscolhida(cat.nome)}>
                <View style={styles.icone}>
                  <Ionicons name={cat.icone} size={26} color="#ffffff" />
                </View>
                <View style={styles.textos}>
                  <Text style={styles.nome}>{cat.nome}</Text>
                  <Text style={styles.descricao}>{cat.descricao}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7785" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : lista.length === 0 ? (
          <EstadoVazio
            icone="book-outline"
            mensagem="Ainda não há livros nesta categoria"
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.lista}
            showsVerticalScrollIndicator={false}>
            {lista.map((livro) => (
              <CartaoResultado
                key={livro.id}
                livro={livro}
                onPress={() => navigation.navigate('Detalhes', { id: livro.id })}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031220',
  },
  conteudo: {
    flex: 1,
    backgroundColor: '#f4f1ec',
    borderRadius: 16,
    margin: 16,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#dcd6cd',
  },
  icone: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0f2a42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
    marginLeft: 14,
  },
  nome: {
    color: '#031220',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#6b7785',
    fontSize: 12,
    marginTop: 2,
  },
  lista: {
    paddingVertical: 12,
  },
});