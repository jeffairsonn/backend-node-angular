const express = require('express');
const router = express.Router();

const User = require('../models/user');
const controllers = require('../controllers/userController');
const { Server } = require('mongodb');

// Getting All
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Getting One
router.get('/:id', controllers.getUserById, (req, res) => {
    res.json(res.user);
});

// Register
router.post('/', controllers.register ,(req, res) => {
    res.json(res.user);
});

// Login 
router.post('/login', controllers.login ,(req, res) => {
    res.json(res.user);
});

// update 
// router.patch('/update/:id', controllers.update ,(req, res) => {
//     if (req.body.firstname != null){
//         res.user.firstname = req.body.firstname;
//     }
//     try {
//         const updatedUser = res.user.save();
//         res.json(updatedUser);
//     } catch {
//         return res.status(400).json({message: err.message});
//     }
// });

module.exports = router;