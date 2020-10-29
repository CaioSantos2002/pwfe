const data = document.getElementById("data")
const compromisso = document.getElementById("descricao")
const botao = document.getElementById("botao")
const corpoT = document.getElementById("corpoTabela")

botao.addEventListener("click", adicionarLinhas);

function adicionarLinhas() {
    if (compromisso.value != "") {

        const linha = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");

        col1.innerText = data.value;
        col2.innerText = compromisso.value;
        col3.innerText +=
            "<input type='button' value=' Alterar ' onclick='alterarLinhas(this)'/>";
        col3.innerHTML +=
            "<input type='button' value=' Del ' onclick='excluirLinhas(this)'/>";

        linha.appendChild(col1);
        linha.appendChild(col2);
        linha.appendChild(col3);
        //Acrescenta a linha ao corpo da Tabela
        corpoT.appendChild(linha);
        //Limpar os Campos do Formulário
        data.value = "";
        compromisso.value = "";
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
    elemento.parentNode.parentNode.cells[2].innerHTML =
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

    elemento.parentNode.parentNode.cells[2].innerHTML =
        "<td><input type='button' value=' Alterar ' onclick='alterarLinhas(this)'/>" +
        "<input type='button' value=' Del ' onclick='excluirLinhas(this)'/></td>";
}

function carregaTabelaCookie() {
    let tabelaData = lerCookie("tabeladata");
    let linhas = tabelaData.split("*");
    for (let i = 0; i < linhas.length - 1; i++) {
        let celula = linhas[i].split("-");
        const linha = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");
        col1.innerText = celula[0];
        col2.innerText = celula[1];
        col3.innerHTML +=
            "<input type='button' value=' Alterar ' onclick='alterarLinhas(this)'/>";
        col3.innerHTML +=
            "<input type='button' value=' Del ' onclick='excluirLinhas(this)'/>";
        linha.appendChild(col1);
        linha.appendChild(col2);
        linha.appendChild(col3);
        corpoT.appendChild(linha);
    }
}

function salvaTabelaCookie() {
    let conteudo = "";
    for (let i = 1; i < corpoT.parentNode.rows.length; i++) {
        conteudo += corpoT.parentNode.rows[i].cells[0].innerHTML + "-";
        conteudo += corpoT.parentNode.rows[i].cells[1].innerHTML + "-";
    }
    criarCookie("tabeladata", conteudo);
    alert("Dados salvos em Cookie, lembre-se que cabe apenas 4KB");
}

function criarCookie(data, comp) {
    let dtExpira = "expires = Tue, 01 Jan 2100 12:00:00 UTC";
    document.cookie = data + "=" + comp + ";" + dtExpira;
}

function lerCookie(data) {
    let vdata = FormData + "=";
    let ca = document.cookie.split(";"); //Retorna um vetor com todos os cookies
    for (let i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        } //Eliminar caracteres em branco
        if (c.indexOf(vdata) == 0) {
            return c.substring(vdata.length, c.length);
        }
    }
    return "";
}