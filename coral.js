let pigmento = "";
const colorantesCoral = [
  { nome: "XY1", cor: "linear-gradient(to right, #f7e600, #fff6b0)" }, // YG → XY1
  { nome: "YE2", cor: "linear-gradient(to right, #F4C430, #FFD666)" }, // YM → YE2
  { nome: "YE1", cor: "linear-gradient(to right, #D4A017, #FFCC33)" }, // YI → YE1
  { nome: "XR1", cor: "linear-gradient(to right, #C41E3A, #FF5C5C)" }, // RB → XR1
  { nome: "MA1", cor: "linear-gradient(to right, #8B2500, #FF7F50)" }, // RI → MA1
  { nome: "RE1", cor: "linear-gradient(to right, #b061b0, #e2bde2)" }, // PR → RE1
  { nome: "OR1", cor: "linear-gradient(to right, #5d6fad, #aab5e1)" }, // BO → OR1
  { nome: "GR1", cor: "linear-gradient(to right, #2E8B57, #98FB98)" }, // GI → GR1
  { nome: "WH1", cor: "linear-gradient(to right, #FFFFFF, #E0E0E0)" }, // WI → WH1
  { nome: "BU1", cor: "linear-gradient(to right, #3F48CC, #9FA8DA)" },
  { nome: "BU2", cor: "linear-gradient(to right, #3F48CC, #9FA8DA)" },
  { nome: "UM1", cor: "linear-gradient(to right, #ca999d, #e6c1c3)" }, // RY → UM1
  { nome: "NO1", cor: "linear-gradient(to right, #000000, #434343)" },
];

const icon = document.getElementById("menu-icon");
const icon2 = document.getElementById("menu-icon2");
const fundoModal = document.querySelector(".modal-overlay2");
const menu = document.getElementById("menu");

icon.addEventListener("click", () => {
  menu.classList.toggle("active");

  icon.style.display = menu.classList.contains("active") ? "none" : "block";
  icon2.style.display = menu.classList.contains("active") ? "block" : "none";
  fundoModal.style.display = "flex";
});

icon2.addEventListener("click", () => {
  menu.classList.toggle("active");

  icon.style.display = menu.classList.contains("active") ? "none" : "block";
  icon2.style.display = menu.classList.contains("active") ? "block" : "none";
  fundoModal.style.display = "none";
});

function showToast(message, type = "info", customColor = null) {
  const colors = {
    success: "linear-gradient(to right, #00b09b, #96c93d)",
    error: "linear-gradient(to right, #e52d27, #b31217)",
    info: "linear-gradient(to right, #2196F3, #21CBF3)",
    warning: "linear-gradient(to right, #f52323, #f76161)",
  };

  Toastify({
    text: message,
    duration: 2000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    close: true,
    backgroundColor: customColor || colors[type] || colors.info,
  }).showToast();
}

// Atalhos como o toastify do React:
function showSuccess(msg) {
  showToast(msg, "success");
}

function showError(msg) {
  showToast(msg, "error");
}

function showInfo(msg) {
  showToast(msg, "info");
}

function showWarning(msg) {
  showToast(msg, "warning");
}

function showCustomToast(message, customColor) {
  showToast(message, null, customColor);
}

function abrirModal() {
  document.getElementById("meuModal").style.display = "flex";
  let legendaColorante = document.getElementById("titulo");

  colorantesCoral.forEach((coral) => {
    if (pigmento == coral.nome) {
      legendaColorante.textContent = "Colorante: " + pigmento;

      legendaColorante.style.background = coral.cor;
      legendaColorante.style.webkitBackgroundClip = "text";
      legendaColorante.style.webkitTextFillColor = "transparent";
      legendaColorante.style.fontWeight = "bold";
      legendaColorante.style.webkitTextStroke = "0.5px black";
    }
  });
}

function fecharModal() {
  document.getElementById("meuModal").style.display = "none";
}

function colorir() {
  const container = document.querySelectorAll(".colorante");

  container.forEach((id) => {
    let pigmentacoes = id.querySelector(".pigmentacoes");
    let legendaColorante = id.querySelector("h2");

    let primeiros3 = pigmentacoes.className.substring(0, 3);

    colorantesCoral.forEach((coral) => {
      if (primeiros3 == coral.nome) {
        legendaColorante.style.background = coral.cor;
        legendaColorante.style.webkitBackgroundClip = "text";
        legendaColorante.style.webkitTextFillColor = "transparent";
        legendaColorante.style.fontWeight = "bold";
        legendaColorante.style.webkitTextStroke = "0.5px black";
      }
    });
  });
}

