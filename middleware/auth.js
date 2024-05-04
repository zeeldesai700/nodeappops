// require token library
const jwttoken = require('jsonwebtoken');

const isAuth = ((req,res,next) => {
    let getToken = req.get('Authorization');
    if(getToken) {
        getToken = getToken.split(' ')[1];
        // token verification
        let token = jwttoken.verify(getToken, 'zeelpatel');
        if(token) {
            req.jwttoken = token.uniq;
            next();
        } else {
            res.status(401).json({ msg: 'Authorization token is invalid' });
        }
    } else {
        res.status(401).json({ msg: 'Authorization token is missing' });
    }
})
module.exports = isAuth;