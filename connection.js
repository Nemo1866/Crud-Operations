require("dotenv").config()
const mysql=require("mysql2")



const mySqlConnection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})
mySqlConnection.connect((err)=>{
    if(err){
        console.log("DB is not connected some error occurred "+JSON.stringify(err,undefined,2))
    }else{
        console.log("DB is connected Succesfully");
    }
})
module.exports=mySqlConnection