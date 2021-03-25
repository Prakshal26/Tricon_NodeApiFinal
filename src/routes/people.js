const express = require('express')
const router = express.Router()

const People = require('../model/people')


/*
    To enable Pagenation we need to pass some extra parameters such as limit and query from URL itself.
*/
router.get('/profile',async (req,res) =>{
    try {
        const people = await People.find({"person.xmlId":req.query.id},{person:1})
        res.json(people)
    }catch(e) {
    console.log("exception " + e)
        res.status(500).send()
    }
})

router.get('/browse', async (req, res) =>{

   try {
      const limit = parseInt(req.query.limit);
      const skip = parseInt(req.query.skip);
      if (req.query.letter =='') {
         const people = await People.find({"person.plainIndexedName":/^[^A-Z].*/},{"person":1}).sort('person.plainIndexedName').skip(skip).limit(limit)
         res.json(people)
         //val = Object.keys(people).length
      } else {
         const letter = (req.query.letter).toUpperCase()
         let reg = `^${letter}.*`
         const people = await People.find({"person.plainIndexedName":new RegExp(reg)},{"person":1,}).sort("person.plainIndexedName").skip(skip).limit(limit)
         res.json(people)
      }
   } catch(e) {
      console.log(e)
   }
})

module.exports = router