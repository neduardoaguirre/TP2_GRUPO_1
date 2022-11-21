const Client = require("../models/Client");
const { isValidObjectId } = require("mongoose");

class ClientRepository {
  TAG = "ClientRepository -";

  /**
   * Update a exist client by id
   * @param id Client id
   * @param clientBody Client fields to update
   */
  async edit(id, clientBody) {
    try {
      if (!isValidObjectId(id)) {
        return {
          msg: "Invalid client id",
          status: 400,
        };
      } else if (clientBody && Object.keys(clientBody).length) {
        const propertiesCanEdit = ["email", "password", "name", "surname"];
        const propertiesCantEdit = [];

        Object.keys(clientBody).forEach((property) => {
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
          const client = await Client.findOneAndUpdate(
            { _id: id },
            { $set: clientBody },
            { new: true }
          );

          return {
            data: client,
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
   * Get one client by id from database
   * @param id Client id
   */
  async get(id) {
    try {
      if (isValidObjectId(id)) {
        const client = await Client.findById({ _id: id });
        return {
          data: client,
          msg: "Get client successfully",
          status: 200,
        };
      } else {
        return {
          msg: "Invalid client id",
          status: 400,
        };
      }
    } catch (error) {
      console.error(this.TAG, "get - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 200,
      };
    }
  }

  /**
   * Get all clients from database
   */
  async getAll() {
    try {
      const clients = await Client.find();

      return {
        data: clients,
        msg: "Get all clients successfully",
        status: 200,
      };
    } catch (error) {
      console.error(this.TAG, "getAll - ERROR: ", error);
      return {
        msg: "Sorry, something went wrong",
        status: 200,
      };
    }
  }

  /**
   * Delete client from database
   * @param id  Client id
   */
  async delete(id) {
    try {
      if (isValidObjectId(id)) {
        const client = await Client.findByIdAndDelete({ _id: id });
        if (client) {
          return {
            msg: "Client deleted successfully",
            status: 200,
          };
        } else {
          return {
            msg: "Invalid client id",
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
   * Save new client to database
   * @param clientBody Client Schema
   */
  async save(clientBody) {
    const { dni } = clientBody;

    try {
      let client = await Client.findOne({ dni });
      if (client) {
        return {
          msg: "The client already exist with this dni",
          status: 400,
        };
      } else {
        client = new Client(clientBody);
        await client.save();
        return {
          data: client,
          msg: "Client created successfully",
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

module.exports = new ClientRepository();
