app.controller("TicketsCtrl", function ($scope, $routeParams, $resource, APIService, $uibModal, $modal, $ocModal) {
    $scope.versao = "T 1.0.0";
    $scope.form = {};

    ///############################################################################################
    $scope.showTicket = function(id) {
        //goto("/ticket/"+id);
        location.href="#!/ticket/"+id;
    }
    ///############################################################################################
    $scope.initTickets = function() {
        $scope.ticketsList = APIService.resourceQuery("/g4f/tickets/list");
    }
    ///############################################################################################
    $scope.initViewTicket = function() {
        $scope.loadTicketData($routeParams.id);
    }

    $scope.loadTicketData = function(id) {
        APIService.getData("/g4f/tickets/" + id, function (resp) {
            $scope.ticket = resp.data[0];
        });
    }

    $scope.addTicketReply = function(form) {
        //form.user_id = $scope.User.id;
        console.log(form);
        APIService.postData("/g4f/tickets/" + $routeParams.id +"/event", form, function(res) {
            $scope.loadTicketData($routeParams.id);
            $scope.form = {};
        });
    }
    ///############################################################################################
    $scope.initDashboard = function () {
        APIService.getData("/g4f/tickets/dashboard/status", function(resp) { $scope.arrStatusDash = resp.data });
        APIService.getData("/g4f/tickets/dashboard/lastTickets", function(resp) { $scope.arrLastTickets = resp.data; });
    }
    ///############################################################################################
    $scope.initProjectsView = function () {
        
    }
    ///############################################################################################
    $scope.addUser = function (label, value) {
        $scope.selectedUsers.push({ name: label, id: value });
        $scope.$apply();
    }
    ///############################################################################################
    $scope.userTypeahead = function (value) {
        if (value.length > 2) {
            $http.get(`../api/v1/g4f/sistema/usuarios?filtro=${value}`, { filter: value }).then(function (res) {
                $scope.type1.setData(res.data);
            });
        }
    }
    ///############################################################################################
    $scope.salvarTicket = function(form) {
        APIService.postData("/g4f/tickets", form, function(response) {
            if(response.data) {
                console.log(response.data);
            }
        })
    }
    ///############################################################################################
    ///############################################################################################
    $scope.asyncSelected = null;
    ///############################################################################################
    $scope.selectUser = function ($item, $model, $label, $event) {
        console.log($item);
        $scope.asyncSelected = $item;
    }
    ///############################################################################################
    $scope.getLocation = function (val) {
        return $http.get('api/v1/projectTypes', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function (response) {
            return response.data.map(function (item) {
                return item;
            });
        });
    };
    ///############################################################################################
    $scope.getAddress = function (viewValue) {
        var params = { address: viewValue, sensor: false };
        return $http.get('api/v1/g4f/sistema/usuarios', { params: params }).then(function (res) {
            return res.data.results;
        });
    };
    ///############################################################################################
    ///############################################################################################
    $scope.ticket = {
        title: 'System error',
        status: 1,
        timeline: [
            { id: 1, date: '2023-05-05T10:29:00', user_name: 'Dilson Sordi Junior', user_position: 'IT Analist', event_description: "<h2>Teste</h2>" },
            { id: 2, date: '2023-05-05T11:29:00', user_name: 'Dilson Sordi Junior', user_position: 'IT Analist', event_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula...." }
        ]
    };
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
});