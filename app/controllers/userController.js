const User = require('../models/UserModel');


module.exports = {
    create: (req,res) => {
        const newUser = User(req.body)
        console.log("🚀 ~ file: userController.js:7 ~ req.body:", req.body)

        newUser.save()
        console.log("🚀 ~ file: userController.js:10 ~ newUser:", newUser)
        .catch((err) => {
            // res.send(err)
            if (err.code === 11000) {
                // jak ten blad jeszcze raz renderujemy widok rejestracji
                // wrzucimy dane z powrotem do form jak?! ASK
                res.render('userViews/signupUser',{ 
                    // te pola z wartosciami wracaja do formularza przez render i widok?! ASK
                    error: true,
                    message: "User already exist",
                    user: req.body
                })
            }


        });

        // jak jest all ok:
        res.redirect('/blog');
        res.redirect('/blog');

    }
}
