var assert = require('chai').assert;
const Respuesta = require('../models/Respuesta');

describe('Respuesta test', function () {

  let respuesta = new Respuesta('2018-01-01', 'si');

  it('check la respuesta tiene fecha', function () {
    assert.isString(respuesta.fecha, 'date');
  });

  it('La respuesta tiene almenos 2 caracteres', function () {
    assert.isString(respuesta.texto, 'texto');
    assert.isAbove(respuesta.texto.length, 1, 'texto');
  });

});