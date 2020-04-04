//document.getElementById('app').innerHTML = 'hola mundo';
//tarea crear un formulario leer datos y calcular los precios

//traigo el formulario completo aca
const formulario = document.getElementById('cotizar-electrodomestico')

//clase electrodomestico
class Electrodomestico {

    constructor(electrodomestico, presioBase, color, consumo, peso) {
        this.electrodomestico = electrodomestico
        this.presioBase = presioBase
        this.comprobarColor(color)
        this.comprobarConsumo(consumo)
        this.peso = peso
    }

    //getters
    get Electrodomestico(){
        return this.electrodomestico
    }
    get PresioBase() {
        return this.presioBase
    }
    get Peso() {
        return this.peso
    }

    get Color() {
        return this.color
    }

    //setters

    set Peso(peso) {
        this.peso = peso
    }
    set Color(color) {
        this.color = color
    }

    //comprueba q el color ingresado este dentro del rango de colores si no se le agrega un color por defecto
    comprobarColor(color) {

        var colores = ["rojo", "verde", "azul", "blanco"]
        var existe = false;

        for (let i = 0; i < colores.length; i++) {

            if (colores[i] === color) {

                existe = true

            }

        }

        if (existe) {
            this.color = color
        } else {
            this.color = "blanco"
        }

    }
    //comprueba el consumo este dentro de un rango, el rango va de A..F aplicando codigo ascii mayuscula
    comprobarConsumo = function (consumo) {

        if (consumo.charCodeAt() >= 65 && consumo.charCodeAt() <= 70) {
            this.consumo = consumo
        } else {
            this.consumo = 'F'
        }
    }

    presioFinal() {
        var plus = 0

        switch (this.consumo) {

            case 'A':
                plus += 100
                break
            case 'B':
                plus += 80
                break
            case 'C':
                plus += 60
                break;
            case 'D':
                plus += 50
                break
            case 'E':
                plus += 30
                break
            case 'F':
                plus += 10
                break
        }

        if (this.peso >= 0 && this.peso <= 19) {
            plus += 10
        } else if (this.peso >= 20 && this.peso <= 49) {
            plus += 50
        } else if (this.peso >= 50 && this.peso <= 79) {
            plus += 80
        } else if (this.peso > 80) {
            plus += 100
        }

       const  div = document.createElement('div');
        div.innerHTML = `<p class="header"> Tu Resumen: </p>
                        <p> Electrodomestico: ${this.electrodomestico} </p>
                        <p> Presio Base: ${this.presioBase} </p>
                        <p> Color: ${this.color} </p>
                        <p> Consumo: ${this.consumo} </p>
                        <p> Peso: ${this.peso} </p>
                        <p> Precio final: ${this.presioBase + plus} </p>` ;
                        
        //return this.presioBase + plus

    }

}

class Lavadora extends Electrodomestico {

    constructor(presioBase, color, consumo, peso, carga) {

        super(electrodomestico, presioBase, color, consumo, peso)
        this.carga = carga
    }
    presioFinal() {

        var plus = super.presioFinal();

        if (this.carga > 30) {
            plus += 50
        }

        /*const div = document.createElement('div');
        div.innerHTML = `<p class="header"> Tu Resumen: </p>
                        <p> Electrodomestico: ${this.electrodomestico} </p>
                        <p> Presio Base: ${this.presioBase} </p>
                        <p> Color: ${this.color} </p>
                        <p> Consumo: ${this.consumo} </p>
                        <p> Peso: ${this.peso} </p>
                        <p> Carga: ${this.carga} </p>
                        <p> Precio final: ${plus} </p>` ;*/

        return plus
    }

    get Carga() {
        return this.carga
    }

    

}


/* clases con funciones para cargar formularios */
class Constantes {

    CONSUMO = ["A", "B", "C", "D", "E", "F"];
    ELECTRODOMESTICOS = ["Lavarropa", "Televisor", "Plancha", "Licuadora", "Ventilador"];

}

class Consumo {

    cargar_elemento() {

        var elementos = new Constantes()
        var letra = elementos.CONSUMO;
        var electrodomesticos = elementos.ELECTRODOMESTICOS.sort();

        this.addConsumo("consumo", letra)
        this.addElectrodomesticos("electrodomestico", electrodomesticos)
    }

    addElectrodomesticos(domElement, electrodomesticos) {
        // Rutina para agregar opciones a un <select>
        var select = document.getElementsByName(domElement)[0];

        for (var value in electrodomesticos) {
            var option = document.createElement("option");
            option.value = electrodomesticos[value]
            option.text = electrodomesticos[value];
            select.add(option);
        }
    }

