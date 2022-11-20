const Car = require("../models/Car");
const { isValidObjectId } = require("mongoose");

class CarRepository {
  TAG = "CarRepository -";

  /**
   * Update a exist car by id
   * @param id Car id
   * @param carBody Car fields to update
   */
  async edit(id, carBody) {
    try {
      if (!isValidObjectId(id)) {
        return {
          msg: "Invalid car id",
          status: 400,
        };
      } else if (carBody && Object.keys(carBody).length) {
        const propertiesCanEdit = ["price", "description", "image"];
        const propertiesCantEdit = [];

        Object.keys(carBody).forEach((property) => {
          if (!propertiesCanEdit.includes(property)) {
            propertiesCantEdit.push(property);
          }
        });

        if (propertiesCantEdit.length) {
          return {
            msg: "Can't edit some properties: " + propertiesCantEdit.toString(),
            status: 400,
          };
        } else {
          const car = await Car.findOneAndUpdate(
            { _id: id },
            { $set: carBody },
            { new: true }
          );

          return {
            data: car,
            msg: "Car updated successfully",
            status: 200,
          };
        }
      } else {
        return {
          msg: "Missing car body params",
          status: 400,
        };
      }
    } catch (error) {
      console.error(this.TAG, "edit - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 500,
      };
    }
  }

  /**
   * Delete car from database
   * @param id  Car id
   */
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

  /**
   * Save new car to database
   * @param carBody Car Schema
   */
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
