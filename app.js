const express = require('express');
const sequelize = require('./utils/database');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Route
const authroute = require('./route/customer');
const notfound = require('./route/404');

/** Upload section */
// Define file storage
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'image');
    },
    filename: (req,file,cb) => {
        cb(null, new Date().getSeconds()+'_'+file.originalname.replace(' ',''));
    }
})

// define file type validation
const fileType = (req,file,cb) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true);
    } else {
        req.pdffile = true,
        cb(null, false);
    }
}

app.use(multer({ storage: storage, fileFilter: fileType }).single('profile'));
app.use(authroute);
app.use(notfound);

// App run
sequelize
.sync()
// .sync({force:true})
.then(() => {
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
})