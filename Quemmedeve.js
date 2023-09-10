// Objeto para armazenar os registros de débito
let registrosDebito = {};

// Função para adicionar um registro de débito para uma pessoa
function adicionarDebito() {
  const nome = document.getElementById('nome').value;
  const valor = parseFloat(document.getElementById('valor').value);

  if (!isNaN(valor) && valor > 0) {
    if (!registrosDebito[nome]) {
      registrosDebito[nome] = 0;
    }
    registrosDebito[nome] += valor;
    atualizarHistorico(nome, 'Débito', valor);
    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
    atualizarResultado(`Débito registrado com sucesso. ${nome} deve agora: ${registrosDebito[nome]}`);
  } else {
    alert('Informe um valor válido maior que zero.');
  }
}

// Função para registrar um pagamento feito por uma pessoa
function registrarPagamento() {
  const nomePagamento = document.getElementById('nomePagamento').value;
  const valorPagamento = parseFloat(document.getElementById('valorPagamento').value);

  if (!isNaN(valorPagamento) && valorPagamento > 0) {
    if (registrosDebito[nomePagamento]) {
      if (valorPagamento <= registrosDebito[nomePagamento]) {
        registrosDebito[nomePagamento] -= valorPagamento;
        atualizarHistorico(nomePagamento, 'Pagamento', valorPagamento);
        document.getElementById('nomePagamento').value = '';
        document.getElementById('valorPagamento').value = '';
        atualizarResultado(`Pagamento registrado com sucesso. ${nomePagamento} deve agora: ${registrosDebito[nomePagamento]}`);
      } else {
        alert('Valor pago excede o débito existente.');
      }
    } else {
      alert('Pessoa não encontrada nos registros.');
    }
  } else {
    alert('Informe um valor válido maior que zero.');
  }
}

// Função para pesquisar o débito de uma pessoa por nome
function pesquisarDebito() {
  const nomePesquisa = document.getElementById('nomePesquisa').value;

  if (registrosDebito[nomePesquisa]) {
    atualizarResultado(`${nomePesquisa} deve: ${registrosDebito[nomePesquisa]}`);
  } else {
    atualizarResultado('Pessoa não encontrada nos registros.');
  }
}

// Função para atualizar o histórico de transações
function atualizarHistorico(nome, tipo, valor) {
  const historicoTable = document.getElementById('historico');
  const row = historicoTable.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  cell1.textContent = nome;
  cell2.textContent = tipo;
  cell3.textContent = valor;
}

// Função para atualizar a exibição dos resultados
function atualizarResultado(texto) {
  document.getElementById('resultado').innerHTML = texto;
}



