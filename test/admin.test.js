const expect = require("chai").expect;
const Admin = require("../models/Admin");
const MongoAdmin = require('../models/Admin')

describe("Admin", () => {
  const newAdmin = new MongoAdmin({ email: 'admin@admin.com', password: '1234' })

  describe("istancia valida", () => {
    it("Guarda admin y verifica si existe o no un admin con ese mail ya", () => {
      newAdmin.save()
    });
  });

  describe("instancia invalida", () => {
    it("impide la creación por falta de mail", () => {
      const crearAdminErroneo = () => {
        const adminErroneo = new Admin(null, "1234");
      };
      expect(crearAdminErroneo).to.throw(Error);
    });

    it("impide la creación por falta de password", () => {
      const crearAdminErroneo = () => {
        const adminErroneo = new Admin("admin@admin.com", undefined);
      };

      expect(crearAdminErroneo).to.throw(Error);
    });
  });
});
