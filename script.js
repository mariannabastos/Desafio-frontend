//Validação do CPF
function validaCPF(cpf) {
    if (cpf.length != 11) {
        return false;
    }
    else {
        var numeros = cpf.substring(0, 9);
        var digitos = cpf.substring(9);
        var soma = 0
        for (var i = 10; i > 1; i--){
            soma += numeros.charAt(10 - i) * i;
        }
        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        soma = 0;
        numeros = cpf.substring(0, 10);
        for (var k = 11; k > 1; k--){
            soma += numeros.charAt(11 - k) * k;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
         
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    };
}

function validacaoCPF() {   
    var cpf = document.getElementById('cpf').value;
    var resultadoValidacao = validaCPF(cpf); 
    
    if (!resultadoValidacao) {
        document.getElementById('erroCPF').style.display='block';
        return false;
    } 
    else {
        document.getElementById('erroCPF').style.display='none';
        return true;
    }
}
document.getElementById('cpf')
        .addEventListener('focusout', validacaoCPF);

//Animação da seta
function displayAbout() {
    var arrow = document.getElementById('animation');
    arrow.classList.toggle('rotate');
}

//Busca pelo CEP do candidato
const preencherForm = (logradouro) =>{
    document.getElementById('logradouro').value = logradouro.logradouro;
    document.getElementById('bairro').value = logradouro.bairro;
    document.getElementById('cidade').value = logradouro.localidade;
    document.getElementById('uf').value = logradouro.uf;
}

const limpaForm = (logradouro) =>{
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep); 
const pesquisarCep = async() => {
    limpaForm();
    
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const logradouro = await dados.json();
        if (logradouro.hasOwnProperty('erro')){
            document.getElementById('logradouro').value;
            alert('CEP inexistente, verifique e tente novamente.');
        }else {
            preencherForm(logradouro);
        }
    }else{
        document.getElementById('logradouro').value;
        alert('CEP no formato incorreto, digite apenas números.')
    }    
}
document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);

//Dados do formulário
const formularioDb = () => {
    let form = {
        nome: document.getElementById('nome').value,
        cargo: document.getElementById('cargo').value,
        data: document.getElementById('data').value,
        civil: document.getElementById('civil').value,
        genero: document.getElementById('genero').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        telefone: document.getElementById('telefone').value,
        celular: document.getElementById('celular').value,
        email: document.getElementById('email').value,
        identidade: document.getElementById('identidade').value,
        orgao: document.getElementById('orgao').value,
        cpf: document.getElementById('cpf').value,
        veiculo: document.getElementById('veiculo').value,
        cnh: document.getElementById('cnh').value,
    };
    console.log(form);
    return form
}

const criarCandidato = async (candidato) => {
    const usuario = await fetch('https://jobsnet-gamaxp.herokuapp.com/registro', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formularioDb())
        });
        if (usuario.status === 200) {
            alert('Cadastro concluído!');
        }
        if (usuario.status === 500) {
        alert('Erro: CPF ou e-mail já cadastrado!');
    }
}

//Checagem final para confirmação de envio do formulário
function checagem() {
    let email = document.getElementById('email').value;

    if (email == false || validacaoCPF() == false) {
        alert('Preencha todos os campos corretamente e tente novamente.');
    } else {
        criarCandidato();
        alert('Enviando formulário para o banco de dados. Clique OK para prosseguir.');
    }
}
