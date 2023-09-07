const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');
let posicionX = 15, posicionY = 15, oldX=0, oldY=0, w = 25, h = 25;
let toco = false;
let arregloMuros = [];

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

crearMuro(0, 0, 500, 10);
crearMuro(0, 0, 10, 500);
crearMuro(0, 490, 500, 10);
crearMuro(490, 0, 10, 500);
crearMuro(60, 0, 10, 60);
crearMuro(0, 90, 80, 10);
crearMuro(60, 55, 50, 10);
crearMuro(110, 55, 10,50);

pintarMapa();

//Jugador inicial
ctx.fillStyle = 'black';
ctx.fillRect(posicionX, posicionY, w, h);

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

    ctx.fillStyle = '#000';
    ctx.fillRect(posicionX, posicionY, w, h); 
});

function pintarMapa(){
    ctx.fillStyle = '#6ed671';
    ctx.fillRect(0, 0, 600, 600);

    //este ciclo pinta los muros que se vayan agregando al array.
    for(let i = 0; i < arregloMuros.length; i++){
        arregloMuros[i].pintarMuro();
    }
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

