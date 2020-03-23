const express = require('express');

const router = express.Router();
const db = require('./projectModel');

//GET

router.get('/', (req, res) => {

    db.get()
        .then(projects => {
            if (projects) {
                res.status(200).json(projects)
            } else {
                res.status(404).json({ message: 'could not get your projects' })
            }
        })
        .catch(error => res.status(500).json({ error: "unable to retrive any data from the database" }))
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;

    db.getProjectActions(id)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions)
            } else {
                res.status(404).json({ message: "could not get those actions" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "unable to hit the actions database" })
        })
})


//POST

router.post('/', validateProject, (req, res) => {
    const project = req.body;
    console.log('what is req body', req.body);

    db.insert(project)
        .then(project => { res.status(201).json(project) })
        .catch(error => {
            res.status(500).json({ message: "could not add project to database" })
        })
});

//PUT

router.put('/:id', validateProject, (req, res) => {
    const { id } = req.params;
    const project = req.body;

    db.update(id, project)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: "that project could not be found" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "could not get that project" })
        })
});


//DELETE

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const project = req.body;
    db.remove(id)
        .then(project => {
            res.status(200).json({ message: "that project was deleted SUCCESSFULLY" })
        })
        .catch(error => {
            res.status(500).json({ message: "was not able to delete this project" })
        })
});




//MIDDLEWARE

function validateProject(req, res, next) {
    if (req.body) {
        if (req.body.name && req.body.description) {
            next()
        } else {
            res.status(400).json({ message: "missing required name and description fields" })
        }
    } else {
        res.status(400).json({ message: "missing user data" })
    }
}

module.exports = router;