import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../services/CarrinhoContext';

export default function CartaoResultado({ livro, onPress }) {
  const { adicionar } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);

  // Some o aviso "Adicionado" depois de 1,5 s; o cleanup cancela o timer
  useEffect(() => {
    if (!adicionado) return;
    const temporizador = setTimeout(() => setAdicionado(false), 1500);
    return () => clearTimeout(temporizador);
  }, [adicionado]);

  const preco = livro.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  function comprar() {
    adicionar(livro);
    setAdicionado(true);
  }

  return (
    <TouchableOpacity style={styles.cartao} activeOpacity={0.9} onPress={onPress}>
      <Image source={livro.capa} style={styles.capa} />

      <View style={styles.dados}>
        <Text style={styles.titulo} numberOfLines={2}>
          {livro.titulo}
        </Text>
        <Text style={styles.autor}>{livro.autor}</Text>

        {livro.nota && (
          <View style={styles.linhaNota}>
            <Ionicons name="star" size={14} color="#F6D057" />
            <Text style={styles.nota}>
              {livro.nota.toFixed(1).replace('.', ',')}
            </Text>
            {livro.avaliacoes && (
              <Text style={styles.avaliacoes}>
                ({livro.avaliacoes.toLocaleString('pt-BR')})
              </Text>
            )}
          </View>
        )}

        <Text style={styles.preco}>{preco}</Text>

        <TouchableOpacity
          style={styles.botao}
          activeOpacity={0.8}
          onPress={comprar}>
          {adicionado && <Ionicons name="checkmark" size={16} color="#031220" />}
          <Text style={styles.textoBotao}>
            {adicionado ? 'Adicionado' : 'Adicionar ao carrinho'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  capa: {
    width: 80,
    height: 120,
    borderRadius: 6,
    backgroundColor: '#dcd6cd',
  },
  dados: {
    flex: 1,
    marginLeft: 12,
  },
  titulo: {
    color: '#031220',
    fontSize: 15,
    fontWeight: 'bold',
  },
  autor: {
    color: '#6b7785',
    fontSize: 12,
    marginTop: 2,
  },
  linhaNota: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  nota: {
    color: '#031220',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  avaliacoes: {
    color: '#6b7785',
    fontSize: 12,
    marginLeft: 4,
  },
  preco: {
    color: '#031220',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6D057',
    borderRadius: 8,
    height: 40,
    marginTop: 'auto',
  },
  textoBotao: {
    color: '#031220',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});