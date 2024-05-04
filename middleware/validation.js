// Require validation

const { body, validationResult } = require('express-validator');

// gender validation
const genderv = ((data) => {
    data = data.toUpperCase();
    if(data == 'M' || data == 'F' || data == 'O') {
        return true;
    } else {
        return false;
    }
})

const mimetype = ((data) => {
    console.log(data);
})

// Sign up validations
const signupV = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    // body('name').trim().notEmpty().withMessage('Name is required').not().isAlphanumeric().withMessage('Name must be alhpanumeric'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter email is invalid'),
    body('password').trim().notEmpty().withMessage('Password is required').isStrongPassword().withMessage('Password must be have one capital, small, special character and length must be 8 charater'),
    body('phone').trim().notEmpty().withMessage('Phonenumber is required').isNumeric().withMessage('Phonenumber must be numeric').isLength({min:10, max:10}).withMessage('Phonenumer must me 10 digits'),
    body('gender').custom(genderv).withMessage('Gender must be from M,F,O'),
    body('address').trim().isLength({max:255}).withMessage('Address must be upto 255 character'),
    // body('profile').custom(mimetype).withMessage('file must be'),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            // Image validations
            if(req.pdffile === true) {
                returnerr.push('Profile photo formate must me png, jpeg or jpeg');
            }
            const returnerr = errors.array().map(err=>(err.msg));

            res.status(400).json({ errors: returnerr});
        } else {
            next();
        }
    }
]

// Login validations
const loginV = [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter email is invalid'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const returnerr = errors.array().map(err=>(err.msg));
            res.status(400).json({ errors: returnerr});
        }
        next();
    }
]
module.exports.signupV = signupV;
module.exports.loginV = loginV;