const worksModel = require("../model/works");

module.exports = {
  getWorks: async () => await worksModel.find(),
  getWork: async (id) => await worksModel.findById(id),
  postWork: async (work) => await worksModel.create(work),
  deleteWork: async (id) => await worksModel.findByIdAndDelete(id),
  updateWork: async (filter, update) =>
    await worksModel.findOneAndUpdate(filter, update),
};
