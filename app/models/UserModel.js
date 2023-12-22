const mongoose = require('mongoose')

//import bcrypt
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const schema = new mongoose.Schema({ email: String, password: String });
// Tank bedzie szukany w tanks (małymi literami liczba mnoga)
// model kopije schema
// const Tank = schema.model('tank', schema);



const User = new mongoose.Schema(
    {
        name: {type: String, require: true, unique: true },
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },  
    {
        timestamps: true
    }
);

// w cb przekazujemy next czyli taka funkcja ktora pozwoli nam przejsc do własciwego kontrolera?
// User.pre('save', (next) => {
User.pre('save', function (next) {
    const user = this;
    // jesli gdzie nie zmienione hasło wyjdz i uruchom next
    if (!user.isModified('password')) {
        console.log('if',!user.isModified('password'));
        return next();
    } else {
        console.log('else',!user.isModified('password'));
        //cokolwiek innego biblioteka bcrypt i zasalanie sol
        // bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.genSalt(10, function (err,salt) {
            if (err) {
                res.send(err);
            } else {
                //odpowiadamy funkcja cb err albo hash
                bcrypt.hash(user.password, salt, (err, hash)=>{
                    if (err) {
                        res.send(err);
                    } else {
                        user.password = hash;
                        next();
                    }
                })
            }
            
        })
    }
});
// powiazanie tokena z id user na ktorym wywolamy
User.methods.generateAuthTokenMy = (user) => {
            const token = jwt.sign({_id: user._id} , "secretKey", {expiresIn: "1h"})
            return token;
}

module.exports = mongoose.model('User', User);


