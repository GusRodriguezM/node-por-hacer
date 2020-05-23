const fs = require('fs');

let listadoTareas = [];

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoTareas.push(porHacer);
    guardarDB();
    return porHacer;
}

const cargarDB = () => {

    //Se llena el objeto de listadoTareas con el contenido del archivo json
    try {
        listadoTareas = require('../db/data.json');   
    } catch (error) {
        //En caso de algún error el objeto estará vacío
        listadoTareas = [];
    }
}

const guardarDB = () => {
    //Se convierte a un objeto JSON para luego guardarlo en un archivo
    let data = JSON.stringify(listadoTareas);

    fs.writeFile('db/data.json', data, (err) => {
        if(err) throw new Error ('No se pudo grabar',err);
    })
}

const getListado = (completado) => {
    //Lee el contenido del archivo JSON y lo devuelve
    cargarDB();    
    return listadoTareas;
}

const getListaFiltrada = (completado) => {
    // Lista las tareas dependiendo del estado que se requiera (true o fals)
    cargarDB();
    let listaFiltrada = listadoTareas.filter(tarea => tarea.completado === completado);
    return listaFiltrada;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    //Se busca el index de la tarea la cual se quiere cambiar el estado y luego se guarda
    let index = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);
    if(index >= 0){
        listadoTareas[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();

    //Se filtran las tareas que sean diferentes de la descripción de la tarea que se quiere borrar
    //Se guarda en un nuevo arreglo
    let nuevaLista = listadoTareas.filter(tarea => tarea.descripcion !== descripcion);

    //Si el tamaño de ambos arreglos son iguales no se hizo el filtrado
    if(nuevaLista.length === listadoTareas.length){
        return false;
    //Una vez filtrado el arreglo se vuelve a guardar en el archivo JSON 
    }else{
        listadoTareas = nuevaLista;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    getListaFiltrada
}