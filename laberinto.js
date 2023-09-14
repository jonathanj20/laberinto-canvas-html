const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');
let posicionX = 15, posicionY = 15, oldX=0, oldY=0, w = 30, h = 30, xMora=20, yMora=515;
let toco = false, gano = false, tocoFresa = false, pausa = false;
let arregloMuros = [], arregloFrutas =  [];
let tucan = new Image(), fresa = new Image(), mora = new Image(), puerta = new Image();
const musica = document.getElementById('musicaAmbiental');
const sonidoMeta = document.getElementById('sonidoFinal');
const sonidoTeletransportacion = document.getElementById('teletransportacion');
const sonidoFrutas = document.getElementById('sonidoFrutas');
const sonidoPausa = document.getElementById('sonidoPausa');
let tiempoTotalSegundos = 0, puntuacion = 0;

//asignando rutas de los iconos
mora.src = 'iconos/mora.png';
tucan.src = 'iconos/feliz.png'
fresa.src = 'iconos/fresa.png'
puerta.src = 'iconos/puerta.png'

//clase para crear muros
class Muro {
    constructor(x, y, ancho, alto){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
    }

    pintarMuro(){
        ctx.fillStyle = '#0b6c0e';
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    }

    estaTocando(){
        let t_x = this.x, t_y = this.y, t_w = this.ancho, t_h = this.alto;
        if(posicionX < t_x + t_w && posicionX + w > t_x && posicionY < t_y + t_h && posicionY + h > t_y){
            return true;
        } else {
            return false;
        }
    }
}

//clase para agregar frutas
class Fresa {
    constructor(x, y, ancho, alto){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
    }

    dibujarFresa(){
        ctx.drawImage(fresa, this.x, this.y, this.ancho, this.alto);
    }

    estaTocandoFresa(){
        let t_x = this.x, t_y = this.y, t_w = this.ancho, t_h = this.alto;
        if(posicionX < t_x + t_w && posicionX + w > t_x && posicionY < t_y + t_h && posicionY + h > t_y){
            return true;
        } else {
            return false;
        }
    }
}

/*esta función crea un objeto de tipo Muro con las propiedades que le
pasamos como parametros, y después los agrega al array*/
function crearMuro(x, y, ancho, alto){
    const muro = new Muro(x, y, ancho, alto);
    arregloMuros.push(muro);
}

/**función para crear fresas y agregarlas al array*/
function crearFresa(x, y, ancho, alto){
    const fresa1 = new Fresa(x, y, ancho, alto);
    arregloFrutas.push(fresa1);
}

