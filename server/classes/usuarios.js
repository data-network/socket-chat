class Usuario {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, grupo) {
        let persona = { id, nombre, grupo };
        this.personas.push(persona);

        return this.personas;
    }

    obtenPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;
    }

    obtenPersonas() {
        return this.personas;
    }

    obtenerPersonasGrupo(grupo) {
        let personasGrupo = this.personas.filter(persona => persona.grupo === grupo)
        return personasGrupo;
    }

    borrarPersona(id) {
        let personaEliminada = this.obtenPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaEliminada;
    }
}

module.exports = { Usuario };