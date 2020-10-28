var canvas = document.getElementById("canvas_1");
var ctx = canvas.getContext("2d");

var canvas_w = canvas.width;
var canvas_h = canvas.height;

const MIN_LARGO_GOTA = 5;
const MAX_LARGO_GOTA = 10;
const GRAVEDAD = 1.1;
var num_gotas;

const slider = document.getElementById("intensidad_lluvia");
const contador_gotas = document.getElementById("n_gotas");
num_gotas = slider.value;

class Gota {

    constructor(x, y, largo) {
        this.x = x;
        this.y = y;
        this.largo = largo;
        this.ancho = 2;
        this.speed = 1;
        this.color = "rgba(200, 200, 200, 0.9)";
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.ancho, this.largo);
    }

    updateSpeed(gravity) {
        this.speed += gravity;
    }

    move() {
        this.updateSpeed(GRAVEDAD);
        this.y += this.speed;
    }

    checkBounds(max_y) {
        if (this.y + this.largo >= max_y) {
            this.reset();
        }
    }

    reset() {
        this.x = Math.floor((Math.random() * canvas_w));
        this.y = Math.floor((Math.random() * canvas_h) - canvas_h);
        this.largo = Math.floor((Math.random() * MAX_LARGO_GOTA) + MIN_LARGO_GOTA);
        this.speed = 1;
        //console.log("Se reinicio la gota");
    }
}


// Lista de gotas que caeran
let gotas = []
// Agregamos gotas a la lista
for (var i = 0; i < num_gotas; i++) {
    const x = Math.floor((Math.random() * canvas_w));
    const y = Math.floor((Math.random() * canvas_h));
    const largo = Math.floor((Math.random() * MAX_LARGO_GOTA) + MIN_LARGO_GOTA);
    gotas.push(new Gota(x, y, largo));
    //console.log("Nueva gota: x: " + x + ", y:" + y + ", l: " + largo);
}

function animate() {
    ctx.fillStyle = 'rgba(20, 20, 20, 0.5)';
    ctx.fillRect(0,0, canvas_w, canvas_h);

    gotas.forEach(element => {
        element.move();
        element.draw(ctx);        
        element.checkBounds(canvas_h);
    });

    requestAnimationFrame(animate);
    //console.log('Frame');
    console.log("Num gotas: " , num_gotas);
}

animate();

slider.addEventListener("mousemove", function(){
    const nuevo_num_gotas = slider.value;
    console.log("nuevo gotas: ", nuevo_num_gotas);

    if (num_gotas > nuevo_num_gotas) {
        const gotas_a_eliminar = num_gotas - nuevo_num_gotas;
        for (var i = 0; i < gotas_a_eliminar; i++) {
            gotas.pop();
        }
        num_gotas = nuevo_num_gotas;
    }
    else if (num_gotas < nuevo_num_gotas) {
        const gotas_a_agregar = nuevo_num_gotas - num_gotas;
        for (var i = 0; i < gotas_a_agregar; i++) {
            const x = Math.floor((Math.random() * canvas_w));
            const y = Math.floor((Math.random() * canvas_h));
            const largo = Math.floor((Math.random() * MAX_LARGO_GOTA) + MIN_LARGO_GOTA);
            gotas.push(new Gota(x, y, largo));
        }
        num_gotas = nuevo_num_gotas;
    }

    contador_gotas.textContent = num_gotas.toString() + 
    (num_gotas == 1 ? " gota" : " gotas");

});