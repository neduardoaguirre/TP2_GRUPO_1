const expect = require("chai").expect;
const Direccion = require("../models/Direccion");

describe("Direccion", () => {
  const calle = "Avenida Libertador";
  const altura = 1000;
  const numDepto = "2";
  const provincia = "Buenos Aires";
  const localidad = "CABA";
  const codPostal = 1010;

  const direccion = new Direccion(
    calle,
    altura,
    numDepto,
    provincia,
    localidad,
    codPostal
  );

  describe("instancia valida", () => {
    it("crea Direccion satisfactoriamente", () => {
      expect(direccion).to.have.property("calle").with.equal(calle);
      expect(direccion).to.have.property("altura").with.equal(altura);
      expect(direccion).to.have.property("numDepto").with.equal(numDepto);
      expect(direccion).to.have.property("provincia").with.equal(provincia);
      expect(direccion).to.have.property("localidad").with.equal(localidad);
      expect(direccion).to.have.property("codPostal").with.equal(codPostal);
    });
  });

  describe("instancia invalida", () => {
    it("impide la creacion por error en la calle", () => {
      const errorCalle = () => {
        const direccion = new Direccion(
          undefined,
          altura,
          numDepto,
          provincia,
          localidad,
          codPostal
        );
      };

      expect(errorCalle).to.throw(Error);
    });
  });
});
