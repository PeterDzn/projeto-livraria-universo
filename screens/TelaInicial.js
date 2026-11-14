import { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lancamentos } from '../services/Livros';
import { useCarrinho } from '../services/CarrinhoContext';

const categorias = [
  { id: 1, nome: 'Ficção', icone: 'book-outline' },
  { id: 2, nome: 'Fantasia', icone: 'sparkles-outline' },
  { id: 3, nome: 'Terror', icone: 'skull-outline' },
  { id: 4, nome: 'Suspense', icone: 'search-outline' },
];

const LARGURA_MENU = 280;

export default function TelaInicial({ navigation }) {
  const { quantidadeTotal } = useCarrinho();

  const [menuVisivel, setMenuVisivel] = useState(false);
  const deslize = useRef(new Animated.Value(-LARGURA_MENU)).current;

  const opacidadeFundo = deslize.interpolate({
    inputRange: [-LARGURA_MENU, 0],
    outputRange: [0, 1],
  });

  function abrirMenu() {
    setMenuVisivel(true);
    Animated.timing(deslize, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }

  // Fecha o menu e, quando termina a animação, executa a ação (ex.: navegar)
  function fecharMenu(depois) {
    Animated.timing(deslize, {
      toValue: -LARGURA_MENU,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisivel(false);
      if (depois) depois();
    });
  }

  const itensMenu = [
    { nome: 'Início', icone: 'home-outline', acao: null },
    {
      nome: 'Categorias',
      icone: 'grid-outline',
      acao: () => navigation.navigate('Categorias', { categoria: null, t: Date.now() }),
    },
    {
      nome: 'Buscar livros',
      icone: 'search-outline',
      acao: () => navigation.navigate('Busca'),
    },
    {
      nome: 'Carrinho',
      icone: 'cart-outline',
      acao: () => navigation.navigate('Carrinho'),
    },
    {
      nome: 'Meus pedidos',
      icone: 'receipt-outline',
      acao: () => navigation.navigate('MeusPedidos'),
    },
    {
      nome: 'Minha conta',
      icone: 'person-outline',
      acao: () => navigation.navigate('MinhaConta'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity style={styles.botaoLateral} onPress={abrirMenu}>
          <Ionicons name="menu" size={28} color="#ffffff" />
        </TouchableOpacity>

        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.botaoLateral}
          onPress={() => navigation.navigate('Carrinho')}>
          <Ionicons name="cart-outline" size={28} color="#ffffff" />
          {quantidadeTotal > 0 && (
            <View style={styles.bolinha}>
              <Text style={styles.textoBolinha}>{quantidadeTotal}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.areaBarra}>
        <TouchableOpacity
          style={styles.barraBusca}
          onPress={() => navigation.navigate('Busca')}
          activeOpacity={0.8}>
          <Ionicons name="search" size={20} color="#031220" />
          <Text style={styles.textoBusca}>
            Buscar por título, autor, gênero...
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.lista}>
        <View style={styles.banner}>
          <Image
            source={require('../assets/banner.png')}
            style={styles.imagemBanner}
          />
          <Text style={styles.subtituloBanner}>
            Descubra novos mundos na Livraria Universo.
          </Text>
          <TouchableOpacity
            style={styles.botaoBanner}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Busca')}>
            <Text style={styles.textoBotaoBanner}>Ver destaques</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secaoClara}>
          <View style={styles.cabecalhoSecao}>
            <Text style={styles.tituloSecao}>Principais categorias</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Categorias', {
                  categoria: null,
                  t: Date.now(),
                })
              }>
              <Text style={styles.verTodas}>Ver todas ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linhaCategorias}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.itemCategoria}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Categorias', {
                    categoria: cat.nome,
                    t: Date.now(),
                  })
                }>
                <View style={styles.iconeCategoria}>
                  <Ionicons name={cat.icone} size={30} color="#ffffff" />
                </View>
                <Text style={styles.nomeCategoria}>{cat.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.cabecalhoSecaoLancamentos}>
            <Text style={styles.tituloSecao}>Lançamentos</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Busca')}>
              <Text style={styles.verTodas}>Ver todas ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.linhaLancamentos}>
            {lancamentos.map((livro) => (
              <TouchableOpacity
                key={livro.id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Detalhes', { id: livro.id })}>
                <Image source={livro.capa} style={styles.capa} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Menu lateral */}
      {menuVisivel && (
        <View style={styles.camadaMenu}>
          <Animated.View style={[styles.fundoMenu, { opacity: opacidadeFundo }]}>
            <TouchableOpacity
              style={styles.areaFechar}
              activeOpacity={1}
              onPress={() => fecharMenu()}
            />
          </Animated.View>

          <Animated.View
            style={[styles.painelMenu, { transform: [{ translateX: deslize }] }]}>
            <View style={styles.topoMenu}>
              <Text style={styles.tituloMenu}>Livraria Universo</Text>
              <TouchableOpacity onPress={() => fecharMenu()}>
                <Ionicons name="close" size={26} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {itensMenu.map((item) => (
              <TouchableOpacity
                key={item.nome}
                style={styles.itemMenu}
                activeOpacity={0.7}
                onPress={() => fecharMenu(item.acao)}>
                <Ionicons name={item.icone} size={22} color="#c5d2e0" />
                <Text style={styles.textoItemMenu}>{item.nome}</Text>
                {item.nome === 'Carrinho' && quantidadeTotal > 0 && (
                  <View style={styles.badgeMenu}>
                    <Text style={styles.textoBadgeMenu}>{quantidadeTotal}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031220',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginTop: 32,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1c3a56',
  },
  botaoLateral: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginVertical: -20,
  },
  bolinha: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F6D057',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBolinha: {
    color: '#031220',
    fontSize: 11,
    fontWeight: 'bold',
  },
  areaBarra: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  barraBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f1ec',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 14,
  },
  textoBusca: {
    marginLeft: 10,
    color: '#6b7785',
    fontSize: 15,
  },
  lista: {
    padding: 16,
  },
  banner: {
    height: 190,
    backgroundColor: '#0f2a42',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F6D057',
    overflow: 'hidden',
    marginBottom: 20,
  },
  imagemBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  subtituloBanner: {
    position: 'absolute',
    left: 24,
    bottom: 62,
    maxWidth: '100%',
    color: '#c5d2e0',
    fontSize: 13,
    lineHeight: 18,
  },
  botaoBanner: {
    position: 'absolute',
    left: 20,
    bottom: 18,
    backgroundColor: '#F6D057',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  textoBotaoBanner: {
    color: '#031220',
    fontSize: 14,
    fontWeight: 'bold',
  },
  secaoClara: {
    backgroundColor: '#f4f1ec',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  cabecalhoSecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cabecalhoSecaoLancamentos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  tituloSecao: {
    color: '#031220',
    fontSize: 17,
    fontWeight: 'bold',
  },
  verTodas: {
    color: '#6b7785',
    fontSize: 13,
  },
  linhaCategorias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCategoria: {
    alignItems: 'center',
    width: '23%',
  },
  iconeCategoria: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#0f2a42',
    borderWidth: 1,
    borderColor: '#1c3a56',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nomeCategoria: {
    color: '#031220',
    fontSize: 12,
    marginTop: 6,
  },
  linhaLancamentos: {
    paddingTop: 4,
  },
  capa: {
    width: 110,
    height: 165,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#dcd6cd',
  },

  // Menu lateral
  camadaMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    elevation: 20,
  },
  fundoMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  areaFechar: {
    flex: 1,
  },
  painelMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: LARGURA_MENU,
    backgroundColor: '#031220',
    borderRightWidth: 1.5,
    borderRightColor: '#1c3a56',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topoMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1c3a56',
  },
  tituloMenu: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  textoItemMenu: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 16,
  },
  badgeMenu: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F6D057',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  textoBadgeMenu: {
    color: '#031220',
    fontSize: 11,
    fontWeight: 'bold',
  },
});