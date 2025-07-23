class Corredor{
     constructor(nombre,edad,cedula,vencimiento,tipoCorredor){
        this.nombre=nombre
        this.edad=edad
        this.cedula=cedula
        this.vencimiento=vencimiento
        this.tipo=tipoCorredor
     }
     toString(){
        return  this.nombre +"-"+ this.cedula
     }
     EsValidafecha(){
        let valido = true
        if(this.edad<18){
            valido=false
        }
        return valido
     }
    
}
class Carrera{
    constructor(nombre,departamento,fecha,cupos){
        this.nombre=nombre
        this.departamento=departamento
        this.fecha=fecha
        this.cupos=cupos
    }
    tieneCupo(cantidadInscriptos){
        let tiene= false
        if(cantidadInscriptos<this.cupos){
            tiene=true
        }
        return tiene
    }
    toString(){
        return "Carrera " + this.nombre + " Departamento " + this.departamento + " Se dara el " + this.fecha
    }
}
class Patrocinador{
    constructor(nombre,rubro){
        this.nombre=nombre
        this.rubro=rubro
        this.carreras=[]
    }
      validarCarrera(carrera){
        let valido=true
        for(let elem of this.carreras){
            if(carrera.nombre == elem.nombre){
                valido=false
            }
        }
        return valido
    }
    agregarCarrera(carrera){
        if(this.validarCarrera(carrera) ==true){
        this.carreras.push(carrera)
        }else{
            return "Ya ingresado"
        }
    }
  
    toString(){
        return "Patrocinador " + this.nombre + " de rubro " + this.rubro
    }

}
class inscripcion{
    constructor(corredor,carrera,numeroInscripcion){
        this.corredor=corredor
        this.carrera=carrera
        this.numeroInscripcion=numeroInscripcion
    }
    
}

class Sistema{
    constructor(){
        this.listaCorredor=[]
        this.listaCarreras=[]
        this.listaPatrocinadores=[]
        this.listaInscripciones=[]
    }
    agregarInscripcion(inscripcion){
        this.listaInscripciones.push(inscripcion)
    }
    Verificarpatrocinador(patrocinador){
        let valido=true
        for(let elem of this.listaPatrocinadores){
            if(elem.nombre == patrocinador){
                valido=false
            }
        }
        return valido
    }
    Actualizarpatrozinador(patrocinador){
        for(let elem of this.listaPatrocinadores){
            if(elem.nombre == patrocinador.nombre){
                
                if(elem.rubro != patrocinador.rubro){
                elem.rubro = patrocinador.rubro
                }
                for(let nuevaCarrera of patrocinador.carreras){ //Recorre todas las carreras que tiene el patrocinador nuevo
                   let existe=false
                    for(let CarreraExistente of elem.carreras){ //Recorre todas las carreras que ya tiene guardadas el patrocinador viejo
                        if( nuevaCarrera.nombre == CarreraExistente.nombre){  //Si encuentra una que tenga el mismo nombre que la nueva carrera
                            existe=true

                        }
                    }
                    if(existe==false){
                        elem.carreras.push(nuevaCarrera)
                    }
                }
            }
        }
    }
    agregarCarrera(carrera){
        this.listaCarreras.push(carrera)
    }
    validarNombreCarrera(Carnombre){
        let valido=true
        for(let elem of this.listaCarreras){
            if(elem.nombre==Carnombre){
                valido=false
            }
        }
        return valido
    }
    agregarPatrocinador(patrocinador){
        this.listaPatrocinadores.push(patrocinador)
    }

    agregarparticipante(corredor){
        this.listaCorredor.push(corredor)
    }
    Cedulavalida(CedulaNueva){
        let valido=true
        for(let elem of this.listaCorredor){
            if(elem.cedula == CedulaNueva){
                valido=false
            }
        }
        return valido
    }
    darlistaCORREDORES(){
        return this.listaCorredor
    }
    darlistaCARRERAS(){
        return this.listaCarreras
    }
    cantidadInscripcionCarrera(unaCarrera){
        let suma=0
        for(let inscripcion of this.listaInscripciones){
            if(inscripcion.carrera === unaCarrera){
                suma= suma+1
            }
        }
        return suma
    }
    darlistaInscriptos(){
        return this.listaInscripciones
    }
    VerificarCarrera(){
        let lista=[]
        let Noinscritos = []
        for(let elem of this.listaInscripciones){
           let tiene= false
           for(let elem2 of this.listaCarreras){
            if(elem.carrera ==elem2){
                tiene=true
            }
           }
           if(tiene){
            lista.push(elem)
           }
        }
        return lista
    }
}