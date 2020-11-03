const md5 = require('md5');
const {sequelize}= require ("../database/indexdb");



function controllerInit(app) {
  app.get("/user", async function (request, response) {
    const users = await sequelize.models.users.findAll({});
    response.status(200).send(users); 
  });
 
  app.post("/auth/signup", async function (request, response) {
    const { body } = request;
    const { name, email, password } = body;

    const newUser = await sequelize.models.users.create({
      name,
      
      email,
      password: md5(password),
    });
    response.status(201).send({newUser});
    }
  );
}
module.exports = {
    controllerInit
  };
