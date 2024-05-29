import express from "express"//in the package.json file just "type" :"module" for got this import

import mysql2 from "mysql2"

import cors from "cors"






const app = express();
app.use(express.json());//use this in express server for working with json file
app.use(cors());
const db = mysql2.createConnection({
    host: "localhost",
    user:"root",                       // DATABASE connection with my sql 
    password:"tnt69ddt4",
    database:"test"                 //same as db file name
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
    const q = "INSERT INTO books (`tittle`,`desc`,`cover`,`price`) VALUES (?)"
    const values = [
        req.body.tittle,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ]
    db.query(q,[values],(err,data)=>{
      if (err) return res.json(err);
      return res.json("created successfully");  
    })
})
app.delete("/books/:id",(req,res)=>{
    const bookID = req.params.id;
    const q = "DELETE from books WHERE id = ?";


    db.query(q,[bookID],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Deleted Successfully");
    })
})


app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `tittle`= ?,`desc` = ?, `cover` = ? , `price` = ? WHERE id =?";

    const values = [
        req.body.tittle,
        req.body.cover,
        req.body.desc,
        req.body.price
    ];


    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Updated successfully");
    })
})

app.listen(8000,()=>{
    console.log("connected to backend")
})