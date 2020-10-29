const nome = document.getElementById("nome");
const idade = document.getElementById("idade");
const classificadoComo = document.getElementById("classificado");
const botao = document.getElementById("botao");
const corpoT = document.getElementById("corpoTabela");

idade.addEventListener("keyup", classifica);
botao.addEventListener("click", adicioarLinhas);

function classifica() {
  if (idade.value < 10) {
    classificadoComo.value = "Criança";
  } else if (idade.value < 15) {
    classificadoComo.value = "Adolescente";
  } else if (idade.value < 25) {
    classificadoComo.value = "Jovem";
  } else if (idade.value < 40) {
    classificadoComo.value = "Adulto";
  } else {
    classificadoComo.value = "Passou da idade";
  }
}

function adicioarLinhas() {
  if (classificadoComo.value != "") {
    //Cria os elementos HTML (TR e TD) Linhas e Colunas
    const linha = document.createElement("tr");
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    //Atribui valores entre as colunas TD
    col1.innerText = nome.value;
    col2.innerText = idade.value;
    col3.innerText = classificadoComo.value;
    col4.innerHTML =
      "<input type='button' value=' Alterar ' onclick='alterarLinhas(this)'/>";
    col4.innerHTML +=
      "<input type='button' value=' Del ' onclick='excluirLinhas(this)'/>";
    //Inclui objetos HTML filhos para a linha TR (as colunas)
    linha.appendChild(col1);
    linha.appendChild(col2);
    linha.appendChild(col3);
    linha.appendChild(col4);
    //Acrescenta a linha ao corpo da Tabela
    corpoT.appendChild(linha);
    //Limpar os Campos do Formulário
    nome.value = "";
    idade.value = "";
    classificadoComo.value = "";
  }
}

function excluirLinhas(elemento) {
  elemento.parentNode.parentNode.remove();
}

function alterarLinhas(elemento) {
  elemento.parentNode.parentNode.cells[0].setAttribute(
    "contenteditable",
    "true"
  );
  elemento.parentNode.parentNode.cells[1].setAttribute(
    "contenteditable",
    "true"
  );
  elemento.parentNode.parentNode.cells[2].setAttribute(
    "contenteditable",
    "true"
  );
  elemento.parentNode.parentNode.cells[3].innerHTML =
    "</td>" +
    "<input type='button' value=' Concluir ' onclick='concluirEdicao(this)'/>" +
    "</td>";
}

function concluirEdicao(elemento) {
  elemento.parentNode.parentNode.cells[0].setAttribute(
    "contenteditable",
    "false"
  );
  elemento.parentNode.parentNode.cells[1].setAttribute(
    "contenteditable",
    "false"
  );
  elemento.parentNode.parentNode.cells[2].setAttribute(
    "contenteditable",
    "false"
  );
  elemento.parentNode.parentNode.cells[3].innerHTML =
    "<td><input type='button' value=' Alterar ' onclick='alterarLinhas(this)'/>" +
    "<input type='button' value=' Del ' onclick='excluirLinhas(this)'/></td>";
}

function carregaTabelaCookie() {
  let tabelaIdades = lerCookie("tabelaidades");
  let linhas = tabelaIdades.split("*");
  for(let i = 0; i < linhas.length - 1; i++){
    let celula = linhas[i].split("-"); //Divide em células
    const linha = document.createElement("tr");
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    col1.innerText = celula[0];
    col2.innerText = celula[1];
    col3.innerText = celula[2];
    col4.innerHTML =
      "<input type='button' value=' Alterar ' onclick='alterarLinhas(this)'/>";
    col4.innerHTML +=
      "<input type='button' value=' Del ' onclick='excluirLinhas(this)'/>";
    linha.appendChild(col1);
    linha.appendChild(col2);
    linha.appendChild(col3);
    linha.appendChild(col4);
    corpoT.appendChild(linha);
  }
}

function salvaTabelaCookie(){
  let conteudo = "";
  for(let i = 1; i < corpoT.parentNode.rows.length; i++){
    conteudo += corpoT.parentNode.rows[i].cells[0].innerHTML+"-";
    conteudo += corpoT.parentNode.rows[i].cells[1].innerHTML+"-";
    conteudo += corpoT.parentNode.rows[i].cells[2].innerHTML+"*";
  }
  criarCookie("tabelaidades", conteudo);
  alert("Dados salvos em Cookie, lembre-se que cabe apenas 4KB");
}

function criarCookie(nome, valor) {
  let dtExpira = "expires = Tue, 01 Jan 2115 12:00:00 UTC";
  document.cookie = nome + "=" + valor + ";" + dtExpira;
}

function lerCookie(nome) {
  let vnome = nome + "=";
  let ca = document.cookie.split(";"); //Retorna um vetor com todos os cookies
  for (let i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    } //Eliminar caracteres em branco
    if (c.indexOf(vnome) == 0) {
      return c.substring(vnome.length, c.length);
    }
  }
  return "";
}