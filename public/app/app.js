'use strict';
var app = angular.module('Sistema', ['ngRoute'
    , 'ngAnimate'
    , 'ngResource'
    , 'angular.filter'
    , 'mgcrea.ngStrap'
    , 'ui.bootstrap'
    //, 'ui.utils'
    , 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter'
    , 'ui.utils.masks'
    //, 'textAngular'
    //, "checklist-model"
    //, 'summernote'
    , 'ngQuill'
    , 'ngFileUpload'
    //, 'angularUtils.directives.dirPagination'
    //, 'datatables'
    , 'ui.select'
    , 'selectize'
    , "pascalprecht.translate"
    , 'ngSanitize']);
///////////////////////////////////////////////////////////////////
app.config(function ($controllerProvider) {
    app.controller = $controllerProvider.register;
});
///////////////////////////////////////////////////////////////////
///#####################################################################################################
///#####################################################################################################
var date = new Date().getTime().toString();
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/',                      { templateUrl: 'app/views/dashboard.html?t=' + date, controller: 'AppController' })
        .when('/projects/dashboard',    { templateUrl: 'app/views/Projects/dashboard.html?t=' + date, controller: 'ProjectDashboardCtrl' })
        .when('/projects',              { templateUrl: 'app/views/Projects/projects.html?t=' + date, controller: 'ProjectCtrl' })
        .when('/projects/kanban',       { templateUrl: 'app/views/Projects/kanban.html?t=' + date, controller: 'KanbanViewCtrl' })
        .when('/projects/activities',   { templateUrl: 'app/views/Projects/activities.html?t=' + date, controller: 'UserTasksCtrl' })
        .when('/projects/activity/:id', { templateUrl: 'app/views/Projects/viewActivity.html?t=' + date, controller: 'ProjectActivityCtrl' })
        .when('/projects/new',          { templateUrl: 'app/views/Projects/newProject.html?t=' + date, controller: 'NewProjectCtrl' })
        .when('/project/:id',           { templateUrl: 'app/views/Projects/viewProject.html?t=' + date, controller: 'ProjectCtrl' })
        .when('/project2/:id',          { templateUrl: 'app/views/Projects/viewProject2.html?t=' + date, controller: 'ProjectCtrl' })

        .when('/finances',              { templateUrl: 'app/views/Finances/dashboard.html?t=' + date, controller: 'FinancesDashboard' })
        .when('/finances/movimentacoes', { templateUrl: 'app/views/Finances/movimentacoes.html?t=' + date, controller: 'FinancesDashboard' })
        .when('/finance/cashFlow',      { templateUrl: 'app/views/Finances/cashFlow.html?t=' + date, controller: 'FinancesController' })
        .when('/finance/invoices',      { templateUrl: 'app/views/Finances/invoice.html?t=' + date, controller: 'FinancesInvoicesCtrl' })
        .when('/finance/ofxreport',     { templateUrl: 'app/views/Finances/ofxReport.html?t=' + date, controller: 'FinancesController' })
        .when('/finance/barcodes',      { templateUrl: 'app/views/Finances/barcodes.html?t=' + date, controller: 'FinancesController' })

        .when('/tickets',               { templateUrl: 'app/views/Tickets/dashboard.html', controller: 'TicketsCtrl' })
        .when('/tickets/new',           { templateUrl: 'app/views/Tickets/newTicket.html', controller: 'TicketsCtrl' })
        .when('/tickets/list',          { templateUrl: 'app/views/Tickets/tickets.html', controller: 'TicketsCtrl' })
        .when('/ticket/:id',            { templateUrl: 'app/views/Tickets/viewTicket.html', controller: 'TicketsCtrl' })

        .when('/contracts',             { templateUrl: 'app/views/Contratos/listaContratos.html', controller: 'ContractsCtrl' })

        .when('/g4f/controle_mudancas', { templateUrl: 'app/views/Projects/ControleMudancas/controle_mudancas_list.html', controller: 'G4FCtrl' })

        .when('/rh/baterPonto',         { templateUrl: 'app/views/RH/BaterPonto.html', controller: 'RHCtrl' })

        .when('/company/users',          { templateUrl: 'app/views/Companies/users.html', controller: 'CompanyUsersCtrl' })
        .when('/company/settings',       { templateUrl: 'app/views/Companies/clientSettings.html', controller: 'ClientCtrl' })

        .when('/games',       { templateUrl: 'app/views/GamesApp/dashboard.html' })
        .otherwise({ templateUrl: 'app/views/Sistema/Erro_404.html' });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
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
    //$httpProvider.interceptors.push("responseErrorInterceptor");
    $httpProvider.interceptors.push('loadingInterceptor');
}]);
///#####################################################################################################
app.run(function ($rootScope, $route, $http, $routeParams) {
    $rootScope.carregando = false;
    $rootScope.stackDeCarga = 0;
});
///#####################################################################################################
var myModal;

function MyModalController($scope) {
    $scope.title = 'Some Title';
    $scope.content = 'Hello Modal<br />This is a multiline message from a controller!';
}
MyModalController.$inject = ['$scope'];
///#####################################################################################################
