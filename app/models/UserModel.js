const mongoose = require('mongoose')


// const schema = new mongoose.Schema({ email: String, password: String });
// Tank bedzie szukany w tanks (małymi literami liczba mnoga)
// model kopije schema
// const Tank = schema.model('tank', schema);



const User = new mongoose.Schema({
    name: {type: String, require: true, unique: true },
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    },  {
        timestamps: true
     
    }
);

module.exports = mongoose.model('User', User);


