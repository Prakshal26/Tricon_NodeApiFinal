const express = require('express')
require('./db/mongoose')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())


const peopleRoute = require('./routes/people')

const port = process.env.PORT || 3000

app.use(peopleRoute)

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})
