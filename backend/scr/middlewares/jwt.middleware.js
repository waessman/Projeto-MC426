const jwt = require("jsonwebtoken");


/* 
 * cria um JWT token usando user email
*/
function createJWT(user_email) {
  const privateKey = process.env.PRIVATE_KEY;
  return new Promise((resolve, reject) => {
    jwt.sign(user_email, privateKey, (err, token) => {
      if (err) reject(err)
      else {resolve(token);}
    });
  })
}


/* 
 * Check JWT token
 * @param {string} token
*/
const checkJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  const privateKey = process.env.PRIVATE_KEY;
  jwt.verify(token, privateKey, (err, userInfo) => {
    if (err) {
      console.log(err);
      res.status(401).json({
        msg: "Invalid Token",
      })
      return;
    }
    req.userInfo = userInfo;
    next();
  });
};


module.exports = {
  createJWT,
  checkJWT,
}