const { Type } = require("../models/models");
const ApiError = require("../error/apiError");
class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
  async deleteType(req, res) {
    const { id } = req.params;
    const item = await Type.destroy({
      where: { id },
    });
    return res.status(204).send("ok");
  }
}

module.exports = new TypeController();
