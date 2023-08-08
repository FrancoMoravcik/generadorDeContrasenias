const formCheckBox = document.getElementById("formCheckBox")
const password = document.getElementById("password")
const btnCopiar = document.getElementById("btnCopiar")

//Capturar los id para manejar los niveles de seguridad
let nivelSeguridad = document.getElementById("nivelSeguridad")
const divNiveles = document.querySelectorAll(".divNiveles")


// Generar arrays con todos los caracteres
const arrayLetrasEnMayuscula = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const arrayLetrasEnMinuscula = ["a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const arrayNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const arraySimbolos = ["!", "#", "%", "&", "/", "*", "+", "-", "_", "<", ">", "¡", "?", "¿"]

// cambiar el valor del label mediante el usuario mueva el rango
const inputRango = document.getElementById("inputRango")
const labelNumeroLongitud = document.getElementById("labelNumeroLongitud")
inputRango.addEventListener("input", () => {
    labelNumeroLongitud.textContent = inputRango.value
})

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


formCheckBox.addEventListener("submit", (e) => {
    e.preventDefault();

    let arrayPassword = [];

    // capturar el numero de caracteres que va a tener
    const inputRango = document.getElementById("inputRango");
    const valorLongitud = inputRango.value;

    // capturar el id de los checbox
    const inputLetraMayuscula = document.getElementById("checkLEMa");
    const inputLetraMinuscula = document.getElementById("checkLEMi");
    const inputNumero = document.getElementById("checkN");
    const inputSimbolo = document.getElementById("checkS");

    // ver si estan activados para guardar el valor de true si lo estan o de false si no 
    const valorLetraMayus = inputLetraMayuscula.checked ? true : false;
    const valorLetraMinus = inputLetraMinuscula.checked ? true : false;
    const valorNumero = inputNumero.checked ? true : false;
    const valorSimbolo = inputSimbolo.checked ? true : false;

    // Generar un array con todos los caracteres permitidos basados en las opciones seleccionadas
    const selectedChars = [];

    // ifs para incluir un caracter si tiene true en el checkbox
    if (valorLetraMayus === true) {
        selectedChars.push(...arrayLetrasEnMayuscula);
    }
    if (valorLetraMinus === true) {
        selectedChars.push(...arrayLetrasEnMinuscula);
    }
    if (valorNumero === true) {
        selectedChars.push(...arrayNumeros);
    }
    if (valorSimbolo === true) {
        selectedChars.push(...arraySimbolos);
    }

    // if para que me genere una contraseña aleatoria si el usuario no selecciona ningún item
    if (selectedChars.length === 0) {
        Swal.fire({
            title: 'No hay ningun item activado, le proporcionaremos una contraseña aleatoria con todos los items incluidos, desea generar esta contraseña?',
            color: '#e6e4ed',
            icon: 'warning',
            iconColor: '#a4faaf',
            showDenyButton: true,
            confirmButtonText: 'Si',
            confirmButtonColor: '#24232b',
            denyButtonText: `No`,
            denyButtonColor: '#24232b',
            background: '#24232b'
        }).then((result) => {
            if (result.isConfirmed) {
                const arrayPasswordFalse = [
                    ...arrayLetrasEnMayuscula,
                    ...arrayLetrasEnMinuscula,
                    ...arrayNumeros,
                    ...arraySimbolos
                ];

                let arrayMezcladoFalse = shuffleArray(arrayPasswordFalse);

                // Generar una contraseña del tamaño especificado por el usuario
                const longitud = parseInt(valorLongitud);
                const arrayPasswordRandom = [];
                for (let i = 0; i < longitud; i++) {
                    const randomIndex = Math.floor(Math.random() * arrayMezcladoFalse.length);
                    arrayPasswordRandom.push(arrayMezcladoFalse[randomIndex]);
                }

                const passwordUnidaFalse = arrayPasswordRandom.join("");

                password.style.color = "#e6e4ed";
                password.value = passwordUnidaFalse;

                // if para establecer nivel de seguridad con contraseña SIN ITEM
                if (passwordUnidaFalse.length >= 8 && passwordUnidaFalse.length <= 10) {
                    divNiveles.forEach(function (divNivel) {
                        divNivel.style.backgroundColor = "red";
                        nivelSeguridad.textContent = "BAJA"
                    });
                } else if (passwordUnidaFalse.length >= 11 && passwordUnidaFalse.length <= 12) {
                    divNiveles.forEach(function (divNivel) {
                        divNivel.style.backgroundColor = "orange";
                        nivelSeguridad.textContent = "MEDIA"
                    });
                } else if (passwordUnidaFalse.length >= 13 && passwordUnidaFalse.length <= 14) {
                    divNiveles.forEach(function (divNivel) {
                        divNivel.style.backgroundColor = "yellow";
                        nivelSeguridad.textContent = "ALTA"
                    });
                } else if (passwordUnidaFalse.length >= 15 && passwordUnidaFalse.length <= 16) {
                    divNiveles.forEach(function (divNivel) {
                        divNivel.style.backgroundColor = "green";
                        nivelSeguridad.textContent = "PERFECTA"
                    });
                }

            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Active los items para generar una contraseña',
                    background: '#24232b',
                    color: '#e6e4ed',
                    confirmButtonText: 'ok',
                    confirmButtonColor: '#24232b',
                });
            }
        });
        return;
    }

    const longitud = parseInt(valorLongitud);
    for (let i = 0; i < longitud; i++) {
        const randomIndex = Math.floor(Math.random() * selectedChars.length);
        arrayPassword.push(selectedChars[randomIndex]);
    }

    // Unir el array sin espacios
    const passwordUnida = arrayPassword.join("");

    // Imprimir el array mezclado y sin espacio
    password.style.color = "#e6e4ed";
    password.value = passwordUnida;


    // if para establecer nivel de seguridad con contraseña CON ITEM
    if (passwordUnida.length >= 8 && passwordUnida.length <= 10) {
        divNiveles.forEach(function (divNivel) {
            divNivel.style.backgroundColor = "red";
            nivelSeguridad.textContent = "BAJA"
        });
    } else if (passwordUnida.length >= 11 && passwordUnida.length <= 12) {
        divNiveles.forEach(function (divNivel) {
            divNivel.style.backgroundColor = "orange";
            nivelSeguridad.textContent = "MEDIA"
        });
    } else if (passwordUnida.length >= 13 && passwordUnida.length <= 14) {
        divNiveles.forEach(function (divNivel) {
            divNivel.style.backgroundColor = "yellow";
            nivelSeguridad.textContent = "ALTA"
        });
    } else if (passwordUnida.length >= 15 && passwordUnida.length <= 16) {
        divNiveles.forEach(function (divNivel) {
            divNivel.style.backgroundColor = "green";
            nivelSeguridad.textContent = "PERFECTA"
        });
    }

    //Funcion para copiar la contraseña
    btnCopiar.addEventListener("click", () => {
        password.focus();
        if (document.queryCommandSupported('copy')) {
            try {
                const selectedText = password.value;
                const textArea = document.createElement('textarea');
                textArea.value = selectedText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                // Función Toast para contraseña copiada
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });
                Toast.fire({
                    icon: 'success',
                    iconColor: '#a4faaf',
                    background: '#24232b',
                    color: '#e6e4ed',
                    title: 'Contraseña copiada'
                });
            } catch (error) {
                console.error('Error al copiar la contraseña:', error);
            }
        } else {
            console.warn('La función de copiado no está soportada en este navegador.');
        }
    });
});

// Deshabilitar la función del input de borrar letras
password.addEventListener('keydown', (event) => {
    // Evitar que se borren caracteres (Códigos de tecla: Backspace y Delete)
    if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
    }
});