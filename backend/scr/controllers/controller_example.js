const exampleModel = require('../models/model_example');

/* 
 * Return a json file with the message example
 * params: req and res
 * return: status {200: message}
*/
async function msgExample(req, res){
    const message = await exampleModel.example();
    console.log(message);
    return res.status(200).json({"msg": message});
     
}

module.exports = {
    msgExample,
  };