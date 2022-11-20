const Car = require("../models/Car");
const { isValidObjectId } = require("mongoose");

class CarRepository {
  TAG = "CarRepository -";

  async delete(id) {
    try {
      if (isValidObjectId(id)) {
        const car = await Car.findByIdAndDelete({ _id: id });
        if (car) {
          return {
            msg: "Car deleted successfully",
            status: 200,
          };
        } else {
          return {
            msg: "Invalid car id",
            status: 400,
          };
        }
      } else {
        return {
          msg: "Invalid car id",
          status: 400,
        };
      }
    } catch (error) {
      console.error(this.TAG, "delete - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 500,
      };
    }
  }

  async save(carBody) {
    const { licensePlate } = carBody;

    try {
      let car = await Car.findOne({ licensePlate });
      if (car) {
        return {
          msg: "An car already exist with this license plate",
          status: 400,
        };
      } else {
        car = new Car(carBody);
        await car.save();
        return {
          data: car,
          msg: "Car created successfully",
          status: 200,
        };
      }
    } catch (error) {
      console.error(this.TAG, "save - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 500,
      };
    }
  }
}

module.exports = new CarRepository();
