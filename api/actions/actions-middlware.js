const Action = require('./actions-model.js');
const Project = require('./projects-model.js');

async function validateActionId(req, res, next) {
    try {
      const action = await Action.get(req.params.id);
        if (!action) {
            res.status(404).json({ message: "Action ID not found" });
        } else {
            req.action = action;
            next();
        }
    } catch (err) {
        res.status(500).json({ message: "Error validating action ID" });
    }
  }
  
  async function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;

    try {
        const project = await Project.get(project_id);
        if (!project) {
            res.status(404).json({ message: "Actions must be tied to an existing project" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error validating project ID" });
    }

    if (!project_id || !description || !notes) {
        res.status(400).json({ message: "Project ID, description, and notes are required" });
    } else if (description.length > 128) {
        res.status(400).json({ message: "Action description must be 128 characters or less" });    
    } else {
        req.project_id = project_id;
        req.description = description;
        req.notes = notes;
        next();
    }
  }
  
  module.exports = { validateActionId, validateAction };