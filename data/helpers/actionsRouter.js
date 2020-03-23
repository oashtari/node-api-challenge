const express = require('express');

const db = require('./actionModel');

const router = express.Router();



//GET

router.get('/', (req, res) => {

    db.get()
        .then(actions => {
            if (actions) {
                res.status(200).json(projects)
            } else {
                res.status(404).json({ message: 'could not get your projects' })
            }
        })
        .catch(error => res.status(500).json({ error: "unable to hit actions database" }))
})


// server.get("/", (req, res) => {
//     actionDb.get().then(actions => res.status(200).json(actions));
// });

//POST


//PUT


//DELETE


module.exports = router;
