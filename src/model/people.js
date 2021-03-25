const mongoose = require('mongoose')


const peopleSchema = new mongoose.Schema({
})

//Here ww_peoples is the name of the collection present in iww_data

const People = mongoose.model('AnyNameDoesntMatter',peopleSchema,'www_person')

module.exports = People

