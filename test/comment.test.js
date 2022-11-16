const assert = require('chai').assert;
const Comentario = require('../models/Comentario');
const Respuesta = require('../models/Respuesta');

describe('Test de Comentario', function () {
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(ayer.getDate() - 1);
  const respuesta = new Respuesta(ayer, 'respuesta al comentario');
  const comentario = new Comentario(hoy.toString(), 'prueba de texto comentario', respuesta);

  it('debe existir una respuesta', function () {
    assert.exists(comentario.respuesta, 'esta es la respuesta');
  });

  it('el comentario tiene al menos 2 caracteres', function () {
    assert.isString(respuesta.texto, 'comentario');
    assert.isAbove(respuesta.texto.length, 1, 'comentario');
  });

  it('el comentario tiene al menos 2 caracteres', function () {
    assert.isString(respuesta.texto, 'comentario');
    assert.isAbove(respuesta.texto.length, 1, 'comentario');
  });

  it('la fecha debe existir', function () {
    assert.isString(comentario.fecha, 'fecha');
  });
});
