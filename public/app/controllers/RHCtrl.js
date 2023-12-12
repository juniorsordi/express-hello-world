app.controller('RHCtrl', function ($scope, $rootScope, $routeParams, APIService, $window, $resource, $modal, $translate) {

    $scope.listarUltimasBatidas = function() {
        APIService.getData("/rh/ponto/ultimos", function(resp) {
            $scope.listaPonto = resp.data;
        })
    }

    $scope.initDashboard = function() {
        APIService.getData("/rh/dashboard", function(resp) {
            $scope.dadosDashboard = resp.data;

            let total = 0;
            for(const item of $scope.dadosDashboard) {
                total += parseFloat(item.saldo.minutes);
                if(item.saldo.hours) {
                    total += parseFloat(item.saldo.hours * 60);
                }
            }

            $scope.saldoTotal = total;
        });

        APIService.getData("/rh/dashboard/saldo_horas_mes", function(resp) {
            $scope.saldoHorasMes = resp.data;
        })
    }

    $scope.registrarBatidaPonto = function() {
        APIService.postData("/rh/ponto/bater", {}, function(resp) {
            $scope.listarUltimasBatidas();
        })
    }
});