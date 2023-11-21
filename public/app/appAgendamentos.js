'use strict';
var app = angular.module('app', [
    'ngRoute'
    ,'ngAnimate'
    ,'ngSanitize'
    , 'ui.bootstrap'
    , 'mgcrea.ngStrap'
    , 'pascalprecht.translate'
    , 'ui.utils.masks'
    //, "textAngular"
    , 'ui.tinymce'
    , "oc.lazyLoad"
]);
///////////////////////////////////////////////////////////////////
app.config(function ($controllerProvider) {
    app.controller = $controllerProvider.register;
});
///////////////////////////////////////////////////////////////////
///#####################################################################################################
///#####################################################################################################
app.factory("tokenInterceptor", ["$window", "$location", function ($window, $location) {
    return {
        request: function (config) {
            var token = JSON.parse(localStorage.getItem("user")).token;
            if (token && !config.noAuth) {
                config.headers['x-access-token'] = token;
            }

            return config;
        },
        response: function (response) {
            return response;
        }
    };
}]);
///#####################################################################################################
app.factory('loadingInterceptor', function ($rootScope, $q) {
    return {
        request: function (config) {
            $rootScope.stackDeCarga = $rootScope.stackDeCarga + 1;
            $rootScope.carregando = !config.ignoreLoading;
            return config;
        },
        response: function (response) {
            $rootScope.stackDeCarga = $rootScope.stackDeCarga - 1;
            if ($rootScope.stackDeCarga == 0) {
                $rootScope.carregando = false;
            }
            return response;
        },
        responseError: function (rejection) {
            $rootScope.stackDeCarga = $rootScope.stackDeCarga - 1;
            $rootScope.carregando = false;
            return $q.reject(rejection);
        }
    };
});
///#####################################################################################################
app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("tokenInterceptor");
    //$httpProvider.interceptors.push("authenticationInterceptor");
    //$httpProvider.interceptors.push("responseErrorInterceptor");
    $httpProvider.interceptors.push('loadingInterceptor');
}]);
///#####################################################################################################
app.run(function ($rootScope, $route, $http, $routeParams) {
    $rootScope.carregando = false;
    $rootScope.stackDeCarga = 0;
});
///#####################################################################################################
///#####################################################################################################
function toggleNavBar() {
    $("#navbarVerticalCollapse").toggleClass('show');
}

