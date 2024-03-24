// Para armazenar transações
const transacoes = []

// Funcao para adicionar nova transacao
function adicionarTransacao() {
  const data = document.getElementById('data').value
  const descricao = document.getElementById('descricao').value
  const valor = parseFloat(document.getElementById('valor').value)
  const tipo = document.getElementById('tipo').value

  // Validacao dos dados
  if (!data || !descricao || isNaN(valor) || !tipo) {
    alert('Preencha todos os campos!')
    return
  }

  // Cria um objeto transacao
  const transacao = {
    data,
    descricao,
    valor,
    tipo
  };

  // Adiciona a transacao ao array
  transacoes.push(transacao)

  // Limpa os campos do formulario
  document.getElementById('data').value = ''
  document.getElementById('descricao').value = ''
  document.getElementById('valor').value = ''

  // Atualiza o saldo
  atualizarSaldo()

  // Mostra a mensagem de sucesso
  alert('Transação adicionada com sucesso!')
}

// Funcao para calcular o saldo
function calcularSaldo() {
  let saldo = 0
  for (const transacao of transacoes) {
    if (transacao.tipo === 'receita') {
      saldo += transacao.valor
    } else {
      saldo -= transacao.valor
    }
  }
  return saldo
}

// Funcao para atualizar o saldo na tela
function atualizarSaldo() {
  const saldo = calcularSaldo().toFixed(2)
  const saldoElement = document.getElementById('saldoAtual')
  saldoElement.textContent = `R$ ${saldo}`
}

// Funcao para exibir as transacoes
function exibirTransacoes() {
  const tabelaTransacoes = document.getElementById('tabelaTransacoes')
  const tbody = tabelaTransacoes.querySelector('tbody')

  // Limpa o conteudo da tabela
  tbody.innerHTML = ''

  // Adiciona as transacoes a tabela
  for (const transacao of transacoes) {
    const linha = `<tr>
      <td>${transacao.data}</td>
      <td>${transacao.descricao}</td>
      <td>R$ ${transacao.valor.toFixed(2)}</td>
      <td>${transacao.tipo}</td>
    </tr>`
    tbody.insertAdjacentHTML('beforeend', linha)
  }
}

// Evento para adicionar nova transacao
const formulario = document.getElementById('novaTransacao')
formulario.addEventListener('submit', (event) => {
  event.preventDefault()
  adicionarTransacao()
  exibirTransacoes()
})

// Carrega as transacoes iniciais (exemplo)
transacoes.push({
  data: '2024-03-10',
  descricao: 'Salário',
  valor: 2000.00,
  tipo: 'receita'
})
transacoes.push({
  data: '2024-03-15',
  descricao: 'Supermercado',
  valor: 150.00,
  tipo: 'despesa'
})

// Atualiza o saldo e as transacoes na tela
atualizarSaldo()
exibirTransacoes()
