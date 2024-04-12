'use strict';
var app = angular.module('app', [
      'ngRoute'
    , 'ngAnimate'
    , 'ngSanitize'
    , 'ui.bootstrap'
    , 'mgcrea.ngStrap'
    , 'pascalprecht.translate'
    , 'ui.utils.masks'
    , "oc.lazyLoad"
]);
///#####################################################################################################
app.config(function ($controllerProvider) {
    app.controller = $controllerProvider.register;
});
///#####################################################################################################
app.controller("AppController", function ($scope, $rootScope, $routeParams, RestService, $window, $translate) {
    $scope.versao = "1.10.0";

    $scope.showSideMenu = false;
    $scope.user = {};
    $scope.form = {};

    var date = new Date().toISOString().substring(0, 10);
    console.log(date);

    $scope.languagesList = [
        { id: 1, name: 'English', locale: 'en', flag: 'us.png' },
        { id: 2, name: 'Portuguese', locale: 'pt', flag: 'br.png' }
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

        var user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            $scope.user = user;
            //$scope.user.empresa = 1;
            $scope.user.plan = (user.prestador == 1 ? "Profissional" : "Básico");
            $scope.listarNotificacoes();
            $scope.lang = $window.navigator.language || $window.navigator.userLanguage;
            $scope.currentLang = $scope.languagesList.find(e => e.locale === $scope.lang.substr(0, 2));
            $translate.use($scope.currentLang.locale);
            $scope.Usuario = user;
            $rootScope.Usuario = $scope.Usuario;
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
        worker.postMessage('Hello World'); // Send data to our worker.
    }

    $scope.showSidebar = true;
    $scope.toggleSideBar = function() {
        $('body').toggleClass("sidebar-icon-only");
    }

    $scope.toggleOffcanvas = function() {
        $("#sidebar").toggleClass("active");
    }

    $scope.listaCampeonatos = [
        { id: 1, nome: 'Campeonato Brasileiro - Serie A' },
        { id: 2, nome: 'Campeonato Brasileiro - Serie B' },
        { id: 3, nome: 'Campeonato Brasileiro - Serie C' },
        { id: 4, nome: 'Campeonato Brasileiro - Serie D' },
        { id: 5, nome: 'Copa do Mundo' },
        { id: 6, nome: 'UEFA Champions League' },
        { id: 7, nome: 'UEFA Liga Europa' },
    ];

    $scope.listaApostadores = [
        { id: 1, nome: 'Johnlen' },
        { id: 2, nome: 'Jackson' },
        { id: 3, nome: 'Lucas' },
        { id: 4, nome: 'Matheus' },
        { id: 5, nome: 'Dilson' },
        { id: 6, nome: 'Thayse' },
        { id: 7, nome: 'Edilson' },
        { id: 8, nome: 'Leonardo' },
    ];

    $scope.arrRankingDia = [];

    $scope.listarProximosEventos = function() {
        RestService.getData("/dtibet/proximosEventos", function(resp) {
            $scope.arrEventos = resp.data;
            for(const evento of $scope.arrEventos) {
                if(evento.data_jogo != date) {
                    continue;
                }
                let time_ganhador = 0;
                if(evento.gols_a > evento.gols_b) {
                    time_ganhador = 1;
                } else if(evento.gols_a < evento.gols_b) {
                    time_ganhador = 2;
                }
                for(const aposta of evento.apostas) {
                    let pontuacao = 0;
                    let resultadoAposta = 0
                    if(aposta.gols_time_a > aposta.gols_time_b) {
                        resultadoAposta = 1;
                    } else if(aposta.gols_time_a < aposta.gols_time_b) {
                        resultadoAposta = 2;
                    }

                    if(resultadoAposta == time_ganhador) {
                        if(aposta.gols_time_a == evento.gols_a  && aposta.gols_time_b == evento.gols_b) {
                            pontuacao = 5;
                        } else {
                            pontuacao = 3;
                        }
                    }
                    aposta.pontos = pontuacao;
                    $scope.arrRankingDia.push({ nome: aposta.nome, pontos: pontuacao });
                }
            }

            for(const item of $scope.listaApostadores) {
                let itemsNome = $scope.arrRankingDia.filter( e => e.nome == item.nome);
                let temp = 0;
                for(let i = 0; i < itemsNome.length;i++) {
                    temp += parseInt(itemsNome[i].pontos);
                }
                item.pontos = temp;
            }
            let tempOrdernado = Object.values($scope.listaApostadores).sort((a,b) => b.pontos - a.pontos);
            $scope.listaApostadores = tempOrdernado;
        })
    }

    $scope.listarApostas = function(id) {
        RestService.getData("/dtibet/"+id+"/apostas", function(resp) {
            $scope.apostas = resp.data;
        })
    }

    $scope.salvarAposta = function(form) {
        RestService.postData("/dtibet/aposta", form, function(resp) {
            if(resp.data.success) {
                $scope.form = {};
                goto("/");
            }
        })
    }

    $scope.salvarJogo = function(form) {
        RestService.postData("/dtibet/jogo", form, function(resp) {
            if(resp.data.success) {
                $scope.form = {};
                goto("/");
            }
        })
    }

    $scope.listarJogos = function() {
        RestService.getData("/dtibet/jogos", function(resp) {
            $scope.jogos = resp.data;
        })
    }

    $scope.initAtualizarJogo = function() {
        let id = $routeParams.id;
    }

    $scope.initCadAposta = function() {
        
        RestService.getData("/dtibet/proximosEventos", function(resp) {
            $scope.arrEventos = resp.data;

            if($routeParams.id) {
                let jogo = resp.data.find( e => e.id == $routeParams.id);
                $scope.form.jogo = jogo;
                document.getElementById("f2").disabled = true;
            }
        });
        //$scope.listarProximosEventos();
    }

});
///#####################################################################################################
if (window.Worker) {
    //const myWorker = new Worker("worker.js");
}
///#####################################################################################################
var date = new Date().getTime().toString();
app.config(function ($routeProvider, $locationProvider, $ocLazyLoadProvider) {
    $routeProvider
        .when('/',                      { templateUrl: 'app/views/DTIBet/entrada.html', title: '' })
        .when('/apostar',               { templateUrl: 'app/views/DTIBet/cadAposta.html', title: '' })
        .when('/apostar/:id',           { templateUrl: 'app/views/DTIBet/cadAposta.html', title: '' })
        .when('/jogos',                 { templateUrl: 'app/views/DTIBet/jogos.html', title: '' })
        .when('/novoJogo',              { templateUrl: 'app/views/DTIBet/cadJogo.html', title: '' })
        .when('/editarJogo/:id',        { templateUrl: 'app/views/DTIBet/editJogo.html', title: '' })
});
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################