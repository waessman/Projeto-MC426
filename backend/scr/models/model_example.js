
/* 
 * Return a messagem and a random string (Just an exemple of a model)
 * @param 
 * @return string
*/
async function example(){
    const db = await require('../configs/db.configs'); //connection with mongodb
    const crypto = require('crypto');
    const randomString = crypto.randomBytes(6).toString('hex');
    return('All is OK: '+randomString)

}

module.exports = {
  example,
}