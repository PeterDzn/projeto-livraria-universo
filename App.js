import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { CarrinhoProvider, useCarrinho } from './services/CarrinhoContext';
import { livros } from './services/Livros';
import Abertura from './screens/Abertura';
import TelaInicial from './screens/TelaInicial';
import Categorias from './screens/Categorias';
import Busca from './screens/Busca';
import MinhaConta from './screens/MinhaConta';
import MeusPedidos from './screens/MeusPedidos';
import Detalhes from './screens/Detalhes';
import Carrinho from './screens/Carrinho';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const icones = {
  Início: 'home',
  Categorias: 'grid',
  BuscaTab: 'search',
  CarrinhoTab: 'cart',
  MinhaConta: 'person',
};

// Abas "atalho": não têm tela própria, só abrem a tela do Stack por cima
const TelaVazia = () => null;

function Abas() {
  const { quantidadeTotal } = useCarrinho();

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#031220', borderTopColor: '#1c3a56' },
        tabBarActiveTintColor: '#F6D057',
        tabBarInactiveTintColor: '#8a9bb0',
        tabBarIcon: ({ focused, color, size }) => {
          const nome = icones[route.name];
          return (
            <Ionicons
              name={focused ? nome : `${nome}-outline`}
              size={size}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen name="Início" component={TelaInicial} />
      <Tab.Screen name="Categorias" component={Categorias} />
      <Tab.Screen
        name="BuscaTab"
        component={TelaVazia}
        options={{ tabBarLabel: 'Busca' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent().navigate('Busca');
          },
        })}
      />
      <Tab.Screen
        name="CarrinhoTab"
        component={TelaVazia}
        options={{
          tabBarLabel: 'Carrinho',
          tabBarBadge: quantidadeTotal > 0 ? quantidadeTotal : undefined,
          tabBarBadgeStyle: { backgroundColor: '#F6D057', color: '#031220' },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent().navigate('Carrinho');
          },
        })}
      />
      <Tab.Screen
        name="MinhaConta"
        component={MinhaConta}
        options={{ tabBarLabel: 'Minha conta' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Abertura"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Abertura" component={Abertura} />
          <Stack.Screen
            name="Abas"
            component={Abas}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen
            name="Busca"
            component={Busca}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="Detalhes"
            component={Detalhes}
            options={({ route, navigation }) => ({
              headerShown: true,
              title:
                livros.find((l) => l.id === route.params.id)?.titulo ?? 'Detalhes',
              headerStyle: { backgroundColor: '#031220' },
              headerTintColor: '#ffffff',
              headerShadowVisible: false,
              headerRight: () => (
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => navigation.navigate('Carrinho')}>
                  <Ionicons name="cart-outline" size={24} color="#ffffff" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Carrinho" component={Carrinho} />
          <Stack.Screen name="MeusPedidos" component={MeusPedidos} />
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}