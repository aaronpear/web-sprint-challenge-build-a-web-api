const Project = require('./projects-model.js');

async function validateProjectId(req, res, next) {
    try {
      const project = await Project.get(req.params.id);
        if (!project) {
            res.status(404).json({ message: "Project ID not found" });
        } else {
            req.project = project;
            next();
        }
    } catch (err) {
        res.status(500).json({ message: "error validating project ID" });
    }
  }
  
  function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ message: "Project name and description are required" });
    } else {
      req.name = name;
      req.description = description;
      next();
    }
  }
  
  module.exports = { validateProjectId, validateProject };