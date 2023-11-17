app.controller("G4FCtrl", function ($scope, $rootScope, APIService, $modal) {

    $scope.listarControleCadastrados = function() {
        APIService.getData("/controleMudanca/", function(resp) {
            $scope.listaControleMudancas = resp.data;
        });
    }

    $scope.form = {
        num_os: 'OS573',
        sistema: 'SGI',
        solicitante: 'Rafael Queiroz Gonçalves',
        unidade: 'DTI',
        tecnologia: 'JAVA',
        detalhamentos: [],
        analista: $rootScope.Usuario.name,
        profissional_alocado: 1,
        tempo_gasto: 4,
        tempo_gasto_medida: 'Hora(s)',
    }

    $scope.salvar = function() {
        APIService.postData("/controleMudanca", $scope.form, function(resp) {
            goto("/controle_mudancas");
        });
    }

    $scope.addDetalhamento = function() {
        $modal({
            title: 'My Title',
            templateUrl: 'app/views/Projects/ControleMudancas/cadastro_detalhamento_modal.html',
            show: true,
            scope: $scope,
        });
    }
});