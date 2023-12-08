app.controller('AgendamentoCtrl', function ($scope, $rootScope, $routeParams, $http, RestService, $location, $modal) {

    $scope.form = {};

    $scope.plans = [
        { id: 1, label: 'Basic', price: 0, default: true },
        { id: 2, label: 'Professional', price: 200, default: false },
        { id: 3, label: 'Enterprise', price: 500, default: false }
    ];

    $scope.today = new Date();
    $scope.initAgendamento = function () {
        $scope.form = {};
        $scope.today = $scope.today.setDate($scope.today.getDate()+1);
        $scope.pegarTimeGrid();
        var params = $location.$$search;
        var id_prestador = params.prestador;
        var id_produto = params.produto;
        //var prestador = $scope.listaPrestadores.find( e => e.id = id_prestador);
        //var produto = prestador.produtos.find(e => e.id = id_produto);
        //        console.log(prestador);
        RestService.getData("/agendamento/prestador/" + id_prestador, function (response) {
            if (response.data) {
                $scope.prestadorSelecionado = response.data;
                $scope.produtoSelecionado = $scope.prestadorSelecionado.produtos.find(e => e.id = id_produto);
            }
        });
    }

    $scope.selectStart = function(idx) {
        console.log(idx);
        $scope.itemSelecionado.rating = idx + 1;
        console.log($scope.itemSelecionado.rating);
    }

    $scope.timeGrid = {};
    $scope.pegarTimeGrid = function () {
        RestService.getData("/agendamento/time_grid", function (resp) {
            $scope.timeGrid = resp.data;
        })
    }

    var myModal;
    $scope.avaliarItem = function(item) {
        $scope.itemSelecionado = item;
        $scope.itemSelecionado.rating = 0;
        myModal = new bootstrap.Modal(document.getElementById("userRating2"), {});
        myModal.show();
    }

    $scope.saveRating = function(item) {
        RestService.postData('/agendamento/user/rating', item, function(resp) {
            if(resp.success) {
                $scope.initAgenda();
            } else {
                //alert(resp.data.msg);
                $scope.showAlert("warning", resp.data.msg, 5);
            }
        });
    }

    $scope.canSave = false;
    $scope.bloquearEscolha = true;
    $scope.teste1 = function () {
        $scope.timeGrid = {};
        $scope.pegarTimeGrid();
        var params = $location.$$search;
        var dados = {
            data: $scope.form.data,
            prestador: params.prestador
        };
        RestService.postData("/agendamento/prestador/checkData", dados, function (response) {
            if (response.data.success) {
                $scope.listaHorarios = response.data.lista;
                if ($scope.listaHorarios) {
                    $scope.listaHorarios.forEach(function (agendamento) {
                        let hora = agendamento.horario.substr(0, 2);
                        var idx = $scope.timeGrid.findIndex(e => e.hr === hora);
                        $scope.timeGrid[idx].situacao = "Indisponivel";
                    });
                    $scope.bloquearEscolha = false;
                }
            } else {
                //alert(response.data.msg);
                $scope.showAlert("warning", response.data.msg, 5);
                $scope.bloquearEscolha = true;
            }
        });
    }

    $scope.selecionarHorario = function (item) {
        $scope.form.horario = item.hr.padStart(2, '0') + ":00";
        $scope.canSave = true;
        document.getElementById("btnSalvar").scrollIntoView();
    }

    $scope.salvarAgendamento = function (form) {
        var params = $location.$$search;
        form.id_usuario = $scope.user.id;
        form.id_produto = params.produto;
        form.id_prestador = params.prestador;
        RestService.postData("/agendamento/usuario/agenda", form, function (response) {
            if (response.data.success) {
                goto("/usuario/agenda");
            } else {
                $scope.showAlert("warning", response.data.msg, 5);
                //alert(response.data.msg);
            }
        });
    }

    $scope.initAgenda = function () {
        $scope.listarAgendamentosUsuario();
        $scope.listarAgendamentosPassadosUsuario();
    }

    $scope.listarAgendamentosUsuario = function () {
        RestService.getData("/agendamento/usuario/agenda?id=" + $scope.user.id, function (response) {
            $scope.arrAgendamentos = response.data;
        })
    }

    $scope.listarAgendamentosPassadosUsuario = function () {
        RestService.getData("/agendamento/usuario/agenda/passados?id=" + $scope.user.id, function (response) {
            $scope.arrAgendamentosPassados = response.data;
        })
    }

    $scope.initViewPrestador = function() {
        var id = $routeParams.id;
        $scope.item = {};
        RestService.getData("/agendamento/prestador/"+id, function(response) {
            $scope.item = response.data;
        });
    }
});
///################################################################################################################################
///################################################################################################################################
///################################################################################################################################