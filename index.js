import express from "express"

import mysql2 from "mysql2"


const app = express();
app.use(express.json());

const db = mysql2.createConnection({
    host: "localhost",
    user:"root",
    password:"tnt69ddt4",
    database:"test" 
})

app.get("/",(req,res)=>{
    res.json("Welcome to the nest")
})


app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)    
    })
})
app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`tittle`,`desc`,`cover`) VALUES (?)"
    const values = [
        req.body.tittle,
        req.body.desc,
        req.body.cover,
    ]
    db.query(q,[values],(err,data)=>{
      if (err) return res.json(err);
      return res.json("created successfully");  
    })
})

app.listen(8000,()=>{
    console.log("connected to backend")
})