const express = require('express');
const router = express.Router();
const Project = require('./projects-model');

const { validateProjectId, validateProject } = require('./projects-middleware.js');

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(() => {
            res.status(500).json({ message: "Error retrieving projects" });
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
})

router.post('/', validateProject, (req, res) => {
        Project.insert({ name: req.name, description: req.description, completed: true })
            .then(project => {
                res.status(201).json(project);
            })
            .catch(() => {
                res.status(500).json({ message: "Error creating project" });
            })
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, { name: req.name, description: req.description, completed: true })
        .then(project => {
            res.json(project);
        })
        .catch(next);

})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .catch(next);
})

router.get('/:id/actions', (req, res) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions);
        })
        .catch(() => {
            res.status(500).json({ message: "Error retrieving project actions" });
        })
})

module.exports = router;