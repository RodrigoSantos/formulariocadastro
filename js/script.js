import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const CamposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log("Teste");
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    window.location.href = "./abrir-conta-form-2.html";
})

CamposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo)) //blur é quando tiramos o foco do campo, clica fora ou em outro lugar   
    campo.addEventListener("invalid",evento => evento.preventDefault()); //Evita o tratamento padrão e permite tratarmos o erro da nossa maneira
});

const tiposDeErro = [
    'valueMissing',//Quando não há nada no campo, vazio
    'typeMismatch',//Quando o tipo não combina com o elemnte data a ser inserido, exemplo do e-mail sem @
    'patternMismatch',//CPF se não seguir o padrão ele não aceita
    'tooShort', //tamanho ou quantidade de caracteres
    'customError'
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
};

function verificaCampo(campo){
    let mensagem ="";
    campo.setCustomValidity('')
    if (campo.name == "cpf" && campo.value.length >= 11){
        ehUmCPF(campo);
    } 
    if (campo.name =="aniversario" && campo.value != ""){
        ehMaiorDeIdade(campo);
    }
    //console.log(campo.validity); 
    tiposDeErro.forEach(erro =>{ //Pega cada erro 
        if (campo.validity[erro]){//verifica se o erro é o que está vindo no campo
            mensagem = mensagens[campo.name][erro];//destrincha a menssagem validando o campo e pegando o erro
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');//Pega somente o campo que estiver perto da mensagem-erro
    const validadorDeInput = campo.checkValidity();
    if (!validadorDeInput){//verifica se está tudo certo se não executa
        mensagemErro.textContent = mensagem;//se não tiver válido imprime a mensagem que estiver em mensagem
    } else {
        mensagemErro.textContent = "";
    }
}

