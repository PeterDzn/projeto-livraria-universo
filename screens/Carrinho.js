import { View, Text, Image, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../services/CarrinhoContext';
import Cabecalho from '../components/Cabecalho';
import Botao from '../components/Botao';
import EstadoVazio from '../components/EstadoVazio';

const moeda = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const AREA_TOQUE = { top: 8, bottom: 8, left: 8, right: 8 };

export default function Carrinho({ navigation }) {
  const { itens, aumentar, diminuir, remover, finalizarCompra, quantidadeTotal, subtotal } =
    useCarrinho();

  function finalizar() {
    const pedido = finalizarCompra();
    if (!pedido) return;

    Alert.alert(
      'Compra finalizada',
      `Pedido #${pedido.numero} registrado. Obrigado por comprar na Livraria Universo!`,
      [
        {
          text: 'Continuar comprando',
          onPress: () => navigation.navigate('Abas', { screen: 'Início' }),
        },
        {
          text: 'Ver pedidos',
          onPress: () => navigation.navigate('MeusPedidos'),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Cabecalho titulo="Carrinho" aoVoltar={() => navigation.goBack()} />

      {itens.length === 0 ? (
        <EstadoVazio escuro icone="cart-outline" mensagem="Seu carrinho está vazio">
          <Botao
            texto="Ver livros"
            aoPressionar={() => navigation.navigate('Abas', { screen: 'Início' })}
          />
        </EstadoVazio>
      ) : (
        <ScrollView contentContainerStyle={styles.lista}>
          <View style={styles.cartao}>
            {itens.map(({ livro, quantidade }) => (
              <View key={livro.id} style={styles.item}>
                <Image source={livro.capa} style={styles.capa} />

                <View style={styles.dadosItem}>
                  <Text style={styles.tituloItem} numberOfLines={2}>
                    {livro.titulo}
                  </Text>
                  <Text style={styles.autorItem}>{livro.autor}</Text>
                  <Text style={styles.precoItem}>{moeda(livro.preco)}</Text>

                  <View style={styles.quantidadeLinha}>
                    <TouchableOpacity
                      style={styles.botaoQtd}
                      hitSlop={AREA_TOQUE}
                      onPress={() => diminuir(livro.id)}>
                      <Ionicons name="remove" size={18} color="#031220" />
                    </TouchableOpacity>
                    <Text style={styles.numeroQtd}>{quantidade}</Text>
                    <TouchableOpacity
                      style={styles.botaoQtd}
                      hitSlop={AREA_TOQUE}
                      onPress={() => aumentar(livro.id)}>
                      <Ionicons name="add" size={18} color="#031220" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.lixeira}
                  hitSlop={AREA_TOQUE}
                  onPress={() => remover(livro.id)}>
                  <Ionicons name="trash-outline" size={22} color="#6b7785" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.resumo}>
              <Text style={styles.tituloResumo}>Resumo</Text>

              <View style={styles.linhaResumo}>
                <Text style={styles.rotuloResumo}>
                  Subtotal ({quantidadeTotal} {quantidadeTotal === 1 ? 'item' : 'itens'})
                </Text>
                <Text style={styles.valorResumo}>{moeda(subtotal)}</Text>
              </View>

              <View style={styles.linhaResumo}>
                <Text style={styles.rotuloResumo}>Frete</Text>
                <Text style={styles.freteGratis}>Grátis</Text>
              </View>

              <View style={[styles.linhaResumo, styles.linhaTotal]}>
                <Text style={styles.rotuloTotal}>Total</Text>
                <Text style={styles.valorTotal}>{moeda(subtotal)}</Text>
              </View>

              <Botao
                texto="Finalizar compra"
                aoPressionar={finalizar}
                estilo={styles.botaoFinalizar}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031220',
  },
  lista: {
    padding: 16,
  },
  cartao: {
    backgroundColor: '#f4f1ec',
    borderRadius: 16,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dcd6cd',
  },
  capa: {
    width: 70,
    height: 105,
    borderRadius: 6,
    backgroundColor: '#dcd6cd',
  },
  dadosItem: {
    flex: 1,
    marginLeft: 12,
  },
  tituloItem: {
    color: '#031220',
    fontSize: 15,
    fontWeight: 'bold',
  },
  autorItem: {
    color: '#6b7785',
    fontSize: 12,
    marginTop: 2,
  },
  precoItem: {
    color: '#031220',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  quantidadeLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  botaoQtd: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c9c2b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroQtd: {
    color: '#031220',
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 14,
  },
  lixeira: {
    padding: 4,
    alignSelf: 'flex-end',
  },
  resumo: {
    marginTop: 4,
  },
  tituloResumo: {
    color: '#031220',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rotuloResumo: {
    color: '#6b7785',
    fontSize: 14,
  },
  valorResumo: {
    color: '#031220',
    fontSize: 14,
  },
  freteGratis: {
    color: '#2e7d32',
    fontSize: 14,
    fontWeight: '600',
  },
  linhaTotal: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#dcd6cd',
  },
  rotuloTotal: {
    color: '#031220',
    fontSize: 17,
    fontWeight: 'bold',
  },
  valorTotal: {
    color: '#031220',
    fontSize: 19,
    fontWeight: 'bold',
  },
  botaoFinalizar: {
    marginTop: 16,
  },
});