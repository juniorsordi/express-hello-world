app.controller("G4FCtrl", function ($scope, $rootScope, $routeParams, APIService, $modal) {

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
        profissional_alocado: 1,
        tempo_gasto: 4,
        tempo_gasto_medida: 'Hora(s)',
    }

    $scope.salvar = function() {
        APIService.postData("/g4f/controleMudanca", $scope.form, function(resp) {
            if(resp.data.id){
                goto("/controle_mudancas");
            }
        });
    }

    $scope.addDetalhamento = function(item) {
        $scope.form.id_controle_mudanca = item.id;
        APIService.getData("/g4f/controleMudanca/"+item.id+"/detalhamento", function(resp) { $scope.arrDetalhamento = resp.data; });
        $modal({
            title: 'My Title',
            templateUrl: 'app/views/G4F/ControleMudancas/cadastro_detalhamento_modal.html',
            show: true,
            size: 'lg',
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

    $scope.initListagemOS = function() {
        $scope.keys = Object.keys($scope.listaOS[0]);
        APIService.getData("/g4f/ordemServico", function(resp) {
            $scope.listaOS2 = resp.data;
        })
    }

    $scope.initCadOS = function() {
        $scope.form = {};
        $scope.listarTecnologias();
        $scope.listarAnalistas();
        APIService.getData("/g4f/sistema/listagemSimples?tabela=empresa_cliente", function(resp) { $scope.arrClientes = resp.data; })
    }

    $scope.salvarOS = function(form) {
        console.log(form);
        form.id_empresa = form.id_contrato;
        form.id_usuario_cadastro = $scope.Usuario.id;
        APIService.postData("/g4f/sistema/salvar?tabela=controle_os", form, function(resp) {

        });
    }

    $scope.initCadControleMudanca = function() {
        $scope.form.analista = $scope.Usuario.id,
        $scope.form.num_os = "OS";
        $scope.listarAnalistas();
        $scope.listarTecnologias();
    }
    //
    $scope.gerarControleMudanca = function(item) {
        $rootScope.infoCM = item;
        goto('/relatorio/modelo/1');
    }

    $scope.initRelatorio = function() {
        $scope.data = $rootScope.infoCM;
        console.log($scope.data);
    }

    $scope.gerarDocControleMudanca = function(item) {
        /*
        let url = "../api/v1/g4f/controleMudanca/"+item.id+"?download=1";
        let wd = window.open(url, "_blank");
        setTimeout(() => {
            wd.close();
        }, 200);
        //*/
        APIService.getData("/g4f/controleMudanca/"+item.id+"?download=1", function(resp) {
            if(resp.data.arquivo) {
                window.open("../"+resp.data.arquivo, "_blank");
            }
        });
    }

    $scope.initCadDetCM = function() {
        $scope.form = {};
        $scope.form.id_controle_mudanca = $routeParams.id;
    }

    $scope.salvarDetalhamentoCM = function(form) {
        //*
        APIService.postData("/g4f/controleMudanca/"+form.id_controle_mudanca+"/detalhamento", form, function(resp) {
            if(resp.data.id > 0) {
                goto("/controle_mudancas");
            }
        });
    }

    $scope.salvarDetalhe = function(form) {
        form.id_controle_mudanca = $routeParams.id;

        APIService.postData("/g4f/controleMudanca/"+form.id_controle_mudanca+"/detalhamento", form, function(resp) {

        });
    }

    $scope.listarAnalistas = function() { APIService.getData("/g4f/sistema/usuarios", function(resp) { $scope.arrAnalistas = resp.data; }); }
    $scope.listarTecnologias = function() { APIService.getData("/g4f/sistema/tecnologias", function(resp) { $scope.arrTecnologias = resp.data; }); }
    
});
///##################################################################################################################################
app.controller('G4FDashboardCtrl', function ($scope, APIService) {

    $scope.initDashboard = function() {
        APIService.getData("/g4f/dashboard", function(resp) {
            $scope.dadosDashboard = resp.data;
        })
    }

    $scope.initDashboard();

});
///##################################################################################################################################
app.controller('G4FRHCtrl', function ($scope, APIService) {

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

    $scope.initFerias = function() {
        APIService.getData("/g4f/rh/ferias", function(resp) {
            $scope.dadosFerias = resp.data;
        })
    }

    $scope.registrarBatidaPonto = function() {
        APIService.postData("/g4f/rh/ponto/bater", {}, function(resp) {
            $scope.listarUltimasBatidas();
        })
    }
});
///##################################################################################################################################
app.controller('G4FSistemaCtrl', function ($scope, $rootScope, $routeParams, APIService, $translate, $modal) {

    modalNewUser = $modal({ templateUrl: 'app/views/G4F/Sistema/Modals/ModalNovoUsuario.html', show: false, scope: $scope, });

    $scope.listaUsuarios = function() { 
        APIService.getData("/g4f/sistema/usuarios", function(resp) { $scope.arrUsuarios = resp.data; }); 
    }

    $scope.showModalNewUser = function() { modalNewUser.show(); }

    $scope.salvarNovoUsuario = function(form) {
        APIService.postData("/g4f/sistema/usuarios", form, function(resp) { 
            $scope.arrUsuarios = resp.data; 
        });
    }
});
///##################################################################################################################################
///##################################################################################################################################
///##################################################################################################################################