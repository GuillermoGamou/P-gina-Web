let Sistem = new Sistema()

window.addEventListener("load",inicio)
window.addEventListener("load",enseñarDatos)  
function inicio(){
    document.getElementById("DatosRef").addEventListener("click",enseñarDatos)
    document.getElementById("EstadisticasRef").addEventListener("click",enseñarEstadisticas)
    document.getElementById("AgregarCorredor").addEventListener("click",agregarCorredor)
    document.getElementById("AgregarCarrera").addEventListener("click",agregarCarreras)
    document.getElementById("AgregarPatrocinador").addEventListener("click",agregarPatrocinador)
    document.getElementById("InscripcionBoton").addEventListener("click",Agregarinscripcion)
    document.getElementById("Carreraconsulta").addEventListener("change",TablaCorredores)
    document.getElementById("NomSelect"),addEventListener("click", TablaCorredores)
    document.getElementById("NumSelect").addEventListener("click", TablaCorredores)
    
}
function enseñarDatos(){
document.getElementById("Datos").style.display = "block"
document.getElementById("Estadistica").style.display="none";
document.getElementById("DatosRef").style.backgroundColor="red" 
document.getElementById("EstadisticasRef").style.backgroundColor="white"
}
function enseñarEstadisticas(){
document.getElementById("Datos").style.display = "none"
document.getElementById("Estadistica").style.display="block";
document.getElementById("EstadisticasRef").style.backgroundColor="red"
document.getElementById("DatosRef").style.backgroundColor="white"
dibujarMapa()
}
function agregarCorredor(){   
let formulario = document.getElementById("CorredorFormu")
if(formulario.reportValidity()){
let nombre= document.getElementById("NombreCOR").value
let edad= document.getElementById("EdadCOR").value
let cedula = document.getElementById("Cedula").value
let fecha= document.getElementById("Vencimiento").value
let tipoElite = document.getElementById("Elite").checked
let tipoNormal= document.getElementById("Comun").checked
let tipo=""
if(tipoElite==true){
    tipo = "Elite"
        }
        else{
    if(tipoNormal==true){
        tipo="Comun"
                    }
                }
let Participante = new Corredor(nombre,edad,cedula,fecha,tipo)
if(Participante.EsValidafecha()==false){
alert("edad invalida")
}else{
    if(Sistem.Cedulavalida(Participante.cedula)==false){
    alert("Cedula repetida,  corredor no valido")
            }
else{
alert(Participante)
Sistem.agregarparticipante(Participante)
llenarComboInscripcion()
ActualizarListaElite()
formulario.reset()
            }
        }
    }
}


function llenarComboPatrocinador(){
    let combo =  document.getElementById("carreraSELEC")
    combo.innerHTML="" 
    let carreras = Sistem.darlistaCARRERAS()
    for(let i=0;i<carreras.length;i++){
        let option= document.createElement("option"); // se crea el elemento option las opciones en definitiva
        option.text = carreras[i].nombre   // opction.text es lo que se ve, es decir, el nombre de la posicion en que estemos en carreras
        option.value = carreras[i].nombre   // el value es como identificamos el texto
        combo.appendChild(option)
    }
}
function agregarPatrocinador(){
let formulario= document.getElementById("PatrocinadorFormul")
if(formulario.reportValidity()){
    let nombre= document.getElementById("NombrePAR").value
    let rubro = document.getElementById("Rubro").value
    let nombrecarrera = document.getElementById("carreraSELEC").value
    let carrera =""
    let lista = Sistem.darlistaCARRERAS()
    for(elem of lista){
        if(elem.nombre== nombrecarrera){ //Esta línea compara el nombre de cada carrera del sistema con el nombre que seleccionó el usuario en el combo.
            carrera = elem
        }
    }
    let patrocinador = new Patrocinador(nombre,rubro)
     patrocinador.agregarCarrera(carrera)
    if(Sistem.Verificarpatrocinador(patrocinador.nombre)==false){
    Sistem.Actualizarpatrozinador(patrocinador)
        alert("patrocinador actualizado "+ patrocinador.nombre)
        formulario.reset()
    }
    else{
    Sistem.agregarPatrocinador(patrocinador)
    formulario.reset()
    }
}   
}
function agregarCarreras(){
let formulario= document.getElementById("CarreraFormu");
if(formulario.reportValidity()){
let nombre= document.getElementById("NombreCAR").value;
let departamento = document.getElementById("Departamento").value;     
let fecha = document.getElementById("Fechas").value;
let cupos = document.getElementById("Cupos").value;
let carrera = new Carrera(nombre,departamento,fecha,cupos);
if(Sistem.validarNombreCarrera(carrera.nombre)==true){
Sistem.agregarCarrera(carrera);
llenarComboPatrocinador()
llenarComboInscripcion()
OrdenSininscripcion()
formulario.reset()
}
else{
    alert("Nombre de carrera ya ocupado")
}
}
if(Sistem.listaInscripciones.length>=1){
    PromedioInscripcion()
}
}

