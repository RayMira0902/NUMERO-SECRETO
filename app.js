let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 10;
// SIEMPRE HACERLO EN LIVE
let listaDeNumerosSorteados =[];
// ESTA FUNCION ES PARA FACILITAR EL USO DE VARIABLES, ASI NO USAMOS TANTAS 
// USAMOS UNA FUNCION ASI PARA VERSE PROFESIONAL Y MAS LIMPIO EL CODIGO
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
// LAS FUNCIONES ASI SON MAS FACILES DE MANEJAR
// EL DOCUMENT.GETELEMENTBYID NOS AYUDA CON LOS INPUT PARA RECONOCERLOS MAS RAPIDOS
// SI ES QUE HAY MAS DE UN INPUT YA QUE AGREGANDOLE UN ID ES MEJOR
// ME FALLA MUCHO EL .VALUE, AL GRADO DE QUE NO PUDE HACER EL CONSOLE.LOG DE LA FUNCION EN EL 16
// EL PARSEINT SIRVE PARA QUE NO SEA UN STING SINO UN NUMBER, ESO SE VERIFICA EN EL CONSOLE.LOG PERO ESTE
// USA UN TYPEOF A DIFERENCIA DE OTROS CONSOLE.LOG
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log (typeof(numeroDeUsuario));
    console.log (intentos);
// EL ASIGNARTEXTOELEMENTO SE REFIERE A LA FUNCION DEL RENGLON 7 Y ASI SE REDUCE BASTANTE 
// EL NUMERO DE RENGLONES Y ES MAS PRACTICO. 
// EL document.getElementById("reiniciar").removeAttribute; ES PARA ACTIVAR EL OTRO BOTON, PORQUE
// TODO LO QUE HEMOS HECHO ES SOLO PARA UN BOTON, AHORA TOCA EL BOTON DE REINICIAR
// Y EL REMOVEATTRIBUTE ES PARA REMOVER ATRIBUTOS, EN ESTE CASO EL DISABLED DEL BOTON DE NUEVO JUEGO
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento("p",`Acertaste el numero secreto en ${intentos} ${(intentos == 1) ? "vez" : "veces"}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        // ESTO SE HACE POR SI EL USUARIO NO ACERTO
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento("p","No acertaste el numero secreto, es menor");
        } else {
            asignarTextoElemento("p","No acertaste el numero secreto, es mayor");
        }
        intentos++;
        regresarCaja();
    }
    return;
}
// EL NUMERAL EN EL QUERYSELECTOR ES PARA BUSCARLO POR ID DEL INPUT
// YA SEA PARA CAPTURAR EL VALOR O BASEARLO
// COMO DIJIMOS ESTO SIRVE PARA TENER VACIA LA CAJA ESTA ES UNA FORMA
// let valorCaja = document.querySelector("#valorUsuario");
// valorCaja.value = "";
// O LA FORMA QUE ESTAMOS UTILIZANDO ACTUALMENTE PARA MAS SIMPLIFICADO O MAS FACIL
function regresarCaja() {
   document.querySelector("#valorUsuario").value = "";
}
// FUNCION DE GENERARNUMEROSECRETO NOS AYUDA A HACER UN BUCLE 
// POR ESO MISMO SALE EL RETURN PARA AYUDAR HACER EL BUCLE
// AHORA QUEREMOS QUE NO SE REPITA DENTRO DEL MISMO JUEGO EL NUMERO
// DOS VECES POR UNA CASUALIDAD, ENTONCES FINALIZARA DE LA SIGUIENTE FORMA:
function generarNumeroSecreto() {
   let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
   // SI EL NUMERO ESTA INCLUIDO EN LA LISTA CON ESTO TOMARA UNA ACCION, Y SI NO LO ESTA
   // TOMARA OTRO TIPO DE ACCION. PERO EN ESTO DEBEMOS TENER EN CUENTA LA RECURSIVIDAD
   // COMO QUEDE AL FINAL ES LA SOLUCION CORRECTA
   console.log(numeroGenerado);
   console.log(listaDeNumerosSorteados);
   //SI YA SORTEAMOS TODOS LOS NUMEROS?
   if(listaDeNumerosSorteados.length == numeroMaximo){
    asignarTextoElemento("p", "SE ACABO EL JUEGO, SE SORTEARON TODOS LOS NUMEROS. PARA JUGAR DE NUEVO DA REFRESH");
   } else {
   if (listaDeNumerosSorteados.includes(numeroGenerado)) {
    return generarNumeroSecreto();
   } else{
    listaDeNumerosSorteados.push(numeroGenerado)
    return numeroGenerado;
   }}
}
// FUNCION PARA TODAVIA SINTETIZAR MAS LA FUNCION DE ABAJO
function cosasIniciales() {
    asignarTextoElemento("h1","JUEGO SECRETO (:");
    asignarTextoElemento("p",`ESCRIBE UN NUMERO DEL 1 AL ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

// LA FUNCION CORRELE GORDO ES PARA LIMPIAR EL JUEGO
// ENTONCES ES LIMPIAR LA CAJA, GENERAR EL NUMERO ALEATORIO
// Y DESHABILITAR EL BOTON DEL NUEVO JUEGO
// Y REINICIAR EL NUMERO DE INTENTOS
// PARA SIRVE LA FUNCION
// SE LOGRO
function correleGordo() {
    regresarCaja();
    cosasIniciales();
    document.querySelector("#reiniciar").setAttribute("disabled","true");
}

cosasIniciales();