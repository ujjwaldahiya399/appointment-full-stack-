const User = require('../models/userData');
const axios = require('axios');
const path = require('path');

exports.getHome = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
};

exports.addUsers = async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;

        const userData = await User.create({
            name: name,
            email: email,
            phone: phone,
            message: message
        });
        console.log(userData);
        res.status(201).json({ userData });
        console.log(userData);
    } catch (err) {
        res.status(500).json({ error: err.message }); // Sending error message
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        console.log(users);
        res.status(200).json({ allUsers: users });
        
    } catch (err) {
        res.status(500).json({ error: err.message }); // Sending error message
    }
};

exports.deleteUser = async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({ err: "ID is missing" });
      }
  
      const uId = req.params.id;
      await User.destroy({
        where: { id: uId },
      });
      res.status(200);
    } catch (err) {
      console.log(err);
    }
};