const express = require('express');
const router = express.Router();
const Action = require('./actions-model.js');

const { validateAction, validateActionId } = require('./actions-middlware.js');

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(() => {
            res.status(500).json({ message: "Error retrieving actions" });
        })
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
})

router.post('/', validateAction, (req, res) => {
    Action.insert({ project_id: req.project_id, description: req.description, notes: req.notes })
        .then(action => {
            res.status(201).json(action);
        })
        .catch(() => {
            res.status(500).json({ message: "Error creating new action" });
        })
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, { project_id: req.project_id, description: req.description, notes: req.notes })
        .then(action => {
            res.json(action);
        })
        .catch(next);
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Action.remove(req.params.id)
        .catch(next);
})


module.exports = router;