const express = require('express');

const server = express();

server.use(express.json());

const projectsRouter = require('./data/helpers/projectsRouter');
const actionsRouter = require('./data/helpers/actionsRouter');


server.get('/', (req, res) => {
    res.status(200).json({ Server: 'Running' })
});

server.use(`/projects`, projectsRouter);
server.use(`/actions`, actionsRouter);

module.exports = server;