const assert = require('chai').assert;
const Publicacion = require('../models/Publicacion');
const Comentario = require('../models/Comentario');
const Auto = require('../models/Auto');
const Respuesta = require('../models/Respuesta');
const tipoCombustible = require("../constants/tipoCombustible");

describe('Test de Publicacion', () => {

  const fechaHoy = new Date()
  const auto = new Auto(1000, 'test marca', 'test modelo', 2010, 'rojo', 'url imagen', 5, tipoCombustible.GASOLINA)
  const comentario = new Comentario(fechaHoy, 'test comentario', new Respuesta(fechaHoy, 'test respuesta'))

  const publicacion = new Publicacion(auto, fechaHoy.toString(), false, [ comentario ])

  it('debe existir un auto', () => {
    assert.exists(publicacion.auto, 'auto')
  })

  it('debe existir una fecha', () => {
    assert.exists(publicacion.fecha, 'fecha')
    assert.isString(publicacion.fecha, 'fecha')
  })

  it('debe existir un seniado', () => {
    assert.exists(publicacion.seniado, 'seniado')
  })

  it('debe existir un comentario', () => {
    assert.exists(publicacion.comentarios, 'comentarios')
  })
})