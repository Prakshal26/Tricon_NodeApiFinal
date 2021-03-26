const express = require('express')
const router = express.Router()

const Profile = require('../model/profile')
const sortAlphaNumeric = require('../utility/sortAlphaNumeric')


/*
    To enable Pagenation we need to pass some extra parameters such as limit and query from URL itself.
*/
router.get('/profile',async (req,res) =>{

    const notRequiredFields = {
        '_createdDate':0,
        '_modifiedDate':0,
        '_schemaVersion':0,
        'type':0,
        'version':0,
        'title':0,
        '_isSellable':0,
        'person.plainIndexedName':0,
        'availability':0,
        'sources':0
    }
    try {
        const profile = await Profile.find({"person.xmlId":req.query.id},notRequiredFields)
        res.json(profile)
    }catch(e) {
    console.log("exception " + e)
        res.status(500).send()
    }
})

router.get('/browse', async (req, res) =>{

    const requiredField = {
            'person.xmlId':1,
            'person.indexedName':1,
            'person.title':1,
            'person.givenName':1,
            'person.nationality':1,
            'person.profession':1,
            'person.presentPosition':1,
            'person.dead':1

    }

   try {
      const limit = parseInt(req.query.limit);
      const skip = parseInt(req.query.skip);

      if (req.query.letter =='') {
         var profile = await Profile.find({"person.plainIndexedName":/^[^A-Z].*/},requiredField).sort({'person.plainIndexedName':1}).skip(skip).limit(limit)
         profile = sortAlphaNumeric(profile)
         res.json(profile)
         //val = Object.keys(people).length
      } else {
         const letter = (req.query.letter).toUpperCase()
         let reg = `^${letter}.*`
         const profile = await Profile.find({"person.plainIndexedName":new RegExp(reg)},requiredField).sort({'person.plainIndexedName':1}).skip(skip).limit(limit)
         res.json(profile)
      }
   } catch(e) {
      console.log(e)
   }
})

module.exports = router