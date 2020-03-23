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
        .catch(error => { res.status(500).json({ error: "unable to hit the actions database" }) })
})


//POST

// router.post("/", (req, res) => {
//     const { title, contents } = req.body;
//     // console.log('the post content', post)

//     if (!title || !contents) {
//         res.status(400)
//             .json({ errorMessage: "Please provide title and contents for the post." })
//     } else if (title && contents) {
//         Hubs.insert({ title: title, contents: contents })
//             .then(postID => {
//                 Hubs.findById(postID.id)
//                     .then(post =>
//                         res.status(201)
//                             .json(post)
//                     )
//             })
//     } else {
//         res.status(500)
//             .json({ error: "There was an error while saving the post to the database." })
//     }
// });


router.post('/', validateProject, (req, res) => {
    const project = req.body;
    console.log('what is req body', req.body);

    db.insert(project)
        .then(project => { res.status(201).json(project) })
        .catch(error => {
            res.status(500).json({ message: "could not add project to database" })
        })
});

// router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
//     // do your magic!
//     console.log('what is req params', req.params)
//     const id = req.params.id;

//     postDb.insert({ user_id: id, text: req.body.text })
//         .then(post => {
//             res.status(201).json(post)
//         })
//         .catch(error => {
//             res.status(500).json({ error: "was not able to add post to postDb" })
//         })
// });

//PUT


//DELETE



//MIDDLEWARE

function validateProjectsId(req, res, next) {
    // do your magic!
    const id = req.params.id;

    db.getById(id)
        .then(user => {
            if (user) {
                req.user = user;
                next()
            } else {
                res.status(400).json({ message: "invalid user id" })
            }
        })
}

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