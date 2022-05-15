const { Brand } = require("../models/models");
const ApiError = require("../error/apiError");
class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
  async deleteBrand(req, res) {
    const { id } = req.params;
    const item = await Brand.destroy({
      where: { id },
    });
    return res.status(204).send("ok");
  }
}

module.exports = new BrandController();
