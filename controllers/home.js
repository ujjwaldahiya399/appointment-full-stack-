const User = require('../models/userData');
const path = require('path');

exports.getHome = (req, res, next) => {
    res.render(path.join(__dirname, '..', 'views', 'main', 'index.ejs'));
};

exports.getAppointments = (req, res, next) => {
    User.findAll()
    .then((usersData) => {
        console.log(usersData);
        res.render(path.join(__dirname, '..', 'views', 'main', 'appointment.ejs'), {
          users: usersData,
          path: '/appointments'
        });
    })
    .catch(err => {
        console.log(err);
        res.render(path.join(__dirname, '..', 'views', 'main', 'appointment.ejs'), { errorMessage: 'Failed to fetch appointments.' });
    });
};

exports.postAppointments = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    User.create({
        name: name,
        email: email,
        phone: phone,
        message: message
    })
    .then(result => {
        console.log(result);
        res.redirect('/appointments');
    })
    .catch(err => {
        console.log(err);
        res.render(path.join(__dirname, '..', 'views', 'main', 'appointment.ejs'), { errorMessage: 'Failed to create appointment.' });
    });
};
    

exports.postDeleteAppointment = (req, res, next) => {
    const appointmentId = req.body.appointmentId;

    User.findByPk(appointmentId)
    .then((appointment) => {
        if (!appointment) {
            res.redirect('/appointments');
        }
        console.log(appointment);
        return appointment.destroy();
    })
    .then(result => {
        console.log("Destroy appointment");
        res.redirect('/appointments');
    })
    .catch(err => {
        // res.render(path.join(__dirname, '..', 'views', 'main', 'appointment.ejs'), { errorMessage: 'Failed to create appointment.' });
    })
    // console.log(appointmentId);
}