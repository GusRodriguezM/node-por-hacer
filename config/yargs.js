
const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea',
    type: 'boolean'
};

const argv = require('yargs')
    //Agregar una tarea a la lista
    .command('crear','Crear un elemento',{
        descripcion    
    })
    //Actualizar el estado
    .command('actualizar','Actualizar el estado de una tarea',{
        descripcion,
        completado
    })
    //Listar tareas
    .command('listar','Listar las tareas por hacer')
    .command('listaFiltrada','Lista las tareas dependiendo su estado')
    //Borrar una tarea
    .command('borrar','Borra una una tarea de la lista',{
        descripcion
    })
    .help()
    .argv

module.exports = {
    argv
}