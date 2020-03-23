const express = require('express');

const server = express();

server.use(express.json());

// const userRouter = require('./users/userRouter');
// const postsRouter = require('./posts/postRouter');


server.get('/', (req, res) => {
    res.status(200).json({ Server: 'Running' })
});

// server.use(`/api/users`, userRouter);
// server.use(`/api/posts`, postsRouter)

module.exports = server;