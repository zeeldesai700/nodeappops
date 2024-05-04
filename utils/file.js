const fs = require('fs');

exports.deletefile = (filepath) => {
    fs.unlink(filepath, (err) => {
        console.log(err);
    });
}