
module.exports=(sequelize,DataTypes)=>{

    const User=sequelize.define("userDetails",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        
        },
        name:{
            type:DataTypes.STRING
            
        },
        email:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        tc:{
            type:DataTypes.BOOLEAN
        }
    },{
        tableName:"userDetails",
        timestamps:false
    });


    return User

}