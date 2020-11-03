var express = require("express");
const {databaseInit}=require ("./database/indexdb");
const {controllerInit}=require("./controller/controlUser");
const {authInit}=require("./controller/authuser");
const {blogInit}=require("./controller/authblog")
const passport = require("passport");
const SIGNING_KEY= require("./controller/authuser")
const {sequelize}=require("./database/indexdb")



var app = express();
 var port=4000;





var JwtStrategy = require('passport-jwt').Strategy,ExtractJwt = require('passport-jwt').ExtractJwt;
opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= SIGNING_KEY;




app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


   passport.use(
    new JwtStrategy(opts, async function (payload, done) {
      const user = await sequelize.models.users.findOne({ id: payload.id });
  
      if (!user) {
        done(null, false);
      }
  
      done(null, user);
    })
  );

   databaseInit().then(console.log).catch(console.log);

   controllerInit(app);
   authInit(app);
   blogInit(app);



app.listen(port, () => {
 console.log(`port is running at ${port}`);
});