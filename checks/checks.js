/**
 * checks 
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description checks for access 
 */

const check = (req, res, next) => {
    if(req.cookies.access_token == undefined && req.url != '/'){
        console.log('endpoint', req.url);
        res.redirect('/');
    }
    else{
        next();
    }
}

module.exports = check;