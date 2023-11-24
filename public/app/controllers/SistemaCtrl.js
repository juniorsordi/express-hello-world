app.controller('SistemaCtrl', function ($scope, $location, $modal, APIService) {

    $scope.form = {};
    $scope.plan = {};
    $scope.arrPrestadores = [];

    $scope.plans = [
        { id: 1, label: 'Basic', price: 0, default: true },
        { id: 2, label: 'Professional', price: 200, default: false },
        { id: 3, label: 'Enterprise', price: 500, default: false }
    ];

    $scope.step = 1;
    $scope.planSelected = {};

    $scope.incrementStep = function() { $scope.step += 1; }
    $scope.decrementStep = function() { $scope.step -= 1; }

    $scope.initSubsctription = function() {
        var params = $location.$$search;
        var idPlan = params.plan;
        //console.log(idPlan);
        $scope.plan = $scope.plans.find( e => e.id == idPlan);
        console.log($scope.plan);
    }

    $scope.setSelectedPlan = function(id) {
        $scope.planSelected.id = id
        $scope.plan = $scope.plans.find(e => e.id == id);
        console.log($scope.plan);
        $scope.incrementStep();
    }

    $scope.acceptedTerms = function() {
        $scope.planSelected.acceptedTerms = true;
        $scope.incrementStep();
    }

    $scope.initCad = function() {

    }

    $scope.salvarDados = function() {
        
        //*
        /*
        var data = {
            id: 1,
            nome: "Dilson Sordi Junior",
            foto: "images/faces/face9.jpg",
            area: 'Informática/TI',
            rating: 3,
            email: "juniorsordi@gmail.com"
        };
        //*/
        var data = $scope.form;
        data.rating = 0;
        data.foto = "";
        console.log(data);
        
        //const collection = firestore.collection('prestadores');
        collection.add(data);
        //var userId = "" + Math.random()*1000;
        //db.ref('usuarios/' + userId.substr(0,3)).set(data);
        /*
        var userId = 1;
        var name = "Dilson Sordi Junior";
        var email = "juniorsordi@gmail.com";
        var imageUrl = "images/faces/face9.jpg";
        firebase.database().ref('usuarios/' + userId).set({
            username: name,
            email: email,
            profile_picture: imageUrl,
            area: 'Informática/TI',
            rating: 3
        });
        //*/
    }

    $scope.paymentBankSlip = true;
    $scope.paymentPix = true;
    $scope.choosePayment = function (id) {
        if (id == 1) { $scope.paymentPix = false;  }
        if (id == 2) { $scope.paymentBankSlip = false; }
        $scope.planSelected.paymentMethod = id;
        $scope.incrementStep();
    }
//kA04EOP5CdYlFch1KdH7vyv6z75eEK1oOMDVgc7M

//lQy3uQQ4HcmKYYzSQpQrxzbdtBnJxzgSD3ZDoPGG
    $scope.resetPayment = function() {
        $scope.paymentBankSlip = true;
        $scope.paymentPix = true;
        $scope.planSelected.paymentMethod = null;
    }

    $scope.confirmPlan = function() {
        $scope.planSelected.id_user = $scope.user.id;
        alert(JSON.stringify($scope.planSelected));
    }

    $scope.listaUsuarios = function() {
        APIService.getData("/sistema/usuarios", function(resp) { $scope.arrUsuarios = resp.data; });
    }

    modalNewUser = $modal({ templateUrl: 'app/views/Sistema/Modals/ModalCriarUsuario.html', show: false, scope: $scope, });

    $scope.showModalNewUser = function() { modalNewUser.show(); }
});

