app.controller("LogisticsCtrl", function ($scope, $routeParams, $resource, APIService, $uibModal, $modal, $ocModal) {
    $scope.versao = "L 1.0.0";
    $scope.form = {};

    ///############################################################################################
    $scope.initNewLabel = function() {
        $scope.form = {
            "destination": "CA",
            "reference": "DilsonTest-20230620-02",
            "commodity": [
                    {
                        "description": "Star Realms: High Alert Combo (Kickstarter Pre-Order Special) Status: Pre-Order",
                        "unitValue": "56.23",
                        itemCount: 1,
                        "weight": "2",
                        "hsCode": "95049060",
                        "originCountry": "US"
                    },
                    {
                        "description": "Star Realms: Stellar Allies (Kickstarter Pre-Order Special) Status: Pre-Order",
                        "unitValue": "15.86",
                        itemCount: 1,
                        "weight": "0.3125",
                        "hsCode": "95049060",
                        "originCountry": "US"
                    },
                    {
                        "description": "Star Realms: Command Deck Lost Fleet (Kickstarter Pre-Order Special) Status: Pre-Order",
                        "unitValue": "20.91",
                        itemCount: 1,
                        "weight": "0.3125",
                        "hsCode": "95049060",
                        "originCountry": "US"
                    }/*,
                    {
                        "description": "Star Realms: Frontiers Promo Pack (Kickstarter Pre-Order Special) Status: Pre-Order",
                        "unitValue": "38.93",
                        itemCount: 1,
                        "weight": "0.3125",
                        "hsCode": "95049060",
                        "originCountry": "US"
                    }//*/
                ]
        };
    }
    ///############################################################################################
    $scope.generateLabel = function(form) {
        console.log(form);
        APIService.postData("/shipper/createLabel", form, function(resp) {

        });
    }
    ///############################################################################################
    $scope.importXLSFile = function () {
        APIService.getData("/shipper/importXLSX", function (resp) {

        });
    }

    $scope.sendToEtower = function () {

        APIService.getData("/shipper/sendToEtower", function (resp) {
            $scope.labelInfo = resp.data;
        });
    }

    $scope.getLabelInfo = function () {
        var trackID = $scope.form.tracking;
        APIService.getData("/shipper/getLabelInfo?ID=" + trackID, function (resp) {
            $scope.labelInfo = resp.data;
            $scope.order = $scope.labelInfo.data[0].order;
        });
    }
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
    ///############################################################################################
});