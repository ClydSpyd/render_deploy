const mongoose = require("mongoose");
const config = require("config");
// const db = process.env.MONGO_URI;
const db = config.get("mongoURI");

const connectDb = async() => {
    try {
        
        mongoose.connect( db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("MongoDB connected");

    } catch (err) {
        console.log(err.message);

        process.exit(1);
    }
}

module.exports = connectDb; 