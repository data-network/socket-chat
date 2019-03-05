const { io } = require('../server');
const { Usuario } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuario();

io.on('connection', (client) => {
    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.grupo) {
            return callback({
                ok: true,
                mensaje: 'El nombre y grupo es requerido'
            });
        }

        client.join(data.grupo);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.grupo);
        client.broadcast.to(data.grupo).emit('listarPersona', usuarios.obtenerPersonasGrupo());

        callback(usuarios.obtenerPersonasGrupo(data.grupo));
    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.obtenPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.grupo).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.grupo).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat`));
        client.broadcast.to(personaBorrada.grupo).emit('listarPersona', usuarios.obtenerPersonasGrupo(personaBorrada.grupo));
    });

    client.on('mensajePrivado', (data) => {
        let persona = usuarios.obtenPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
    });

    client.on('mensajeGrupo', (data) => {
        let persona = usuarios.obtenPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
    });
});