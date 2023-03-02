export default function ehUmCPF(campo){
    const cpf = campo.value.replace(/\.|-/g,"");
    /*const a = validaNumerosRepetidos(cpf);
    const b = validaPrimeiroDigito(cpf);
    const c =validaSegundoDigito(cpf);
    console.table(a,b,c);*/
    
    if(validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)){
        campo.setCustomValidity('Esse CPF não é válido!')
    } 
    
}

function validaNumerosRepetidos(cpf){
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]        
    return numerosRepetidos.includes(cpf);
}

function validaPrimeiroDigito(cpf){
    let soma = 0;
    let multiplicador = 10;

    for(let tamanho = 0; tamanho < 9; tamanho ++){ 
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;//modulo de 11

    if(soma == 10 || soma == 11){
        soma=0;
    } 
      
    return soma != cpf[9]; //Verifica o primeiro dígito e retorna verdadeiro
}

function validaSegundoDigito(cpf){
    let soma = 0;
    let multiplicador = 11;
    
    for(let tamanho = 0; tamanho < 10; tamanho ++){ 
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }
    
    soma = (soma * 10) % 11;//modulo de 11
    
    if(soma == 10 || soma == 11){
        soma = 0;
    } 
        
    return soma != cpf[10]; //Verifica o primeiro dígito e retorna verdadeiro    
}