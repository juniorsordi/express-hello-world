'use strict';
var app = angular.module('app', [
    'ngAnimate',
    'ngSanitize'
    , 'pascalprecht.translate'
]);
///######################################################################
function goto(path) {
    location.href = "#!" + path;
}
///######################################################################
///////////////////////////////////////////////////////////////////
app.config(function ($controllerProvider) {
    app.controller = $controllerProvider.register;
});
///////////////////////////////////////////////////////////////////
///#####################################################################################################
app.controller("LoginCtrl", function ($scope, $rootScope, $http, RestService, $location) {
    $scope.user = {};
    $scope.form = {};

    $scope.versao = "1.0";

    $scope.SignInGoogle = function () {
        
    }

    $scope.handleCredentialResponse = function(response) {
        console.log(response);
        var token = response.credential;
        var tokens = response.credential.split(".");
        var payload = JSON.parse(atob(tokens[1]));
        console.log(`user id ${payload.sub}`);
        console.log(`user name ${payload.name}`);
        console.log(`user picture ${payload.picture}`);
        console.log(payload);
        RestService.postData("/../auth/user", payload, function(resp) {
            //*
            console.log(resp.data);
            if (resp.data.success) {
                //localStorage.setItem("user", JSON.stringify(resp.data));
                sessionStorage.setItem("user", JSON.stringify(resp.data));
                location.href = "./";
            } else {
                //alert(resp.data.msg);
            }
            //*/
        })
    }

    $scope.SignIn = function (event) {
        $http.post("/../api/auth/login", $scope.user).then(function(resp) {
            if (resp.data.success) {
                //localStorage.setItem("user", JSON.stringify(resp.data));
                sessionStorage.setItem("user", JSON.stringify(resp.data));
                location.href = "./";
            } else {
                alert(resp.data.msg);
            }
        })
        /*
        RestService.postData("/../auth/login", $scope.user, function (resp) {
            if (resp.data.success) {
                //localStorage.setItem("user", JSON.stringify(resp.data));
                sessionStorage.setItem("user", JSON.stringify(resp.data));
                location.href = "./";
            } else {
                alert(resp.data.msg);
            }
        });
        //*/
    }

    $scope.criarConta = function () {
        RestService.postData("/../auth/user/new", $scope.user, function (resp) {
            if (resp.data.success) {
                //localStorage.setItem("user", JSON.stringify(resp.data));
                sessionStorage.setItem("user", JSON.stringify(resp.data));
                location.href = "./";
            } else {
                alert(resp.data.msg);
            }
        });
    }

});
///#####################################################################################################