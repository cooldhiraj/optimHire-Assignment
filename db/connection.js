const mongoose = require('mongoose');

(async function(){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.db_url).catch(err => {
        console.log("Error while DB connection")
    })
    console.log('DB connected')
})()