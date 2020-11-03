const {DataTypes}=require("sequelize");

module.exports= function(sequelize){
    return sequelize.define(
        "blogs",{ 
            id:{ primaryKey:true,
                autoIncrement:true,
                type:DataTypes.INTEGER,


        },
         
            blogtitle:{
                allowNull:false,
                default:"name",
                type:DataTypes.STRING(100),
            },
           
            blog:{
                allowNull:false,
               
                type:DataTypes.STRING(100),

            },
           
        },
        {timestamps:false}
   
    );
};