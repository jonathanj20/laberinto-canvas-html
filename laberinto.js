const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');
let posicionX = 15, posicionY = 15, oldX=0, oldY=0, w = 30, h = 30;
let toco = false;
let arregloMuros = [];
let tucan = new Image();
const musica = document.getElementById('musicaAmbiental');

tucan.src = 'iconos/feliz.png'

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

/*esta función crea un objeto de tipo Muro con las propiedades que le
pasamos como parametros, y después los agrega al array*/
function crearMuro(x, y, ancho, alto){
    const muro = new Muro(x, y, ancho, alto);
    arregloMuros.push(muro);
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
crearMuro(320, 175, 10, 50); //verticales
crearMuro(320, 175, 10, 50);
crearMuro(290, 215, 10, 100);
crearMuro(240, 265, 50, 10);
crearMuro(110, 265, 85, 10);
crearMuro(109, 215, 10, 59);
crearMuro(320, 175, 10, 50);
crearMuro(160, 210, 10, 105);//vertiacles
crearMuro(230, 140, 10, 50);//verticales
crearMuro(260, 235, 10, 35);//verticales
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
crearMuro(40, 440, 90, 10);

pintarMapa();

//Jugador inicial   
tucan.onload = () => {
    ctx.drawImage(tucan, posicionX, posicionY, w, h);
}

//movimiento del jugador
document.addEventListener("keydown",(e) => {
    switch(e.key){
        case 'ArrowUp':
            posicionY -= 5;
            break;
        case 'ArrowRight':
            posicionX += 5;
            break;
        case 'ArrowDown':
            posicionY += 5;
            break;
        case 'ArrowLeft':
            posicionX -= 5;
            break;
    }
    
    verificarColision();
    
    //si lo tocó, entonces se reinicia de nuevo la variable tocó. 
    if(!toco){
        oldX = posicionX;
        oldY = posicionY;
    } else {
        toco = false;
    }

    pintarMapa();
    dibujarTucan();
});

//esta función dibuja el personaje
function dibujarTucan(){
    ctx.drawImage(tucan, posicionX, posicionY, w, h);
}

function pintarMapa(){
    ctx.fillStyle = '#6ed671';
    ctx.fillRect(0, 0, 600, 600);

    for(let i = 0; i < arregloMuros.length; i++){
        arregloMuros[i].pintarMuro();
    }

    //parte inferior para puntajes
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 560, 600, 40);
}

function verificarColision(){
    for(let i = 0; i < arregloMuros.length; i++){
        if(arregloMuros[i].estaTocando()){ 
            posicionX = oldX;
            posicionY = oldY;
            toco = true;
            break;
        } 
    }
}

//este evento se está usando para reproducir la música cuando cargue la página
window.addEventListener('load', () => {
    musica.play();
});

//este evento se está usando para reproducir la música de nuevo cuando termine
musica.addEventListener('ended', () => {
    musica.play()
});