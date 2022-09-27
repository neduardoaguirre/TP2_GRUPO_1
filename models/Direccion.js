
class Direccion {

  constructor(calle, altura, numDepto, provincia, localidad, codPostal) {
    this.setCalle(calle);
    this.altura = altura;
    this.numDepto = numDepto;
    this.provincia = provincia;
    this.localidad = localidad;
    this.codPostal = codPostal;
  }

  setCalle(calle) {
    if (calle === null || calle === undefined) throw new Error
    this.calle = calle
  }

}

module.exports = Direccion