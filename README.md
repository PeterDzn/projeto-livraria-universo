# Livraria Universo

## Descrição
Aplicativo mobile de uma loja de livros. O usuário navega pelo catálogo, busca por título, autor ou série, filtra por categoria, vê os detalhes de cada livro, monta o carrinho, finaliza a compra e acompanha o andamento dos pedidos. O app funciona offline.

## Ambiente de desenvolvimento

O projeto foi desenvolvido utilizando **React Native** com **Expo**, utilizando JavaScript para a implementação das telas, componentes e funcionalidades do aplicativo. O desenvolvimento foi realizado em ambiente de desenvolvimento local, com gerenciamento de dependências pelo npm.

## Aluno
Pedro Henrique Gomes Rodrigues - RGM [46229078]

## Telas
- **Abertura:** apresenta a loja e leva ao app pelo botão "Começar".
- **Tela Inicial:** banner, principais categorias, lançamentos e menu lateral.
- **Busca:** campo de pesquisa com filtros Tudo, Livros, Autores e Séries.
- **Categorias:** lista as categorias e mostra os livros da categoria escolhida.
- **Detalhes:** capa, preço, avaliação, sinopse e botão para adicionar ao carrinho.
- **Carrinho:** altera quantidades, remove itens, mostra o total e finaliza a compra.
- **Minha conta:** perfil e atalhos da conta.
- **Meus pedidos:** pedidos em andamento e finalizados, com barra de progresso.

## Fonte de dados
Dados locais: o catálogo está em `services/Livros.js` (array de objetos), e as imagens ficam em `assets/`.

## Onde estão os requisitos
- **Componentes:** `components/Cabecalho.js`, `components/Botao.js`, `components/EstadoVazio.js` e `components/CartaoResultado.js`. O `CartaoResultado` é usado na Busca e em Categorias, e os demais aparecem em várias telas.
- **Props com callback:** `Cabecalho` (`aoVoltar`), `Botao` (`aoPressionar`) e `CartaoResultado` (`onPress`).
- **useState:** `screens/Busca.js` (`texto`, `filtroAtivo`), `screens/Categorias.js` (`escolhida`), `screens/MeusPedidos.js` (`aba`), `components/CartaoResultado.js` e `screens/Detalhes.js` (`adicionado`), e `services/CarrinhoContext.js` (itens e pedidos).
- **useEffect:** `components/CartaoResultado.js` e `screens/Detalhes.js` (temporizador com `clearTimeout` na função de limpeza) e `screens/Categorias.js` (reage à categoria recebida por parâmetro).
- **Navegação com parâmetros:** `navigation.navigate('Detalhes', { id })` nas telas Inicial, Busca e Categorias, lido em `screens/Detalhes.js` com `route.params.id`. O título dessa tela é dinâmico, configurado em `options` no `App.js`.

## Vídeo de demonstração
demo/demo.mp4

> **Observação:** no Windows, o vídeo pode travar ao abrir no programa "Reprodutor de Mídia". Se isso acontecer, abra com o aplicativo **Fotos**, ou use outro player, como o VLC.

## Como executar
```bash
npm install
npx expo start
```
