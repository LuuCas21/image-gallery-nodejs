const { StatusCodes } = require('http-status-codes');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// IMPORTS
const GalleryModel = require('../models/galleryModels');

const getAllImages = async (req, res) => {
    try {
        const data = await GalleryModel.find({});
        res.status(StatusCodes.OK).json({
            status: 'success',
            images: data
        });
    } catch (err) {
        console.log(err);
    }
};

const uploadDirDB = async (req, res) => {
    try {
        //const imageFile = { name: `https://res.cloudinary.com/dxrh437ra/image/upload/v1714618368/file-upload/${req.body.}` }
        const image = await GalleryModel.create(req.body);

        console.log('This is the data coming from input field');
        console.log(req.body);

        res.status(StatusCodes.CREATED).json({
            message: 'success',
            data: image
        });

    } catch (err) {
        console.log(err);
    }
};

const uploadImageServerLocal = async (req, res) => {
    try {
        const file = req.files.image;
        const dirFile = path.join(__dirname, '../public/uploads/' + `${file.name}`); 

        await file.mv(dirFile);

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            src: `/uploads/${file.name}`
        });
    } catch (err) {
        console.log(err);
    }
};

const uploadImageServer = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            use_filename: true,
            folder: 'file-upload',
            invalidate: true
        });

        fs.unlinkSync(req.files.image.tempFilePath);

        //await GalleryModel.create({ image: result.secure_url });
    
        return res.status(StatusCodes.OK).json({
            status: 'success',
            src: result.secure_url
        });

    } catch(err) {
        console.log(err);
    }
};

const deleteImage = async (req, res) => {
    try {
        const id = req.params.id;
        await GalleryModel.findByIdAndDelete(id);
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'image deleted'
        });
    } catch(err) {
        console.log(err);
    }
}

module.exports = { getAllImages, uploadImageServer, uploadDirDB, deleteImage };