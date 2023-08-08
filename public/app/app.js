'use strict';
var app = angular.module('Sistema', ['ngRoute'
    , 'ngAnimate'
    , 'ngSanitize'
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
    //, 'angularUtils.directives.dirPagination'
    //, 'datatables'
    , "pascalprecht.translate"]);
///////////////////////////////////////////////////////////////////
app.config(function ($controllerProvider) {
    app.controller = $controllerProvider.register;
});
///////////////////////////////////////////////////////////////////
app.run(function ($rootScope, $route, $http, $routeParams) {

});
///#####################################################################################################
///#####################################################################################################
var date = new Date().getTime().toString();
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/',                      { templateUrl: 'app/views/dashboard.html?t=' + date, controller: 'AppController' })
        .when('/projects/dashboard',    { templateUrl: 'app/views/Projects/dashboard.html?t=' + date, controller: 'ProjectCtrl' })
        .when('/projects',              { templateUrl: 'app/views/Projects/projects.html?t=' + date, controller: 'ProjectCtrl' })
        .when('/projects/kanban',       { templateUrl: 'app/views/Projects/kanban.html?t=' + date, controller: 'KanbanViewCtrl' })
        .when('/projects/activities',   { templateUrl: 'app/views/Projects/activities.html?t=' + date, controller: 'ProjectCtrl' })
        .when('/projects/activity/:id', { templateUrl: 'app/views/Projects/viewActivity.html?t=' + date, controller: 'ProjectActivityCtrl' })
        .when('/projects/new',          { templateUrl: 'app/views/Projects/newProject.html?t=' + date, controller: 'NewProjectCtrl' })
        .when('/project/:id',           { templateUrl: 'app/views/Projects/viewProject.html?t=' + date, controller: 'ProjectCtrl' })
        .when('/project2/:id',          { templateUrl: 'app/views/Projects/viewProject2.html?t=' + date, controller: 'ProjectCtrl' })

        .when('/finances',              { templateUrl: 'app/views/Finances/dashboard.html?t=' + date, controller: 'FinancesController' })
        .when('/finance/cashFlow',      { templateUrl: 'app/views/Finances/cashFlow.html?t=' + date, controller: 'FinancesController' })
        .when('/finance/invoices',      { templateUrl: 'app/views/Finances/invoice.html?t=' + date, controller: 'FinancesInvoicesCtrl' })

        .when('/tickets',               { templateUrl: 'app/views/Tickets/dashboard.html', controller: 'TicketsCtrl' })
        .when('/tickets/new',           { templateUrl: 'app/views/Tickets/newTicket.html', controller: 'TicketsCtrl' })
        .when('/tickets/list',          { templateUrl: 'app/views/Tickets/tickets.html', controller: 'TicketsCtrl' })
        .when('/ticket/:id',            { templateUrl: 'app/views/Tickets/viewTicket.html', controller: 'TicketsCtrl' })

        .when('/logistics',             { templateUrl: 'app/views/Logistics/dashboard.html', controller: 'LogisticsCtrl' })
        .when('/logistics/newLabel',    { templateUrl: 'app/views/Logistics/createLabel.html', controller: 'LogisticsCtrl' })
        .when('/logistics/shipper',     { templateUrl: 'app/views/Logistics/shipper.html', controller: 'LogisticsCtrl' })
        .when('/logistics/warehouse',   { templateUrl: 'app/views/Logistics/warehouse.html', controller: 'LogisticsCtrl' })

        .when('/system/users',          { templateUrl: 'app/views/sistema/users.html', controller: 'CompanyUsersCtrl' })
        .when('/settings',              { templateUrl: 'app/views/sistema/clientSettings.html', controller: 'ClientCtrl' })
        .otherwise({ templateUrl: 'app/views/Sistema/Erro_404.html' });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
});
///#####################################################################################################
var myModal;

function MyModalController($scope) {
    $scope.title = 'Some Title';
    $scope.content = 'Hello Modal<br />This is a multiline message from a controller!';
}
MyModalController.$inject = ['$scope'];
///#####################################################################################################
