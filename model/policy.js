const mongoose = require('mongoose')
const { Schema } = mongoose;
const options = {
    dob:  String,
    gender: String,
    sumAssured: String,
    modalPremium: String,
    premiumFrequency: String,
    pt: String,
    ppt: String
}
const policySchema = new Schema(options);

module.exports.Policy = mongoose.model('Policy', policySchema);