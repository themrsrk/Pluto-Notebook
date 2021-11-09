const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/plutoNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongoose successfully!!");
    })
}

module.exports = connectToMongo;