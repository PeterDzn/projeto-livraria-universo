import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { livros } from '../services/Livros';
import CartaoResultado from '../components/CartaoResultado';
import EstadoVazio from '../components/EstadoVazio';

const filtros = ['Tudo', 'Livros', 'Autores', 'Séries'];

// tira acentos e maiúsculas: "Diário" vira "diario"
const normalizar = (t) =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export default function Busca({ navigation }) {
  const [texto, setTexto] = useState('');
  const [filtroAtivo, setFiltroAtivo] = useState('Tudo');

  const resultados = useMemo(() => {
    const termo = normalizar(texto);

    // Séries: só livros que pertencem a alguma série
    if (filtroAtivo === 'Séries') {
      const daSerie = livros.filter((livro) => livro.serie);
      if (termo === '') return daSerie;
      return daSerie.filter((livro) =>
        normalizar(livro.serie).includes(termo)
      );
    }

    if (termo === '') return livros;

    return livros.filter((livro) => {
      const noTitulo = normalizar(livro.titulo).includes(termo);
      const noAutor = normalizar(livro.autor).includes(termo);
      const naSerie = livro.serie
        ? normalizar(livro.serie).includes(termo)
        : false;

      if (filtroAtivo === 'Livros') return noTitulo;
      if (filtroAtivo === 'Autores') return noAutor;
      return noTitulo || noAutor || naSerie;
    });
  }, [texto, filtroAtivo]);

  const mensagemVazia =
    texto === ''
      ? 'Nenhum livro encontrado'
      : `Nenhum resultado para "${texto}"`;

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.linhaTopo}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.barraBusca}>
            <Ionicons name="search" size={20} color="#031220" />
            <TextInput
              autoFocus
              style={styles.input}
              placeholder="Buscar por título, autor, gênero..."
              placeholderTextColor="#6b7785"
              value={texto}
              onChangeText={setTexto}
              returnKeyType="search"
            />
            {texto.length > 0 && (
              <TouchableOpacity onPress={() => setTexto('')}>
                <Ionicons name="close-circle" size={20} color="#6b7785" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View style={styles.filtros}>
        {filtros.map((filtro) => {
          const ativo = filtro === filtroAtivo;
          return (
            <TouchableOpacity
              key={filtro}
              style={[styles.botaoFiltro, ativo && styles.botaoFiltroAtivo]}
              onPress={() => setFiltroAtivo(filtro)}>
              <Text
                style={[styles.textoFiltro, ativo && styles.textoFiltroAtivo]}>
                {filtro}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.conteudo}>
        {resultados.length === 0 ? (
          <EstadoVazio icone="search-outline" mensagem={mensagemVazia} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.lista}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {resultados.map((livro) => (
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
  cabecalho: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#1c3a56',
  },
  linhaTopo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoVoltar: {
    marginRight: 8,
    padding: 4,
  },
  barraBusca: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f1ec',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    color: '#031220',
    fontSize: 15,
    marginLeft: 10,
  },
  filtros: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  botaoFiltro: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  botaoFiltroAtivo: {
    borderBottomColor: '#F6D057',
  },
  textoFiltro: {
    color: '#8a9bb0',
    fontSize: 15,
    fontWeight: '600',
  },
  textoFiltroAtivo: {
    color: '#ffffff',
  },
  conteudo: {
    flex: 1,
    backgroundColor: '#f4f1ec',
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
  },
  lista: {
    padding: 12,
  },
});