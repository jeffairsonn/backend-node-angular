const { models } = require('mongoose');

const Course = require('../models/course');

module.exports =  {
    create: async (req, res) => {
        let description = req.body.description;
        let name = req.body.name;
        let image = req.body.image;
        let user_id = req.body.user_id;

        if (description === null || name === null || image === null || user_id === null){
            return res.status(400).json({'error': 'missing parameters'});
        }

        const course = new Course({
            description,
            name,
            image,
            user_id,
        })
        await course.save().then((ress) => {
            return res.status(201).json({
                desription: ress.description,
                name : ress.name,
                image : ress.image,
                user_id : ress.user_id,
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({message: err});
        });
    },
};