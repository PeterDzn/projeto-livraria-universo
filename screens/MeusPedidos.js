import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useCarrinho } from '../services/CarrinhoContext';
import Cabecalho from '../components/Cabecalho';
import EstadoVazio from '../components/EstadoVazio';

const ETAPAS = ['Confirmado', 'Em separação', 'Enviado', 'Entregue'];

const ABAS = [
  { chave: 'andamento', nome: 'Em andamento' },
  { chave: 'finalizados', nome: 'Finalizados' },
];

const moeda = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function MeusPedidos({ navigation }) {
  const { pedidos, avancarPedido } = useCarrinho();
  const [aba, setAba] = useState('andamento');

  const lista = pedidos.filter((p) =>
    aba === 'andamento' ? p.etapa < 3 : p.etapa === 3
  );

  return (
    <View style={styles.container}>
      <Cabecalho
        titulo="Meus pedidos"
        aoVoltar={() => navigation.goBack()}
        semLinha
      />

      <View style={styles.abas}>
        {ABAS.map((item) => {
          const ativa = aba === item.chave;
          return (
            <TouchableOpacity
              key={item.chave}
              style={[styles.aba, ativa && styles.abaAtiva]}
              onPress={() => setAba(item.chave)}>
              <Text style={[styles.textoAba, ativa && styles.textoAbaAtiva]}>
                {item.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {lista.length === 0 ? (
        <EstadoVazio
          escuro
          icone="receipt-outline"
          mensagem={
            aba === 'andamento'
              ? 'Você não tem pedidos em andamento'
              : 'Nenhum pedido finalizado ainda'
          }
        />
      ) : (
        <ScrollView contentContainerStyle={styles.lista}>
          {lista.map((pedido) => (
            <View key={pedido.id} style={styles.cartao}>
              <Text style={styles.numero}>Pedido #{pedido.numero}</Text>
              <Text style={styles.data}>{pedido.data}</Text>
              <Text style={styles.status}>{ETAPAS[pedido.etapa]}</Text>

              <View style={styles.progresso}>
                <View style={styles.trilha} />
                <View
                  style={[
                    styles.trilhaPreenchida,
                    { width: `${(pedido.etapa / 3) * 75}%` },
                  ]}
                />
                <View style={styles.pontos}>
                  {ETAPAS.map((nome, i) => (
                    <View key={nome} style={styles.coluna}>
                      <View
                        style={[styles.ponto, i <= pedido.etapa && styles.pontoAtivo]}
                      />
                      <Text style={styles.rotuloEtapa}>{nome}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {pedido.itens.map(({ livro, quantidade }) => (
                <View key={livro.id} style={styles.item}>
                  <Image source={livro.capa} style={styles.capa} />
                  <View style={styles.dadosItem}>
                    <Text style={styles.tituloItem} numberOfLines={2}>
                      {livro.titulo}
                    </Text>
                    <Text style={styles.autorItem}>{livro.autor}</Text>
                  </View>
                  <Text style={styles.quantidade}>x{quantidade}</Text>
                </View>
              ))}

              <View style={styles.linhaTotal}>
                <Text style={styles.rotuloTotal}>Total</Text>
                <Text style={styles.valorTotal}>{moeda(pedido.total)}</Text>
              </View>

              {pedido.etapa < 3 && (
                <TouchableOpacity
                  style={styles.botaoDemo}
                  activeOpacity={0.8}
                  onPress={() => avancarPedido(pedido.id)}>
                  <Text style={styles.textoDemo}>
                    Avançar status (demonstração)
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
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
  abas: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1c3a56',
  },
  aba: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  abaAtiva: {
    borderBottomColor: '#F6D057',
  },
  textoAba: {
    color: '#8a9bb0',
    fontSize: 15,
    fontWeight: '600',
  },
  textoAbaAtiva: {
    color: '#F6D057',
  },
  lista: {
    padding: 16,
  },
  cartao: {
    backgroundColor: '#f4f1ec',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  numero: {
    color: '#031220',
    fontSize: 17,
    fontWeight: 'bold',
  },
  data: {
    color: '#6b7785',
    fontSize: 12,
    marginTop: 2,
  },
  status: {
    color: '#031220',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
  },
  progresso: {
    marginTop: 14,
    marginBottom: 18,
  },
  trilha: {
    position: 'absolute',
    top: 6,
    left: '12.5%',
    right: '12.5%',
    height: 2,
    backgroundColor: '#c9c2b8',
  },
  trilhaPreenchida: {
    position: 'absolute',
    top: 6,
    left: '12.5%',
    height: 2,
    backgroundColor: '#F6D057',
  },
  pontos: {
    flexDirection: 'row',
  },
  coluna: {
    flex: 1,
    alignItems: 'center',
  },
  ponto: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#c9c2b8',
  },
  pontoAtivo: {
    backgroundColor: '#F6D057',
  },
  rotuloEtapa: {
    color: '#6b7785',
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#dcd6cd',
  },
  capa: {
    width: 44,
    height: 66,
    borderRadius: 4,
    backgroundColor: '#dcd6cd',
  },
  dadosItem: {
    flex: 1,
    marginLeft: 12,
  },
  tituloItem: {
    color: '#031220',
    fontSize: 14,
    fontWeight: '600',
  },
  autorItem: {
    color: '#6b7785',
    fontSize: 12,
    marginTop: 2,
  },
  quantidade: {
    color: '#031220',
    fontSize: 13,
    fontWeight: '600',
  },
  linhaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#dcd6cd',
  },
  rotuloTotal: {
    color: '#031220',
    fontSize: 15,
    fontWeight: 'bold',
  },
  valorTotal: {
    color: '#031220',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoDemo: {
    marginTop: 14,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#F6D057',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoDemo: {
    color: '#031220',
    fontSize: 13,
    fontWeight: '600',
  },
});