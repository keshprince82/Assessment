const { sequelize } = require("../database/indexdb");
const md5 = require("md5");
const jwt= require("jsonwebtoken")

const passport = require("passport");


const SIGNING_KEY="princekey";

function generateJWT(payload) {
    return jwt.sign(payload, SIGNING_KEY, { expiresIn: "1d" });
  }

function authInit(app) {
  app.post("/AUTH/LOGIN", async function (request, response) {
    const { email, password } = request.body;
    console.log(typeof(email));
    const user = await sequelize.models.users.findOne({ where: { email } });

    if (!user || user.password !== md5(password)) {
      response.status(401).send({ message: "Either username or password is incorrect" });
    }

    const jwt = generateJWT(JSON.parse(JSON.stringify(user)));

    response.status(200).send({ token: jwt });
  });
//   Passport provides an authenticate() function, which is used as route middleware to authenticate requests.

}







module.exports={
    authInit,
    SIGNING_KEY
}