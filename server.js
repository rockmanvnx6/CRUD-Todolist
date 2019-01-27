const express = require('express');
const bodyParser = require("body-parser")
const app = express();
const MongoClient = require("mongodb").MongoClient

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + '/public'))
app.set('view engine', 'ejs');
app.use(bodyParser.json());
MongoClient.connect("mongodb://guess:a123456@ds059682.mlab.com:59682/todolist3345", (err,database) => {
    if(err) console.log(err);
    db = database.db('todolist3345')

    app.listen(3000 ,function () {
        console.log("running on port 3000")
    })


    app.get("/", (req,res) => {
        db.collection("todo").find().toArray((err,result) => {
            res.render("index.ejs", {todo: result})
        });
    })


    app.post("/todo", (req,res) => {
        db.collection("todo").save(req.body, (err, result) => {
            if(err) console.log(err);
            res.redirect('/');
        })
    })

    app.delete("/delete", (req,res) => {
        let item = req.body.value;
        db.collection("todo").findOneAndDelete({task: item}, (err, result) => {
            if(err) {
                console.log(err) 
            }
        });
    })
})

