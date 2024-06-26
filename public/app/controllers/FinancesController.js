app.controller("FinancesController", function ($scope, $routeParams, $resource, APIService, $modal, Upload, $location) {
    $scope.versao = "F 1.0.1";
    $scope.form = {};
    $scope.filtro = {};

    ///############################################################################################
    ///############################################################################################
    $scope.init = function() {
        $scope.idProject = $routeParams.id;

        $scope.incomeEntries = [
            { id: 1, totalHours: 60, hourPrice: 20, dueDate: '2023-05-15', paidDate: '2023-05-16' },
            { id: 2, totalHours: 80, hourPrice: 20, dueDate: '2023-05-31', paidDate: null }
        ];

        $scope.incomesList = [];

        $scope.gridOpts = {
            enableGridMenu: true,
            columnDefs: [
                { name: 'titulo' },
                { name: 'data_vencto', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'' },
                { name: 'valor', type: 'currency', cellFilter: 'currency' },
                { name: 'pago', cellFilter: 'boolean' },
                { name: 'type', displayName: "Tipo", cellFilter: 'finance_type_item' }
            ],
            data: $scope.incomesList
        };
    }
    ///############################################################################################
    $scope.initTestModal = function() {
        $scope.form.hour_price = 20;
        APIService.getData(`/project/${$scope.idProject}/unpaidEntries`, function (res) {
            $scope.unpaidEntries = res.data;
        });
    }
    ///############################################################################################
    $scope.initDashboard = function() {
        APIService.getData("/finances/dashboard/accounts", function(resp) { $scope.dashboardAccountsList = resp.data; });
        //APIService.getData("/finances/dashboard/accountsIncome", function (resp) { $scope.dashboardAccountsIncList = resp.data; });
    }
    ///############################################################################################
    ///############################################################################################
    $scope.reloadFinancialTab = function() {
        $scope.paymentsList = $resource("/api/v1/finances/payments").query();
        $scope.incomesList = $resource("/api/v1/finances/receipts").query();
    }
    ///############################################################################################
    $scope.openModalFinanceMovement = function() {
        $scope.form = {};
        $scope.paymentTypesList = $resource("/api/v1/finances/paymentTypes").query();
        $modal({
            title: 'My Title',
            templateUrl: 'app/views/Finances/Modals/ModalFinanceMovement.html',
            show: true,
            scope: $scope,
        });
    }
    ///############################################################################################
    $scope.saveFinanceMovement = function(form) {
        console.log(form);
        if (form.tipo_operacao == 1) {
            APIService.postData("/finances/payments", form, function (resp) {
                if (resp.data > 0) {
                    $scope.reloadFinancialTab();
                    $scope.loadCashFlow();
                }
            });
        } else {
            APIService.postData("/finances/receipts", form, function (resp) {
                if (resp.data > 0) {
                    $scope.reloadFinancialTab();
                    $scope.loadCashFlow();
                }
            });
        }
    }
    ///############################################################################################
    ///############################################################################################
    $scope.generatePaymentInvoice = function() {
        $scope.form = {};
        $scope.unpaidEntries2 = $scope.projectInfo.timeEntries.filter(e => e.pago == 0);
        console.log($scope.unpaidEntries2);
        $scope.form.hour_price = $scope.projectInfo.valor_hora;

        $modal({
            controller: function ($scope) {
                $scope.cancel = function () {
                    //$modalInstance.dismiss('cancel');
                };
                $scope.ok = function () {
                    //$modalInstance.close();
                };
            }, 
            templateUrl: 'app/views/Modals/ModalFinanceInvoice.html', show: true });
        //*/
    }
    ///############################################################################################
    $scope.unpaidEntries = [];
    $scope.getUnpaidEntries = function() {
        APIService.getData(`/project/${$scope.idProject}/unpaidEntries`, function(res) {
            $scope.unpaidEntries = res.data;
        });
        //$scope.unpaidEntries = $scope.projectInfo.timeEntries.filter(e => e.pago == 0);
    }
    ///############################################################################################
    $scope.saveFinanceInvoice = function(form) {
        console.log(form);
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    $scope.loadCashFlow = function() {
        APIService.getData("/finances/cashFlow", function(resp) {
            $scope.incomesList = resp.data;
            $scope.sumarioCashFlowFilter();
        });
    }
    ///############################################################################################
    $scope.dateOpts = {
        dateFormat: 'd/m/Y',
        altInput: true,
        placeholder: 'Change date..', // Default: 'Select Date..'
        //defaultDate: moment().startOf('month').format("DD/MM/YYYY"),
        onChange: function (selectedDates, dateStr, instance) {
            // Do stuff on change
        }
    };

    $scope.datePostSetup = function (fpItem) {
        console.log('flatpickr', fpItem);
    }
    ///############################################################################################
    $scope.initCashFlowView = function() {
        $scope.paymentTypesList = $resource("/api/v1/finances/paymentTypes").query(); 
        $scope.financesCategoriesList = $resource("/api/v1/finances/categories").query(); 
        
        $scope.filtro.data_inicio = moment().startOf('month').format("DD/MM/YYYY");
        $scope.filtro.data_termino = moment().endOf('month').format("DD/MM/YYYY");

        var data1 = moment($scope.filtro.data_inicio, "DD/MM/YYYY").format("YYYY-MM-DD");
        var data2 = moment($scope.filtro.data_termino, "DD/MM/YYYY").format("YYYY-MM-DD");
        var temp = { inicio: data1, termino: data2 };
        if ($scope.filtro.forma_pagamento) {
            temp.conta = $scope.filtro.forma_pagamento;
        }
        const u = new URLSearchParams(temp).toString();
        dataTable = new DataTable('#example', {
            ajax: { url: "api/v1/finances/cashFlow?"+u, dataSrc: "" },
            columns: [
                { data: 'titulo', title: 'Titulo' },
                { data: 'data_vencimento2', title: 'Data Vencimento' },
                {
                    data: 'valor2',
                    title: 'Valor',
                    render: function (data, type) {
                        var number = DataTable.render
                            .number(',', '.', 2, '$')
                            .display(data);

                        if (type === 'display') {
                            let color = 'green';
                            if (data < 0) {
                                color = 'red';
                            }
                            return `<span style="color:${color}">${number}</span>`;
                        }
                        return number;
                    }
                },
                { 
                    data: 'pago', 
                    title: 'Pago',
                    render: function (data, type) {
                        if (data == 1) { return 'Sim'; }

                        return 'Não';
                    }
                }
            ]
        });

        $scope.filtrar();

        $scope.gridOpts = {
            enableGridMenu: true,
            columnDefs: [
                { name: 'titulo' },
                { name: 'data_vencimento', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'' },
                { name: 'valor', type: 'currency', cellFilter: 'currency' },
                { name: 'pago', cellFilter: 'boolean' },
                { name: 'type', displayName: "Tipo", cellFilter: 'finance_type_item' }
            ],
            data: $scope.incomesList
        };
    }
    ///############################################################################################
    $scope.criarDataTable = function(data) {
        
    }
    let dataTable = null;
    ///############################################################################################
    $scope.filtrar = function() {
        var data1 = moment($scope.filtro.data_inicio,"DD/MM/YYYY").format("YYYY-MM-DD");
        var data2 = moment($scope.filtro.data_termino, "DD/MM/YYYY").format("YYYY-MM-DD");
        var temp = { inicio: data1, termino: data2 };
        if ($scope.filtro.forma_pagamento) {
            temp.conta = $scope.filtro.forma_pagamento;
        }
        const u = new URLSearchParams(temp).toString();
        
        //*
        APIService.getData("/finances/cashFlow?" + u, function (resp) {
            $scope.incomesList = resp.data;
            //$scope.criarDataTable(resp.data);
            $scope.sumarioCashFlowFilter();
            dataTable.clear();
            dataTable.rows.add($scope.incomesList);
            dataTable.draw();
        });
        //*/
    }
    ///############################################################################################
    $scope.sumarioCashFlowFilter = function() {
        let list = [];
        if ($scope.filtro.forma_pagamento > 0) {
            list = $scope.incomesList.filter(e => e.forma_pagamento === $scope.filtro.forma_pagamento);
        } else {
            list = $scope.incomesList;
        }
        
        var totalIncomes = 0;
        var totalExpenses = 0;
        list.map(function(item) {
            if (item.type == '1') { totalIncomes += item.valor; }
            if (item.type == '2') { totalExpenses += item.valor; }
        });

        let flow = totalIncomes - totalExpenses;
        $scope.results = {
            flow: flow,
            incomes: totalIncomes,
            expenses: totalExpenses
        };
    }
    ///############################################################################################
    $scope.marcarItemPago = function(item) {
        item.fields = [
            { field: 'status', value: 1 }
        ];
        APIService.putData("/finances/payments", item, function(resp) {
            $scope.filtrar();
        });
    }
    ///############################################################################################
    $scope.testeRelatorioOFX = function() {
        APIService.getData("/../ofx/upload", function(resp) {
            $scope.infoOFX = resp.data;
        });
    }
    ///############################################################################################
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/v1/sistema/upload',
            data: { file: file, url: $location.$$url }
        }).then(function (resp) {
            $scope.infoOFX = resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    ///############################################################################################
    $scope.exportXLS = function() {
        alasql('SELECT * INTO XLSX("exportacao.xlsx",{headers:true}) FROM ?', [$scope.infoOFX.transacoes]);
    }
    ///############################################################################################
    $scope.gerarBarcode = function() {
        let codigo = $scope.codigo;
        //JsBarcode("#barcode", codigo);
        JsBarcode("#barcode", codigo, { format: "ean8" });
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    //$scope.init();
});
///#########################################################################################################################
///#########################################################################################################################
app.controller("FinancesInvoicesCtrl", function ($scope, APIService) {
    $scope.form = {};

    $scope.init = function () {
        $scope.form.value = 10000;
        $scope.form.date = moment().subtract(1, 'M').toDate();
    }

    $scope.generateInvoicePDF = function () {
        const startOfMonth = moment($scope.form.date).startOf('month').format('YYYY-MM-DD hh:mm:ss');
        const endOfMonth = moment($scope.form.date).endOf('month').format('YYYY-MM-DD hh:mm:ss');
        const issueDate = moment(endOfMonth).add(2, 'days').format('YYYY-MM-DD hh:mm:ss');
        const dueDate = moment(endOfMonth).add(16, 'days').format('YYYY-MM-DD hh:mm:ss');
        var info = {
            startOfMonth,
            endOfMonth,
            issueDate,
            dueDate,
            amount: $scope.form.value
        };
        APIService.postData("/../generateInvoice", info, function (resp) {

        });
    }

    $scope.init();
});
///#########################################################################################################################
app.controller("FinancesCategoriesCtrl", function ($scope, APIService, $modal){
    $scope.form = {};

    var modalCategory = $modal({ templateUrl: 'app/views/Finances/Modals/ModalNovaCategoria.html', show: false, scope: $scope, });
    ///############################################################################################
    $scope.init = function () {
        APIService.getData("/finances/accounts/categories", function (resp) { $scope.categoriesList = resp.data; });
    }
    ///############################################################################################
    $scope.novaCategoriaModal = function () {
        $scope.form.id_pai = null;
        modalCategory.show();
    }
    ///############################################################################################
    $scope.addCategoriaFilho = function(item) {
        $scope.form.id_pai = item.id;
        $scope.form.tipo_operacao = item.tipo;
        $scope.form.nome = item.nome + " / ";
        modalCategory.show();
    }
    ///############################################################################################
    $scope.salvarCategoria = function(form) {
        APIService.postData("/finances/accounts/categories", form, function (resp) {
            $scope.form = {};
            modalCategory.hide();
            $scope.init();
        });
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    
    $scope.init();
});
///#########################################################################################################################
var modalAccount;
var modalCategory;
var modalMovement;

app.controller("FinancesDashboard", function ($scope, $rootScope, $routeParams, $resource, APIService, $modal) {
    $scope.form = {};

    modalAccount = $modal({ templateUrl: 'app/views/Finances/Modals/ModalFinanceAccount.html', show: false, scope: $scope, });
    modalCategory = $modal({ templateUrl: 'app/views/Finances/Modals/ModalFinanceCategory.html', show: false, scope: $scope, });
    modalMovement = $modal({ templateUrl: 'app/views/Finances/Modals/ModalFinanceMovement.html', show: false, scope: $scope, });

    $scope.calcularSaldo = function(item, idx) {
        var saldo = 0;
        if(idx == 0) {
            saldo = $scope.relatorio.saldo_inicial + item.valor;
        } else {
            var temp = $scope.relatorio.lancamentos[idx - 1];
            console.log(temp);
            saldo = $scope.relatorio.lancamentos[idx - 1].saldo + item.valor;
        }
        item.saldo = saldo;
        return ""+saldo;
    }

    ///############################################################################################
    $scope.$on("updateListTasks", function () {
        APIService.getData("/finances/accounts/2/movimentacoes", function (resp) {
            $scope.movimentacoesContaList = resp.data;
            for (var i = 0; i < $scope.movimentacoesContaList.length; i++) {
                var saldo = 0;
                var item = $scope.movimentacoesContaList[i];
                if (i == 0) {
                    saldo = $scope.relatorio.saldo_inicial + item.valor;
                } else {
                    saldo = parseFloat($scope.movimentacoesContaList[i - 1].saldo) + parseFloat(item.valor);
                }
                $scope.movimentacoesContaList[i].saldo = saldo;
            }
        });
    });
    ///############################################################################################
    $scope.init = function () {
        APIService.getData("/finances/dashboard/accounts", function (resp) { 

            $scope.dashboardAccountsList = resp.data;

            $scope.dashboardAccountsList.forEach(element => {
                //element.banco = JSON.parse(element.banco);
            });
        });
        APIService.getData("/finances/report/categoryCards", function (resp) { $scope.dashboardCategoryCards = resp.data; });
        APIService.getData("/finances/accounts", function (resp) { $scope.accountsList = resp.data; });
        APIService.getData("/finances/accounts/categories", function (resp) { $scope.categoriesList = resp.data; });
        APIService.getData("/finances/accounts/2/movimentacoes", function (resp) { 
            $scope.movimentacoesContaList = resp.data; 
            for (var i = 0; i < $scope.movimentacoesContaList.length; i++) {
                var saldo = 0;
                var item = $scope.movimentacoesContaList[i];
                if (i == 0) {
                    saldo = $scope.relatorio.saldo_inicial + item.valor;
                } else {
                    saldo = parseFloat($scope.movimentacoesContaList[i - 1].saldo) + parseFloat(item.valor);
                }
                $scope.movimentacoesContaList[i].saldo = saldo;
            }
        });
        
        $scope.relatorio = {
            saldo_inicial: 0,
            lancamentos: [
                {
                    "id": 182272367,
                    "descricao": "Santissima Gula",
                    "conciliado": false,
                    "dataCompetencia": "2023-08-01",
                    "status": "confirmado",
                    "tipo": "d",
                    "valor": -34.34,
                    "valorPrevisto": -34.34,
                    "valorEfetivo": -34.34,
                    "data": "2023-08-01",
                    "dataPrevista": "2023-08-01",
                    "dataEfetiva": "2023-08-01",
                    "dataCriacao": "2023-08-30T09:13:55-03:00",
                    "exibirCp": true,
                    "exibirCr": true,
                    "labels": ['Conta Corrente', 'Alimentação/Padaria'],
                    "permissoes": {
                        "visivel": true,
                        "acoes": {
                            "conciliar": true,
                            "confirmar": true,
                            "editar": true,
                            "excluir": true,
                            "clonar": true
                        }
                    },
                    "dataReconhecimento": "2023-08-01",
                    "estorno": false,
                    "conta": 1136507,
                    "categoria": 25287459,
                    "categoriaPai": 25287448,
                    "observacoes": "",
                    "ndocumento": "",
                    "lembrete": 0,
                    "automatico": false,
                    "regime": "ca"
                },
                {
                    "id": 182273019,
                    "descricao": "Transferencia Dilson Sordi",
                    "conciliado": false,
                    "dataCompetencia": "2023-08-01",
                    "status": "confirmado",
                    "tipo": "r",
                    "valor": 200,
                    "valorPrevisto": 200,
                    "valorEfetivo": 200,
                    "data": "2023-08-01",
                    "dataPrevista": "2023-08-01",
                    "dataEfetiva": "2023-08-01",
                    "dataCriacao": "2023-08-30T09:16:31-03:00",
                    "exibirCp": true,
                    "exibirCr": true,
                    "labels": ['Conta Corrente','Outras Receitas'],
                    "permissoes": {
                        "visivel": true,
                        "acoes": {
                            "conciliar": true,
                            "confirmar": true,
                            "editar": true,
                            "excluir": true,
                            "clonar": true
                        }
                    },
                    "estorno": false,
                    "conta": 1136507,
                    "categoria": 25287194,
                    "observacoes": "",
                    "ndocumento": "",
                    "lembrete": 0,
                    "automatico": false,
                    "regime": "ca"
                },
                {
                    "id": 182272133,
                    "descricao": "CELESC",
                    "conciliado": false,
                    "dataCompetencia": "2023-09-02",
                    "status": "agendado",
                    "tipo": "d",
                    "valor": -181.34,
                    "valorPrevisto": -181.34,
                    "data": "2023-09-02",
                    "dataPrevista": "2023-09-02",
                    "dataCriacao": "2023-08-30T09:11:41-03:00",
                    "exibirCp": true,
                    "exibirCr": true,
                    "permissoes": {
                        "visivel": true,
                        "acoes": {
                            "conciliar": true,
                            "confirmar": true,
                            "editar": true,
                            "excluir": true,
                            "clonar": true
                        }
                    },
                    "agendaId": 27242243,
                    "estorno": false,
                    "conta": 1136507,
                    "categoria": 25287181,
                    "observacoes": "",
                    "ndocumento": "",
                    "lembrete": 0,
                    "automatico": false,
                    "regime": "ca"
                }
            ]
        };

    }

    $scope.testeOFX = function() {
        APIService.getData("/finances/accounts/testeOFX", function (resp) { $scope.ofxList = resp.data; });
    }

    $scope.lancarItem = function(item) {
        $scope.form.titulo = item.MEMO;
        if (item.TRNAMT < 0) {
            $scope.form.tipo_operacao = "1";
            $scope.form.valor = item.TRNAMT * -1;
        } else {
            $scope.form.tipo_operacao = "2";
            $scope.form.valor = item.TRNAMT;
        }
        $scope.filtrarCategorias( parseInt($scope.form.tipo_operacao));
        
        let tempData = item.FITID.substr(0, 4) + "-" + item.FITID.substr(4, 2) + "-" + item.FITID.substr(6,2);
        $scope.form.data_vencimento  = new Date(tempData+"T12:00:00.0Z");
        
        console.log($scope.form);
    }

    $scope.showModalCreateAccount = function()      { modalAccount.show(); }
    $scope.showModalCreateCategory = function ()    { modalCategory.show(); }
    $scope.showModalCreateMovement = function ()    { modalMovement.show(); }

    $scope.init();
});
///#########################################################################################################################
app.controller("FinancesAddAccount", function ($scope, $rootScope, $routeParams, $resource, APIService, $modal) {
    $scope.form = {};

    $scope.tiposContasBancarias = [
        { id: 1, nome: 'Conta Corrente' },
        { id: 2, nome: 'Conta Poupança' },
        { id: 3, nome: 'Conta Salário' },
        { id: 4, nome: 'Cartão Crédito' },
    ];

    $scope.listaBancos = [];

    $scope.init = function () {
        APIService.getData("/cadastros/contas/moedas", function (resp) { 
                $scope.listaMoedas = resp.data; 
        });

        APIService.getData("/cadastros/contas/bancos", function (resp) {
                $scope.listaBancos = resp.data; 
        });
    }

    $scope.salvarContaBancaria = function(form) {
        //console.log(form); return;
        APIService.postData("/finances/accounts", form, function(resp) {
            modalAccount.hide();
            $scope.form = {};
        });
    }

    $scope.init();
});
///#########################################################################################################################
app.controller("FinancesAddMovement", function ($scope, $rootScope, $routeParams, $resource, APIService, $modal) {
    $scope.form = {};

    APIService.getData("/finances/accounts/categories", function (resp) { $scope.categoriesList = resp.data; });
    APIService.getData("/finances/accounts", function (resp) { $scope.accountsList = resp.data; });

    $scope.categoriesListFiltered = [];

    $scope.$watch('form.tipo_operacao', function(newValue, oldValue) {
        $scope.categoriesListFiltered = $scope.categoriesList.filter( e => e.tipo == newValue);
    });

    $scope.salvarMovimentacao = function(form) {
        APIService.postData("/finances/accounts/2/movimentacoes", form, function (resp) {
            $scope.form = {};
            modalMovement.hide();
            $rootScope.$broadcast('updateListTasks');
        });
    }
});
///#########################################################################################################################
app.controller("FinancesAddCategory", function ($scope, $rootScope, $routeParams, $resource, APIService, $modal) {
    $scope.form = {};

    $scope.filtrarCategorias = function(value) {
        if (value == 1) { $scope.filtredCategoriesList = $scope.categoriesList.filter(e => e.tipo == 'D'); }
        if (value == 2) { $scope.filtredCategoriesList = $scope.categoriesList.filter(e => e.tipo == 'C'); }
    }

    $scope.salvarCategoria = function(form) {
        APIService.postData("/finances/accounts/categories", form, function(resp) {
            $scope.form = {};
            modalCategory.hide();
            $scope.init();
        });
    }
});
///#########################################################################################################################
///#########################################################################################################################
///#########################################################################################################################
///#########################################################################################################################
///#########################################################################################################################