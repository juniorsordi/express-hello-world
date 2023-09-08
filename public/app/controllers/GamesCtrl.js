app.controller('GamesAppCtrl', function ($scope, $rootScope, $routeParams, APIService, $http, $window, $resource, $modal, $translate) {

    $scope.version = "1.0";

    var url = "https://api.rawg.io/api/games?key=353f4de2e4f54a26812a5ee816408273&dates=2023-06-22,2023-08-22&page_size=10";

    $scope.initDashboard = function() {

        APIService.getData("/../games", function(resp) {
            $scope.arrGames = resp.data;
        });
        APIService.getData("/../games/platforms", function(resp) {
            $scope.arrplatforms = resp.data;
        });
    }

    $scope.filterByPlatform = function(id) {
        APIService.getData("/../gamesPlatform?id="+id, function (resp) {
            $scope.arrGames = resp.data;
        });
    }

    $scope.initDashboard();

})