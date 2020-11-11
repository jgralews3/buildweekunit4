const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const parser = require('cookie-parser')

const {restrict} = require('./data/middleware.js');
const userRouter = require('./data/users/users-router.js');
const plantsRouter = require('./data/plants/plants-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(parser())

server.use('/api/users', userRouter);
server.use('/api/plants', restrict(), plantsRouter);

module.exports = server;
