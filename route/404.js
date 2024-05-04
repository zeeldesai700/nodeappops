const route = require('express').Router();

// 404 Route
route.use('/',(req,res) => {
    res.send(404).json({msg: 'Page not found'});
})
module.exports = route;