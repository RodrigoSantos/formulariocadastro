export default function ehMaiorDeIdade(campo){
    const dataNacimento = new Date(campo.value);
    if (!validaIdade(dataNacimento)){
        campo.setCustomValidity('O usuário não é maior de idade');
    } 
//    console.log(validaIdade(dataNacimento))
}

function validaIdade(data){
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    
    return dataAtual >= dataMais18;
}
