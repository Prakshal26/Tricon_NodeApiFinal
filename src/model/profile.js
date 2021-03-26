const mongoose = require('mongoose')


const profileSchema = new mongoose.Schema({
})

//Here ww_peoples is the name of the collection present in iww_data

const profile = mongoose.model('AnyNameDoesntMatter',profileSchema,'www_person')

module.exports = profile

