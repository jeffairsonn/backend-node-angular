const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const { models } = require('mongoose');

const User = require('../models/user');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX =  /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/;

module.exports =  {
    register: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        if (email === null || password === null ){
            return res.status(400).json({'error': 'missing parameters'});
        }
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({'error': 'email is not valid'});
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({'error': 'password invalid (must be lenght 8-20 and include 1 number '});
        }

        User.findOne({ email: email })
        .then((userFound) => {
            if (!userFound){

                bcrypt.hash(password, 5, async (err, bcryptedPassword) => {
                    const user = new User({
                        email,
                        password: bcryptedPassword,
                    })
                    await user.save().then((ress) => {
                        return res.status(201).json({
                            id: ress._id,
                            token: jwtUtils.generateTokenForUser(ress)
                        })
                    }).catch((err) => {
                        console.log(err);
                        return res.status(400).json({message: err});
                    });
                });

            } else{
                return res.status(409).json({'error': 'Cette adresse mail est déja utilisé'});
            }
        })
        .catch((err) => {
            return res.status(500).json({'error': 'Problème serveur'});
        })
    },

    login: (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        if (email === null || password === null ){
            res.status(400).json({'error': 'missing parameters'});
        }

        User.findOne({email: email})
        .then((userFound) => {
            if (userFound){
                bcrypt.compare(password, userFound.password, (errBycrypt, resBycript) => {
                    if(resBycript) {
                        return res.status(200).json({
                            "id": userFound._id,
                            "token": jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        res.status(403).json({'error': 'Mot de psse incorrect'});
                    }
                })
            } else{
                res.status(404).json({'error': 'Ce compte n\'existe pas'});
            }
        })
        .catch((err) => {
                res.status(500).json({'error': 'Problème serveur'});
        })
    },

    getUserById: async (req, res, next) => {
        let user;
        try {
            user = await User.findById(req.params.id);
            if (user == null) {
                return res.status(404).json({message: 'Impossible de trouver cet utilisateur'});
            }
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    
        res.user = user;
        next();
    },
};