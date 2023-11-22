app.controller("FinanceMovimentacaoCtrl", function ($scope, $rootScope, APIService, $modal) {

    $scope.form = {};
    $scope.filtro = {};

    ///############################################################################################
    $scope.init = function() {
        
        $scope.listarMovimentacoes();
        APIService.getData("/finances/accounts/categories", function (resp) { $scope.categoriesList = resp.data; });
        APIService.getData("/finances/accounts", function (resp) { $scope.accountsList = resp.data; });

        $scope.categoriesListFiltered = [];

        $scope.$watch('form.tipo_operacao', function(newValue, oldValue) {
            $scope.categoriesListFiltered = $scope.categoriesList.filter( e => e.tipo == newValue);
        });
    }
    ///############################################################################################
    $scope.$on("updateListTasks", function () {
        $scope.listarMovimentacoes();
    });
    ///############################################################################################
    $scope.listarMovimentacoes = function() {
        APIService.getData("/finances/accounts/2/movimentacoes", function (resp) { $scope.movimentacoesContaList = resp.data; });
    }
    ///############################################################################################
    $scope.filtrar = function() {
        var data1 = moment($scope.filtro.data_inicio,"DD/MM/YYYY").format("YYYY-MM-DD");
        var data2 = moment($scope.filtro.data_termino, "DD/MM/YYYY").format("YYYY-MM-DD");
        var temp = { inicio: data1, termino: data2 };
        const u = new URLSearchParams(temp).toString();

        APIService.getData("/finances/accounts/2/movimentacoes?" + u, function (resp) { $scope.movimentacoesContaList = resp.data; });
    }
    ///############################################################################################
    $scope.salvarMovimentacao = function(form) {
        APIService.postData("/finances/accounts/2/movimentacoes", form, function (resp) {
            $scope.form = {};
            $rootScope.$broadcast('updateListTasks');
        });
    }
    ///############################################################################################
    $scope.marcarItemPago = function(item) {
        item.fields = [
            { field: 'status', value: 1 }
        ];
        APIService.putData("/finances/payments", item, function(resp) { $rootScope.$broadcast('updateListTasks'); });
    }
    ///############################################################################################
    ///############################################################################################

});