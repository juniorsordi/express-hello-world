app.controller("FinancesController", function ($scope, $routeParams, $resource, APIService, $http, $uibModal, $modal, $ocModal, Upload) {
    $scope.versao = "F 1.0.1";
    $scope.form = {};
    $scope.filtro = {};

    ///############################################################################################
    var columnDefs1 = [
        { name: 'firstName' },
        { name: 'lastName' },
        { name: 'company' },
        { name: 'gender' }
    ];

    var data1 = [
        {
            "firstName": "Cox",
            "lastName": "Carney",
            "company": "Enormo",
            "gender": "male"
        },
        {
            "firstName": "Lorraine",
            "lastName": "Wise",
            "company": "Comveyer",
            "gender": "female"
        },
        {
            "firstName": "Nancy",
            "lastName": "Waters",
            "company": "Fuelton",
            "gender": "female"
        },
        {
            "firstName": "Misty",
            "lastName": "Oneill",
            "company": "Letpro",
            "gender": "female"
        }
    ];
    ///############################################################################################
    $scope.init = function() {
        $scope.idProject = $routeParams.id;

        $scope.incomeEntries = [
            { id: 1, totalHours: 60, hourPrice: 20, dueDate: '2023-05-15', paidDate: '2023-05-16' },
            { id: 2, totalHours: 80, hourPrice: 20, dueDate: '2023-05-31', paidDate: null }
        ];
        //$scope.reloadFinancialTab();

        $scope.incomesList = [];//$resource("/api/v1/finances/cashFlow").query();

        $scope.gridOpts = {
            enableGridMenu: true,
            /*
            enableSelectAll: true,
            exporterCsvFilename: 'myFile.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            exporterExcelFilename: 'myFile.xlsx',
            exporterExcelSheetName: 'Sheet1',
            //*/
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
    $scope.reloadFinancialTab = function() {
        $scope.paymentsList = $resource("/api/v1/finances/payments").query();
        $scope.incomesList = $resource("/api/v1/finances/receipts").query();
    }
    ///############################################################################################
    $scope.openModalFinanceMovement = function() {
        $scope.form = {};
        $scope.paymentTypesList = $resource("/api/v1/finances/paymentTypes").query(); 
        //$scope.form.type = type;
        $modal({
            title: 'My Title',
            templateUrl: 'app/views/Finances/Modals/ModalFinanceMovement.html',
            show: true,
            scope: $scope,
        });
    }
    ///############################################################################################
    $scope.saveFinanceMovement = function(form) {
        //$hide();
        console.log(form);
        if (form.tipo_operacao == 1) {
            APIService.postData("/finances/payments", form, function (resp) {
                if (resp.data > 0) {
                    $scope.reloadFinancialTab();
                    $scope.loadCashFlow();
                    //$hide();
                }
            });
        } else {
            APIService.postData("/finances/receipts", form, function (resp) {
                if (resp.data > 0) {
                    $scope.reloadFinancialTab();
                    $scope.loadCashFlow();
                    //$hide();
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
        
       
        /*
        myModal = new bootstrap.Modal(document.getElementById("ModalFinanceInvoice"), { backdrop: true });
        myModal.show();
        ///*/
        //*
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
        /*
        $ocModal.open({
            url: 'app/views/Modals/ModalFinanceInvoice.html',
            cls: 'test fade-in',
            onOpen: function () {
                console.log('modal1 opened from url');
                $scope.temp = $scope.projectInfo;
                console.log($scope.temp);
                console.log($scope.temp.valor_hora);
                $scope.form.hour_price = $scope.temp.valor_hora;
            }
        })
        /*
        $modal.open({
            templateUrl: 'app/views/Modals/ModalFinanceInvoice.html',
            backdrop: 'static',
            keyboard: false,
            controller: function ($scope, $modalInstance) {
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
        //*/
        /*
        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/Modals/ModalFinanceInvoice.html',
            controller: 'ModalContentCtrl',
            size: 'lg'
        });
        ///
        modalInstance.result.then(function () {
            //$scope.complexResult = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
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
        //$scope.filtro.forma_pagamento = -1;
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
            //processing: true,
            //serverSide: true,
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
        $("#data1").focus().select();
        $("#data2").focus().select();
        $("#account").focus().select();

        setTimeout(function() {
            //const dataTable = new DataTable("#datatable_1", { searchable: !0, fixedHeight: !1 });
            //let table = new DataTable('#datatable_1');
        }, 300);
        
        /*
        APIService.getData("/finances/exchangeRates", function(resp) {
            $scope.exchange = resp.data;
        });
        //*/

        $scope.gridOpts = {
            enableGridMenu: true,
            /*
            enableSelectAll: true,
            exporterCsvFilename: 'myFile.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            exporterExcelFilename: 'myFile.xlsx',
            exporterExcelSheetName: 'Sheet1',
            //*/
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
            { field: 'pago', value: 1 }
        ];
        APIService.putData("/finances/payments", item, function(resp) {
            $scope.loadCashFlow();
        });
    }
    ///############################################################################################
    $scope.testeRelatorioOFX = function() {
        APIService.getData("/../ofx/upload", function(resp) {
            $scope.infoOFX = resp.data;
        })
    }
    ///############################################################################################
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/ofx/upload',
            data: { file: file }
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

    $scope.init();
});
///#########################################################################################################################
app.controller("FinancesInvoicesCtrl", function ($scope, $routeParams, $resource, APIService, $uibModal, $modal, $ocModal) {
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
var modalAccount;
var modalCategory;
var modalMovement;

app.controller("FinancesDashboard", function ($scope, $rootScope, $routeParams, $resource, APIService, $modal) {
    $scope.form = {};

    modalAccount = $modal({ templateUrl: 'app/views/Finances/Modals/ModalFinanceAccount.html', show: false, scope: $scope, });
    modalCategory = $modal({ templateUrl: 'app/views/Finances/Modals/ModalFinanceCategory.html', show: false, scope: $scope, });
    modalMovement = $modal({ templateUrl: 'app/views/Finances/Modals/ModalFinanceMovement.html', show: false, scope: $scope, });

    $scope.myConfigCB = {
        valueField: 'id',
        labelField: 'nome',
        searchField: 'nome',
        sortField: 'nome',
        maxItems: 1,
        //options: resp.data,
        render: {
            item: function (item, escape) {
                return '<div>'
                    + '<img src="https://s3.amazonaws.com/img.meudinheiroweb.com.br/bankicons/' + item.banco.img + '.jpg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                    + '<span>&nbsp;' + item.nome + '</span> '
                    + '</div>';
            },
            option: function (item, escape) {
                return '<div>'
                    + '<img src="https://s3.amazonaws.com/img.meudinheiroweb.com.br/bankicons/' + item.banco.img + '.jpg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                    + '<span>&nbsp;' + item.nome + '</span> '
                    + '</div>';
            }
        },
    }

    $scope.employees = [{ "id": "1", "employee_name": "Albano", "employee_salary": "222", "employee_age": "38", "profile_image": "" }, 
    { "id": "2", "employee_name": "Lemos", "employee_salary": "89", "employee_age": "50", "profile_image": "" }, 
    { "id": "3", "employee_name": "Carla", "employee_salary": "0", "employee_age": "0", "profile_image": "" }, 
    { "id": "4", "employee_name": "albano", "employee_salary": "439", "employee_age": "255", "profile_image": "" }, 
    { "id": "5", "employee_name": "Paula", "employee_salary": "50", "employee_age": "53", "profile_image": "" }, 
    { "id": "6", "employee_name": "test", "employee_salary": "1111", "employee_age": "111111", "profile_image": "" }, 
    { "id": "7", "employee_name": "Junior-codigo", "employee_salary": "137500", "employee_age": "605", "profile_image": "" }, 
    { "id": "8", "employee_name": "Rhona Davidson", "employee_salary": "327900", "employee_age": "55", "profile_image": "" }, 
    { "id": "9", "employee_name": "ori", "employee_salary": "1", "employee_age": "25", "profile_image": "" }, 
    { "id": "10", "employee_name": "Sonya \/\/\/Frostdddf", "employee_salary": "2775675678", "employee_age": "23", "profile_image": "" }]

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

            console.log($scope.movimentacoesContaList);
        });
    });
    ///############################################################################################

    $scope.init = function () {
        APIService.getData("/finances/dashboard/accounts", function (resp) { 

            $scope.dashboardAccountsList = resp.data;

            $scope.dashboardAccountsList.forEach(element => {
                //element.banco = JSON.parse(element.banco);
            });

            /*
            $("#select-console").selectize({
                valueField: 'id',
                labelField: 'nome',
                searchField: 'nome',
                sortField: 'nome',
                options: resp.data,
                render: {
                    item: function (item, escape) {
                        return '<div>'
                            + '<img src="https://s3.amazonaws.com/img.meudinheiroweb.com.br/bankicons/' + item.banco.img + '.jpg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                            + '<span>&nbsp;' + item.nome + '</span> '
                            + '</div>';
                    },
                    option: function (item, escape) {
                        return '<div>'
                            + '<img src="https://s3.amazonaws.com/img.meudinheiroweb.com.br/bankicons/'+ item.banco.img + '.jpg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                            + '<span>&nbsp;' + item.nome + '</span> '
                            + '</div>';
                    }
                },
            });
            //*/
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

            console.log($scope.movimentacoesContaList);
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

    $scope.myConfigCB = {
        valueField: 'id',
        labelField: 'nome',
        searchField: 'nome',
        sortField: 'nome',
        maxItems: 1,
        //options: resp.data,
        render: {
            item: function (item, escape) {
                return '<div>'
                    + '<img src="https://s3.amazonaws.com/img.meudinheiroweb.com.br/bankicons/' + item.banco.img + '.jpg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                    + '<span>&nbsp;' + item.nome + '</span> '
                    + '</div>';
            },
            option: function (item, escape) {
                return '<div>'
                    + '<img src="https://s3.amazonaws.com/img.meudinheiroweb.com.br/bankicons/' + item.banco.img + '.jpg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                    + '<span>&nbsp;' + item.nome + '</span> '
                    + '</div>';
            }
        },
    }

    $scope.tiposContasBancarias = [
        { id: 1, nome: 'Conta Corrente' },
        { id: 2, nome: 'Conta Poupança' },
        { id: 3, nome: 'Conta Salário' },
        { id: 4, nome: 'Cartão Crédito' },
    ];

    $scope.listaBancos = [
        { "nome": "Banco do Brasil S.A.", "img": "bb-2", "tipo": ["CONTA CORRENTE", "OUTROS", "INVESTIMENTO"], "id": 1 }, 
        { "nome": "Banco Inter S.A.", "img": "inter", "tipo": ["CONTA CORRENTE", "OUTROS", "INVESTIMENTO"], "id": "077" }, 
        { "nome": "Nubank", "img": "nubank2", "tipo": ["CARTAOCREDITO"], "id": "nubank" }, 
        { "nome": "C6 Bank", "img": "c6-2", "tipo": ["OUTROS"], "id": "c6bank" }
    ];

    $scope.people = [
        { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
        { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
        { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
        { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
        { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
        { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
        { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
        { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
        { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
        { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
    ];

    $scope.init = function () {
        console.log("Modal opening");
        APIService.getData("/cadastros/contas/moedas", function (resp) { 
                $scope.listaMoedas = resp.data; 

                $scope.configMoedas = {
                    valueField: 'id',
                    labelField: 'nome',
                    searchField: 'nome',
                    maxItems: 1,
                    options: $scope.listaMoedas,
                    render: {
                        item: function (item, escape) {
                            return '<div>'
                                + '<img src="assets/img/bandeiras/' + item.id + '.svg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                                + '<span>&nbsp;' + item.nome + '</span> '
                                + '</div>';
                        },
                        option: function (item, escape) {
                            return '<div>'
                                + '<img src="assets/img/bandeiras/' + item.id + '.svg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                                + '<span>&nbsp;' + item.nome + '</span> '
                                + '</div>';
                        }
                    },
                };
        });

        APIService.getData("/cadastros/contas/bancos", function (resp) {
                $scope.listaBancos = resp.data; 

                $scope.myConfig = {
                    valueField: 'id',
                    labelField: 'nome',
                    searchField: 'nome',
                    maxItems: 1,
                    options: resp.data,
                    render: {
                        item: function (item, escape) {
                            return '<div>'
                                + '<img src="https://s3.amazonaws.com/img.meudinheiroweb.com.br/bankicons/' + item.img + '.jpg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                                + '<span>&nbsp;' + item.nome + '</span> '
                                + '</div>';
                        },
                        option: function (item, escape) {
                            return '<div>'
                                + '<img src="https://s3.amazonaws.com/img.meudinheiroweb.com.br/bankicons/' + item.img + '.jpg" alt="" style="width: 25px; height: 25px;border-radius: 100%;" />'
                                + '<span>&nbsp;' + item.nome + '</span> '
                                + '</div>';
                        }
                    },
                }
        });
    }

    $scope.salvarContaBancaria = function(form) {
        console.log(form); return;
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

    $scope.salvarMovimentacao = function(form) {
        //console.log(form);
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