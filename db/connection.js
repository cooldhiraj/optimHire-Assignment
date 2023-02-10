const mongoose = require('mongoose');

(async function(){
    mongoose.set("strictQuery", false);
    await mongoose.connect('mongodb+srv://dhirajkahar:admin@cluster0.v0xjoxt.mongodb.net/optim').catch(err => {
        console.log("Error while DB connection")
    })
    console.log('DB connected')
})()