// ===== Dados da viagem =====
const nomeViagem = "Viagem para Porto de Galinhas"; 
const ORCAMENTO_TOTAL = 5000;                        
const LIMITE_POR_CATEGORIA = 800;                    

// Cada categoria tem o mesmo "id" usado no HTML (valor-<id> e status-<id>)
const categorias = [
    { id: "passagens", nome: "Passagens", valor: 1400 },
    { id: "hospedagem", nome: "Hospedagem", valor: 1300 },
    { id: "alimentacao", nome: "Alimentação", valor: 750 },
    { id: "transporte", nome: "Transporte local", valor: 420 },
    { id: "passeios", nome: "Passeios", valor: 680 },
    { id: "compras", nome: "Compras e lembranças", valor: 350 },
];

// Classes do Tailwind para cada situação
const estilosDeStatus = {
    acima: "bg-red-100 text-red-800",
    atencao: "bg-amber-100 text-amber-800",
    dentro: "bg-emerald-100 text-emerald-800",
};
const baseDoSelo = "mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ";

// ===== Funções =====
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function somarValores(lista) {
    let total = 0;
    for (const item of lista) {
        total += item.valor;
    }
    return total;
}

function calcularMedia(total, quantidade) {
    return total / quantidade;
}

function contarAcimaDoLimite(lista, limite) {
    let quantidade = 0;
    for (const item of lista) {
        if (item.valor > limite) {
            quantidade++;
        }
    }
    return quantidade;
}

function calcularSaldo(orcamento, totalGasto) {
    return orcamento - totalGasto;
}

function classificarCategoria(valor, limite) {
    if (valor > limite) {
        return "acima";
    } else if (valor >= limite * 0.8) {
        return "atencao";
    } else {
        return "dentro";
    }
}

function traduzirStatus(status) {
    if (status === "acima") return "Acima do limite";
    if (status === "atencao") return "Atenção";
    return "Dentro do limite";
}

// ===== Cálculos =====
const totalGasto = somarValores(categorias);
const mediaGastos = calcularMedia(totalGasto, categorias.length);
const quantidadeAcima = contarAcimaDoLimite(categorias, LIMITE_POR_CATEGORIA);
const saldo = calcularSaldo(ORCAMENTO_TOTAL, totalGasto);
const orcamentoEstourado = saldo < 0; // boolean

// ===== Console =====
console.log(`Viagem: ${nomeViagem}`);
console.log(`Gasto total: ${formatarMoeda(totalGasto)}`);
console.log(`Média por categoria: ${formatarMoeda(mediaGastos)}`);
console.log(`Categorias acima do limite: ${quantidadeAcima}`);
console.log(`Saldo do orçamento: ${formatarMoeda(saldo)}`);
console.log(`Orçamento estourado? ${orcamentoEstourado}`);

// ===== Atualização da página =====
function atualizarResumo() {
    document.getElementById("nome-viagem").textContent = nomeViagem;
    document.getElementById("orcamento-total").textContent = formatarMoeda(ORCAMENTO_TOTAL);
    document.getElementById("limite-categoria").textContent = formatarMoeda(LIMITE_POR_CATEGORIA);
    document.getElementById("total-gasto").textContent = formatarMoeda(totalGasto);
    document.getElementById("media-gastos").textContent = formatarMoeda(mediaGastos);
    document.getElementById("categorias-acima").textContent = `${quantidadeAcima} de ${categorias.length}`;
    document.getElementById("saldo-orcamento").textContent = formatarMoeda(saldo);

    const selo = document.getElementById("situacao-saldo");
    const saldoBaixo = saldo >= 0 && saldo < ORCAMENTO_TOTAL * 0.1;

    if (orcamentoEstourado) {
        selo.textContent = "Orçamento estourado";
        selo.className = baseDoSelo + estilosDeStatus.acima;
    } else if (saldoBaixo) {
        selo.textContent = "Saldo baixo";
        selo.className = baseDoSelo + estilosDeStatus.atencao;
    } else {
        selo.textContent = "Dentro do orçamento";
        selo.className = baseDoSelo + estilosDeStatus.dentro;
    }
}

function atualizarCategorias() {
    for (const categoria of categorias) {
        const status = classificarCategoria(categoria.valor, LIMITE_POR_CATEGORIA);
        const campoValor = document.getElementById(`valor-${categoria.id}`);
        const campoStatus = document.getElementById(`status-${categoria.id}`);

        campoValor.textContent = formatarMoeda(categoria.valor);
        campoStatus.textContent = traduzirStatus(status);
        campoStatus.className = baseDoSelo + estilosDeStatus[status];

        console.log(`${categoria.nome}: ${formatarMoeda(categoria.valor)} (${traduzirStatus(status)})`);
    }
}

atualizarResumo();
atualizarCategorias();