function llenarComboInscripcion(){
    let combo1 = document.getElementById("SeleccionCorredor")
    combo1.innerHTML=""
    let combo2 = document.getElementById("SeleccionCarreras")
    combo2.innerHTML=""
    let carreras= Sistem.darlistaCARRERAS()
    let corredores = Sistem.darlistaCORREDORES()

    carreras.sort(function(a, b){   // ordena las listas alfabeticamente y utiliza localcompare para que compare correctamente textos como letras con acentos o mayusculas.
       return a.nombre.localeCompare(b.nombre) })

        corredores.sort(function(a, b){
        return a.nombre.localeCompare(b.nombre) })

    for(let i=0;i<carreras.length;i++){   // llenamos los combos o select
        let option= document.createElement("option");
        option.text = carreras[i].nombre
        option.value = carreras[i].nombre
        combo2.appendChild(option)
    }
    for(let i=0;i<corredores.length;i++){
        let option= document.createElement("option");
        option.text = corredores[i].toString() // el to.string ahce que en el combos se muestre tanto el nombre de la carrera como la cedula
        option.value = corredores[i].nombre
        combo1.appendChild(option)
    }
}

function Agregarinscripcion(){
    let corredor = document.getElementById("SeleccionCorredor").selectedIndex //combo 1 .selectedIndex trae la posición seleccionada en el combo siendo la primera opción, el índice 0.
    let indCarrera= document.getElementById("SeleccionCarreras").selectedIndex //combo 2
    let corredordatos = Sistem.darlistaCORREDORES()[corredor] //Usa el índice (posición) que sacamos antes para elegir el objeto real. Es decir, los parentesis rectos.
    let carrera = Sistem.darlistaCARRERAS()[indCarrera]


    if(ValidarFechas(corredordatos.vencimiento,carrera.fecha)==true){
    
    if(carrera.tieneCupo(Sistem.cantidadInscripcionCarrera(carrera))){
       
        let inscripto=false
       
        for(let elem of Sistem.listaInscripciones){  //verifica que no este inscripto mas de 2 veces
            if(elem.corredor == corredordatos && elem.carrera == carrera){
                inscripto = true
            }
        }
            
        if(inscripto==true){ 
             alert ("El corredor ya esta inscripto")
            }else {
               let cantidad = Sistem.cantidadInscripcionCarrera(carrera)         // Si no está inscripto → crea y guarda la inscripción
                let  inscripcionfinal= new inscripcion(corredordatos,carrera,cantidad+1)
        Sistem.agregarInscripcion(inscripcionfinal)

       
        let numero = cantidad
        let patrocinadores = []
        for(let elem of Sistem.listaPatrocinadores){     //Recorre los patrocinadores. Si alguno está asociado a esa carrera, lo agrega al array patrocinadores
            for(let elem2 of elem.carreras){
                if(elem2.nombre == carrera.nombre){ 
                let agregado = elem.nombre +" (" +  elem.rubro + ")"
                patrocinadores.push(agregado)
            }
        }
    }
        let texto= "Sin patrocinadores"
        if(patrocinadores.length >0){
            let partesFechaCarrera= carrera.fecha.split("-")
            let fechaModificadaCarrera= partesFechaCarrera[2] + "/"+partesFechaCarrera[1]+"/" + partesFechaCarrera[0]
            let partesFechaCorredor=corredordatos.vencimiento.split("-")
            let fechaModificadaCorredor = partesFechaCorredor[2] + "/"+partesFechaCorredor[1]+"/"+partesFechaCorredor[0]
            texto ="Numero: " + (cantidad+1) + "\nNombre: " + corredordatos.nombre + " " + corredordatos.edad + " años, " + "CI: " + corredordatos.cedula + " Ficha Medica " + fechaModificadaCorredor + "\n" + corredordatos.tipo  + "\nCarrera: " + carrera.nombre + " en " + carrera.departamento + " el " + fechaModificadaCarrera + " Cupo: "+ carrera.cupos +"\n"+ patrocinadores
            
        }else{
            let partesFechaCarrera= carrera.fecha.split("-")
            let fechaModificadaCarrera= partesFechaCarrera[2] + "/"+partesFechaCarrera[1]+"/" + partesFechaCarrera[0]
            let partesFechaCorredor=corredordatos.vencimiento.split("-")
            let fechaModificadaCorredor = partesFechaCorredor[2] + "/"+partesFechaCorredor[1]+"/"+partesFechaCorredor[0]
            texto ="Numero: " + (cantidad+1) + "\nNombre: " + corredordatos.nombre + " " + corredordatos.edad + " años, " + "CI: " + corredordatos.cedula + " Ficha Medica " + fechaModificadaCorredor + "\n" + corredordatos.tipo  + "\nCarrera: " + carrera.nombre + " en " + carrera.departamento + " el " + fechaModificadaCarrera + " Cupo: "+ carrera.cupos + "\n" + texto
         }
         
        alert(texto)
        generarpdf(texto)
        PromedioInscripcion()
        MaximoInscriptos()
        OrdenSininscripcion()
        LlenarcomboConsulta()
    }
    } else {
        alert("la carrera no tiene cupo disponible")
    }
} else{
    alert("Carne de salud vencido ")
}
}

