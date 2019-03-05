var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('grupo')) {
    window.location = 'index.html';
    throw new Error('El nombre y grupo es requerido');
}

var usuario = {
    nombre: params.get('nombre'),
    grupo: params.get('grupo')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados: ', resp);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
/* socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});
 */

// Msg Privado
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Msg Privado
socket.on('listarPersona', function(personas) {
    console.log(personas);
});

// Msg Privado
socket.on('mensajePrivado', function(personas) {
    console.log(personas);
});