///#####################################################################################################
var date = new Date().getTime().toString();
app.config(function ($routeProvider, $locationProvider, $ocLazyLoadProvider) {
    $routeProvider
        .when('/',              { templateUrl: 'app/views/Agendamentos/ideia1.html', title: '' })
        //.when('/login',     { templateUrl: 'app/views/login.html', title: '', controller: 'LoginCtrl' })
        //.when('/registro',  { templateUrl: 'app/views/register.html', title: '', controller: 'LoginCtrl' })
        .when('/home',          { templateUrl: 'app/views/Agendamentos/home.html', title: '' })
        .when('/perfil',        { templateUrl: 'app/views/Agendamentos/usuario/perfil.html', title: '', controller: 'PerfilCtrl' })
        .when('/dash',          { templateUrl: 'app/views/Agendamentos/dashboard.html', title: '' })

        .when('/prestador/:id',             { templateUrl: 'app/views/Agendamentos/usuario/view_prestador.html'+'?t='+ date, title: '' })
        .when('/usuario/agenda',            { templateUrl: 'app/views/Agendamentos/usuario/agenda.html' + '?t=' + date, title: '', controller: 'AgendamentoCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Agendamento', files: ['app/controllers/AgendamentoCtrl.js'] }]); }]} })
        .when('/usuario/agendamento',       { templateUrl: 'app/views/Agendamentos/usuario/add_agendamento.html' + '?t=' + date, title: '', controller: 'AgendamentoCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Agendamento', files: ['app/controllers/AgendamentoCtrl.js'] }]); }]} })
        .when('/usuario/historico',         { templateUrl: 'app/views/Agendamentos/usuario/historico.html' + '?t=' + date, title: '' })

        .when('/pro/financeiro',            { templateUrl: 'app/views/Agendamentos/profissional/listagem_receitas.html' + '?t=' + date, title: '', controller: 'ProfissionalCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Profissional', files: ['app/controllers/ProfissionalCtrl.js'] }]); }]} })
        .when('/pro/agenda_dia',            { templateUrl: 'app/views/Agendamentos/profissional/lista_agendamentos_dia.html' + '?t=' + date, title: '', controller: 'ProfissionalCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Profissional', files: ['app/controllers/ProfissionalCtrl.js'] }]); }]} })
        .when('/pro/apontamento/:id',       { templateUrl: 'app/views/Agendamentos/profissional/view_agendamento.html' + '?t=' + date, title: '', controller: 'ProfissionalCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Profissional', files: ['app/controllers/ProfissionalCtrl.js'] }]); }]} })

        .when('/perfil_profissional',       { templateUrl: 'app/views/Agendamentos/profissional/prestador_perfil.html'+'?t='+ date, title: '', controller: 'PerfilProfCtrl' })
        .when('/sistema/cadastro',          { templateUrl: 'app/views/Agendamentos/profissional/cad_prestador.html'+'?t='+ date, title: '', controller: 'SistemaCtrl' })

        .when('/admin/financeiro',          { templateUrl: 'app/views/Agendamentos/financeiro/entrada.html'+'?t='+ date, title: '', controller: 'FinanceiroCtrl' })
        
        .when('/gyms',                      { templateUrl: 'app/views/Agendamentos/Gym/gyms.html'+'?t='+ date, title: '', controller: 'GymCtrl' })
        .when('/gym/:id',                   { templateUrl: 'app/views/Agendamentos/Gym/dashboard.html'+'?t='+ date, title: '', controller: 'GymCtrl' })
        .when('/gym/treinos',               { templateUrl: 'app/views/Agendamentos/Gym/treinoUsuario.html'+'?t='+ date, title: '', controller: 'GymCtrl' })

        .when('/configs',                   { templateUrl: 'app/views/Agendamentos/sistema/configuracoes.html'+'?t='+ date, title: '', controller: 'SistemaCtrl' })
        .when('/plans',                     { templateUrl: 'app/views/Agendamentos/sistema/planos.html'+'?t='+ date, title: '', controller: 'SistemaCtrl' })
        .when('/plans/substription',        { templateUrl: 'app/views/Agendamentos/sistema/subscription.html'+'?t='+ date, title: '', controller: 'SistemaCtrl' })
        .when('/plans/accepted',            { templateUrl: 'app/views/Agendamentos/sistema/plans/acceptedPlan.html'+'?t='+ date, title: '', controller: 'SistemaCtrl' })
        .otherwise({ templateUrl: 'app/views/Sistema/Erro_404.html' });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
});
///#####################################################################################################
const firebaseConfig = {
    apiKey: "AIzaSyCDaqxp-RptjRy39VvAGA4Xi00OvRlASXE",
    authDomain: "site1-a8db9.firebaseapp.com",
    databaseURL: "https://site1-a8db9-default-rtdb.firebaseio.com",
    projectId: "site1-a8db9",
    storageBucket: "site1-a8db9.appspot.com",
    messagingSenderId: "19651513943",
    appId: "1:19651513943:web:8a7a37301ae85ea9b05d12",
    measurementId: "G-V7D4H1DR4G"
};
///#####################################################################################################
let editor;
app.directive("ckeditor", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            ClassicEditor
                .create(document.querySelector('#'+attrs.id),{
                    ckfinder: {
                        uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
                    }
                })
                .then(newEditor => {
                    editor = newEditor;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };
});
///#####################################################################################################
app.directive("tinymce", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            tinymce.init({
                selector: document.querySelector('#' + attrs.id)
            });
        }
    };
});
///#####################################################################################################
///#####################################################################################################
app.controller("AppController", function ($scope, $rootScope, $http, $routeParams, RestService, $location) {
    $scope.versao = "1.10.0";

    $scope.showSideMenu = false;
    $scope.user = {};
    $scope.listaPrestadores = [];
    $scope.form = {};

    $scope.sideMenu = [
        { id: 1, label: 'Dashboard 2', path: '/', icon: 'icon-grid' },
        { id: 2, label: 'Minha Agenda', path: '/usuario/agenda', icon: 'icon-cog' },
        { id: 3, label: 'Histórico', path: '/usuario/historico', icon: 'icon-grid' },
        { 
            id: 4, label: 'Administradores', icon: 'icon-layout', items: [
                { id: 3, label: 'Financero', path: '/financeiro', icon: 'icon-grid' }
            ]
        }
    ];

    $scope.alert = {};
    $scope.showAlert = function(type, msg, timer) {
        if(!timer) { timer = 3; }
        $("#alertas").removeClass('hide');
        $scope.alert.type = type;
        $scope.alert.msg = msg;
        setTimeout(function() {
            $("#alertas").addClass('hide');
        }, timer * 1000);
    }

    $scope.initApp = function() {
        
        $scope.showSideMenu = true;
        $scope.toggleSideBar();

        var user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user);
        if (user) {
            $scope.user = user;
            //$scope.user.empresa = 1;
            $scope.user.plan = (user.prestador == 1 ? "Profissional" : "Básico");
            $scope.listarNotificacoes();
        } else {
            //location.href="login.html";
        }
        /*/
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            }
        });
        //*/
    }

    $scope.initEntradaUsuario = function() {
        $scope.recuperarListaPrestadores();
    }

    $scope.recuperarListaPrestadores = function() {
        RestService.getData("/agendamento/prestadores", function (response) {
            $scope.listaPrestadores = response.data;
        });
        RestService.getData("/agendamento/areas", function (resp) {
            $scope.listaAreas = resp.data;
        })
    }

    $scope.limparFiltro = function() {
        $scope.filtro = {};
    }
    
    $scope.filtrarSetor = function(item) {
        $scope.filtro = {};
        $scope.filtro = { 
            id_area: item.id
        }
    }

    $scope.filtro = {};

    $scope.deslogar = function() {
        sessionStorage.clear();
        localStorage.clear();
        RestService.getData("/../auth/logout", function (resp) { });
        location.href = "login.html";
    }

    $scope.listarNotificacoes = function() {
        RestService.getData("/agendamento/usuario/notificacoes?id=" + $scope.user.id, function (response) {
            $scope.arrNotificacoes = response.data;
            $scope.arrNotificacoes.forEach(function(msg) {
                var data = new Date(msg.data);
                var dataF = data.toLocaleDateString();
                var aviso = `Você tem um agendamento no dia ${dataF} as ${msg.horario}`;
                $scope.createNotification("", aviso);
            })
        })
    }

    $scope.max = 5;

    $scope.createNotification = function(title, text) {
        const img = "images/logo.svg";
        const notification = new Notification("Aviso", { body: text, icon: img });
        //*/
        worker.postMessage('Hello World'); // Send data to our worker.
    }

    $scope.stars = [];
    for (var i = 0; i < $scope.max; i++) {
        $scope.stars.push({
            filled: false
        });
    }

    $scope.viewPrestador = function(item) {
        goto("/prestador/"+item.id);
    }

    $scope.item = {};
    $scope.initViewPrestador = function() {
        var id = $routeParams.id;
        $scope.item = {};
        RestService.getData("/agendamento/prestador/"+id, function(response) {
            $scope.item = response.data;
        });
    }
    
    $scope.listaPrestadores2 = [
        { id: 1, foto: 'images/faces/face9.jpg', nome: 'Dilson Sordi Junior', area: 'Informática/TI', rating: 3 },
        { id: 2, foto: 'images/faces/face1.jpg', nome: 'Douglas Cristian', area: 'Suporte TI', rating: 4 }
    ];

    $scope.showSidebar = true;
    $scope.toggleSideBar = function() {
        $('body').toggleClass("sidebar-icon-only");
    }

    $scope.toggleOffcanvas = function() {
        $("#sidebar").toggleClass("active");
    }

    $scope.initViewUserDetail = function() {
        $scope.item = $scope.listaPrestadores[1];
    }

});
///#####################################################################################################
if (window.Worker) {
    //const myWorker = new Worker("worker.js");
}
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################