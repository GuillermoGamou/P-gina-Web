google.charts.load("current",{"packages":["geochart"]})

google.charts.setOnLoadCallback(configurareventosMapa)

function configurareventosMapa(){      
    document.getElementById("CarrerasMap").addEventListener("click", dibujarMapa)
    document.getElementById("InscripcionesMap").addEventListener("click",dibujarMapa)
}

function dibujarMapa(){        // estructura cuando se pone el cursor encima del departamento
    let esCarreras=document.getElementById("CarrerasMap").checked
    let datosMapa= [["Departamento", esCarreras ? "Carreras" :"Inscripciones"]]

    let contador={}

    if(esCarreras){    //cuenta la cantidad de carreras por departamento
        for(let carrera of Sistem.listaCarreras){
            let depto= carrera.departamento
            if(!(depto in contador)){
                contador[depto]=0
            }
            contador[depto] = contador[depto]+1
        }
    }else{
        for(let insc of Sistem.listaInscripciones){  //cuenta la cantidad de inscripciones por departamento
            let depto = insc.carrera.departamento;
            if (!(depto in contador)) {
                contador[depto] = 0;
            }
            contador[depto] = contador[depto] + 1;
        }
    }

    for(let depto in contador){          //pushea y suma el contador para que se muestre visualmente
        datosMapa.push([depto,contador[depto]])
    }

    let data = google.visualization.arrayToDataTable(datosMapa)

        let options = {
        region: 'UY', // Uruguay
        displayMode: 'regions',
        resolution: 'provinces',
        colorAxis: { colors: ['#e0f7fa', '#006064'] }
    
    };

    let chart = new google.visualization.GeoChart(document.getElementById("Mapaamostrar"));   // grafica abajo izquierda
chart.draw(data, options);

// Agregá este listener para redibujar si cambia el tamaño de la ventana
window.addEventListener("resize", function() {
    chart.draw(data, options);
});
}