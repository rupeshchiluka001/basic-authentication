const { ESRCH } = require('constants');
const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const utils = require('../config/utils');

router.post('/login', function(req, res, next) {
    if ((req.body.email === 'admin@namasys.co') && (req.body.password === 'admin123')) {
        const tokenObject = utils.issueJWT();
        res.status(200).json({ success: true, token: tokenObject.token, expires: tokenObject.expires });
    }
    else {
        res.status(201).json({ success: false, msg: "incorrect email or password" });
    }
});

router.post('/submit', (req, res, next) => {
    if( !utils.verifyJWT(req.headers.authorization) ) {
        res.status(401).json({ success: false, msg: "Please login first" });
        return;
    }

    const newUser = new User({
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    });

    try {
        newUser.save()
            .then((user) => {
                res.json({ success: true, msg: "User added successfully", id: user._id });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Error! try again later" });
    }

});

router.get('/details', async (req, res, next) => {
    const id = req.query.id;
    try {
        const user = await User.findById(id);
        
        if ( Object.keys(user).length ) {
            res.status(200).json({ success: true, msg: user});
        }
        else {
            res.status(201).json({ success: true, msg: "No user found!"});
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Error! try again later" });
    }
})

module.exports = router;