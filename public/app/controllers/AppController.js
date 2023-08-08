app.controller("AppController", function ($scope, $rootScope, $routeParams, APIService, $window, $resource, $modal, $translate) {
    $scope.versao = "1.0.1";
    $scope.form = {};

    $scope.loggedUser = {
        idCustomer: 1,
        idUser: 2,
        name: 'Dilson Sordi Junior',
        mail: 'juniorsordi@gmail.com',
        accessLevel: 'Administrador',
        photo: 'uploads/photos/64d64b2b3369ff506206a0ae1f206ab3171d1afe.png?1561438316'
    };

    $scope.modules = {
      finances: true,
      logistics: false,
      projects: true,
      tickets: true
    };

    $scope.languagesList = [
        { id: 1, name: 'English', locale: 'en', flag: 'us.png' },
        { id: 2, name: 'Portuguese', locale: 'pt', flag: 'br.png' }
    ];

    //$scope.arrUsuarios = $resource("app/rest/v1/Projetos/listarUsuariosAtivos").query();
    $rootScope.Usuario = $scope.loggedUser;

    $scope.initApp = function () {
        if (sessionStorage.getItem('user')) {
            $scope.lang = $window.navigator.language || $window.navigator.userLanguage;
            $scope.currentLang = $scope.languagesList.find(e => e.locale === $scope.lang.substr(0, 2));
            $translate.use($scope.currentLang.locale);
            $scope.Usuario = JSON.parse(sessionStorage.getItem('user'));
            console.log($scope.Usuario);
            $rootScope.Usuario = $scope.Usuario;
            //$scope.anoAtendimento = (new Date()).getFullYear();
        } else {
            location.href = "login.html";
        }
    }
    ///############################################################################################
    $scope.changeLocale = function (locale) {
        $scope.currentLang = $scope.languagesList.find(e => e.locale === locale);
        $translate.use(locale);
    }
    ///############################################################################################
    $scope.testeZONOs = function() {
        var url = "https://api.zonos.com/graphql";
        var APIkey = "17bd199a-e24e-4896-81bc-e62a88f396ea";
        var requestQL = `mutation {
  partyCreateWorkflow(
    input: [
      {
        location: {
          administrativeArea: "Utah"
          administrativeAreaCode: "UT"
          countryCode: US
          line1: "345 N 2450 E"
          line2: "#151"
          locality: "St George"
          postalCode: "84790"
        }
        type: ORIGIN
      }
      {
        location: {
          administrativeArea: "BC"
          administrativeAreaCode: "BC"
          countryCode: CA
          line1: "27 Sussex Dr."
          locality: "Victoria"
          postalCode: "V8T 2V9"
        }
        person: {
          email: "test@gmail.com"
          firstName: "firstName"
          lastName: "lastName"
          phone: "5022303021"
          companyName: "goProTest"
          metadata: { key: "key", value: "value" }
        }
        type: DESTINATION
      }
      {
        type: PAYOR
        location: {
          administrativeArea: "ON"
          administrativeAreaCode: "ON"
          countryCode: CA
          latitude: 1.2
          line1: "asdf"
          line2: "asdf"
          locality: "locality"
          longitude: 3423.2
          postalCode: "M4C 1A1"
        }
        person: {
          email: "test@gmail.com"
          firstName: "firstName"
          lastName: "lastName"
          phone: "5022303021"
          companyName: "goProTest"
          metadata: { key: "key", value: "value" }
        }
      }
    ]
  ) {
    type
    id
    organization
  }

  itemCreateWorkflow(
    input: [
      {
        amount: 69
        currencyCode: USD
        countryOfOrigin: US
        quantity: 1
        productId: "productId"
        hsCode: "1006.30"
        description: "description"
        measurements: [
          { type: WIDTH, value: 2, unitOfMeasure: CENTIMETER }
          { type: WEIGHT, value: 2, unitOfMeasure: POUND }
        ]
      }
      {
        amount: 62
        currencyCode: CAD
        countryOfOrigin: US
        hsCode: "1006.30"
        quantity: 1
        productId: "productId2"
        description: "description2"
        measurements: [
          { type: WIDTH, value: 2, unitOfMeasure: CENTIMETER }
          { type: WEIGHT, value: 2, unitOfMeasure: POUND }
        ]
      }
    ]
  ) {
    id
    amount
  }
  cartonizeWorkflow {
    id
    type
    items {
      item {
        id
      }
    }
  }
  shipmentRatingCalculateWorkflow {
    id
    amount
  }
  landedCostCalculateWorkflow(
    input: { endUse: FOR_RESALE, method: DAP, tariffRate: ZONOS_PREFERRED }
  ) {
		id
		duties {
			amount
			currency
		}
		taxes {
			amount
			currency
		}
		fees {
			amount
			currency
		}
	}
}
        `;
        ///
    }
    ///############################################################################################
    ///############################################################################################
    $scope.deslogar = function () {
        sessionStorage.clear();
        APIService.resourceQuery("/../auth/logout");
        location.href = "login.html";
    }
    
    $scope.atualizarDados = function () {
        APIService.postData("Importacao", "rotinaAtualizacaoDadosArtia", 2, {}, function (data) {

        });
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
});
///#####################################################################################################
app.controller('ModalContentCtrl', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close("Ok");
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});
///#####################################################################################################
///#####################################################################################################
app.controller("AppController2", function ($scope, APIService) {
    $scope.versao = "1.0.1";

    $scope.initApp = function () {
    }
    ///############################################################################################
    ///############################################################################################
    $scope.deslogar = function () {
        APIService.postData("Sistema", "deslogar", 2, {}, function (data) {
            location.reload();
        })
    }
    ///############################################################################################
    ///############################################################################################
});
///#####################################################################################################