    addConsumo(elemento, letra) {

        var selector = document.getElementsByName("consumo")[0]

        for (var value in letra) {
            var option = document.createElement("option");
            option.value = value
            option.text = letra[value];
            selector.add(option);
        }

    }

}

//esta clase se va a encargar de validar los campos, luego va a pasar los valores para calcular
class Interface {

    seleccionarElectrodomestico(){
   
        let electrodomesticos = document.getElementById("electrodomestico");
        let electrodomestico = electrodomesticos.options[electrodomesticos.selectedIndex].value;
    
        //document.getElementById("selected").innerText = `usted selecciono ${electrodomestico}.`;
        //document.getElementById('ocultar').style.display = "block";

        this.validarElectrodomestico(electrodomestico)
    }
    //aca se valida el electrodomestico, puede ser q el electrodomestico tenga atributos particulares
    //para calcular su precio final.
    validarElectrodomestico(electrodomestico){

        if(electrodomestico === "Lavarropa"){

            document.getElementById('ocultar').style.display = "block";
        }else{
            document.getElementById('ocultar').style.display = "none";
        }

        
    }

    
    mostrarMensaje(mensaje, tipo){
        //recibe un mensaje y un tipo de error
        //crea un elemnto div
        const div = document.createElement('div');

        //verifica el tipo de error y agrega a una classlist el mensaje y llama al css la clase error definida ahi
        //q luego es creada, todo por js
        if(tipo === "error"){
            div.classList.add('mensaje', 'error');
        }else{
            div.classList.add('mensaje', 'correcto');
        }
        //inserta en el div creado error el mensaje 
        div.innerHTML = `${mensaje}`;
        //lo inserta en el formulario antes del primer form-group
        formulario.insertBefore(div, document.querySelector('.form-group'));
        //setea el tiempo q esta activo el mensaje de error
        setTimeout(function() {
            document.querySelector('.mensaje').remove();
       }, 3000);
    }
    
    
}









//evento q lanza todo el pute
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    //lee el electrodomestico seleccionado
    const electrodomestico = document.getElementById('electrodomestico');
    const electrodomesticoSeleccioand = electrodomestico.options[electrodomestico.selectedIndex].value;

    //le el peso del lavarropas. se habilita solo si es lavarropas
    const peso = document.getElementById('peso')
    const pesoIngresado = peso.value;

    //lee el peso base del electrodomestico
    const precioBase = document.getElementById('presioBase')
    const precioBaseIngresado = precioBase.value;

    //lee el color
    const color = document.getElementById('color');
    const colorIngresado = color.value;

    const consumo = document.getElementById('consumo')
    const consumoSeleccionado = consumo.options[consumo.selectedIndex].value;

    const carga = document.getElementsByClassName('carga');
    const cargaIngresada = carga.value;

    const interface = new Interface()
    
    if(electrodomesticoSeleccioand === '' || precioBaseIngresado === '' || colorIngresado === '' || consumoSeleccionado === '' || peso === ''){
        //console.log("faltan datos");
        interface.mostrarMensaje('Faltan datos, revisar el formulario', 'error');
    }else{
        console.log('exitos');
    }
    
    /*if(electrodomesticoSeleccioand === '' || precioBaseIngresado === '' || colorIngresado === '' || consumoSeleccionado === '' || peso === ''){

        interface.mostrarMensaje('falta completar campos, revise porfa', 'error');
    }else{
        //limpiar resultado
        const resultado = document.querySelector('#resultado div')

        if(resultado != null){

            resultado.remove();
        }

        if(electrodomesticoSeleccioand === 'Lavarropas'){

            const lavarropas = new Lavarropas(electrodomesticoSeleccioand,precioBaseIngresado,colorIngresado,consumoSeleccionado, cargaIngresada );
            lavarropas.presioFinal();
        }else{

            const electrodomestico = new Electrodomestico(electrodomesticoSeleccioand,precioBaseIngresado,colorIngresado,consumoSeleccionado);
            electrodomestico.presioFinal();
        }
        interface.mostrarMensaje('Cotizando...', 'Exito');
    }*/

    /*
    console.log(electrodomesticoSeleccioand)
    console.log(pesoIngresado)*/
})


s = new Interface()
s.seleccionarElectrodomestico();
c = new Consumo();
c.cargar_elemento();


/*
lavadora = new Lavadora(300, "violeta", 'F', 20, 60)
console.log(lavadora.Color)
lavadora.presioFinal()*/