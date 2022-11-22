const Admin = require('../models/Admin')
const { isValidObjectId } = require('mongoose')

class AdminRepository {
  TAG = "AdminRepository -"
  /**
     * Update an Admin by id
     * @param id Admin id
     * @param adminBody Admin fields to update
     */
  async edit(id, adminBody) {
    try {
      if (!isValidObjectId(id)) {
        return {
          msg: 'Invalid admin id',
          status: 400
        }
      } else if (adminBody && Object.keys(adminBody).length) {
        const propertiesCanEdit = [ "email" ]
        const propertiesCantEdit = []

        Object.keys(adminBody).forEach((property) => {
          if (!propertiesCanEdit.includes(property)) {
            propertiesCantEdit.push(property)
          }
        })
        if (propertiesCantEdit.length) {
          return {
            msg: "Can't edit some properties: " + propertiesCantEdit.toString(),
            status: 400,
          };
        } else {
          const admin = await Admin.findByIdAndUpdate(
            { _id: id },
            { $set: adminBody },
            { new: true }
          );
          return {
            data: admin,
            msg: "Client updated successfully",
            status: 200,
          };
        }
      } else {
        return {
          msg: "Missing client body params",
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
     * Get one admin by id from database
     * @param id Admin id
     */
  async get(id) {
    try {
      if (isValidObjectId(id)) {
        const admin = await Admin.findById({ _id: id });
        return {
          data: admin,
          msg: "Get Admin successfully",
          status: 200,
        };
      } else {
        return {
          msg: "Invalid admin id",
          status: 400,
        };
      }
    } catch (error) {
      console.error(this.TAG, "get - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 400,
      };
    }
  }

  /**
   * Get all admins from database
   */
  async getAll() {
    try {
      const admins = await Admin.find();

      return {
        data: admins,
        msg: "Get all admins successfully",
        status: 200,
      };
    } catch (error) {
      console.error(this.TAG, "getAll - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 400,
      };
    }
  }

  /**
   * Delete Admin from database
   * @param id  Admin id
   */
  async delete(id) {
    try {
      if (isValidObjectId(id)) {
        const admin = await Admin.findByIdAndDelete({ _id: id });
        if (admin) {
          return {
            msg: "Admin deleted successfully",
            status: 200,
          };
        } else {
          return {
            msg: "Invalid Admin id",
            status: 400,
          };
        }
      }
    } catch (error) {
      console.error(this.TAG, "delete - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 400,
      };
    }
  }

  /**
   * Save new Admin to database
   * @param adminBody Admin Schema
   */
  async save(adminBody) {
    const { email } = adminBody;

    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return {
          msg: "The client already exist with this dni",
          status: 400,
        };
      } else {
        admin = new Admin(adminBody);
        await admin.save();
        return {
          data: admin,
          msg: "Admin created successfully",
          status: 200,
        };
      }
    } catch (error) {
      console.error(this.TAG, "save - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 400,
      };
    }
  }
}

module.exports = new AdminRepository()