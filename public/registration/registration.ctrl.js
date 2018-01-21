app.controller("registrationCtrl",function($http,$state){
    var rc = this;

    rc.lockUsername = false;
    rc.errorMessage = "";
    rc.errorClass = "";
    rc.username = "";

    rc.user = sessionStorage.getItem("user");

    if(rc.user){
        $state.go("chat");
    }

    rc.checkUsername = function(ev){
        if(ev.keyCode == "13"){
            rc.lockUsername = true;
            $http({
                url : baseUrl + 'registration/login',
                method : 'POST',
                data : {
                    user : rc.username
                }
            }).success(function(data,status,headers,config){
                console.log(data);
                sessionStorage.setItem("user",data.user);
                rc.errorMessage = data.message;
                rc.errorClass = "error-success";
                setTimeout(function(){
                    $state.go('chat');
                },2000);                
            }).error(function(data,status,headers,config){
                console.log(data);
                rc.errorMessage = data.message;
                rc.errorClass = "error-failure";
                rc.lockUsername = false;
            });
        }
    }
});