'use strict';
var app = angular.module('Sistema', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngResource', 'lr.upload', 'ngFileUpload', 'mgcrea.ngStrap', 'ui.bootstrap']);
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
app.config(function ($controllerProvider) {
    app.controller = $controllerProvider.register;
});
///////////////////////////////////////////////////////////////////
/*
app.config(function ($httpProvider) {
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
        //return data;
    }
});
//*/
/////
app.run(function ($rootScope, $route, $http, $routeParams) {

});
///#####################################################################################################
app.factory("tokenInterceptor", ["$window", "$location", function ($window, $location) {
    return {
        request: function (config) {
            var token = JSON.parse(localStorage.getItem("userSICOOB")).token;
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
app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("tokenInterceptor");
    //$httpProvider.interceptors.push("authenticationInterceptor");
    //$httpProvider.interceptors.push("responseErrorInterceptor");
}]);
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///################################################################################################################
app.filter('Timestamp', function () {
    return function (unix_time, tipo) {
        if (tipo == null) { tipo = 0; }
        if (unix_time == undefined) { return ""; }
        ///
        var t1;
        if (unix_time.indexOf("Z") !== -1) {
            var temp1 = unix_time.replace("T", " ").replace("Z", "");
            t1 = temp1.split(" ");
        } else {
            t1 = unix_time.split(" ");
        }
        if (t1 == null) { return unix_time; }

        var t2 = t1[1].split(":");
        var hora = t2[0];

        var t3 = t1[0].split("-");
        var dataT = t3[2] + "/" + t3[1] + "/" + t3[0];

        var novaData = dataT;
        if (tipo == 1) {
            novaData += " " + hora + ":" + t2[1] + ":" + t2[2];
        } else if (tipo == 2) {
            novaData = " " + hora + ":" + t2[1] + ":" + t2[2].substring(0, 2);
        }
        //var data1 = new Date(novaData);
        return novaData;
    }
});
///#####################################################################################################
app.directive('uiDate', function () {
    return {
        require: '?ngModel',
        link: function ($scope, element, attrs, controller) {
            element.mask("00/00/0000");
        }
    };
})
.directive('summernote', function () {
    return {
        require: '?ngModel',
        link: function ($scope, element, attrs, controller) {
            element.summernote();
        }
    };
})
.directive('dtTable', function() {
    return {
        link: function ($scope, element, attrs, controller) {
            element.dataTable();
        }
    };
});
app.directive('myTable', function () {
    return function (scope, element, attrs) {

        // apply DataTable options, use defaults if none specified by user
        var options = {};
        if (attrs.myTable.length > 0) {
            options = scope.$eval(attrs.myTable);
        } else {
            options = {
                "bStateSave": true,
                "iCookieDuration": 2419200, /* 1 month */
                "bJQueryUI": true,
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": false,
                "bInfo": false,
                "bDestroy": true
            };
        }

        // Tell the dataTables plugin what columns to use
        // We can either derive them from the dom, or use setup from the controller           
        var explicitColumns = [];
        element.find('th').each(function (index, elem) {
            explicitColumns.push($(elem).text());
        });
        if (explicitColumns.length > 0) {
            options["aoColumns"] = explicitColumns;
        } else if (attrs.aoColumns) {
            options["aoColumns"] = scope.$eval(attrs.aoColumns);
        }

        // aoColumnDefs is dataTables way of providing fine control over column config
        if (attrs.aoColumnDefs) {
            options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
        }

        if (attrs.fnRowCallback) {
            options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
        }

        // apply the plugin
        var dataTable = element.dataTable(options);
        // watch for any changes to our data, rebuild the DataTable
        scope.$watch(attrs.aaData, function (value) {
            var val = value || null;
            if (val) {
                dataTable.fnClearTable();
                dataTable.fnAddData(scope.$eval(attrs.aaData));
            }
        });
    };
});
///#####################################################################################################
app.factory('RestService', function ($http) {
    return {
        getData: function (modulo, metodo, tipo, callback) {
            $http.get("app/rest/?sc=" + tipo + "&Modulo=" + modulo + "&metodo=" + metodo).then(callback);
            //$http.get("http://radio.sc.senac.br/EAD/Projetos/app/rest/?sc=" + tipo + "&Modulo=" + modulo + "&metodo=" + metodo).success(callback);
        },
        postData: function (modulo, metodo, tipo, param, callback) {
            $http({
                method: 'POST',
                //url: "http://radio.sc.senac.br/EAD/Projetos/app/rest/?sc=" + tipo + "&Modulo=" + modulo + "&metodo=" + metodo,
                url: "app/rest/?sc=" + tipo + "&Modulo=" + modulo + "&metodo=" + metodo,
                data: param, // pass in data as strings
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                } // set the headers so angular passing info as form data (not request payload)
            }).then(callback);
        },
        postData2: function (modulo, metodo, tipo, param, callback) {
            $http({
                method: 'POST',
                //url: "http://radio.sc.senac.br/EAD/Projetos/app/rest/?sc=" + tipo + "&Modulo=" + modulo + "&metodo=" + metodo,
                url: "app/rest/v1/" + modulo + "/" + metodo,
                data: param, // pass in data as strings
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                } // set the headers so angular passing info as form data (not request payload)
            }).then(callback);
        }
    }
});
///#####################################################################################################
app.factory('APIService', function ($http, $resource) {
    const apiBaseURL = "../api/v1";
    return {
        getData: function (path, callback) {
            $http.get(apiBaseURL + path).then(callback);
        },
        postData: function (path, param, callback) {
            $http.post(apiBaseURL + path, param).then(callback);
        },
        putData: function (path, param, callback) {
            $http.put(apiBaseURL + path, param).then(callback);
        },
        deleteData: function (path, callback) {
            $http.delete(apiBaseURL + path).then(callback);
        },
        resourceQuery: function (path) {
            return $resource(apiBaseURL + path).query();
        },
        resourceGet: function (path, ID) {
            return $resource(apiBaseURL + path).get({ id: ID });
        }
    }
});
///#####################################################################################################
///#####################################################################################################
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/',          { templateUrl: 'app/view/inicio.html' })
        .when('/ramais',    { templateUrl: 'app/view/Operacoes/Ramais.html' })
        .when('/operacao',  { templateUrl: 'app/view/Operacoes/utilitarios.html' })

        .when('/teste',                 { templateUrl: 'app/view/Sistema/Teste.html' })
        .when('/sistema/baterponto',    { templateUrl: 'app/view/Sistema/BaterPonto.html' })

        .when('/chamados',              { templateUrl: 'app/view/Chamados/inicio.html' })
        .when('/chamados/internos',     { templateUrl: 'app/view/Chamados/internos.html', controller: 'ChamadosCtrl' })
        .when('/chamados/internos/:id', { templateUrl: 'app/view/Chamados/ViewChamado.html', controller: 'ChamadosCtrl' })

        .when('/manuais',               { templateUrl: 'app/view/Manuais/Indice.html' })

        .when('/manuais/downloads',     { templateUrl: 'app/view/Manuais/Downloads.html' })
        .when('/operacao/extrato',      { templateUrl: 'app/view/Operacoes/Extrato.html', controller: 'FinancasCtrl' })

        .when('/setor/ti',              { templateUrl: 'app/view/Setores/TI.html' })

        .when('/financeiro',                { templateUrl: 'app/view/Financeiro/dashboard.html', controller: 'FinancasDashCtrl' })
        .when('/financeiro/movimentacoes',  { templateUrl: 'app/view/Financeiro/movimentacoes.html', controller: 'FinancasMovCtrl', title:'Movimentações' })
        .when('/financeiro/contasbancarias',  { templateUrl: 'app/view/Financeiro/contasBancarias.html', controller: 'FinancasContasCtrl', title:'Movimentações' })
        .when('/financeiro/categorias',     { templateUrl: 'app/view/Financeiro/categorias.html', controller: 'FinancasCentroCustoCtrl', title:'Movimentações' })

        .when('/ti/impressoras',        { templateUrl: 'app/view/Operacoes/Impressoras.html', controller: 'TICtrl' })


        .when('/sistema/users',         { templateUrl: 'app/view/Sistema/ListaUsuarios.html', controller: 'SistemaCtrl' })
        .when('/sistema/cadastro/user', { templateUrl: 'app/view/Sistema/Cadastro/Usuario.html', controller: 'SistemaCtrl' })
        .when('/sistema/unidades',      { templateUrl: 'app/view/Sistema/Cadastro/Unidade.html', controller: 'SistemaCtrl' })
        .when('/sistema/setores',       { templateUrl: 'app/view/Sistema/Cadastro/Setor.html', controller: 'SistemaCtrl' })
        .otherwise({ templateUrl: 'app/view/Sistema/Erro_404.html' });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
});
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
app.controller("AppController", function ($scope, RestService) {
    $scope.versao = "1.0.1";

    $scope.initApp = function () {
        //scope.atualizarDados();
        $scope.Empresa = {
            nome: "Sicoob",
            logo: "assets/img/layout_set_logo.png"
        };

        if(getCookie("Logado") == 1) {
            //$scope.pegarDadosUsuario();
            let user = localStorage.getItem("userSICOOB");
            $scope.Usuario = JSON.parse(user);
        } else {
            location.href = "login.html";
        }
    }
    ///############################################################################################
    $scope.deslogar = function() {
        RestService.postData("Sistema", "deslogar", 2, {}, function(data) {
            location.reload();
        })
    }
    ///############################################################################################
    $scope.baterPonto = function() {
        RestService.postData2("Sistema", "baterPonto", 2, { ID: getCookie("IDUsuario") }, function (data) {
            $scope.listarUltimasBatidasPonto();
        })
    }
    ///############################################################################################
    $scope.listarUltimasBatidasPonto = function() {
        RestService.postData2("Sistema", "listarUltimasBatidasPonto", 2, { ID: getCookie("IDUsuario") }, function (data) {
            $scope.arrBatidas = data;
        })
    }
    ///############################################################################################
    $scope.someClickHandler = function (info) {
        $scope.message = 'clicked: ' + info.price;
    };

    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    $scope.testeUpload = function() {
        console.log($scope.file);
    }
    ///############################################################################################
    $scope.onSuccess = function(response) {
        console.log(response);
        RestService.postData("Extrato", "carregarArquivoOFX", 2, { file: response.data.Arquivo }, function (data) {
            $scope.transacoes = data.transacoes;
            $scope.dados = data;
            var data = data.grafico;
            var labels = ["Credito", "Debitos"];
            //renderChart(data, labels);

            //$scope.graficoBarrasHighCharts("graph01", data, labels);
            var dados2 = [
                { name: 'Créditos', y: parseFloat(data[0]) },
                { name: 'Déditos', y: parseFloat(data[1]) }
            ];
            $scope.graficoPizza3DHighCharts("graph02", dados2, labels, 'Totais Por Tipo de Operação');
        });
    }
    ///############################################################################################
    $scope.graficoBarrasHighCharts = function (id, dados, labels) {
        Highcharts.chart(id, {
            chart: {
                type: 'column',
                renderto: id
            },
            title: {
                text: 'Totais Por Tipo de Operação'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: labels,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Valor'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0"></td>' +
                    '<td style="padding:0"><b>R$ {point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: '',
                data: dados

            }]
        });
    }
    ///############################################################################################
    $scope.graficoPizza3DHighCharts = function(id, dados, labels, titulo) {
        Highcharts.chart(id, {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: ' '
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b> <br>R$ {point.y}'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: titulo,
                colorByPoint: true,
                data: dados
            }],
            exporting: {
                showTable: false,
                csv: {
                    columnHeaderFormatter: function (item, key) {
                        if (!item || item instanceof Highcharts.Axis) {
                            return labelCategoria
                        } else {
                            return item.name;
                        }
                    }
                }
            }
        });
    }
    ///############################################################################################
    ///############################################################################################
    $scope.initTelaInicial = function() {
        //$scope.listarAniversariantesMes();
        //$scope.pegarMesAtual();
    }
    ///############################################################################################
    $scope.listarAniversariantesMes = function() {
        RestService.postData2("Sicoob","listarAniversariantesMes", 2, {}, function(data) {
            $scope.listaAniversarios = data;
        })
    }
    ///############################################################################################
    $scope.pegarDadosUsuario = function() {
        RestService.postData2("Sistema","pegarDadosUsuario", 2, { ID: getCookie("IDUsuario") }, function(data) {
            $scope.Usuario = data;
        })
    }
    ///############################################################################################
    $scope.pegarMesAtual = function() {
        RestService.postData2("Sicoob","pegarMesAtual", 2, {}, function(data) {
            $scope.mesAtual = data.mes;
        })
    }
    ///############################################################################################
    $scope.listarRamais = function() {
        RestService.postData2("Sicoob","listarRamais", 2, {}, function(data) {
            $scope.listaRamais = data;
        })
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    $scope.atualizarDados = function () {
        RestService.postData("Extrato", "carregarArquivoOFX", 2, {}, function (data) {
            $scope.transacoes = data.transacoes;

            var data = data.grafico;
            var labels = ["Credito", "Debitos"];
            //renderChart(data, labels);
        });
    }
});
///#####################################################################################################
app.controller("LoginController", function($scope, RestService) {
    $scope.versao = "1.0 A";

    $scope.logar = function() {
        location.href = "./";
    }
});
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
