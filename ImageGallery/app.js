const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

dotenv.config({ path: './config.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const app = express();

app.use(express.json());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));
app.use(fileupload({ useTempFiles: true }));
app.use(cors());

// IMPORTS
const myRouter = require('./routes/galleryRoute');
const connectDB = require('./db/connect');

app.use('/api/v1/images', myRouter);

const db = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD);

const port = process.env.PORT;

const startDB = async () => {
    try {
        await connectDB(db);
        app.listen(port, () => console.log(`Server is running on port ${port}`));

    } catch (err) {
        console.log(err);
    }
};

startDB().catch(err => console.log(err));