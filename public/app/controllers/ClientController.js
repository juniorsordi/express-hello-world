app.controller("ClientCtrl", function ($scope, $resource, APIService, $modal, $translate) {

    $scope.form = {
        logo: null
    };

    let myModal = $modal({ templateUrl: 'app/views/Sistema/Modals/ModalClient.html', show: false, scope: $scope, });
    
    $scope.init = function () {
        $scope.arrClients = APIService.resourceQuery("/company/clients");
        $scope.arrCategories = APIService.resourceQuery("/company/categories");
        $scope.arrStatus = APIService.resourceQuery("/company/status");
        $scope.form = {};
    }

    $scope.addNewCategory = function() {
        bootbox.dialog({
            closeButton: true,
            title: "Novo Status",
            message: "Digite o nome da Categoria<br><input id='categoryName' class='form-control' />",
            buttons: {
                cancel: {
                    label: 'Cancelar'
                },
                success: {
                    label: "Salvar",
                    className: 'btn-success',
                    callback: function () {
                        var resp = $("#categoryName").val();
                        if (resp.length > 0 && resp != "") {
                            APIService.postData("/company/categories", { label: resp }, function (resp) {
                                $scope.init();
                            });
                        } else {
                            console.log("ERRO");
                        }
                    }
                }
            }
        });
    }

    $scope.openModalClient = function() {
        myModal.show();
    }

    $scope.saveClient = function(form) {
        APIService.postData("/company/clients", form, function(resp) {
            if (resp) {
                myModal.hide();
                $scope.init();
            }
        })
    }

    $scope.addNewStatus = function () {
        bootbox.dialog({
            closeButton: true,
            title: "Novo Status",
            message: "Digite o nome do Status<br><input id='statusName' class='form-control' />",
            buttons: {
                cancel: {
                    label: 'Cancelar'
                },
                success: {
                    label: "Salvar",
                    className: 'btn-success',
                    callback: function () {
                        var resp = $("#statusName").val();
                        if (resp.length > 0 && resp != "") {
                            APIService.postData("/company/status", { label: resp }, function (resp) {
                                $scope.init();
                            });
                        } else {
                            console.log("ERRO");
                        }
                    }
                }
            }
        });
    }

    $scope.init();
});
///#############################################################################################
app.controller("CompanyUsersCtrl", function($scope, APIService, $modal) {
    $scope.form = {};
    $scope.filtro = {
        ativo: '1'
    };

    $scope.init = function() {
        APIService.getData("/company/users", function(resp) { $scope.arrUsers = resp.data });
    }

    $scope.init();
});
///#############################################################################################
///#############################################################################################
///#############################################################################################
///#############################################################################################