//creación de muros
crearMuro(0, 0, 600, 10); //borde superior
crearMuro(0, 0, 10, 550); //borde izquierdo
crearMuro(0, 550, 600, 10);//borde inferior
crearMuro(590, 0, 10, 550);//borde derecho
crearMuro(50, 0, 10, 50);
crearMuro(0, 90, 70, 10);
crearMuro(50, 50, 50, 10);
crearMuro(100, 50, 10,90);
crearMuro(60, 135, 50,10);
crearMuro(50, 135, 10,40);
crearMuro(0, 205, 115, 10);
crearMuro(110, 90, 90, 10);
crearMuro(190, 52, 10, 38);
crearMuro(190, 52, 10, 38);
crearMuro(145, 0, 10, 60);
crearMuro(190, 50, 50, 10);
crearMuro(109, 175, 10, 40);
crearMuro(109, 175, 50, 10);
crearMuro(150, 135, 10, 50);
crearMuro(160, 135, 80, 10);
crearMuro(230, 100, 10, 40);
crearMuro(235, 100, 70, 10);
crearMuro(275, 50, 10, 50);
crearMuro(280, 50, 50, 10);
crearMuro(320, 50, 10, 95);
crearMuro(290, 140, 140, 10);
crearMuro(380, 0, 10, 100);
crearMuro(420, 95, 10, 130);
crearMuro(390, 50, 90, 10);
crearMuro(470, 60, 10, 90);
crearMuro(475, 100, 45, 10);
crearMuro(555, 100, 35, 10);
crearMuro(530, 0, 10, 70);
crearMuro(470, 183, 120, 10);
crearMuro(535, 145, 10, 45);
crearMuro(290, 215, 130, 10);
crearMuro(320, 175, 10, 50); 
crearMuro(320, 175, 10, 50);
crearMuro(290, 215, 10, 100);
crearMuro(240, 265, 50, 10);
crearMuro(110, 265, 85, 10);
crearMuro(109, 215, 10, 59);
crearMuro(320, 175, 10, 50);
crearMuro(160, 210, 10, 105);
crearMuro(230, 140, 10, 50);
crearMuro(260, 235, 10, 35);
crearMuro(210, 190, 50, 10);
crearMuro(470, 190, 10, 75);
crearMuro(340, 255, 200, 10);
crearMuro(340, 255, 10, 110);
crearMuro(108, 355, 240, 10);
crearMuro(108, 320, 10, 35);
crearMuro(215, 310, 10, 45);
crearMuro(68, 311, 50, 10);
crearMuro(60, 261, 10, 60);
crearMuro(45, 261, 20, 10);
crearMuro(10, 360, 35, 10);
crearMuro(0, 500, 80, 10);
crearMuro(40, 450, 10, 50);
crearMuro(40, 440, 150, 10);
crearMuro(180, 410, 10, 40);
crearMuro(180, 410, 100, 10);
crearMuro(270, 410, 10, 50);
crearMuro(330, 405, 100, 10); 
crearMuro(330, 405, 10, 105);
crearMuro(140, 500, 200, 10);
crearMuro(230, 475, 10, 25);
crearMuro(375, 470, 10, 90);
crearMuro(375, 460, 80, 10);
crearMuro(450, 460, 10, 50);
crearMuro(450, 505, 50, 10);
crearMuro(415, 525, 10, 25);
crearMuro(420, 315, 10, 90);
crearMuro(420, 315, 120, 10);
crearMuro(525, 465, 65, 10);
crearMuro(525, 370, 10, 100);
crearMuro(525, 370, 65, 10);
crearMuro(425, 370, 55, 10);
crearMuro(480, 420, 45, 10);
crearMuro(90, 400, 10, 40);
crearMuro(390, 260, 10, 25);
crearMuro(450, 295, 10, 25);
crearMuro(510, 260, 10, 25);
crearMuro(190, 500, 10, 20);
crearMuro(345, 325, 20, 10);
crearMuro(405, 360, 20, 10);

//creación de frutas
crearFresa(65, 15, 30, 30);
crearFresa(405, 15, 30, 30);
crearFresa(245, 115, 30, 30);
crearFresa(490, 200, 30, 30);
crearFresa(5, 455, 30, 30);

//movimiento del jugador
document.addEventListener("keydown",(e) => {
    switch(e.key){
        case 'ArrowUp':
            if(!pausa){
                posicionY -= 5;
            }
            break;
        case 'ArrowRight':
            if(!pausa){
                posicionX += 5;
            }
            break;
        case 'ArrowDown':
            if(!pausa){
                posicionY += 5;
            }
            break;
        case 'ArrowLeft':
            if(!pausa){
                posicionX -= 5;
            }
            break;
        case ' ':
            pausa = !pausa;
            break;
    }
    
    verificarColisionMuro();
    verificarColisionFresa();
    
    //si lo tocó, entonces se reinicia de nuevo la variable tocó. 
    if(!toco){
        oldX = posicionX;
        oldY = posicionY;
    } else {
        toco = false;
    }

    pintarMapa();
    dibujarTucan();
    llegoMeta();
    dibujarMora();
    ejecutarPausa();
});

