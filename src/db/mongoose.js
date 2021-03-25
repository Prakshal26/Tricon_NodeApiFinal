const mongoose = require('mongoose')


const connectionURL = 'mongodb://127.0.0.1:27017/EuropaCollectionsNewXML'

mongoose.connect(connectionURL, {userNewUrlParser:true})

const connection = mongoose.connection

connection.on('open',()=>{
    console.log('connected...')
})
