app.controller("FinancesController", function ($scope, $routeParams, $resource, APIService, $uibModal, $modal, $ocModal) {
    $scope.versao = "F 1.0.1";
    $scope.form = {};

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

        $scope.incomesList = $resource("/api/v1/finances/cashFlow").query();

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
    $scope.reloadFinancialTab = function() {
        $scope.paymentsList = $resource("/api/v1/finances/payments").query();
        $scope.incomesList = $resource("/api/v1/finances/receipts").query();
    }
    ///############################################################################################
    $scope.openModalFinanceMovement = function(type) {
        $scope.form = {};

        $scope.form.type = type;
        $modal({
            title: 'My Title',
            template: 'app/views/Modals/ModalFinanceMovement.html',
            show: true,
            scope: $scope,
        });
    }
    ///############################################################################################
    $scope.saveFinanceMovement = function(form) {
        //$hide();
        console.log(form);
        if(form.type == 1) {
            APIService.postData("/finances/payments", form, function (resp) {
                if (resp.data.affectedRows > 0) {
                    $scope.reloadFinancialTab();
                    //$hide();
                }
            });
        } else {
            APIService.postData("/finances/receipts", form, function (resp) {
                if (resp.data.affectedRows > 0) {
                    $scope.reloadFinancialTab();
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
///#########################################################################################################################
///#########################################################################################################################