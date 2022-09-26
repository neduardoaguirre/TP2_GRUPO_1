
class Auto{
  constructor(precio,marca,modelo,anio,color,img,cantPuertas, tipoCombustible){
    this.setPrecio(precio)
    this.marca = marca
    this.modelo = modelo
    this.anio = anio
    this.color = color
    this.img = img
    this.setCantPuertas(cantPuertas)
    this.tipoCombustible = tipoCombustible
  }

  setPrecio(precio) {
    if(precio === null || precio === undefined) throw new Error
    this.precio = precio
  }

  setCantPuertas(cantPuertas) {
    if(cantPuertas > 5) throw new Error
    this.cantPuertas = cantPuertas
  }
}

module.exports = Auto