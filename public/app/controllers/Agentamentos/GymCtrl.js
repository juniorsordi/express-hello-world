app.controller('GymCtrl', function ($scope, $location, $http, RestService) {

    $scope.form = {
        nome: "",//$scope.user.nome,
        instrutor: 'Fulano de Tal',
        treino: 'HIPERTROFIA',
        sessoes: 100
    };

    $scope.listarAcademias = function() {
        RestService.getData("/agendamento/gym/list", function(response) {
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
        RestService.getData("/agendamento/gym/userinfo/" + id, function (response) {
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
        RestService.postData("/agendamento/gym/user/" + $scope.UsuarioID +"/exercise", form, function(response) {
            $scope.buscarDadosUsuario($scope.UsuarioID);
        });
    }

});
///###################################################################################################
///###################################################################################################