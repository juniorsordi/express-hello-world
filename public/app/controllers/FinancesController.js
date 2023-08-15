app.controller("FinancesController", function ($scope, $routeParams, $resource, APIService, $http, $uibModal, $modal, $ocModal) {
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
app.controller("FinancesDashboard", function ($scope, $routeParams, $resource, APIService, $uibModal, $modal, $ocModal) {
    $scope.form = {};

    $scope.init = function () {
        APIService.getData("/finances/dashboard/accounts", function (resp) { $scope.dashboardAccountsList = resp.data; });
        APIService.getData("/finances/report/categoryCards", function (resp) { $scope.dashboardCategoryCards = resp.data; });
        
    }

    $scope.init();
});
///#########################################################################################################################
///#########################################################################################################################
///#########################################################################################################################