'use strict';
var app = angular.module('G4F', [
    'ngRoute'
    ,'ngAnimate'
    ,'ngSanitize'
    ,'ngResource'
    , 'ui.bootstrap'
    , 'mgcrea.ngStrap'
    , 'pascalprecht.translate'
    , 'ui.utils.masks'
    //, "textAngular"
    //, 'ui.tinymce'
    , 'ngQuill'
    , 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.autoResize', 'ui.grid.selection', 'ui.grid.saveState', 'ui.grid.pinning', 'ui.grid.treeView', 'ui.grid.exporter'
    , "oc.lazyLoad"
]);
///#####################################################################################################
app.config(function ($controllerProvider) {
    app.controller = $controllerProvider.register;
});
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
var date = new Date().getTime().toString();
app.config(function ($routeProvider, $locationProvider, $ocLazyLoadProvider) {
    $routeProvider
        .when('/',                          { templateUrl: 'app/views/G4F/inicio.html', title: '', controller: 'G4FDashboardCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'G4F', files: ['app/controllers/G4FCtrl.js'] }]); }]} })
        .when('/sistema/usuarios',          { templateUrl: 'app/views/G4F/Sistema/usuarios.html' + '?t=' + date, title: '', controller: 'G4FSistemaCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'G4F', files: ['app/controllers/G4FCtrl.js'] }]); }]} })
        .when('/sistema/configuracao',      { templateUrl: 'app/views/G4F/Sistema/configuracao.html' + '?t=' + date, title: '', controller: 'G4FSistemaCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'G4F', files: ['app/controllers/G4FCtrl.js'] }]); }]} })

        .when('/tickets',                   { templateUrl: 'app/views/G4F/Tickets/dashboard.html', controller: 'TicketsCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Tickets', files: ['app/controllers/TicketsCtrl.js'] }]); }]} })
        .when('/tickets/new',               { templateUrl: 'app/views/G4F/Tickets/newTicket.html', controller: 'TicketsCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Tickets', files: ['app/controllers/TicketsCtrl.js'] }]); }]} })
        .when('/tickets/list',              { templateUrl: 'app/views/G4F/Tickets/tickets.html', controller: 'TicketsCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Tickets', files: ['app/controllers/TicketsCtrl.js'] }]); }]} })
        .when('/ticket/:id',                { templateUrl: 'app/views/G4F/Tickets/viewTicket.html', controller: 'TicketsCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Tickets', files: ['app/controllers/TicketsCtrl.js'] }]); }]} })

        .when('/controle_mudancas',         { templateUrl: 'app/views/G4F/ControleMudancas/controle_mudancas_list.html', controller: 'G4FCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'G4F', files: ['app/controllers/G4FCtrl.js'] }]); }]} })
        .when('/controle_mudancas/novo',    { templateUrl: 'app/views/G4F/ControleMudancas/cadastro_controle_mudanca.html', controller: 'G4FCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'G4F', files: ['app/controllers/G4FCtrl.js'] }]); }]} })
        .when('/controle_mudancas/:id/detalhe',    { templateUrl: 'app/views/G4F/ControleMudancas/cadastro_detalhe_controle_mudanca.html', controller: 'G4FCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'G4F', files: ['app/controllers/G4FCtrl.js'] }]); }]} })

        .when('/ordemServico',              { templateUrl: 'app/views/G4F/OrdemServico/listagem.html', controller: 'G4FCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'G4F', files: ['app/controllers/G4FCtrl.js'] }]); }]} })
        .when('/ordemServico/novo',         { templateUrl: 'app/views/G4F/OrdemServico/cadastro.html', controller: 'G4FCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'G4F', files: ['app/controllers/G4FCtrl.js'] }]); }]} })

        .when('/relatorio/modelo/1',        { templateUrl: 'app/views/G4F/Relatorios/teste1.html', controller: 'G4FCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'G4F', files: ['app/controllers/G4FCtrl.js'] }]); }]} })

        .when('/rh',                        { templateUrl: 'app/views/G4F/RH/Dashboard.html', controller: 'G4FRHCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'RH', files: ['app/controllers/G4FCtrl.js'] }]); }]} })
        .when('/rh/ferias',                 { templateUrl: 'app/views/G4F/RH/Ferias.html', controller: 'G4FRHCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'RH', files: ['app/controllers/G4FCtrl.js'] }]); }]} })
        .when('/rh/baterPonto',             { templateUrl: 'app/views/G4F/RH/BaterPonto.html', controller: 'G4FRHCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'RH', files: ['app/controllers/G4FCtrl.js'] }]); }]} })
        .otherwise({ templateUrl: 'app/views/Sistema/Erro_404.html' });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
});
///#####################################################################################################
app.controller("AppController", function ($scope, $rootScope, $routeParams, $location, APIService, $window, $http, $modal, $translate) {
    $scope.versao = "1.0.1";
    $scope.form = {};

    $scope.loggedUser = {
        idCustomer: 1,
        idUser: 2,
        nome: 'Dilson Sordi Junior',
        email: 'juniorsordi@gmail.com',
        accessLevel: 'Administrador',
        foto: 'assets/img/avatars/avatar-2.jpg?1561438316'
    };

    $scope.modules = {
        os: true,
        tickets: true,
        rh: true,
        system: false
    };

    $scope.languagesList = [
        { id: 1, name: 'English', locale: 'en', flag: 'us.png' },
        { id: 2, name: 'Portuguese', locale: 'pt', flag: 'br.png' }
    ];

    $scope.listaMensagens = [];
    $scope.listaNotificaces = [];

    $rootScope.Usuario = $scope.loggedUser;
    ///############################################################################################
    ///############################################################################################
    $scope.initApp = function () {
        //console.log($location.host);
        if($location.host() == 'localhost') {
            if (!localStorage.getItem('user')) {
                location.href = "loginG4F.html";
            }
            $scope.Usuario = $scope.loggedUser;
            $scope.lang = $window.navigator.language || $window.navigator.userLanguage;
            $scope.currentLang = $scope.languagesList.find(e => e.locale === $scope.lang.substr(0, 2));
            $translate.use($scope.currentLang.locale);
            $scope.Usuario = JSON.parse(localStorage.getItem('user'));
            $rootScope.Usuario = $scope.Usuario;

            APIService.getData("/../auth/checkToken", function (response) {
                if(!response.data) {
                        location.href = "loginG4F.html";
                } else {
                    $scope.lang = $window.navigator.language || $window.navigator.userLanguage;
                    $scope.currentLang = $scope.languagesList.find(e => e.locale === $scope.lang.substr(0, 2));
                    $translate.use($scope.currentLang.locale);
                    $scope.Usuario = JSON.parse(localStorage.getItem('user'));
                    $rootScope.Usuario = $scope.Usuario;
                    if($scope.Usuario.is_admin == 1) {
                        $scope.modules.system = true;
                    }
                }
            });
        } else {
            if (localStorage.getItem('user')) {
                APIService.getData("/../auth/checkToken", function (response) {
                    if(!response.data) {
                        location.href = "loginG4F.html";
                    } else {
                        $scope.lang = $window.navigator.language || $window.navigator.userLanguage;
                        $scope.currentLang = $scope.languagesList.find(e => e.locale === $scope.lang.substr(0, 2));
                        $translate.use($scope.currentLang.locale);
                        $scope.Usuario = JSON.parse(localStorage.getItem('user'));
                        $rootScope.Usuario = $scope.Usuario;
                        if($scope.Usuario.is_admin == 1) {
                            $scope.modules.system = true;
                        }
                        //$scope.anoAtendimento = (new Date()).getFullYear();
                    }
                });
            } else {
                location.href = "loginG4F.html";
            }
        }
    }
    ///############################################################################################
    $scope.changeLocale = function (locale) {
        $scope.currentLang = $scope.languagesList.find(e => e.locale === locale);
        $translate.use(locale);
    }
    ///############################################################################################
    $scope.deslogar = function () {
        sessionStorage.clear();
        localStorage.clear();
        APIService.resourceQuery("/auth/logout");
        location.href = "loginG4F.html";
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
});
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################