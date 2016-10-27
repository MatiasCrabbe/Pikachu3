var juego = {
    filas: [
        [],
        [],
        []
    ],
    espaciofacio: {
        fila: 2,
        columna: 2
    },
    iniciar: function(elemento) {
        console.log(this.filas, elemento);
        this.instalarpieza(elemento);
        this.capturarTecla();
        this.mezclarfichas(20);
    },
    crearPieza: function(numero, fila, columna) {
        var objeto = $('<div>');
        objeto.addClass('pieza');
        objeto.css({
            backgroundImage: "url('images/" + numero + ".jpg')",
            top: fila * 200,
            left: columna * 200
        });
        return {
            dom: objeto,
            fila: fila,
            columna: columna,
            numero: numero
        }
    },
    instalarpieza: function(elemento) {

        var numero = 1;
        for (var fila = 0; fila < 3; fila++) {
            for (var columna = 0; columna < 3; columna++) {
                if (fila === this.espaciofacio.fila && columna === this.espaciofacio.columna) {
                    this.filas[fila][columna] = null;
                } else {
                    var pieza = this.crearPieza(numero, fila, columna);
                    this.filas[fila][columna] = pieza;
                    numero++;
                    elemento.append(pieza.dom);
                }
            }
        }
    },
    moverHaciaAbajo: function(event) {
        if (this.espaciofacio.fila === 0) {
            return
        }
        var filaOrigen = this.espaciofacio.fila - 1;
        var columnaOrigen = this.espaciofacio.columna;
        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaArriba: function(event) {
        if (this.espaciofacio.fila === this.filas.length - 1) {
            return;
        }
        var filaOrigen = this.espaciofacio.fila + 1;
        var columnaOrigen = this.espaciofacio.columna;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaDerecha: function(event) {
        if (this.espaciofacio.columna === 0) {
            return;
        }
        var filaOrigen = this.espaciofacio.fila;
        var columnaOrigen = this.espaciofacio.columna - 1;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);

    },
    moverHaciaIzquierda: function(event) {
        if (this.espaciofacio.columna === this.filas[0].length - 1) {
            return;
        }
        var filaOrigen = this.espaciofacio.fila;
        var columnaOrigen = this.espaciofacio.columna + 1;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    capturarTecla: function() {
        var that = this;
        $(document).keydown(function(event) {
            switch (event.which) {

                case 40:
                    that.moverHaciaAbajo();
                    break;
                case 39:
                    that.moverHaciaDerecha();
                    break;
                case 38:
                    that.moverHaciaArriba();
                    break;
                case 37:
                    that.moverHaciaIzquierda();
                    break;
                default:
                    break;

            }
        });
    },
    Gano: function() {
        var gano = true;
        for (var fila = 0; fila < 3; fila++) {
            for (var columna = 0; columna < 3; columna++) {
                var pieza = this.filas[fila][columna]
                if (pieza === null) {
                    continue;
                }
                var filaInicial = pieza.fila;
                var columnaInicial = pieza.columna
                if (filaInicial !== fila || columnaInicial !== columna) {
                    gano = false;
                }
            }
        }
        if (gano) {
            alert('Bien campeon');
        }

    },
    mezclarfichas: function(veces) {
        var i = 0;
        var that = this;
        var mezcla = ['moverHaciaAbajo', 'moverHaciaArriba', 'moverHaciaDerecha', 'moverHaciaIzquierda']
        var s = setInterval(function() {
            i++;
            var ramdon = Math.floor(Math.random() * 4)
            var metodoramdon = mezcla[ramdon];
            that[metodoramdon]();
            if (i === veces) {
                clearInterval(s);
            }
        }, 100)
    },
    moverFichaFilaColumna: function(ficha) {
        console.log(this.filas[2][2])
        var fila = this.espaciofacio.fila;
        var columna = this.espaciofacio.columna;
        ficha.dom.animate({
            'left': this.espaciofacio.columna * 200 + 'px',
            'top': this.espaciofacio.fila * 200 + 'px'
        });
        this.filas[fila][columna] = ficha;
        console.log(this.filas[2][2]);
    },
    guardarEspacioVacio: function(fila, columna) {
        console.log(this.filas[1][2]);
        this.espaciofacio.fila = fila;
        this.espaciofacio.columna = columna;
        this.filas[fila][columna] = null;
        console.log(this.filas[1][2]);
    },
    intercambiarPosicionConEspacioVacio: function(fila, columna) {
        var fichas = this.filas[fila][columna];

        this.moverFichaFilaColumna(this.filas[fila][columna]);
        this.guardarEspacioVacio(fila, columna);
        this.Gano();
    }
};


$(function() {
    juego.iniciar($('#juego'));
})