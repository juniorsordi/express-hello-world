app.controller("G4FCtrl", function ($scope, $rootScope, APIService, $modal) {

    $scope.listarControleCadastrados = function() {
        APIService.getData("/g4f/controleMudanca/", function(resp) {
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
        APIService.postData("/g4f/controleMudanca", $scope.form, function(resp) {
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

    $scope.listaOS = [
        { 
            id: 1, 
            id_contrato: 1, 
            id_empresa: 1, 
            id_usuario_responsavel: 1, 
            sistema: 'ESIPROC', 
            metodo_contagem: '', 
            tipo_contagem: '', 
            flag_cfps: false, 
            data_contagem: new Date(),
            id_tecnologia: 1, 
            duracao_intereacao: '', 
            qtde_postos_trabalho: '', 
            meta_pf: '', 
            total_pf_bruto: '', 
            total_pf_liquido: '', 
            proposito: '', 
            escop: '', 
            fronteira: '', 
            observacao: '', 
            id_usuario_cadastro: 1, 
            data_cadastro: new Date(), 
        }
    ];

    $scope.gridOptions = {
        columnDefs: [
            { field: 'id_contrato', displayName: 'Campo 1' },
            { field: 'id_empresa', displayName: 'Campo 2' },
            { field: 'sistema', displayName: 'Campo 3' },
            { field: 'metodo_contagem', displayName: 'Campo 4' },
            { field: 'tipo_contagem', displayName: 'Campo 5' },
            { field: 'data_contagem', displayName: 'Campo 6', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'' }
        ],
        data: $scope.listaOS,
		enableRowSelection: true,
	    enableRowHeaderSelection: false,
		rowHeight: 35,
		showGridFooter:false,
		appScopeProvider: $scope,
		enableGridMenu: true,
		exporterMenuPdf: false,
		exporterMenuExcel: false,
		exporterCsvFilename: 'report.csv',
    	exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
		onRegisterApi: function(gridApi){
      		$scope.gridApi = gridApi;
    	}
	};

    
});
///##################################################################################################################################
app.controller('G4FRHCtrl', function ($scope, $rootScope, $routeParams, APIService, $window, $resource, $modal, $translate) {

    $scope.listarUltimasBatidas = function() {
        APIService.getData("/g4f/rh/ponto/ultimos", function(resp) {
            $scope.listaPonto = resp.data;
        })
    }

    $scope.initDashboard = function() {
        APIService.getData("/g4f/rh/dashboard", function(resp) {
            $scope.dadosDashboard = resp.data;
        })
    }

    $scope.registrarBatidaPonto = function() {
        APIService.postData("/g4f/rh/ponto/bater", {}, function(resp) {
            $scope.listarUltimasBatidas();
        })
    }
});
///##################################################################################################################################
///##################################################################################################################################
///##################################################################################################################################