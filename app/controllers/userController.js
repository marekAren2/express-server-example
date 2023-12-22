const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

module.exports = {
    create: (req,res) => {
            const newUser = User(req.body);
            console.log("🚀 ~ file: userController.js:7 ~ req.body:", req.body);
            newUser.save()
        .then (() => {
            console.log("🚀 ~ file: userController.js:10 ~ newUser:", newUser);
            res.redirect('/blog')
        })

        .catch((err) => {
            // res.send(err)
            if (err.code === 11000) {
                // jak ten blad jeszcze raz renderujemy widok rejestracji
                // wrzucimy dane z powrotem do form jak?! ASK
                res.render('userViews/signupUser',{ 
                    // te pola z wartosciami wracaja do formularza przez render i widok?! ASK
                    error: true,
                    message: "User already exist",
                    user: req.body, 
                })
            }


        });

        // jak jest all ok:
        //res.redirect('/blog');
        

    },

    login: (req, res) => {
        User.findOne({email: req.body.email})
        .then ((user)=>{
            console.log("🚀 ~ file: userController.js:39 ~ req.body.email:", req.body.email);
            console.log("user--", user);
            // !(jesli nie istnieje) = true wracamy z danymi do poprawy i info
            if (!user) {
                res.render('userViews/loginUser', {
                    error: true,
                    message: "That user not exist",
                    user: req.body
                })
              return;
            } 

            // porownanie deszyfrujace
            bcrypt.compare(req.body.password, user.password, (err, logged) => {
                // res.send(logged);
                console.log("🚀 ~ file: userController.js:54 ~ bcrypt.compare ~ logged:", logged)

                if(err) {
                    res.render('userViews/loginUser', {
                        error: true,
                        message: "Login error",
                        // czyszcze wpisy jak zle haslo
                        user: {email: req.body.email, password: ""},        
                    });
                  return;
                }

                    if(logged) {
                        // res.send('udalo sie zalogowac')
                        // tu token zafalszowac moge do testu
                        const token = user.generateAuthTokenMy(user);
                        res.cookie('AuthToken', token);
                        // na razie tylko redirect
                        res.redirect('/blog')

                    } else {
                        // jesli log nie udane, password not match
                        
                        res.render('userViews/loginUser', {
                            error: true,
                            message: "Login data do not match",
                            // czyszcze wpisy jak zle haslo
                            user: {email: req.body.email, password: ""},        
                        });
                      return;
                    }
            });
        })
        .catch((err)=>{
            res.send(err)
        });
    },
};
