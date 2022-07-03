const express = require('express');
const router = express.Router();


const Course = require('../models/course');
const controllers = require('../controllers/courseController');
const mongoose = require('mongoose');


// Getting All
router.get('/:user_id', async (req, res) => {
    try {
        const courses = await Course.find({ user_id: req.params.user_id });
        return res.status(200).json(courses);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});

// Getting One
router.get('/getone/:course_id', async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.course_id });
        return res.status(200).json(course);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});

// create
router.post('/', controllers.create ,(req, res) => {
    res.json(res.course);
});

// delete
router.delete('/delete/:course_id', async (req, res) => {
    console.log(req.params.course_id, "okok");
    try {
        const course = await Course.deleteMany({ _id: req.params.course_id });
        return res.status(200).json({message: "deleted"});
    } catch (err) {
        return res.status(500);
    }
});

router.put('/update/:course_id', async (req, res) => {
    console.log(req.params.course_id, "okok");
    try {
        const course = await Course.updateOne(
            { "_id": req.params.course_id},
            {"name": req.body.name}
        );
        return res.status(200).json({message: "updated"});
    } catch (err) {
        return res.status(500);
    }
});

module.exports = router;