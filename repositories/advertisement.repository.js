const Advertisement = require("../models/Advertisement");
const Car = require("../models/Car")
const { isValidObjectId } = require("mongoose");

class AdvertisementRepository {
  TAG = "AdvertisementRepository -";

  /**
   * Update an existing advertisement by id
   * @param id Advertisement id
   * @param advertisementBody Advertisement fields to update
   */
  async edit(id, advertisementBody) {
    try {
      if (!isValidObjectId(id)) {
        return {
          msg: "Invalid advertisement id",
          status: 400,
        };
      } else if (advertisementBody && Object.keys(advertisementBody).length) {
        const propertiesCanEdit = ["date", "comments", "paid", "title", "descrption", "location"];
        const propertiesCantEdit = [];

        Object.keys(advertisementBody).forEach((property) => {
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
          const advertisement = await Advertisement.findOneAndUpdate(
            { _id: id },
            { $set: advertisementBody },
            { new: true }
          );

          return {
            data: advertisement,
            msg: "Advertisement updated successfully",
            status: 200,
          };
        }
      } else {
        return {
          msg: "Missing advertisement body params",
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
   * Get one advertisement by id from database
   * @param id Advertisement id
   */
  async get(id) {
    try {
      if (isValidObjectId(id)) {
        const advertisement = await Advertisement.findById({ _id: id });
        return {
          data: advertisement,
          msg: "Get advertisement successfully",
          status: 200,
        };
      } else {
        return {
          msg: "Invalid advertisement id",
          status: 400,
        };
      }
    } catch (error) {
      console.error(this.TAG, "getAdvertisement - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 500,
      };
    }
  }

  /**
   * Get all advertisements from database
   */
  async getAll() {
    try {
      const advertisements = await Advertisement.find();
      return {
        data: advertisements,
        msg: "Get all advertisements successfully",
        status: 200,
      };
    } catch (error) {
      console.error(this.TAG, "getAll - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 500,
      };
    }
  }

  /**
   * Delete advertisement from database
   * @param id  Advertisement id
   */
  async delete(id) {
    try {
      if (isValidObjectId(id)) {
        const advertisement = await Advertisement.findByIdAndDelete({ _id: id });
        if (advertisement) {
          return {
            msg: "Advertisement deleted successfully",
            status: 200,
          };
        } else {
          return {
            msg: "Invalid advertisement id",
            status: 400,
          };
        }
      } else {
        return {
          msg: "Invalid advertisement id",
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
   * Save new advertisement to database
   * @param advertisementBody AdvertisementSchema
   */
  async save(advertisementBody) {

    const { car: carId } = advertisementBody.car;

    try {
      let carExist = await Car.find({ _id: carId });
      if (!carExist) {
        return {
          msg: "The car does not exist",
          status: 400,
        };
      }

      let exists = await Advertisement.findOne({ carId })
      if (exists) {
        return {
          msg: "An advertisement already exist with this id",
          status: 400,
        };
      } else {
        let advertisement = new Advertisement(advertisementBody);
        await advertisement.save();
        return {
          data: advertisement,
          msg: "Advertisement created successfully",
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

module.exports = new AdvertisementRepository();
