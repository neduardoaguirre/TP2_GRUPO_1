
class Cliente {

  constructor(mail, pass, nombre, apellido, dni, historial, favoritos, autosSeniados) {
    this.mail = mail
    this.pass = pass
    this.nombre = nombre
    this.apellido = apellido
    this.setDni(dni);
    this.historial = historial
    this.favoritos = favoritos
    this.autosSeniados = autosSeniados
  }

  setDni(dni) {
    if (dni === null || dni === undefined) throw new Error
    this.dni = dni
  }

}

module.exports = Cliente