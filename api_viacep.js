function consulta_endereco() {
    // pegando o valor do cep no html e tazendo para o javascript través de um seletor CSS
    let cep = document.querySelector('#cep').value;

    //validação da quantidade de caracteres digitados
    if(cep.length !== 8){
        alert("CEP inválido!");
        return;
    }

    // concatenando a variável para substituir pelo valor do cep dentro da string
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    // pega os dados da API
    fetch(url).then(function(response){
        response.json().then(function(data){
            mostra_resultado(data);
        })
    })

}

function mostra_resultado(dados) {
    let resultado = document.querySelector('#resultado');

    // tratando o erro 
    if (dados.erro) {
        resultado.innerHTML = `<div class="alert alert-dark" role="alert">
                                    O CEP informado não foi localizado!
                               </div>`
    } else if (dados.complemento == '') {
        // tratando o resultado se não tiver o campo complemento
        resultado.innerHTML =  `<p><b>Endereço:</b> ${dados.logradouro}</p>
                                <p><b>Bairro:</b> ${dados.bairro}</p>
                                <p><b>Localidade:</b> ${dados.localidade} <b>UF:</b> ${dados.uf} <b>DDD:</b> ${dados.ddd}</p>`

    } else {
        // inserindo o resultado dentro da div #resultado
        resultado.innerHTML =  `<p><b>Endereço:</b> ${dados.logradouro}</p>
                                <p><b>Complemento:</b> ${dados.complemento}</p>
                                <p><b>Bairro:</b> ${dados.bairro}</p>
                                <p><b>Localidade:</b> ${dados.localidade} <b>UF:</b> ${dados.uf} <b>DDD:</b> ${dados.ddd}</p>`
    }
}