function resultado() {
  let listaDePigmentos =
    JSON.parse(localStorage.getItem("@listaDePigmentos")) || [];

  const container = document.querySelectorAll(".colorante");

  listaDePigmentos.forEach((item) => {
    let formulacao = item.resultadoConvercao;

    let totalPigmentacao = item.totalProducao;

    let totais = 0;

    if (
      item.id === "NO1" ||
      item.id === "UM1" ||
      item.id === "XY1" ||
      item.id === "YE1"
    ) {
      totais = (formulacao / 3.24675324675325) * totalPigmentacao + 450;
    } else {
      totais = (formulacao / 3.24675324675325) * totalPigmentacao + 225;
    }

    container.forEach((id) => {
      let pigmentacoes = id.querySelector(".pigmentacoes");
      let resultado = id.querySelector("p");
      let legendaColorante = id.querySelector("h2");

      let primeiros3 = pigmentacoes.className.substring(0, 3);

      colorantesCoral.forEach((coral) => {
        if (primeiros3 == coral.nome) {
          legendaColorante.style.background = coral.cor;
          legendaColorante.style.webkitBackgroundClip = "text";
          legendaColorante.style.webkitTextFillColor = "transparent";
          legendaColorante.style.fontWeight = "bold";
          legendaColorante.style.webkitTextStroke = "0.5px black";

          resultado.style.background = coral.cor;
          resultado.style.webkitBackgroundClip = "text";
          resultado.style.webkitTextFillColor = "transparent";
          resultado.style.fontWeight = "bold";
          resultado.style.webkitTextStroke = "0.5px black";
        }
      });

      if (item.id == primeiros3) {
        pigmentacoes.textContent = "Produções: " + totalPigmentacao;
        resultado.textContent = "Ideal na máquina: " + totais;
      }
    });
  });
}

function enviar() {
  const valor1 = document.getElementById("entrada1").value;
  const valor2 = document.getElementById("entrada2").value;

  let elementosDaPagina = {
    id: " ",
    totalProducao: "0",
    resultadoConvercao: "0",
  };
  let listaDePigmentos =
    JSON.parse(localStorage.getItem("@listaDePigmentos")) || [];

  elementosDaPagina.id = pigmento;
  elementosDaPagina.resultadoConvercao = valor1;
  elementosDaPagina.totalProducao = valor2;

  listaDePigmentos = atualizarItem(listaDePigmentos, elementosDaPagina);

  localStorage.setItem("@listaDePigmentos", JSON.stringify(listaDePigmentos));

  resultado();
  fecharModal();

  setTimeout(() => {
    location.reload();
  }, 2000);


  colorantesCoral.forEach((coral) => {
    if (pigmento == coral.nome) {
      showCustomToast(
        "Fórmula do colorante " + coral.nome + " registrada com sucesso",
        coral.cor
      ).style.webkitTextStroke = "0.5px black";
    }
  });
}

function atualizarItem(lista, novoItem, chave = "id") {
  const index = lista.findIndex((item) => item[chave] === novoItem[chave]);

  if (index !== -1) {
    // Substitui o item existente
    lista[index] = novoItem;
  } else {
    // Adiciona o item se não existir
    lista.push(novoItem);
  }

  return lista;
}

