'use strict';

var date = new Date().getTime().toString();
app.config(function ($routeProvider, $locationProvider, $ocLazyLoadProvider) {
    $routeProvider
        .when('/',                      { templateUrl: 'app/views/Agendamentos/ideia1.html', title: '' })
        //.when('/login',     { templateUrl: 'app/views/login.html', title: '', controller: 'LoginCtrl' })
        //.when('/registro',  { templateUrl: 'app/views/register.html', title: '', controller: 'LoginCtrl' })
        .when('/home',                  { templateUrl: 'app/views/Agendamentos/home.html', title: '' })
        .when('/perfil',                { templateUrl: 'app/views/Agendamentos/usuario/perfil.html', title: '', controller: 'PerfilCtrl' })
        .when('/dash',                  { templateUrl: 'app/views/Agendamentos/dashboard.html', title: '' })

        .when('/prestador/:id',             { templateUrl: 'app/views/Agendamentos/usuario/view_prestador.html'+'?t='+ date, title: '' })
        .when('/usuario/agenda',            { templateUrl: 'app/views/Agendamentos/usuario/agenda.html' + '?t=' + date, title: '', controller: 'AgendamentoCtrl',                       resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Agendamento', files: ['app/controllers/AgendamentoCtrl.js'] }]); }]} })
        .when('/usuario/agendamento',       { templateUrl: 'app/views/Agendamentos/usuario/add_agendamento.html' + '?t=' + date, title: '', controller: 'AgendamentoCtrl',              resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Agendamento', files: ['app/controllers/AgendamentoCtrl.js'] }]); }]} })
        .when('/usuario/historico',         { templateUrl: 'app/views/Agendamentos/usuario/historico.html' + '?t=' + date, title: '' })

        .when('/pro/financeiro',            { templateUrl: 'app/views/Agendamentos/profissional/listagem_receitas.html' + '?t=' + date, title: '', controller: 'ProfissionalCtrl',      resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Profissional', files: ['app/controllers/ProfissionalCtrl.js'] }]); }]} })
        .when('/pro/agenda_dia',            { templateUrl: 'app/views/Agendamentos/profissional/lista_agendamentos_dia.html' + '?t=' + date, title: '', controller: 'ProfissionalCtrl', resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Profissional', files: ['app/controllers/ProfissionalCtrl.js'] }]); }]} })
        .when('/pro/apontamento/:id',       { templateUrl: 'app/views/Agendamentos/profissional/view_agendamento.html' + '?t=' + date, title: '', controller: 'ProfissionalCtrl',       resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Profissional', files: ['app/controllers/ProfissionalCtrl.js'] }]); }]} })

        .when('/perfil_profissional',       { templateUrl: 'app/views/Agendamentos/profissional/prestador_perfil.html'+'?t='+ date, title: '', controller: 'PerfilProfCtrl',            resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Profissional', files: ['app/controllers/ProfissionalCtrl.js'] }]); }]} })
        .when('/sistema/cadastro',          { templateUrl: 'app/views/Agendamentos/profissional/cad_prestador.html'+'?t='+ date, title: '', controller: 'SistemaCtrl',                  resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Sistema', files: ['app/controllers/SistemaCtrl.js'] }]); }]} })

        .when('/admin/financeiro',          { templateUrl: 'app/views/Agendamentos/financeiro/entrada.html'+'?t='+ date, title: '', controller: 'FinanceiroCtrl',                       resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Profissional', files: ['app/controllers/ProfissionalCtrl.js'] }]); }]} })
        
        .when('/gyms',                      { templateUrl: 'app/views/Agendamentos/Gym/gyms.html'+'?t='+ date, title: '', controller: 'GymCtrl',                                        resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Gym', files: ['app/controllers/GymCtrl.js'] }]); }]} })
        .when('/gym/:id',                   { templateUrl: 'app/views/Agendamentos/Gym/dashboard.html'+'?t='+ date, title: '', controller: 'GymCtrl',                                   resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Gym', files: ['app/controllers/GymCtrl.js'] }]); }]} })
        .when('/gym/treinos',               { templateUrl: 'app/views/Agendamentos/Gym/treinoUsuario.html'+'?t='+ date, title: '', controller: 'GymCtrl',                               resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Gym', files: ['app/controllers/GymCtrl.js'] }]); }]} })

        .when('/configs',                   { templateUrl: 'app/views/Agendamentos/sistema/configuracoes.html'+'?t='+ date, title: '', controller: 'SistemaCtrl',                       resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Sistema', files: ['app/controllers/SistemaCtrl.js'] }]); }]} })
        .when('/plans',                     { templateUrl: 'app/views/Agendamentos/sistema/planos.html'+'?t='+ date, title: '', controller: 'SistemaCtrl',                              resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Sistema', files: ['app/controllers/SistemaCtrl.js'] }]); }]} })
        .when('/plans/substription',        { templateUrl: 'app/views/Agendamentos/sistema/subscription.html'+'?t='+ date, title: '', controller: 'SistemaCtrl',                        resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Sistema', files: ['app/controllers/SistemaCtrl.js'] }]); }]} })
        .when('/plans/accepted',            { templateUrl: 'app/views/Agendamentos/sistema/plans/acceptedPlan.html'+'?t='+ date, title: '', controller: 'SistemaCtrl',                  resolve: { lazy: ['$ocLazyLoad', function ($ocLazyLoad) { return $ocLazyLoad.load([{ name: 'Sistema', files: ['app/controllers/SistemaCtrl.js'] }]); }]} })
        .otherwise({ templateUrl: 'app/views/Sistema/Erro_404.html' });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
});