const expect = require("chai").expect;
const Auto = require("../models/Auto");
const tipoCombustible = require("../constants/tipoCombustible");

describe("Auto", () => {
  const auto = new Auto(
    1000,
    "Ferrari",
    "F50",
    "1995",
    "Rojo",
    "imagen-ejemplo",
    5,
    tipoCombustible.GASOLINA
  );

  describe("instancia valida", () => {
    it("crea Auto satisfactoriamente", () => {
      expect(auto).to.have.property("precio").with.equal(1000);
      expect(auto).to.have.property("marca").with.equal("Ferrari");
      expect(auto).to.have.property("modelo").with.equal("F50");
      expect(auto).to.have.property("anio").with.equal("1995");
      expect(auto).to.have.property("color").with.equal("Rojo");
      expect(auto).to.have.property("img").with.equal("imagen-ejemplo");
      expect(auto).to.have.property("cantPuertas").with.equal(5);
      expect(auto)
        .to.have.property("tipoCombustible")
        .with.equal(tipoCombustible.GASOLINA);
    });
  });

  describe("instancia invalida", () => {
    it("impide la creacion por error en el precio", () => {
      const errorPrecio = () => {
        const autoPrecioErroneo = new Auto(
          undefined,
          "Ferrari",
          "F50",
          "1995",
          "Rojo",
          "imagen-ejemplo",
          5,
          tipoCombustible.GASOLINA
        );
      };

      expect(errorPrecio).to.throw(Error);
    });

    it("impide la creacion por error en cantidad de puertas", () => {
      const errorCantPuertas = () => {
        const autoError = new Auto(
          1000,
          "Ferrari",
          "F50",
          "1995",
          "Rojo",
          "imagen-ejemplo",
          25,
          tipoCombustible.GASOLINA
        );
      };

      expect(errorCantPuertas).to.throw(Error);
    });
  });
});
