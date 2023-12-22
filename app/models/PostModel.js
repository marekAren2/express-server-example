const mongoose = require('mongoose');
// _id tworzone automatycznie i timestamp (znacznik czasu)
const Post = new mongoose.Schema({
    title: String,
    content: String,
    // author: String,
    author: {
        // to referuje wprost do tych identyfikatorow z bazy
        type: mongoose.Schema.Types.ObjectId,
        //referuje do naszego modelu zdefiniowanego w userModel.js
        ref: 'User'
    },
},
{timestamps: true}
);

// inny rodzaj export-u? bez klamry? czy wtedy tez mozna dla 1 funkcji?
// konwersja na model wg dokumentacji czy export?
module.exports = mongoose.model('Post', Post)

