const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "Flower_Shop"
});

db.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log("MySQL Connected");
});

module.exports = db;