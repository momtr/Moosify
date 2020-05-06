/**
 * checks 
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description checks for access 
 */


const check = (req, res, next) => {
    if(req.cookies.access_token || req.url === "/" || req.url === "/auth/redirect"){
         /*  access granted  */
            next();
    }
    else{
        /*   access denied   */
            res.redirect('/');
    }
}

module.exports = check;