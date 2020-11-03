// const { sequelize } = require("../indexdb");

const {DataTypes}=require("sequelize");
module.exports= function(sequelize){
    return sequelize.define(
        "users",{ 
            id:{ primaryKey:true,
                autoIncrement:true,
                type:DataTypes.INTEGER,


        },
         
            name:{
                allowNull:false,
                default:"name",
                type:DataTypes.STRING(100),
            },
           
            email:{
                allowNull:false,
                unique:true,
                type:DataTypes.STRING(100),

            },
            password:{
                allowNull:false,
                type:DataTypes.STRING(100),
            },
        },
        {timestamps:false}
   
    );
};