function ValidarFechas(dat1,dat2){
    let valido=true
    if(dat1< dat2){
        valido=false
    }
    return valido
}

function PromedioInscripcion(){
    let total=0
    let datos = document.getElementById("Promedio")
    datos.innerHTML=""
    let cantidadcarreras= Sistem.listaCarreras.length
    let cantidadInscriptos = Sistem.listaInscripciones.length
    total =(cantidadInscriptos/cantidadcarreras).toFixed(2)
    datos.innerHTML = total
}
function MaximoInscriptos(){
    let max=-1
    let texto=""
    for(let elem of Sistem.listaCarreras){
        let cant=0
        for(elemInscripcion of Sistem.listaInscripciones){
            if(elem.nombre == elemInscripcion.carrera.nombre){
                cant = cant+1
            }
        }
    if(cant>max){
        max= cant
        texto= elem.nombre
    }
    else{
        if(cant==max){
            texto=texto+", "+ elem.nombre
        }
    }
    }
    document.getElementById("maximo").innerHTML= texto
}


function ActualizarListaElite(){
    let cant=0
    for(let elem of Sistem.listaCorredor){
        if(elem.tipo=="Elite"){
            cant = cant+1
        }
    }
    let datos = document.getElementById("Porcentaje")
    datos.innerHTML=""
    datos.innerHTML=((cant*100)/Sistem.listaCorredor.length).toFixed(2)+"%"
    return datos
}

