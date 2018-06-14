var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var path = require('path');
var dbroutes = require('./routes/dbroutes');
var fileUpload = require('express-fileupload');

app.listen(4500,function(){
    console.log("Server is running on 450000...........")
})
app.get('/',function(req,res){
    //res.send("hi U r in Homepage or indexpage");
        res.sendFile(__dirname+"/public/views/index.html")
})
app.get('/home',function(req,res){
    //res.send("hi U r in Homepage or indexpage");
        res.sendFile(__dirname+"/public/views/index.html")
})
/* set static url */
app.use(express.static(__dirname+'/public/styles'));
app.use(express.static(__dirname+"/public/js"));
app.use(express.static(__dirname+"/resume"));
app.use(express.static(__dirname+"/bower_components"));
app.use(express.static(__dirname+"/public/amodule"));

/* routing url */
app.get('/aboutus',function(req,res){
    res.send("hi U r in aboutus page");
})
/* for parsing the incoming request */
app.use(bodyParser.urlencoded());
/* Parse the file that is uploaded  */
/* File Upload */
app.use(fileUpload());

app.use("/dbroutes",dbroutes);

/*-configuring view templates */
app.set('views',__dirname+'/public/templates');
app.set('view engine','ejs');

/* text file data  */

app.get('/restclient',function(req,res){
  res.sendFile(__dirname+"/public/views/angular.html")
});

/* database table  */

app.get('/table',function(req,res){
    fs.readFile('data/info.text',"utf8",function(err,obj){
            if(err){
                res.send("No Data Found")
            }else{
                let info = JSON.parse(obj);
                res.render("table",{data:info});

            }
    })
});


/* handling request */ 
app.post('/store',function(req,res){
    //console.log(req.files)
    if(req.files){
        let regexDoc =/\.(doc|docx|pdf)$/ ; 
        let regexImg =/\.(png|jpeg|jpg|gif)$/ ; 
        let filename = req.files.resume.name;
        if(regexImg.test(filename)){
                req.files.resume.mv("resume/"+filename,function(err){
                    if(err){
                        res.send("Resume not Store in Folder")
                        res.redirect('/');
                    }
                })
           // console.log("Right Upload");
            //res.send("Files is Supported")
        }else{
            res.send("Files is not supported")
            res.redirect('/');
            //console.log("wrong Files");
        }
        //console.log("insdie filesss ==> " + req.files.resume.name)
    }else{
        res.send("please upload files ")
        res.redirect('/');
    }

    var fname =req.body.fname;
    var lname =req.body.lname;
    var email =req.body.email;
    var resume =req.files.resume.name;
    var obj = {fname:fname,lname:lname,email:email,resume:resume};
   // console.log(obj2)
   // obj = JSON.stringify(obj2);
    //console.log(obj)
    fs.readFile("data/info.text","utf8",function(err,data){
       // console.log("data ==>> "+data)
        if(err){
           // console.log("inside errror " + err)
            res.send("error ...")
        }else{
          //  console.log("inside else ")
      
           var temp  = JSON.parse(data);
                temp.push(obj);
        temp = JSON.stringify(temp);
        //console.log(temp)
        fs.writeFile("data/info.text",temp,function(err){
            if(err){
            res.send("Data Not Stored");
        }else{
             res.redirect('/');
             //res.send("Data  Stored in file after");
        }
                
        })
        }
        
        

    })
    /*
    
     if(err){
            res.send("Data Not Stored before ");
        }else{
            var temmp = JSON.parse(data);
            temp.push(obj)
            temp = JSON.stringify(temp)
            fs.writeFile("data/info.txt",temp,function(err,data){
        if(err){
            res.send("Data Not Stored");
        }else{
            res.send("Data  Stored in file after");
        }
    })

            res.send("Data  Stored in file");
        }
        
        fs.appendFile("info.txt",obj,function(err,data){
        if(err){
            res.send("Data Not Stored");
        }else{
            res.send("Data  Stored in file");
        }
    })*/
})

/* handling request */ 
app.post('/storedata',function(req,res){
    //console.log(req.files)
    if(req.files){
        let regexDoc =/\.(doc|docx|pdf)$/ ; 
        let regexImg =/\.(png|jpeg|jpg|gif)$/ ; 
        let filename = req.files.resume2.name;
        if(regexImg.test(filename)){
                req.files.resume2.mv("resume/"+filename,function(err){
                    if(err){
                        res.send("Resume not Store in Folder")
                        res.redirect('/');
                    }
                })
           // console.log("Right Upload");
            //res.send("Files is Supported")
        }else{
            res.send("Files is not supported")
            res.redirect('/');
            //console.log("wrong Files");
        }
        //console.log("insdie filesss ==> " + req.files.resume.name)
    }else{
        res.send("please upload files ")
        res.redirect('/');
    }

    var sno =req.body.sno;
    var sname =req.body.sname;
    var city =req.body.city;
    var resume =req.files.resume2.name;
    var obj = {sno:sno,sname:sname,city:city,resume:resume2};
   // console.log(obj2)
   // obj = JSON.stringify(obj2);
    //console.log(obj)
    fs.readFile("data/infodata.text","utf8",function(err,data){
       // console.log("data ==>> "+data)
        if(err){
           // console.log("inside errror " + err)
            res.send("error ...")
        }else{
          //  console.log("inside else ")
      
           var temp  = JSON.parse(data);
                temp.push(obj);
        temp = JSON.stringify(temp);
        //console.log(temp)
        fs.writeFile("data/infodata.text",temp,function(err){
            if(err){
            res.send("Data Not Stored");
        }else{
             res.redirect('/');
             //res.send("Data  Stored in file after");
        }
                
        })
        }
        
        

    })
    /*
    
     if(err){
            res.send("Data Not Stored before ");
        }else{
            var temmp = JSON.parse(data);
            temp.push(obj)
            temp = JSON.stringify(temp)
            fs.writeFile("data/info.txt",temp,function(err,data){
        if(err){
            res.send("Data Not Stored");
        }else{
            res.send("Data  Stored in file after");
        }
    })

            res.send("Data  Stored in file");
        }
        
        fs.appendFile("info.txt",obj,function(err,data){
        if(err){
            res.send("Data Not Stored");
        }else{
            res.send("Data  Stored in file");
        }
    })*/
})

