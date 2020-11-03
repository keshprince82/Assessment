// var express=require("express");
const {Sequelize,DataTypes}=require("sequelize");
require('dotenv').config()
const sequelize= new Sequelize({
    dialect:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:123,
    database:"postgres"
});
const users=require("./model/users")(sequelize);
const blogs=require("./model/blog")(sequelize);



const databaseInit= async function(){
    try{
        await sequelize.authenticate();
        await sequelize.sync({alter:true})
    }catch(error){
        console.log("database>initt>error "),error
    }
 

};
module.exports={
    DataTypes,
    databaseInit,
    users,
    blogs,
    sequelize
}