var modalNewUser;
///###################################################################################################
app.controller('FinanceiroCtrl', function ($scope, PagSeguroService, RestService) {

    $scope.form = {};
    $scope.loading = false;

    $scope.testePG = function() {
        var dados = {
            name: "Apontamentos App"
        };
        RestService.postData("/financeiro/teste1", dados, function(resp) {
            console.log(resp.data);
            $scope.arrBoletos = resp.data;
        });
    }

    $scope.testePG2 = function() {
        var dados = {
            name: "Apontamentos App"
        };
        RestService.postData("/financeiro/teste2", dados, function(resp) {
            console.log(resp.data);
        });
    }
    $scope.testePG3 = function() {
        var dados = {
            name: "Apontamentos App"
        };
        RestService.postData("/financeiro/pagseguro", dados, function(resp) {
            console.log(resp.data);
        });
    }

    $scope.gerarBoleto = function() {
        var dados = {
            name: "Apontamentos App"
        };
        RestService.postData("/financeiro/gerarBoleto", dados, function(resp) {
            console.log(resp.data);
        });
    }

    $scope.initAdmFinanceiro = function() {
        $scope.form.valor = 5;
        $scope.listarFinanceiroAdmin();
        RestService.getData("/sistema/prestadores", function(resp) {
            $scope.arrPrestadores = resp.data;
        })
    }

    $scope.listarFinanceiroAdmin = function() {
        RestService.getData("/financeiro/boletos", function (resp) {
            $scope.arrBoletos = resp.data;
        });
    }

    $scope.consultarStatus = function(item) {
        $scope.loading = true;
        RestService.postData("/financeiro/boleto/verifica", item, function(resp) {
            $scope.loading = false;
            $scope.listarFinanceiroAdmin();
        })
    }

    $scope.gerarBoleto = function(form) {
        $scope.loading = true;
        RestService.getData("/sistema/prestador/" + form.id_prestador, function(resp) {
            var dados = resp.data;
            form.dados = dados.dados;
            form.email = dados.email;
            form.nome = dados.nome;
            //console.log(form);
            //*
            RestService.postData("/financeiro/boleto", form, function (resp) {
                $scope.loading = false;
                $scope.listarFinanceiroAdmin();
            });
            //*/
        })
        
    }

    
});
///###################################################################################################
app.controller('PerfilCtrl', function ($scope, RestService) {
    $scope.init = function() {
        if($scope.user.prestador == 1) {
            RestService.getData("/sistema/areas", function (resp) {
                $scope.arrAreas = resp.data;
            });
            $scope.listarProdutosPrestador();
        }
    }

    $scope.listarProdutosPrestador = function () {
        RestService.getData('/sistema/prestador/' + $scope.user.id, function (resp) {
            $scope.arrProdutos = resp.data.produtos;
        });
    }

    $scope.mudarStatusProduto = function (item) {
        RestService.putData("/produto/" + item.id, {}, function (resp) {
            $scope.listarProdutosPrestador();
        });
    }

    $scope.excluirProduto = function (item) {
        RestService.deleteData("/produto/" + item.id, function (resp) {
            $scope.listarProdutosPrestador();
        });
    }

    $scope.salvarProduto = function (form) {
        var id = $scope.user.id;
        RestService.postData(`/prestador/${id}/produto`, form, function (resp) {
            if (resp.data.success) {
                removeModal('exampleModalScrollable1');
                $scope.listarProdutosPrestador();
            } else {
                //alert(resp.data.msg);
                $scope.showAlert("warning", resp.data.msg, 5);
            }
        });
    }

    $scope.init();
});
///###################################################################################################
app.controller('PerfilProfCtrl', function ($scope, RestService, $uibModal) {

    $scope.form = {};

    $scope.initPerfilProf = function() {
        console.log($scope.user);
        RestService.getData("/sistema/areas", function(resp) {
            $scope.arrAreas = resp.data;
        });
        $scope.listarProdutosPrestador();
    }

    $scope.listarProdutosPrestador = function() {
        RestService.getData('/sistema/prestador/' + $scope.user.id, function (resp) {
            $scope.arrProdutos = resp.data.produtos;
        })
    }

    $scope.mudarStatusProduto = function(item) {
        RestService.putData("/produto/"+item.id, {}, function(resp) {
            $scope.listarProdutosPrestador();
        });
    }

    $scope.excluirProduto = function(item) {
        RestService.deleteData("/produto/"+item.id, function(resp) {
            $scope.listarProdutosPrestador();
        });
    }

    $scope.salvarProduto = function(form) {
        var id = $scope.user.id;
        RestService.postData(`/prestador/${id}/produto`, form, function(resp) {
            if(resp.data.success) {
                removeModal('exampleModalScrollable');
                $scope.listarProdutosPrestador();
            } else {
                //alert(resp.data.msg);
                $scope.showAlert("warning", resp.data.msg, 5);
            }
        });
    }

})
///###################################################################################################
app.controller('GymCtrl', function ($scope, $location, $http, RestService) {

    $scope.form = {
        nome: "",//$scope.user.nome,
        instrutor: 'Fulano de Tal',
        treino: 'HIPERTROFIA',
        sessoes: 100
    };

    $scope.listarAcademias = function() {
        RestService.getData("/gym/list", function(response) {
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
        console.log($item);
        //$scope.listarPermissoesUsuario();
        $scope.buscarDadosUsuario($scope.UsuarioID);
    };

    $scope.buscarDadosUsuario = function(id) {
        RestService.getData("/gym/userinfo/" + id, function (response) {
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
        RestService.postData("/gym/user/" + $scope.UsuarioID +"/exercise", form, function(response) {
            $scope.buscarDadosUsuario($scope.UsuarioID);
        });
    }

});
///###################################################################################################
///###################################################################################################