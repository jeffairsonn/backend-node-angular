const { models } = require('mongoose');

const Image = require('../models/image');

module.exports =  {
    upload: (req, res, next) => {
        console.log('upload de l\'image')
        next();
    },
    getImageById: async (req, res, next) => {
        let image;
        try {
            console.log(req.params.id);
            image = await Image.findById(req.params.id);
            if (image == null) {
                return res.status(404).json({message: 'cannot find image'});
            }
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    
        res.image = image;
        next();
    },
};