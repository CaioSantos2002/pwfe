function processaForm() {
    var nome = document.getElementById("name").value;
    var idade = document.getElementById("age").value;
    var sexo = document.getElementById("gender").value;


    var fase;
    if (idade < 10) {
        fase = "criança";
    } else if (idade < 15) {
        fase = "adolescente";
    } else if (idade < 20) {
        fase = "jovem";
    } else if (idade < 40) {
        fase = "adulto";
    } else {
        fase = "idoso";
    }

    alert("Olá " + nome + " você tem " + idade + " anos, é do sexo " + sexo + " e é " + fase + ".");
}