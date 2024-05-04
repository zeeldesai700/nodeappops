const Customer = require('../model/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fssystem = require('../utils/file');

// Add cusotmer 
exports.addcustomer = ((req,res) => {
    
    // defined fields
    let email = req.body.email;
    let profile = req.file;

    // Address is optional
    let add = image = '';
    if(req.body.address) {
        add = req.body.address;
    }

    // Image is optional
    if(profile) {
        image = profile.path;
    }

    // Store just refrence
    let usertype = 'superadmin';
    if(req.jwttoken) {
        usertype = 'admin'
    }

    // res.status(200).json({msg:'USer added'});
    // console.log('user added');

    // Check customer exitst or not and then submit the data
    Customer.findAll({where: {email: email}})
    .then((users) => {
        if(users.length > 0) {
            if(req.jwttoken) {
                res.status(401).json({status: 'error', msg: 'Customer is already registerd'});
            } else {
                res.status(401).json({status: 'error', msg: 'You have already signed up please login'});
            }
        } else {
            bcrypt.hash(req.body.password, 10) // password encryption
            .then((encpwd) => {
                Customer.create({
                    name: req.body.name,
                    email: email,
                    password: encpwd,
                    phone: req.body.phone,
                    gender: req.body.gender.toUpperCase(),
                    address: add,
                    profile:image,
                    type: usertype
                })
                .then(() => {
                    res.status(200).json({ msg: 'Customer sign up successfully'});
                })
            })
        }
    })
    .catch((err) => {
        console.log(err);
    })
})

// Login user
exports.login = ((req,res,next) => {
    Customer.findAll({where: {email: req.body.email}})
    .then((users) => {
        if(users.length > 0) {
            users = users[0];
            bcrypt.compare(req.body.password, users.password)
            .then((issame) => {
                if(issame === true) {
                    let jwttoken = jwt.sign({id: users.email, uniq: users.id}, 'zeelpatel', {expiresIn: '1h'});
                    res.status(200).json({token: jwttoken, msg: 'You have login successfully'});
                } else {
                    res.status(403).json({status: 'error', msg: 'Password is invalid'});
                }
            })
        } else {
            res.status(401).json({status: 'error', msg: 'Invalid credential please check'});
        }
    })
})

// Find the list of all customer
exports.getlist = ((req,res,next) => {
    let limitc = (typeof(req.body.limit) == 'undefined') ? 3 : parseInt(req.body.limit);
    let offsetc = (typeof(req.body.offset) == 'undefined') ? 0 : parseInt(req.body.offset);
    let name = (typeof(req.body.name) == 'undefined') ? '' : { name: req.body.name };
    Customer.findAndCountAll({where: name, offset: offsetc, limit:limitc})
    .then((users) => {
        res.status(200).json(users);
    })
    .catch((err) => {
        res.status(500).json({status: 'error', msg:' Internal server error'});
    })
})

// Find the specific customer
exports.getcustomer = ((req,res,next) => {
    Customer.findAll({ where: { id: req.params.id }})
    .then((users) => {
        if(users.length > 0) {
            users = users[0];
            res.status(200).json(users);
        } else {
            res.status(404).json({status: 'error', msg: 'Customer is not exist Please enter valid id'});
        }
    })
    .catch((err) => {
        res.status(500).json({status: 'error', msg:' Internal server error'});
    })
})

// Find the specific customer
/*exports.getcustomer = (async(req,res,next) => {
    try {
        const user = await Customer.findAll({ where: { id: req.params.id }})
        console.log(user);
        if(user.length > 0) {
            users = users[0];
            res.status(200).json(users);
        } else {
            res.status(404).json({status: 'error', msg: 'Customer is not exist Please enter valid id'});
        }
    } catch(err) {
        res.status(500).json({status: 'error', msg:' Internal server error'});
    }
}) */

// Update the specific customer
exports.editcustomer = ((req,res,next) => {
    Customer.findAll({ where: { id: req.params.id }})
    .then((user) => {
        if(user.length == 0) {
            res.status(404).json({status: 'error', msg: 'Customer is not exist Please enter valid id'});
        } else {
            user = user[0];

            let updatedname = (typeof(req.body.name) == 'undefined') ? user.name : req.body.name;
            let updatedemail = (typeof(req.body.email) == 'undefined') ? user.email : req.body.email;
            let updatedpwd = (typeof(req.body.password) == 'undefined') ? user.password: req.body.password;
            let updatedphone = (typeof(req.body.phone) == 'undefined') ? user.phone : req.body.phone;
            let updatedgender = (typeof(req.body.gender) == 'undefined') ? user.gender : req.body.gender;
            let updatedadd = (typeof(req.body.address) == 'undefined') ? user.phone : req.body.address;
            
            let updatedimage = user.profile;
            if(req.file) {
                fssystem.deletefile(user.profile);
                updatedimage = req.file.path;

            }
            // if(user.email != req.body.email) {
            //     res.status(401).json({msg: "You can't update the email"});
            // } else {
                // defined fields
    
                bcrypt.hash(updatedpwd, 10) // password encryption
                .then((encpwd) => {
                    Customer.update({
                        name: updatedname, 
                        email: updatedemail,
                        password: encpwd,
                        phone: updatedphone,
                        gender: updatedgender.toUpperCase(),
                        address: updatedadd,
                        profile: updatedimage
                    },{ 
                        where: { id : user.id } 
                    })
                    .then((user) => {
                        res.status(200).json({ msg: 'Customer update successfully'});
                    })
                })
            // }
        }
    })
    .catch((err) => {
        res.status(500).json({status: 'error', msg:' Internal server error'});
    })
})

// Delete cusotmer
exports.deletecustomer = ((req,res,next) => {
    Customer.findAll({ where: { id: req.params.id }})
    .then((user) => {
        if(user.length == 0) {
            res.status(404).json({status: 'error', msg: 'Customer is not exist Please enter valid id'});
        } else {
            user = user[0];
            Customer.destroy({where : { id: user.id}})
            .then((id) => {
                if(id) {
                    fssystem.deletefile(user.profile);
                    res.status(200).json({ msg: 'Customer deleted successfully'});
                } else {
                    res.status(401).json({ msg: 'Customer is not deleted'});
                }
            })
        }
    })
    .catch((err) => {
        res.status(500).json({status: 'error', msg:' Internal server error'});
    })
})