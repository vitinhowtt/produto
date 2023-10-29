//Carrega a lista de produtos do localStorage ou cria uma lista vazia se não existir.
const listaProdutos = JSON.parse(localStorage.getItem("listaProdutos")) || [];

//Função para adicionar ou atualizar um produto na lista.
function adicionarOuAtualizarProduto() {
  // Obtém os valores do nome e quantidade do produto a ser adicionado.
  const nome = document.getElementById("nome").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);

  //Verifica se o nome do produto é válido.
  if (nome) {
    // Procura se o produto já existe na lista.
    const produtoExistente = listaProdutos.find((p) => p.nome === nome);

    //Se o produto existir, atualiza a quantidade. Senão, adiciona um novo produto.
    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
    } else if (quantidade > 0) {
      const produto = { nome, quantidade };
      listaProdutos.push(produto);
    }

    //Atualiza a exibição da lista de produtos, limpa os campos e salva no localStorage.
    atualizarListaProdutos();
    salvarNoLocalStorage();
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
  }
}

//Atualiza a exibição da lista de produtos no HTML.
function atualizarListaProdutos() {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  //Para cada produto na lista, cria um elemento li e um botão de remover.
  listaProdutos.forEach((produto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `Produto: ${produto.nome}, Quantidade: ${produto.quantidade}`;
    const buttonRemover = document.createElement("button");
    buttonRemover.innerHTML = "Remover";
    buttonRemover.onclick = () => removerProduto(index);
    li.appendChild(buttonRemover);
    lista.appendChild(li);
  });
}

//Remove um produto da lista pelo índice e atualiza a exibição e o localStorage.
function removerProduto(index) {
  listaProdutos.splice(index, 1);
  atualizarListaProdutos();
  salvarNoLocalStorage();
}

//Salva a lista de produtos no localStorage em formato JSON.
function salvarNoLocalStorage() {
  localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));
  console.log(localStorage.getItem("listaProdutos"));
}

//Inicializa a exibição da lista de produtos ao carregar a página.
atualizarListaProdutos();
