var app = angular.module("tanchat",["ui.router"]);

var baseUrl = "http://localhost:3000/";
var io = io.connect(baseUrl);

app.config(function($stateProvider,$urlRouterProvider){
    
    var registration = {
        name : "registration",
        url : "/",
        templateUrl : baseUrl + "registration/registration.index.html"
    }
    var chat = {
        name : "chat",
        url : "/chat",
        templateUrl : baseUrl + "chat/chat.index.html"
    }

    $stateProvider.state(chat);
    $stateProvider.state(registration);


    $urlRouterProvider.otherwise('/');
})