function OrdenSininscripcion(){
    let lista = document.getElementById("sinInscriptos")
    lista.innerHTML=""
    let noinscrito = []

  for(let elem of Sistem.listaCarreras){
    let cantidad = Sistem.cantidadInscripcionCarrera(elem)
    if(cantidad==0){
        noinscrito.push(elem)
    }
  }
        noinscrito.sort(function(a,b){
            if(a.fecha<b.fecha){
                return -1
            }else{
                if(a.fecha>b.fecha){
                    return 1
                }
                else{
                    return 0
                }
            }
        })
        for(let carrera of noinscrito){
        let nodo= document.createElement("li")
        let texto= document.createTextNode(carrera.nombre)
        nodo.appendChild(texto)
        lista.appendChild(nodo)
}
}
// en general, hace que se llene de carreras que tienen inscriptos y evita que se repitan las carreras.
function LlenarcomboConsulta(){
    let combo=document.getElementById("Carreraconsulta")
    combo.innerHTML=""
    let carreras=[]
    let lista= Sistem.darlistaInscriptos()

    
    for(let i=0;i<lista.length;i=i+1){
        let actual= lista[i].carrera.nombre
     if(!(carreras.includes(actual))){ //Revisa si el nombre ya está en el array carreras.
        let opcion = document.createElement("option")
        opcion.text=lista[i].carrera.nombre
        opcion.value=lista[i].carrera.nombre 
        combo.appendChild(opcion)
        carreras.push(actual)
    }
}
    if(carreras.length>0){
        TablaCorredores()   
    }
}
// Si hay almenos 1 inscriptos en la carrera se invoca esta funcion
function TablaCorredores(){
    
    let cuerpotabla = document.getElementById("CuerpoTabla")
    cuerpotabla.innerHTML=""
    let carreraseleccionada = document.getElementById("Carreraconsulta").value
    let inscritos= Sistem.darlistaInscriptos()
    let filtrado=[]

    for(let elem of inscritos){ // para cada inscripto, si la carrera seleccionadda es igual al nombre de toda la lsita de las carreras, se agrega a la tabla.
        if(elem.carrera.nombre==carreraseleccionada){
        filtrado.push(elem)
        }
    }
     let ordenado= document.getElementById("NomSelect").checked
     let numerosorden=document.getElementById("NumSelect").checked
            if(ordenado){
                filtrado.sort(function(a,b){
                return a.corredor.nombre.localeCompare(b.corredor.nombre) 
                })
            }
            if(numerosorden){
                filtrado.sort(function(a,b){
                    return a.numeroInscripcion -b.numeroInscripcion
                })
            }
            
            for(let elem of filtrado){
            let fila = cuerpotabla.insertRow()
            let celdanombre= fila.insertCell()
            celdanombre.innerHTML=elem.corredor.nombre
            let celdaEdad= fila.insertCell()
            celdaEdad.innerHTML=elem.corredor.edad
            let celdaCedula=fila.insertCell()
            celdaCedula.innerHTML=elem.corredor.cedula
            let celdaFecha=fila.insertCell()
            let fechaACorregir= elem.corredor.vencimiento.split("-")   // el .split transforma el string a un array nuevo y los divide mediante un guion.
            let fechaCorregida = fechaACorregir[2] + "/"+fechaACorregir[1] + "/"+fechaACorregir[0]  // se organiza para que muestre dia, mes y año
            celdaFecha.innerHTML=fechaCorregida
            let celdaNumero=fila.insertCell()
            celdaNumero.innerHTML=elem.numeroInscripcion
            if(elem.corredor.tipo=="Elite"){
                fila.classList.add("elite")
            }
            else{
            fila.classList.add("row")       
            }
                 celdaCedula.classList.add("row")
                celdaNumero.classList.add("row")
                celdaFecha.classList.add("row")
                celdaEdad.classList.add("row")
                celdaNumero.classList.add("row")
            

        }
 }



function generarpdf(elemento) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();       

    doc.text(elemento, 10, 10);  

    doc.save("Corredor.pdf");
}