document.addEventListener("DOMContentLoaded", () => {
  
  let listaDePigmentos =
    JSON.parse(localStorage.getItem("@listaDePigmentos"));
    
    let valor = listaDePigmentos.length;
    
    if(valor > 0)
    {
    
    
    
    console.log(listaDePigmentos)
    
    const diferentes = colorantesCoral.filter(colorante =>
  !listaDePigmentos.some(pigmento => pigmento.id === colorante.nome)
);
    
    console.log(diferentes)
    
    listaDePigmentos.forEach((idLocal) => {
      
      let containerPrincipal = document.querySelector(".caixa");

    const linha = document.createElement("hr");
    const container = document.createElement("div");
    const titulo = document.createElement("h2");
    const span1 = document.createElement("span");
    const i = document.createElement("i");
    const i2 = document.createElement("i");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    const span4 = document.createElement("span");
    const input = document.createElement("input");
    const p = document.createElement("p");
    const button = document.createElement("button");

    span2.textContent = idLocal.id;

    input.type = "checkbox";
    input.name = "checks";
    button.title = "Excluir";


    container.className = "colorante";
    span3.className =  `${idLocal.id} pigmentacoes`;
    span4.className =  "colorante-botoes";
    i.className = "fa-solid fa-fill-drip";
    i2.className = "fa-solid fa-trash-can-arrow-up fa-lg";
    button.className = "botao";
    input.className = "escolha"



    container.id =  idLocal.id;

    containerPrincipal.appendChild(linha);
    containerPrincipal.appendChild(container);
    container.appendChild(titulo);
    titulo.appendChild(span1);
    titulo.appendChild(span3);
    span1.appendChild(i);
    span1.appendChild(span2);
    container.appendChild(p);
    container.appendChild(span4);
    span4.appendChild(input);
    span4.appendChild(button);
    button.appendChild(i2);

    containerPrincipal.appendChild(linha);

      
    })
    
    
    
    
    //Aqui
    
    diferentes.forEach((idCoral) => {
  
  let containerPrincipal = document.querySelector(".caixa");
  
  const linha = document.createElement("hr");
  const container = document.createElement("div");
  const titulo = document.createElement("h2");
  const span1 = document.createElement("span");
  const i = document.createElement("i");
  const i2 = document.createElement("i");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  const span4 = document.createElement("span");
  const input = document.createElement("input");
  const p = document.createElement("p");
  const button = document.createElement("button");
  
  span2.textContent = idCoral.nome;
  
  input.type = "checkbox";
  input.name = "checks";
  button.title = "Excluir";
  
  
  container.className = "colorante";
  span3.className = `${idCoral.nome} pigmentacoes`;
  span4.className = "colorante-botoes";
  i.className = "fa-solid fa-fill-drip";
  i2.className = "fa-solid fa-trash-can-arrow-up fa-lg";
  button.className = "botao";
  input.className = "escolha"
  
  
  
  container.id = idCoral.nome;
  
  containerPrincipal.appendChild(linha);
  containerPrincipal.appendChild(container);
  container.appendChild(titulo);
  titulo.appendChild(span1);
  titulo.appendChild(span3);
  span1.appendChild(i);
  span1.appendChild(span2);
  container.appendChild(p);
  container.appendChild(span4);
  span4.appendChild(input);
  span4.appendChild(button);
  button.appendChild(i2);
  
  containerPrincipal.appendChild(linha);
  
})
      
    } if (valor === 0) {
  
  colorantesCoral.forEach((idCoral) => {

    let containerPrincipal = document.querySelector(".caixa");

    const linha = document.createElement("hr");
    const container = document.createElement("div");
    const titulo = document.createElement("h2");
    const span1 = document.createElement("span");
    const i = document.createElement("i");
    const i2 = document.createElement("i");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    const span4 = document.createElement("span");
    const input = document.createElement("input");
    const p = document.createElement("p");
    const button = document.createElement("button");

    span2.textContent = idCoral.nome;

    input.type = "checkbox";
    input.name = "checks";
    button.title = "Excluir";


    container.className = "colorante";
    span3.className =  `${idCoral.nome} pigmentacoes`;
    span4.className =  "colorante-botoes";
    i.className = "fa-solid fa-fill-drip";
    i2.className = "fa-solid fa-trash-can-arrow-up fa-lg";
    button.className = "botao";
    input.className = "escolha"



    container.id =  idCoral.nome;

    containerPrincipal.appendChild(linha);
    containerPrincipal.appendChild(container);
    container.appendChild(titulo);
    titulo.appendChild(span1);
    titulo.appendChild(span3);
    span1.appendChild(i);
    span1.appendChild(span2);
    container.appendChild(p);
    container.appendChild(span4);
    span4.appendChild(input);
    span4.appendChild(button);
    button.appendChild(i2);

    containerPrincipal.appendChild(linha);

    })
}

    const container = document.querySelectorAll('.colorante'); // seletor mais específico


container.forEach(item => {
  item.addEventListener('click', event => {
    event.stopPropagation();
    pigmento = event.currentTarget.id;
    abrirModal(); // apenas se existir
  });
});

let icone = document.querySelectorAll(".botao");

icone.forEach(item => {

  item.addEventListener("click", (event) => {
    event.stopPropagation();

    let idDoPai = event.currentTarget;

    let idPigmento = idDoPai.closest("div");

    let listaDePigmentos = JSON.parse(localStorage.getItem('@listaDePigmentos')) || [];

    listaDePigmentos = listaDePigmentos.filter(obj => obj.id !== idPigmento.id);

    localStorage.setItem('@listaDePigmentos', JSON.stringify(listaDePigmentos));

    showWarning("Excluindo registro!");

    setTimeout(() => {
      location.reload();
    }, 1000);
  })
});

const checkboxes = document.querySelectorAll(".escolha");
const legenda = document.querySelector(".legenda");
const iconeExcluir = document.getElementById("botao-cabecalho");

// Exibe ou oculta o botão conforme houver algum marcado
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (event) => {
    event.stopPropagation();

    // Se pelo menos um estiver marcado, mostra o botão
    const algumMarcado = Array.from(checkboxes).some((cb) => cb.checked);
    iconeExcluir.style.display = algumMarcado ? "block" : "none";

    // Verifica se há algum marcado
    const checkboxesMarcados = Array.from(checkboxes).filter(
      (cb) => cb.checked
    );
    const algumMarcado2 = checkboxesMarcados.length > 0;

    // Mostra ou esconde o botão de exclusão
    iconeExcluir.style.display = algumMarcado2 ? "block" : "none";

    // Atualiza o número de itens marcados na legenda
    legenda.textContent = checkboxesMarcados.length;
  });
});

iconeExcluir.addEventListener("click", () => {
  // 1. Pega os IDs dos pais dos checkboxes marcados
  const idsParaExcluir = Array.from(checkboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.closest("div").id);

  // 2. Pega a lista atual do localStorage
  const listaAtual =
    JSON.parse(localStorage.getItem("@listaDePigmentos")) || [];

  // 3. Filtra removendo os IDs marcados
  const novaLista = listaAtual.filter(
    (pigmento) => !idsParaExcluir.includes(pigmento.id)
  );

  // 4. Atualiza o localStorage
  localStorage.setItem("@listaDePigmentos", JSON.stringify(novaLista));

  // 5. Atualiza legenda e recarrega
  legenda.textContent = novaLista.length;

    showWarning("Excluindo registro!");

    setTimeout(() => {
      location.reload();
    }, 1000);
});

  colorir();
  resultado();
});