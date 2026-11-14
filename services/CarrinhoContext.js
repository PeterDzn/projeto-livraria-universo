import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { livros } from './Livros';

const CHAVE = '@livraria:dados';

const CarrinhoContext = createContext();

// Transforma { id, quantidade } de volta em { livro, quantidade }
function reconstruirItens(lista) {
  return (lista || [])
    .map((i) => ({
      livro: livros.find((l) => l.id === i.id),
      quantidade: i.quantidade,
    }))
    .filter((i) => i.livro); // ignora livros que não existem mais
}

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]); // { livro, quantidade }
  const [pedidos, setPedidos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Ao abrir o app, lê o que estava salvo
  useEffect(() => {
    async function carregar() {
      try {
        const texto = await AsyncStorage.getItem(CHAVE);
        if (texto) {
          const dados = JSON.parse(texto);
          setItens(reconstruirItens(dados.itens));
          setPedidos(
            (dados.pedidos || []).map((p) => ({
              ...p,
              itens: reconstruirItens(p.itens),
            }))
          );
        }
      } catch (erro) {
        // dados salvos inválidos: o app começa com o carrinho vazio
      }
      setCarregado(true);
    }
    carregar();
  }, []);

  // Sempre que o carrinho ou os pedidos mudam, salva
  useEffect(() => {
    if (!carregado) return; // evita apagar tudo antes de terminar de carregar

    // Guarda só ids e quantidades (as capas são recriadas a partir do livros.js)
    const dados = {
      itens: itens.map((i) => ({ id: i.livro.id, quantidade: i.quantidade })),
      pedidos: pedidos.map((p) => ({
        ...p,
        itens: p.itens.map((i) => ({
          id: i.livro.id,
          quantidade: i.quantidade,
        })),
      })),
    };

    AsyncStorage.setItem(CHAVE, JSON.stringify(dados)).catch(() => {
      // falha ao salvar: o carrinho continua funcionando só na memória
    });
  }, [itens, pedidos, carregado]);

  function adicionar(livro) {
    setItens((atual) => {
      const existe = atual.find((i) => i.livro.id === livro.id);
      if (existe) {
        return atual.map((i) =>
          i.livro.id === livro.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...atual, { livro, quantidade: 1 }];
    });
  }

  function aumentar(id) {
    setItens((atual) =>
      atual.map((i) =>
        i.livro.id === id ? { ...i, quantidade: i.quantidade + 1 } : i
      )
    );
  }

  function diminuir(id) {
    setItens((atual) =>
      atual
        .map((i) =>
          i.livro.id === id ? { ...i, quantidade: i.quantidade - 1 } : i
        )
        .filter((i) => i.quantidade > 0)
    );
  }

  function remover(id) {
    setItens((atual) => atual.filter((i) => i.livro.id !== id));
  }

  function limpar() {
    setItens([]);
  }

  // Transforma o carrinho em um pedido e esvazia o carrinho
  function finalizarCompra() {
    if (itens.length === 0) return null;

    const pedido = {
      id: Date.now(),
      numero: Math.floor(100000 + Math.random() * 900000),
      data: new Date().toLocaleDateString('pt-BR'),
      itens,
      total: subtotal,
      etapa: 0, // 0 Confirmado, 1 Em separação, 2 Enviado, 3 Entregue
    };

    setPedidos((atual) => [pedido, ...atual]);
    setItens([]);
    return pedido;
  }

  // Só para a demonstração: avança uma etapa do pedido
  function avancarPedido(id) {
    setPedidos((atual) =>
      atual.map((p) =>
        p.id === id && p.etapa < 3 ? { ...p, etapa: p.etapa + 1 } : p
      )
    );
  }

  const quantidadeTotal = itens.reduce((soma, i) => soma + i.quantidade, 0);
  const subtotal = itens.reduce(
    (soma, i) => soma + i.livro.preco * i.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        pedidos,
        adicionar,
        aumentar,
        diminuir,
        remover,
        limpar,
        finalizarCompra,
        avancarPedido,
        quantidadeTotal,
        subtotal,
      }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
