const express = require('express');

const db = require('./actionModel');

const router = express.Router();

//GET

router.get('/', (req, res) => {

    db.get()
        .then(actions => {
            if (actions) {
                res.status(200).json(actions)
            } else {
                res.status(404).json({ message: 'could not get your projects' })
            }
        })
        .catch(error => res.status(500).json({ error: "unable to hit actions database" }))
})



//POST

router.post('/', validateAction, (req, res) => {
    const action = req.body;

    db.insert(action)
        .then(action => { res.status(201).json(action) })
        .catch(error => {
            res.status(500).json({ message: "could not add action to database" })
        })
});

//PUT

router.put('/:id', validateAction, (req, res) => {
    const { id } = req.params;
    const action = req.body;
    console.log('here is the req body', req.body)

    db.update(id, action)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({ message: "that action could not be found" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "could not get that project" })
        })
});



//DELETE

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // const action = req.body;
    db.remove(id)
        .then(action => {
            res.status(200).json({ message: "that action was deleted SUCCESSFULLY" })
        })
        .catch(error => {
            res.status(500).json({ message: "was not able to delete this action" })
        })
});

//MIDDLEWARE

function validateAction(req, res, next) {
    if (req.body) {
        if (req.body.project_id && req.body.description && req.body.notes) {
            next()
        } else {
            res.status(400).json({ message: "missing required id, description and/or notes fields" })
        }
    } else {
        res.status(400).json({ message: "missing action data" })
    }
}

function validatePutAction(req, res, next) {
    if (req.body) {
        if (req.body.description && req.body.notes) {
            next()
        } else {
            res.status(400).json({ message: "missing required description and/or notes fields" })
        }
    } else {
        res.status(400).json({ message: "missing action data" })
    }
}


module.exports = router;
