var canvas2 = document.getElementById("canvas_2");
var ctx2 = canvas2.getContext("2d");

var canvas_w2 = canvas2.width;
var canvas_h2 = canvas2.height;

const RADIO = 30;
const NUM_CIRCULOS = 200;
const colores = ['blue', 'red', 'yellow', 'green', 'black'];
const VEL_CIRC = 8;
// ctx2.arc(canvas_w/2, canvas_h/2, RADIO, 0, 2*Math.PI);
// ctx2.stroke();
// Si quisieramos un círculo relleno usariamos
//ctx2.fill();

// Objeto mouse
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

class Circulo {

    constructor(x, y, radio, color) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.relleno = false;
        this.dx = (Math.random() - 0.5) * VEL_CIRC + 2;
        this.dy = (Math.random() - 0.5) * VEL_CIRC + 2;
    }

    draw() {
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.radio, 0, 2*Math.PI, false);
        ctx2.strokeStyle = this.color;
        ctx2.fillStyle = this.color;

        if (this.relleno) {
            ctx2.fill();
        }
        else {
            ctx2.stroke();
        }
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    checkBounds(max_x, max_y) {
        if (this.x + this.radio >= max_x) {
            this.dx *= -1;
            this.x = max_x - this.radio;
        }
        else if (this.x - this.radio <= 0) {
            this.dx *= -1;
            this.x = this.radio;
        }

        if (this.y + this.radio >= max_y) {
            this.dy *= -1;
            this.y = max_y - this.radio;
        }
        else if (this.y - this.radio <= 0) {
            this.dy *= -1;
            this.y = this.radio;
        }
    }

    checkMouseDistance() {
        if (mouse.x - this.x < 50) {
            
        }
    }

    checkColission(otro_circulo) {

    }

    changeColor(color) {
        this.color = color;
    }

}


circulos = []
for (var i = 0; i < NUM_CIRCULOS; i++) {
    circulos.push(new Circulo(
        Math.floor((Math.random() * (canvas_w2 - RADIO - 1)) + RADIO + 1),
        Math.floor((Math.random() * (canvas_h2 - RADIO - 1)) + RADIO + 1),
        RADIO,
        colores[Math.floor((Math.random() * colores.length))]
    ));
    //console.log("Circulo agregado");
}

function animate2() {
    //ctx2.fillStyle = 'white';
    ctx2.clearRect(0,0, canvas_w2, canvas_h2);

    circulos.forEach(element => {
        element.move();
        element.draw();        
        element.checkBounds(canvas_w2, canvas_h2);
    });

    requestAnimationFrame(animate2);
    //console.log('Frame canvas2');
}

animate2();

// Aplicando cambios al color de los circulos
const btn_circulos_color = document.getElementById("btn_circ_color");


// Funciones
const cambiarColorCirculos = function(){
    const color_seleccionado = document.getElementById("colores_circ").value;

    switch(color_seleccionado) {
        case "negro":
            circulos.forEach(circulo => {
                circulo.changeColor('black')
            });
            break;
        
        case "multicolor":
            circulos.forEach(circulo => {
                circulo.changeColor(colores[Math.floor((Math.random() * colores.length))]);
            });
            break;
    }
}

btn_circulos_color.addEventListener("click", cambiarColorCirculos);