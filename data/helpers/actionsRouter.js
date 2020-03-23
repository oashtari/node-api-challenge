const express = require('express');

const db = require('./actionModel');

const router = express.Router();

// insert,
// update,
// remove,

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
    console.log('what is req body', req.body);

    db.insert(action)
        .then(action => { res.status(201).json(action) })
        .catch(error => {
            res.status(500).json({ message: "could not add action to database" })
        })
});

//PUT


//DELETE


//MIDDLEWARE

function validateAction(req, res, next) {
    if (req.body) {
        if (req.body.project_id && req.body.description && req.body.notes) {
            next()
        } else {
            res.status(400).json({ message: "missing required id, description and/or notes fields" })
        }
    } else {
        res.status(400).json({ message: "missing user data" })
    }
}



module.exports = router;
