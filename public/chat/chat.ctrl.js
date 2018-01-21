app.controller("chatCtrl",function($http,$state,$scope){
    
    var cc = this;
    cc.user = sessionStorage.getItem("user");
    cc.userList = [];
    cc.chatList = [];
    // cc.pChatList = [{
    //     id:1
    // },{
    //     id:2
    // }];
    if(!cc.user){
        $state.go("registration");
    }

    cc.text = "";
    cc.lockText = false;

    cc.sendText = function(ev){
        if(ev.keyCode == "13" && cc.text){  
            cc.lockText = true;
            $http({
                url : baseUrl + 'chat/notify',
                method : 'POST',
                data : {
                    user : cc.user,
                    text : cc.text
                }
            }).success(function(data,status,headers,config){
                cc.text = "";
                cc.lockText = false;
                setTimeout(function(){
                    document.getElementById("text").focus();
                },100);                
            }).error(function(data,status,headers,config){
                sessionStorage.clear();
                $state.go("registration");
            });
        }
    }

    cc.getUsers = function(){
        $http({
            url : baseUrl + 'chat/users',
            method : 'POST',
            data : {
                user : cc.user
            }
        }).success(function(data,status,headers,config){
            cc.userList = data;
            cc.userList.splice(cc.userList.indexOf(cc.user),1);
        }).error(function(data,status,headers,config){
            sessionStorage.clear();
            $state.go("registration");
        });
    }

    cc.logOut = function(){
        $http({
            url : baseUrl + 'registration/logout',
            method : 'POST',
            data : {
                user : cc.user
            }
        }).success(function(data,status,headers,config){
            sessionStorage.clear();
            $state.go("registration");
        }).error(function(data,status,headers,config){
            sessionStorage.clear();
            $state.go("registration");
        });
    }

    io.on("new_user",function(data){
        console.log(data);
        cc.getUsers();
    })

    io.on("notification",function(data){
        if(data.user == cc.user){
            data.self = true;
        }
        cc.chatList.push(data);
        $scope.$apply();
        var chatBox = document.getElementById("chatBox");        
        chatBox.scrollTop = chatBox.scrollHeight;
    })
})