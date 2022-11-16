const expect = require("chai").expect;
const assert = require('chai').assert
const MongoAdmin = require('../models/Admin')

describe("Admin", () => {

  describe("Contraseña invalida", () => {
    it("Verifica si existe un admin y si la contraseña es correcta", () => {
      const newAdmin = new MongoAdmin({ email: 'admin@admin.com', password: 'test123' })
      newAdmin.save()
        .then(() => {
          assert(newAdmin.isNew)
          done()
        })
    });
  });

  describe("Instancia valida", () => {
    it("Crea el admin correctamente", () => {
      const crearAdminCorrecto = () => {
        const newAdmin = new MongoAdmin({ email: 'admin@admin.com', password: 'Pass1234' })
        newAdmin.save()
      }
      assert.isOk(crearAdminCorrecto)
    });

    it("Impide la creación por falta de password", () => {
      const crearAdminErroneo = () => {
        const adminErroneo = new MongoAdmin("admin@admin.com", undefined);
        adminErroneo.save()
      };
      assert.isNotOk(crearAdminErroneo)
    });
  });
});
