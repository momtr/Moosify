/**
 * checks 
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description checks for access 
 */


const check = (req, res, next) => {
    console.log("Request URL: ", req.url);
    console.log("-----------------------------------------------------------------------------------------------------------------------")
    console.log("Next object: ", next);
    if(req.cookies.access_token || req.url === "" || req.url.includes("/auth")){
         /*  access granted  */
            next();
    }
    else{
        /*   access denied   */
            res.redirect('/');
    }
}

module.exports = check;