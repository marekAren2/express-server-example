const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

module.expots = (req, res, next) => {

    // odczytanie tokena
    const token = req.cookies('AuthToken')
    console.log(token);

    if (token) {
        // chrome x
        // next();
        // nie sprawdza procz ze istnieje
            try {
                const verified = jwt.verify(token, 'secretKey')
                console.log("🚀 ~ file: authMiddleware.js:15 ~ verified:", verified)
                
                User.findById(verified._id).then((user)=>{
                    res.locals.userId = user._id;
                    res.locals.userName = user.name;
                    next();
                })
                .catch((err)=>{
                    res.send(err)
                })
            }
            catch {
                res.redirect('/user/login?loginRedirect=true')        
            }

    } else {
        res.redirect('/user/login?loginRedirect=true')
    }
}