const expect = require("chai").expect;
const Cliente = require("../models/Cliente");

describe("Cliente", () => {
  const mail = "test@ort.edu.ar";
  const pass = "ort12345";
  const nombre = "Cristiano";
  const apellido = "Ronaldo";
  const dni = 11223344;
  const historial = undefined;
  const favoritos = undefined;
  const autosSeniados = undefined;

  const cliente = new Cliente(
    mail,
    pass,
    nombre,
    apellido,
    dni,
    historial,
    favoritos,
    autosSeniados
  );

  describe("instancia valida", () => {
    it("crea Cliente satisfactoriamente", () => {
      expect(cliente).to.have.property("mail").with.equal(mail);
      expect(cliente).to.have.property("pass").with.equal(pass);
      expect(cliente).to.have.property("nombre").with.equal(nombre);
      expect(cliente).to.have.property("apellido").with.equal(apellido);
      expect(cliente).to.have.property("dni").with.equal(dni);
      expect(cliente).to.have.property("historial").with.equal(historial);
      expect(cliente).to.have.property("favoritos").with.equal(favoritos);
      expect(cliente).to.have.property("autosSeniados").with.equal(autosSeniados);
    });
  });

  describe("instancia invalida", () => {
    it("impide la creacion por error en el dni", () => {
      const errorDni = () => {
        const cliente = new Cliente(
          mail,
          pass,
          nombre,
          apellido,
          undefined,
          historial,
          favoritos,
          autosSeniados
        );
      };

      expect(errorDni).to.throw(Error);
    });
  });
});
