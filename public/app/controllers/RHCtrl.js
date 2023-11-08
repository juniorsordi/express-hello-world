app.controller('RHCtrl', function ($scope, $rootScope, $routeParams, APIService, $window, $resource, $modal, $translate) {

    $scope.listarUltimasBatidas = function() {
        APIService.getData("/rh/ponto/ultimos", function(resp) {
            $scope.listaPonto = resp.data;
        })
    }

    $scope.initDashboard = function() {
        APIService.getData("/rh/dashboard", function(resp) {
            $scope.dadosDashboard = resp.data;
        })
    }

    $scope.registrarBatidaPonto = function() {
        APIService.postData("/rh/ponto/bater", {}, function(resp) {
            $scope.listarUltimasBatidas();
        })
    }
});