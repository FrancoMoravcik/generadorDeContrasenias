const formCheckBox = document.getElementById("formCheckBox")
const password = document.getElementById("password")

const arrayLetrasEnMayuscula = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const arrayLetrasEnMinuscula = ["a","b","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"]
const arrayNumeros = [0,1,2,3,4,5,6,7,8,9]
const arraySimbolos = ["!","#","%","&","/","*","+","-","_","<",">","¡","?","¿"]

// cambiar el valor del label mediante el usuario mueva el rango
const inputRango = document.getElementById("inputRango")
const labelNumeroLongitud = document.getElementById("labelNumeroLongitud")
inputRango.addEventListener("input", () => {
    labelNumeroLongitud.textContent = inputRango.value
})

formCheckBox.addEventListener("submit", (e) => {
    e.preventDefault()
    
let arrayPassword = []

// capturar el numero de caracteres que va a tener
const inputRango = document.getElementById("inputRango")
const valorLongitud = inputRango.value

// capturar el id de los checbox
const inputLetraMayuscula = document.getElementById("checkLEMa")
const inputLetraMinuscula = document.getElementById("checkLEMi")
const inputNumero = document.getElementById("checkN")
const inputSimbolo = document.getElementById("checkS")

// ver si estan activados para guardar el valor de true si lo estan o de false si no 
const valorLetraMayus = inputLetraMayuscula.checked ? true : false
const valorLetraMinus = inputLetraMinuscula.checked ? true : false
const valorNumero = inputNumero.checked ? true : false
const valorSimbolo = inputSimbolo.checked ? true : false

/* conseguir un valor aleatorio de cada uno de los arrays de caracteres */
const letraEnMayuscula = Math.floor(Math.random(arrayLetrasEnMayuscula) * 27)
const letraEnMinuscula = Math.floor(Math.random(arrayLetrasEnMinuscula) * 27)
const numero = Math.floor(Math.random(arrayNumeros) * 10)
const simbolo = Math.floor(Math.random(arraySimbolos) * 14)

// ifs para incluir un caracter si tiene true en el checkbox
if(valorLetraMayus === true){
    arrayPassword.push(arrayLetrasEnMayuscula[letraEnMayuscula])
}
if(valorLetraMinus === true){
    arrayPassword.push(arrayLetrasEnMinuscula[letraEnMinuscula])
}
if(valorNumero === true){
    arrayPassword.push(arrayNumeros[numero])
}
if(valorSimbolo === true){
    arrayPassword.push(arraySimbolos[simbolo])
}

// Función para mezclar el array al azar
 function shuffleArray(array) {
     for (let i = array.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         let temp = array[i];
         array[i] = array[j];
         array[j] = temp;
     }
     return array;
 }

 // Mezclar el array al azar mediante la funcion
let arrayMezclado = shuffleArray(arrayPassword);
// unir el array sin espacio
 const passwordUnida = arrayMezclado.join("")

 // Imprimir el array mezclado y sin espacio
 password.style.color = "#e6e4ed"
 password.textContent = passwordUnida

 // if para que me genere una contraseña aleatoria si el usuario no selecciona nigun item
 if(valorLetraMayus === false & valorLetraMinus === false & valorNumero === false & valorSimbolo === false){
     arrayPassword = []
   const respuesta = prompt("No hay ningun item activado, le proporcionaremos una contraseña aleatoria con todos los items incluidos, desea generar esta contraseña?")

   if(respuesta == "si"){
    const arrayPasswordFalse = [arrayLetrasEnMayuscula[letraEnMayuscula],arrayLetrasEnMinuscula[letraEnMinuscula],arrayNumeros[numero],arraySimbolos[simbolo]]

    let arrayMezcladoFalse = shuffleArray(arrayPasswordFalse);
    const passwordUnidaFalse = arrayMezcladoFalse.join("")

    password.style.color = "#e6e4ed"
    password.textContent = passwordUnidaFalse
    
   }else if(respuesta == "no"){
    alert("Active las items que desee para generar una contraseña")
   }

 }


})


// Utilizar librerias para que quede mejor la pregunta de generar contraseña sin items seleccionados (sacar prompt, incluir tostify o swet alert)
// Que la contraseña se genere del tamaño de caracteres que reciba del valor por rango
// Que me diga el nivel de seguridad
// funcion para que copie la contraseña dada



