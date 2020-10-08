const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: "Authentification failed" });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({ message: "Authentification failed" });
            }
            if (result) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id,
                    pseudo: user.pseudo
                },
                "V1CT0R_LA_6R055E_PUT3",
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({ message: "Authentification successful", token: token });
            }
            return res.status(401).json({ message: "Authentification failed" });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.signup = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if (user) {
            return res.status(409).json({ message: "Mail already exist" });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: err });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        pseudo: req.body.pseudo,
                        password: hash,
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({ message: "User created successfully" });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    });
                }
            });
        }
    });
};

exports.delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
        res.status(200).json({ message: "User deleted" })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};

exports.all = (req, res, next) => {
    User.find()
    .exec()
    .then(users => {
        console.log(users);
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};