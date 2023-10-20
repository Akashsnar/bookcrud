const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    booktitle: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    category: {
        type: String
    }
},
    { timestamps: true }
);


const Book = model("book", BookSchema);

module.exports = Book;