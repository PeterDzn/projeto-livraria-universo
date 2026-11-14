import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { livros } from '../services/Livros';
import { useCarrinho } from '../services/CarrinhoContext';
import Botao from '../components/Botao';

export default function Detalhes({ route }) {
  const livro = livros.find((l) => l.id === route.params.id);
  const { adicionar } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);

  // Volta o botão ao normal depois de 1,5 s; o cleanup cancela o timer
  useEffect(() => {
    if (!adicionado) return;
    const temporizador = setTimeout(() => setAdicionado(false), 1500);
    return () => clearTimeout(temporizador);
  }, [adicionado]);

  if (!livro) return null;

  const precoFormatado = livro.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  function comprar() {
    adicionar(livro);
    setAdicionado(true);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Image source={livro.capa} style={styles.capa} resizeMode="cover" />

        <Text style={styles.titulo}>{livro.titulo}</Text>
        <Text style={styles.autor}>{livro.autor}</Text>
        <Text style={styles.preco}>{precoFormatado}</Text>

        <Botao
          icone={adicionado ? 'checkmark' : 'cart-outline'}
          texto={adicionado ? 'Adicionado ao carrinho' : 'Adicionar ao carrinho'}
          aoPressionar={comprar}
          estilo={styles.botao}
        />

        <View style={styles.infos}>
          <View style={styles.info}>
            <Ionicons name="book-outline" size={22} color="#c5d2e0" />
            <Text style={styles.textoInfo}>{livro.categoria}</Text>
          </View>
          {livro.paginas && (
            <View style={styles.info}>
              <Ionicons name="document-text-outline" size={22} color="#c5d2e0" />
              <Text style={styles.textoInfo}>{livro.paginas} páginas</Text>
            </View>
          )}
          {livro.editora && (
            <View style={styles.info}>
              <Ionicons name="business-outline" size={22} color="#c5d2e0" />
              <Text style={styles.textoInfo}>Editora {livro.editora}</Text>
            </View>
          )}
        </View>

        {livro.sinopse && (
          <View style={styles.secaoSinopse}>
            <Text style={styles.tituloSinopse}>Sinopse</Text>
            <Text style={styles.textoSinopse}>{livro.sinopse}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031220',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  capa: {
    width: 160,
    height: 240,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#0f2a42',
  },
  titulo: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  autor: {
    color: '#c5d2e0',
    fontSize: 15,
    marginTop: 4,
  },
  preco: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 14,
  },
  botao: {
    marginTop: 16,
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1c3a56',
  },
  info: {
    alignItems: 'center',
    flex: 1,
  },
  textoInfo: {
    color: '#c5d2e0',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  secaoSinopse: {
    marginTop: 24,
  },
  tituloSinopse: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textoSinopse: {
    color: '#c5d2e0',
    fontSize: 14,
    lineHeight: 21,
  },
});