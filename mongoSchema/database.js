const mongoose = require("mongoose");
 class Database {
    constructor() {
        this.connection();
    }

    async connection() {
        mongoose.set('strictQuery', false);
        try {
            const uri = "mongodb+srv://aksn0204:N4zfZ7Ka4xGK7xQ4@cluster0.kj8m61g.mongodb.net/booksitedata";
            await mongoose.connect(uri);
            console.log("connected to mongodb");
        }
        catch (error) {
            console.log(error);
        }

    }
}
module.exports = new Database();