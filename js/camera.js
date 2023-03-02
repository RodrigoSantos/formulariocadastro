const botaoInicialCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
let imagemURL = '';
const botaoEnviarFoto = document.querySelector("[data-enviar]");


botaoInicialCamera.addEventListener("click", async function() {//Inicialisa a camera
    const iniciarVideo = await navigator.mediaDevices//await é usado de maneira assincrona pois precisa aguardar o user permitir a abertura da camera
    .getUserMedia({video:true, audio:false });//somente o video

    botaoInicialCamera.style.display = "none";//apaga o botão
    campoCamera.style.display = "block";//mostra na tela

    video.srcObject = iniciarVideo;//recebe os dados do video
});

botaoTirarFoto.addEventListener("click", function() {//evento do botão tirar foto
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);//cria um contesto em 2d e desenha o video na posição que estava a imagem

    imagemURL = canvas.toDataURL("image/jpeg");//converte a URL da imagem e salva na variavel para que possamos salvar a imagem depois 
    
    campoCamera.style.display = "none";//feho a camero mantenho apenas a foto
    mensagem.style.display = "block";//exibe a mensagem
});

botaoEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");//Pega os dados do cadastro
    const converteRetorno = JSON.parse(receberDadosExistentes); //converte

    converteRetorno.imagem = imagemURL;//Adiciona o campo imagem com a imagem

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))//salva novamente trasformando em string

    window.location.href = '../pages/abrir-conta-form-3.html';
})