'use strict';

var date = new Date().getTime().toString();
app.config(function ($routeProvider, $locationProvider, $ocLazyLoadProvider) {
    $routeProvider
    .when('/',                      { templateUrl: 'app/views/dashboard.html?t=' + date, controller: 'AppController' })

    .when('/projects/dashboard',    { templateUrl: 'app/views/Projects/dashboard.html?t=' + date, controller: 'ProjectDashboardCtrl',   resolve: testeOCLazyLoad("ProjectCtrl", "") })
    .when('/projects',              { templateUrl: 'app/views/Projects/projects.html?t=' + date, controller: 'ProjectCtrl',             resolve: testeOCLazyLoad("ProjectCtrl", "") })
    .when('/projects/kanban',       { templateUrl: 'app/views/Projects/kanban.html?t=' + date, controller: 'KanbanViewCtrl',            resolve: testeOCLazyLoad("ProjectCtrl", "") })
    .when('/projects/activities',   { templateUrl: 'app/views/Projects/activities.html?t=' + date, controller: 'UserTasksCtrl',         resolve: testeOCLazyLoad("ProjectCtrl", "") })
    .when('/projects/activity/:id', { templateUrl: 'app/views/Projects/viewActivity.html?t=' + date, controller: 'ProjectActivityCtrl', resolve: testeOCLazyLoad("ProjectCtrl", "") })
    .when('/projects/new',          { templateUrl: 'app/views/Projects/newProject.html?t=' + date, controller: 'NewProjectCtrl',        resolve: testeOCLazyLoad("ProjectCtrl", "") })
    .when('/project/:id',           { templateUrl: 'app/views/Projects/viewProject.html?t=' + date, controller: 'ProjectCtrl',          resolve: testeOCLazyLoad("ProjectCtrl", "") })
    .when('/project2/:id',          { templateUrl: 'app/views/Projects/viewProject2.html?t=' + date, controller: 'ProjectCtrl',         resolve: testeOCLazyLoad("ProjectCtrl", "") })

    .when('/finances',              { templateUrl: 'app/views/Finances/dashboard.html?t=' + date, controller: 'FinancesDashboard',          resolve: testeOCLazyLoad("FinancesController", "") })
    .when('/finances/movimentacoes', { templateUrl: 'app/views/Finances/movimentacoes.html?t=' + date, controller: 'FinanceMovimentacaoCtrl',      resolve: testeOCLazyLoad("FinanceMovimentacaoCtrl", "Finances/") })
    .when('/finance/cashFlow',      { templateUrl: 'app/views/Finances/cashFlow.html?t=' + date, controller: 'FinancesController',          resolve: testeOCLazyLoad("FinancesController", "") })
    .when('/finance/invoices',      { templateUrl: 'app/views/Finances/invoice.html?t=' + date, controller: 'FinancesInvoicesCtrl',         resolve: testeOCLazyLoad("FinancesController", "") })
    .when('/finance/ofxreport',     { templateUrl: 'app/views/Finances/ofxReport.html?t=' + date, controller: 'FinancesController',         resolve: testeOCLazyLoad("FinancesController", "") })
    .when('/finance/barcodes',      { templateUrl: 'app/views/Finances/barcodes.html?t=' + date, controller: 'FinancesController',          resolve: testeOCLazyLoad("FinancesController", "") })
    .when('/finance/categories',    { templateUrl: 'app/views/Finances/categorias.html?t=' + date, controller: 'FinancesCategoriesCtrl',    resolve: testeOCLazyLoad("FinancesController", "") })

    .when('/tickets',               { templateUrl: 'app/views/Tickets/dashboard.html?t=' + date, controller: 'TicketsCtrl',                   resolve: testeOCLazyLoad("TicketsCtrl", "") })
    .when('/tickets/new',           { templateUrl: 'app/views/Tickets/newTicket.html?t=' + date, controller: 'TicketsCtrl',                   resolve: testeOCLazyLoad("TicketsCtrl", "") })
    .when('/tickets/list',          { templateUrl: 'app/views/Tickets/tickets.html?t=' + date, controller: 'TicketsCtrl',                     resolve: testeOCLazyLoad("TicketsCtrl", "") })
    .when('/ticket/:id',            { templateUrl: 'app/views/Tickets/viewTicket.html?t=' + date, controller: 'TicketsCtrl',                  resolve: testeOCLazyLoad("TicketsCtrl", "") })

    .when('/contracts',             { templateUrl: 'app/views/Contratos/listaContratos.html?t=' + date, controller: 'ContractsCtrl' })

    .when('/g4f/controle_mudancas', { templateUrl: 'app/views/Projects/ControleMudancas/controle_mudancas_list.html', controller: 'G4FCtrl',        resolve: testeOCLazyLoad("G4FCtrl", "") })
    .when('/controle_mudancas/novo', { templateUrl: 'app/views/Projects/ControleMudancas/cadastro_controle_mudanca.html', controller: 'G4FCtrl',    resolve: testeOCLazyLoad("G4FCtrl", "") })

    .when('/rh/baterPonto',         { templateUrl: 'app/views/RH/BaterPonto.html?t=' + date, controller: 'RHCtrl',                            resolve: testeOCLazyLoad("RHCtrl", "") })

    .when('/company/users',         { templateUrl: 'app/views/Companies/users.html?t=' + date, controller: 'CompanyUsersCtrl',                resolve: testeOCLazyLoad("ClientController", "") })
    .when('/company/settings',      { templateUrl: 'app/views/Companies/clientSettings.html?t=' + date, controller: 'ClientCtrl',             resolve: testeOCLazyLoad("ClientController", "") })

    .when('/games',                 { templateUrl: 'app/views/GamesApp/dashboard.html?t=' + date, controller: 'GamesAppCtrl',                 resolve: testeOCLazyLoad("GamesCtrl", "") })

    .when('/sistema/usuarios',      { templateUrl: 'app/views/Sistema/usuarios.html?t=' + date, controller: 'SistemaCtrl',                    resolve: testeOCLazyLoad("SistemaCtrl", "") })
    .when('/sistema/geradorForm',   { templateUrl: 'app/views/Sistema/geradorForms.html?t=' + date, controller: 'SistemaCtrl',                resolve: testeOCLazyLoad("SistemaCtrl", "") })
    .otherwise({ templateUrl: 'app/views/Sistema/Erro_404.html' });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
});