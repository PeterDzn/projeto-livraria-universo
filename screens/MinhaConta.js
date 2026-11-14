import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../services/CarrinhoContext';

// Troque pelos dados que quiser exibir
const NOME = 'Peter Dzn';
const EMAIL = 'peter@example.com';

export default function MinhaConta({ navigation }) {
  const { pedidos } = useCarrinho();

  function emBreve(titulo) {
    Alert.alert(titulo, 'Esta função estará disponível em breve.');
  }

  const opcoes = [
    {
      nome: 'Meus pedidos',
      icone: 'receipt-outline',
      badge: pedidos.length,
      acao: () => navigation.navigate('MeusPedidos'),
    },
    { nome: 'Endereços de entrega', icone: 'location-outline', acao: () => emBreve('Endereços de entrega') },
    { nome: 'Formas de pagamento', icone: 'card-outline', acao: () => emBreve('Formas de pagamento') },
    { nome: 'Lista de desejos', icone: 'heart-outline', acao: () => emBreve('Lista de desejos') },
    { nome: 'Notificações', icone: 'notifications-outline', acao: () => emBreve('Notificações') },
    { nome: 'Suporte', icone: 'help-circle-outline', acao: () => emBreve('Suporte') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Minha conta</Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.perfil}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={34} color="#8a9bb0" />
          </View>
          <View>
            <Text style={styles.nome}>{NOME}</Text>
            <Text style={styles.email}>{EMAIL}</Text>
          </View>
        </View>

        {opcoes.map((op) => (
          <TouchableOpacity
            key={op.nome}
            style={styles.linha}
            activeOpacity={0.7}
            onPress={op.acao}>
            <Ionicons name={op.icone} size={22} color="#c5d2e0" />
            <Text style={styles.textoLinha}>{op.nome}</Text>
            {op.badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.textoBadge}>{op.badge}</Text>
              </View>
            )}
            <Ionicons name="chevron-forward" size={18} color="#6b7785" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.botaoSair}
          activeOpacity={0.8}
          onPress={() => emBreve('Sair')}>
          <Text style={styles.textoSair}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#1c3a56',
  },
  titulo: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  conteudo: {
    padding: 20,
  },
  perfil: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#1c3a56',
    backgroundColor: '#0f2a42',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  nome: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    color: '#8a9bb0',
    fontSize: 13,
    marginTop: 2,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1c3a56',
  },
  textoLinha: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 14,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F6D057',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginRight: 8,
  },
  textoBadge: {
    color: '#031220',
    fontSize: 11,
    fontWeight: 'bold',
  },
  botaoSair: {
    marginTop: 32,
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSair: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});