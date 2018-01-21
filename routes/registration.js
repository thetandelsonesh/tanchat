const express = require("express");

var router = express.Router();

router.post("/login",(req,res)=>{
    var users = req.app.get("users");
    var user = req.body.user.toLowerCase();
    if(users.indexOf(user) == -1){
        users.push(req.body.user);
        var data = {
            user : user,
            message : "User Registered Successfully!"
        }
        res.status(200).send(data);
        req.app.get("io").emit("new_user",user);
    }else{
        var data = {
            user : user,
            message : "Username already in use. Please select other Username!"
        }
        res.status(401).send(data);
    }    
    
});

router.post("/logout",(req,res)=>{
    var users = req.app.get("users");
    var user = req.body.user;
    users.splice(users.indexOf(user),1);
    res.status(200).send(users);
    req.app.get("io").emit("new_user",user);
});


module.exports = router;