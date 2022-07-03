require('dotenv').config();
const express = require('express');
const router = express.Router();

const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const nodeHtmlToImage = require('node-html-to-image')

const Image = require('../models/image');
const controllers = require('../controllers/imageController.js');
const mongoose = require('mongoose');

// Create storage engine 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },

    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, new Date().toISOString() + '-' + fileName)
    }
})

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            // return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// Upload
router.post('/upload', upload.single('file'), (req, res) => {
    const url = req.protocol + '://' + req.get('host') + '/';
    if (req.file) {
        const image = new Image({
            image: url + req.file.path,
        });
        image.save()
        .then((result) => {
            res.status(201).json({
                id: result._id,
                message: "Image bien enregistré",
                image: result.image
            })
        }).catch(() => {
            res.status(500).json({ 'message': 'Erreur serveur' });
        })
    } else {
        res.status(500).json({ 'message': 'Seul les formats .png, .jpg et .jpeg sont accepté' });
    }
});

// Getting One
router.post('/cartoonizer', (req, res) => {
    nodeHtmlToImage({
        output: './uploadsCartoonized/image.png',
        html: `<html><body><img src="blob:http://localhost:3000/4a4ca705-52b6-474a-88c1-489a5508cf75" alt=""/></body></html>`
    })
    .then(() => {
        res.status(201).json({
            message: "Image bien téléchargée",
        })
        console.log(req.body.image)
    }).catch(err => {
        console.log(err),
        res.status(500).json({ error: err });
    })
});

module.exports = router;