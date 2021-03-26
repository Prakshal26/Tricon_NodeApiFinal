
var exp1 = new RegExp(`^[0-9].*`)
var exp2 = new RegExp(`^[^0-9].*`)

var so_UnitKeywordIndicator = [exp1, exp2];

function getSortingKey(value) {
  if (exp1.test(value)) {
    return 1;
  }
  if (exp2.test(value)) {
    return 2;
  }
  return 3;
}

function compare(a,b) {
    return getSortingKey(a.person.indexedName)-getSortingKey(b.person.indexedName)
}

const sortAlphaNumeric = (profile) =>{
    profile = JSON.parse(JSON.stringify(profile))

    profile.sort(compare)
    return profile

}

module.exports = sortAlphaNumeric
