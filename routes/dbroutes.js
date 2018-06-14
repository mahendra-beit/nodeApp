var express = require('express');
var route = express.Router();
var tasks = require('../database/tasks');
route.get("/person",function(req,res){
        tasks.getAll(function(err,data){
            if(err){
                res.render("table2",{data:[]});
            }else{
                 res.render("table2",{data:data});
            }
        });       
});

route.post("/addperson",function(req,res){
        let person = {
            sno:req.body.sno,
            name:req.body.name,
            city:req.body.city
        }
       // console.log(person)
       // console.log("asddasdasd")
        tasks.addPerson(person,function(err,data){
            
            if(err){                
                res.send("Data Not Insert");                
            }else{                
                 //res.send("Data Inserted");
                  res.redirect('/');
            }
        });
          
});
module.exports = route;