app.controller("FinanceMovimentacaoCtrl", function ($scope, $rootScope, APIService, $modal) {

    $scope.form = {};
    $scope.teste = {};
    $scope.filtro = {};
    $scope.categoriesListFiltered = [];

    var modalEditMovement = $modal({ templateUrl: 'app/views/Finances/Modals/ModalEditarMovimentacao.html', show: false, scope: $scope, });

    ///############################################################################################
    $scope.$watch('form.tipo_operacao', function(newValue, oldValue) {
        if($scope.categoriesList != null) {
            $scope.categoriesListFiltered = $scope.categoriesList.filter( e => e.tipo == newValue);
        }
        
    });
    ///############################################################################################
    $scope.init = function() {
        $scope.filtro = { mes: moment().toDate() };

        $scope.teste.saldo_anterior = 0;
        
        $scope.filtrar();
        APIService.getData("/finances/accounts/categories", function (resp) { $scope.categoriesList = resp.data; $scope.form.tipo_operacao = 'D'; });
        APIService.getData("/finances/accounts", function (resp) { $scope.accountsList = resp.data; });
    }
    ///############################################################################################
    $scope.$on("updateListTasks", function () {
        //$scope.listarMovimentacoes();
        $scope.filtrar();
    });
    ///############################################################################################
    $scope.listarMovimentacoes = function() {
        APIService.getData("/finances/accounts/2/movimentacoes", function (resp) { $scope.movimentacoesContaList = resp.data; });
    }
    ///############################################################################################
    $scope.calcularSaldoMes = function() {
        let saldo = $scope.teste.saldo_anterior;
        for (const item of $scope.movimentacoesContaList) {
            saldo += item.valor;
        }

        $scope.teste.saldo_atual = saldo;
    }
    ///############################################################################################
    $scope.filtrar = function() {
        var data1 = moment($scope.filtro.data_inicio,"DD/MM/YYYY").format("YYYY-MM-DD");
        var data2 = moment($scope.filtro.data_termino, "DD/MM/YYYY").format("YYYY-MM-DD");

        var data3 = moment($scope.filtro.mes).startOf('month').format("YYYY-MM-DD");
        var data3b = moment($scope.filtro.mes).endOf('month').format("YYYY-MM-DD");
        var temp = { inicio: data3, termino: data3b };
        const u = new URLSearchParams(temp).toString();

        APIService.getData("/finances/accounts/2/movimentacoes?" + u, function (resp) { 
            $scope.movimentacoesContaList = resp.data; 
            $scope.calcularSaldoMes(); 
        });
    }
    ///############################################################################################
    $scope.salvarMovimentacao = function(form) {
        APIService.postData("/finances/accounts/2/movimentacoes", form, function (resp) {
            $scope.form = {};
            $rootScope.$broadcast('updateListTasks');
        });
    }
    ///############################################################################################
    $scope.editarItem = function(item) {
        $scope.form = item;
        $scope.form.titulo = item.descricao;
        $scope.form.tipo_operacao = item.tipo;
        console.log($scope.form);
        modalEditMovement.show();
    }
    ///############################################################################################
    $scope.excluirItem = function(item) {
        APIService.deleteData("/finances/accounts/movimentacao/"+item.id, function(resp) {
            $rootScope.$broadcast('updateListTasks');
        })
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