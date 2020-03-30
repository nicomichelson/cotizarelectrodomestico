//document.getElementById('app').innerHTML = 'hola mundo';
//tarea crear un formulario leer datos y calcular los precios

//clase electrodomestico
class Electrodomestico{
     
    constructor(presioBase, color, consumo, peso){
        this.presioBase = presioBase
        this.comprobarColor(color)
        this.comprobarConsumo(consumo)
        this.peso = peso
    }

    //getters
    get PresioBase(){
        return this.presioBase
    }
    get Peso(){
        return this.peso
    }

    get Color(){
        return this.color
    }

    //setters

    set Peso(peso){
        this.peso = peso
    }
    set Color(color){
        this.color = color
    }

     //comprueba q el color ingresado este dentro del rango de colores si no se le agrega un color por defecto
    comprobarColor = function(color){

        var colores = ["rojo", "verde", "azul","blanco"]
        var existe = false;
        
        for (let i = 0; i< colores.length; i++) {
          
            if(colores[i] === color){
                
                existe = true

            }
           
        }

        if(existe){
            this.color = color
        } else{
            this.color = "blanco"
        }

    }
    //comprueba el consumo este dentro de un rango, el rango va de A..F aplicando codigo ascii mayuscula
    comprobarConsumo = function(consumo) {
        
        if(consumo.charCodeAt()>=65 && consumo.charCodeAt()<= 70){
            this.consumo = consumo
        }else{
            this.consumo = 'F'
        }
    }

     presioFinal (){
        var plus = 0

        switch(this.consumo){

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

        if(this.peso >= 0 && this.peso <= 19){
            plus += 10
        }else if(this.peso >= 20 && this.peso <= 49){
            plus +=50
        }else if(this.peso >= 50 && this.peso <= 79){
            plus += 80
        }else if(this.peso>80){
            plus += 100
        }

        return this.presioBase + plus

    }

}

class Lavadora extends Electrodomestico{

    constructor(presioBase, color, consumo, peso,carga){
        
        super(presioBase, color, consumo, peso)
        this.carga = carga
    }
    presioFinal (){
        
        var plus =super.presioFinal();
        
        if(this.carga > 30){
           plus  += 50
        }

        return plus
    }

    get Carga(){
        return this.carga
    }

   
    
}



// funcion para Cargar Electrodomesticos al campo <select>
function cargar_electrodomesticos() {
    var electrodomesticos = ["Lavaropa", "Televisor", "Plancha", "Licuadora", "Ventilador"];
   
    // Ordena el Array Alfabeticamente, es muy facil ;)):
    electrodomesticos.sort();
   
    addOptions("electrodomestico", electrodomesticos);
   }
   
   // Rutina para agregar opciones a un <select>
   function addOptions(domElement, electrodomesticos) {
    
    var select = document.getElementsByName(domElement)[0];
   
    for (value in electrodomesticos) {
     var option = document.createElement("option");
     option.value = value
     option.text = electrodomesticos[value];
     select.add(option);
    }
    
   }

   class Constantes{

    CONSUMO = ["A", "B", "C", "D", "E", "F"];

   }

   class Consumo{

    cargar_consumo(){
        var consumo = new Constantes()
        var letra = consumo.CONSUMO;
        var selector = document.getElementsByName("consumo")[0]

        for (var value in letra) {
            var option = document.createElement("option");
            option.value = value
            option.text = letra[value];
            selector.add(option);
        }
        
    }
        
   }

   c = new Consumo();
   c.cargar_consumo();
/*
   function cargar_consumo(){
       var CONSUMO = ["A", "B", "C", "D", "E", "F"];

       addConsumo("consumo", CONSUMO);
   }

   function addConsumo(elemento, consumo){

    var selector = document.getElementsByName(elemento)[0];
    for(value in consumo){
        var option = document.createElement("option");
        option.text = consumo[value];
        selector.add(option);
    }
   }*/
  

   
   
   
   cargar_electrodomesticos()
   //cargar_consumo()








lavadora = new Lavadora(300,"violeta",'F',20,60)
console.log(lavadora)
console.log(lavadora.presioFinal())


   /*
lavadora = new Lavadora(300,"violeta",'F',20,60)
console.log(lavadora)
console.log(lavadora.presioFinal())


e = new Electrodomestico(8,"violeta",'F',20)
console.log(e.presioFinal())

e2 = new Electrodomestico(200,"rojo", 'R', 30)

e2.Color = "azul"
console.log(e2)
console.log(e2.Color)
console.log(e2.PresioBase)
console.log(e2.Peso)
e2.Peso=500
console.log(e2.Peso)

console.log(e);
console.log(e.color)
console.log(e.PresioBase)
console.log(e.Peso)
console.log(e.Color)

lavadora2 = new Lavadora(500,"violeta",'F',50,70)
console.log(lavadora2.presioFinal())*/