//esta función dibuja el personaje
function dibujarTucan(){
    ctx.drawImage(tucan, posicionX, posicionY, w, h);
}

function dibujarMora(){
    let t_x = xMora, t_y = yMora, t_w = 30, t_h = 30;

    if(posicionX < t_x + t_w && posicionX + w > t_x && posicionY < t_y + t_h && posicionY + h > t_y){
        sonidoTeletransportacion.play();
        xMora = -100;
        posicionX = 15;
        posicionY = 15;
    }

    ctx.drawImage(mora, xMora, yMora, t_w, t_h);
}

function pintarMapa(){
    ctx.fillStyle = '#6ed671';
    ctx.fillRect(0, 0, 600, 560);

    for(let i = 0; i < arregloMuros.length; i++){
        arregloMuros[i].pintarMuro();
    }

     for(let i = 0; i < arregloFrutas.length; i++){
        arregloFrutas[i].dibujarFresa();
    }
}

function verificarColisionMuro(){
    for(let i = 0; i < arregloMuros.length; i++){
        if(arregloMuros[i].estaTocando()){ 
            posicionX = oldX;
            posicionY = oldY;
            toco = true;
            break;
        } 
    }
}

function verificarColisionFresa(){
    for(let i = 0; i < arregloFrutas.length; i++){
        if (arregloFrutas[i].estaTocandoFresa()) {
            sonidoFrutas.play();
            arregloFrutas.splice(i, 1); // Elimina la fruta del arreglo
            puntuacion++;
            break;
        }
    }
}

//Esta función es para comprobar si el jugador llegó a la meta
function llegoMeta(){
    let t_x = 540, t_y = 500, t_w = 50, t_h = 50;

    ctx.drawImage(puerta, t_x, t_y, t_w, t_h)

    if(posicionX < t_x + t_w && posicionX + w > t_x && posicionY < t_y + t_h && posicionY + h > t_y){
        sonidoMeta.play();
        gano = true;
    }
}

function puntaje(){
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`${puntuacion} / 5`, 440, 590);
    ctx.drawImage(fresa, 400, 565, 30, 30);
}

function ejecutarPausa(){
    if(pausa){
        musica.pause();
        sonidoPausa.play();

        ctx.fillStyle = 'rgba(194, 240, 60, .7)';
        ctx.fillRect(0, 0, 600, 560);

        ctx.font = '40px Arial';
        ctx.fillStyle = '#0044b2';
        ctx.fillText('P a u s a!', 220, 270);
    } else {
        musica.play();
    }
}

//este evento se está usando para ejecutar funciones cuando se termine de cargar la página
window.addEventListener('load', () => {
    musica.play();
    pintarMapa();
    dibujarTucan()
    llegoMeta();
    dibujarMora();
    setInterval(actualizarCronometro, 1000); // Actualiza cada segundo
});

//este evento se está usando para reproducir la música de nuevo cuando termine
musica.addEventListener('ended', () => {
    musica.play();
});

//cronómetro
// Función para formatear el tiempo en minutos y segundos
function formatearTiempo(tiempo) {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;
    return `${minutosFormateados}:${segundosFormateados}`;
}

//0, 560 coordenadas del rectangulo, y 600 de ancho
// Función para actualizar el cronómetro y dibujarlo en el canvas
function actualizarCronometro() {
    if(gano && !pausa){
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(0, 560, canvas.width, 40); // Fondo del cronómetro
        ctx.font = '20px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText(`Tiempo: ${formatearTiempo(tiempoTotalSegundos)}`, 10, 585);
    } else if(!pausa){
        tiempoTotalSegundos++;
        ctx.clearRect(0, 560, canvas.width, 40); // Limpiar el área del cronómetro
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(0, 560, canvas.width, 40); // Fondo del cronómetro
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`Tiempo: ${formatearTiempo(tiempoTotalSegundos)}`, 10, 585);
        puntaje();
    }
}