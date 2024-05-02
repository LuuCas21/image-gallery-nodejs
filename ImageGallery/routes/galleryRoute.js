const express = require('express');

// IMPORTS
const { getAllImages, uploadImageServer, uploadDirDB } = require('../controllers/galleryControllers');

const myRouter = express.Router();

myRouter.route('/')
.get(getAllImages)
.post(uploadDirDB)

myRouter.route('/uploads')
.post(uploadImageServer)

module.exports = myRouter;