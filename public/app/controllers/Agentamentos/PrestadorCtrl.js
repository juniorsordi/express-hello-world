app.controller('PrestadorCtrl', function ($scope, $rootScope, APIService, $modal) {
    $scope.form = {};

    let modalCadProduto = $modal({ templateUrl: 'app/views/Agendamentos/modal/modalCadastroProduto.html', show: false, scope: $scope, });

    $scope.initPerfilProf = function() {}

    $scope.showModalCadProduto = function() {
        modalCadProduto.show();
    }

    $scope.listarProdutosPrestador = function () {
        APIService.getData('/agendamentos/prestador/' + $scope.user.id + '/produtos', function (resp) {
            $scope.arrProdutos = resp.data.produtos;
        });
    }

    $scope.mudarStatusProduto = function(item) {
        APIService.putData('/agendamentos/prestador/' + $scope.user.id + 'produto/' + item.id, {}, function (resp) {
            $scope.listarProdutosPrestador();
        });
    }

    $scope.excluirProduto = function(item) {
        APIService.deleteData('/agendamentos/prestador/' + $scope.user.id + 'produto/' + item.id, function (resp) {
            $scope.listarProdutosPrestador();
        });
    }

    $scope.salvarProduto = function(form) {
        var id = $scope.user.id;
        APIService.postData(`/prestador/${id}/produto`, form, function (resp) {
            if (resp.data.success) {
                modalCadProduto.hide();
                $scope.listarProdutosPrestador();
            } else {
                $scope.showAlert("warning", resp.data.msg, 5);
            }
        });
    }

});
///##################################################################################################################
app.controller('GymCtrl', function ($scope, $rootScope, APIService, $http, $modal) {

    $scope.form = {
        nome: "",//$scope.user.nome,
        instrutor: 'Fulano de Tal',
        treino: 'HIPERTROFIA',
        sessoes: 100
    };

    $scope.listarAcademias = function() {
        APIService.getData("/gym/list", function(response) {
            $scope.arrAcademias = response.data;
        })
    }

    $scope.selectedState = "";
    $scope.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

    $scope.form2 = {};
    
    $scope.arrTreinos = [
        { id: 1, label: 'A', exercicios: [
            { id: 1, name: 'Puxador Frente', numberEquip: 20, countSeries: 3, repetitions: '15-12-12', weight: 20 }
        ] },
        { id: 2, label: 'B', exercicios: [] },
        { id: 3, label: 'C', exercicios: [] }
    ];

    $scope.treinoLabel = null;
    $scope.exercises = null;
    $scope.selectedIdx = -1;
    $scope.showExercises = function(item, idx) {
        $scope.selectedIdx = idx;
        $scope.treinoLabel =  item.serie;
        $scope.exercises = item.exercicios;
    }

    $scope.infoUser = {};
    $scope.onSelectUsuario = function ($item, $model, $label, $event) {
        $scope.UsuarioID = $item.id;
        $scope.buscarDadosUsuario($scope.UsuarioID);
    };

    $scope.buscarDadosUsuario = function(id) {
        APIService.getData("/gym/userinfo/" + id, function (response) {
            $scope.infoUser = response.data;
            $scope.treinos = response.data.treinos;
            console.log($scope.treinos);
        });
    }

    $scope.addSerie = function() {
        bootbox.prompt({
            title: 'Digite o nome da Série:',
            centerVertical: true,
            callback: function (result) {
                console.log(result);
                $scope.treinos[0].series.push({ serie: ""+result, exercicios: [] });
                console.log($scope.treinos[0].series);
                $scope.$apply();
            }
        });
    }

    $scope.usuarios = function (val) {
        return $http.get("app/rest/v1/users", {
            params: {
                pesquisa: val,
                sensor: false
            }
        }).then(function (res) {
            var addresses = [];
            addresses = res.data;
            return addresses;
        });
    }

    $scope.addExercicio = function(form) {

        form.serie = $scope.treinoLabel;
        form.id_treino = $scope.form.treino.id;
        APIService.postData("/gym/user/" + $scope.UsuarioID +"/exercise", form, function(response) {
            $scope.buscarDadosUsuario($scope.UsuarioID);
        });
    }
});
///##################################################################################################################
app.controller('FinancasCtrl', function ($scope, $rootScope, APIService, $modal) {

    $scope.form = {};
    $scope.loading = false;

    $scope.testePG = function() {
        var dados = {
            name: "Apontamentos App"
        };
        APIService.postData("/financeiro/teste1", dados, function(resp) {
            console.log(resp.data);
            $scope.arrBoletos = resp.data;
        });
    }

    $scope.testePG2 = function() {
        var dados = {
            name: "Apontamentos App"
        };
        APIService.postData("/financeiro/teste2", dados, function(resp) {
            console.log(resp.data);
        });
    }
    $scope.testePG3 = function() {
        var dados = {
            name: "Apontamentos App"
        };
        APIService.postData("/financeiro/pagseguro", dados, function(resp) {
            console.log(resp.data);
        });
    }

    $scope.gerarBoleto = function() {
        var dados = {
            name: "Apontamentos App"
        };
        APIService.postData("/financeiro/gerarBoleto", dados, function(resp) {
            console.log(resp.data);
        });
    }

    $scope.initAdmFinanceiro = function() {
        $scope.form.valor = 5;
        $scope.listarFinanceiroAdmin();
        APIService.getData("/sistema/prestadores", function(resp) {
            $scope.arrPrestadores = resp.data;
        })
    }

    $scope.listarFinanceiroAdmin = function() {
        APIService.getData("/financeiro/boletos", function (resp) {
            $scope.arrBoletos = resp.data;
        });
    }

    $scope.consultarStatus = function(item) {
        $scope.loading = true;
        APIService.postData("/financeiro/boleto/verifica", item, function(resp) {
            $scope.loading = false;
            $scope.listarFinanceiroAdmin();
        })
    }

    $scope.gerarBoleto = function(form) {
        $scope.loading = true;
        APIService.getData("/sistema/prestador/" + form.id_prestador, function(resp) {
            var dados = resp.data;
            form.dados = dados.dados;
            form.email = dados.email;
            form.nome = dados.nome;
            
            APIService.postData("/financeiro/boleto", form, function (resp) {
                $scope.loading = false;
                $scope.listarFinanceiroAdmin();
            });
        })
    }
});
///##################################################################################################################
///##################################################################################################################