

class Jugador {
    constructor(nombre, dinero) {
        this.nombre = nombre;
        this.dinero = dinero;
        this.apuestasRealizadas = []; 
    }

    
    registrarApuesta(juego, monto, resultado) {
        this.apuestasRealizadas.push({ juego, monto, resultado });
    }

   
    obtenerUltimaApuesta() {
        return this.apuestasRealizadas.pop(); 
    }
}


let nombreJugador = prompt("¿Cual es tu nombre?").toLowerCase();
let jugador = new Jugador(nombreJugador, 60000); 


const generarNumeroAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


const jugarRuleta = () => {
    let apuesta = parseInt(prompt("¿Cuanto deseas apostar en la ruleta?"));
    if (apuesta > jugador.dinero || isNaN(apuesta) || apuesta <= 0) {
        alert("Error al apostar. Asegurate de tener suficiente dinero y de ingresar un valor numerico positivo");
        return;
    }

    let numeroElegido = parseInt(prompt("Elige un numero entre 0 y 36"));
    if (isNaN(numeroElegido) || numeroElegido < 0 || numeroElegido > 36) {
        alert("Error. Debes elegir un numero entre 0 y 36");
        return;
    }

    let numeroGanador = generarNumeroAleatorio(0, 36);

    if (numeroElegido === numeroGanador) {
        let ganancia = apuesta * 36; 
        jugador.dinero += ganancia;
        jugador.registrarApuesta("Ruleta", apuesta, "Ganada");
        alert(`¡Felicidades El numero ganador fue ${numeroGanador}. Has ganado ${ganancia}`);
    } else {
        jugador.dinero -= apuesta;
        jugador.registrarApuesta("Ruleta", apuesta, "Perdida");
        alert(`Lo siento, el numero ganador fue ${numeroGanador}. Pierdes ${apuesta}`);
    }
};


const jugarTragamonedas = () => {
    let apuesta = parseInt(prompt("¿Cuanto deseas apostar en las tragamonedas?"));
    if (apuesta > jugador.dinero || isNaN(apuesta) || apuesta <= 0) {
        alert("Error al apostar. Asegurate de tener suficiente dinero y de ingresar un valor numerico positivo");
        return;
    }

    let resultado = [];
    for (let i = 0; i < 3; i++) {
        resultado.push(generarNumeroAleatorio(1, 5)); 
    }

    alert(`Resultados de las tragamonedas: ${resultado.join(' | ')}`);

    if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
        let ganancia = apuesta * 3;
        jugador.dinero += ganancia;
        jugador.registrarApuesta("Tragamonedas", apuesta, "Ganada");
        alert(`¡Felicidades! Has ganado ${ganancia}`);
    } else {
        jugador.dinero -= apuesta;
        jugador.registrarApuesta("Tragamonedas", apuesta, "Perdida");
        alert(`Lo siento, pierdes ${apuesta}`);
    }
};


const mostrarSaldo = () => {
    alert(`Tu saldo actual es: ${jugador.dinero}`);
};


const mostrarUltimaApuesta = () => {
    const ultimaApuesta = jugador.obtenerUltimaApuesta();
    if (ultimaApuesta) {
        alert(`Tu ultima apuesta fue en el juego ${ultimaApuesta.juego}, apostaste ${ultimaApuesta.monto} y resulto ${ultimaApuesta.resultado}.`);
    } else {
        alert("Aun no has realizado ninguna apuesta");
    }
};


let continuar = true;
while (continuar && jugador.dinero > 0) {
    let opcion = prompt("Elige una opcion:\n1. Ruleta\n2. Traga monedas\n3. Ver saldo\n4. Ver ultima apuesta\n5. Salir");

    if (opcion === "1") {
        jugarRuleta();
    } else if (opcion === "2") { 
        jugarTragamonedas();
    } else if (opcion === "3") {
        mostrarSaldo();
    } else if (opcion === "4") {
        mostrarUltimaApuesta();
    } else if (opcion === "5") {
        continuar = false;
    } else {
        alert("Opcion invalida. Por favor, elige una opcion entre 1 y 5");
    }
}

if (jugador.dinero <= 0) {
    alert("Te has quedado sin dinero. ¡Gracias por jugar!");
} else {
    alert(`¡Gracias por visitar el casino Acosta, Saludos ${jugador.nombre}!`);
}