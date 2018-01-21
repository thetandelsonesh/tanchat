const express = require("express");

var router = express.Router();

var authenticate = function(req,res,next){
    var users = req.app.get("users");
    var user = req.body.user;
    if(users.indexOf(user) != -1){
        next();
    }else{
        res.status(400).send("Authentication Failed!")
        return;
    }
}

router.post("/users",authenticate,(req,res)=>{
    var users = req.app.get("users");
    res.status(200).send(users);
});

router.post("/notify",authenticate,(req,res)=>{
    var data = {
        user : req.body.user,
        text : req.body.text
    }
    req.app.get("io").emit("notification",data);
    res.status(200).send(data);
});

module.exports = router;