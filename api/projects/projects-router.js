const express = require('express');
const router = express.Router();
const Project = require('./projects-model');

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving projects" });
        })
})

router.get('/:id', (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            if (project) {
                res.json(project);
            } else {
                res.status(404).json({ message: "Project id not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving projects" });
        })
})

router.post('/', (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        res.status(400).json({ message: "Project name and description are required" });
    } else {
        Project.insert({ name, description })
            .then(project => {
                res.status(201).json(project);
            })
            .catch(err => {
                res.status(500).json({ message: "Error creating project" });
            })
    }
})

module.exports = router;