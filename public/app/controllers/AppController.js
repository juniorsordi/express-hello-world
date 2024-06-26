app.controller("AppController", function ($scope, $rootScope, $routeParams, $location, APIService, $window, $http, $modal, $translate) {
    $scope.versao = "1.0.1";
    $scope.form = {};

    $scope.loggedUser = {
        idCustomer: 1,
        idUser: 2,
        nome: 'Dilson Sordi Junior',
        email: 'juniorsordi@gmail.com',
        accessLevel: 'Administrador',
        foto: 'assets/img/avatars/avatar-2.jpg?1561438316'
    };

    $http.get("version.txt").then(function(response) { $scope.versao = response.data; })

    $scope.modules = {
		finances: true,
		logistics: false,
		projects: true,
		tickets: true,
		rh: true
    };

    $scope.languagesList = [
        { id: 1, name: 'English', locale: 'en', flag: 'us.png' },
        { id: 2, name: 'Portuguese', locale: 'pt', flag: 'br.png' }
    ];

    //$scope.arrUsuarios = $resource("app/rest/v1/Projetos/listarUsuariosAtivos").query();
    $rootScope.Usuario = $scope.loggedUser;

    $scope.initApp = function () {

        /*
        if($location.host() == 'localhost') {
            $scope.Usuario = $scope.loggedUser;
            $scope.lang = $window.navigator.language || $window.navigator.userLanguage;
            $scope.currentLang = $scope.languagesList.find(e => e.locale === $scope.lang.substr(0, 2));
            $translate.use($scope.currentLang.locale);

            APIService.getData("/../auth/checkToken", function (response) {
                
            });
        } else {//*/
            if (localStorage.getItem('user') && getCookie("token")) {
                APIService.getData("/../auth/checkToken", function (response) {
                    if(!response.data) {
                        location.href = "login.html";
                    } else {
                        $scope.lang = $window.navigator.language || $window.navigator.userLanguage;
                        $scope.currentLang = $scope.languagesList.find(e => e.locale === $scope.lang.substr(0, 2));
                        $translate.use($scope.currentLang.locale);
                        $scope.Usuario = JSON.parse(localStorage.getItem('user'));
                        $rootScope.Usuario = $scope.Usuario;
                        //$scope.anoAtendimento = (new Date()).getFullYear();
                        $scope.verificarNotificacoesMensagesApp();
                    }
                });
            } else {
                location.href = "login.html";
            }
       // }
    }
    ///############################################################################################
    $scope.alert = {};
    $scope.showAlert = function(type, msg, timer) {
        if(!timer) { timer = 3; }
        $("#alertas").removeClass('hide');
        $scope.alert.type = type;
        $scope.alert.msg = msg;
        setTimeout(function() {
            $("#alertas").addClass('hide');
        }, timer * 1000);
    }
    ///############################################################################################
    $scope.initAppDashboard = function() {
        APIService.getData("/sistema/dashboard", function(response) { 
            $scope.appDashboard = response.data; 
            
            let somaFinanceira = 0;
            for(const item of $scope.appDashboard.financas) {
                somaFinanceira += parseFloat(item.soma);
            }

            $scope.appDashboard.resuladoFinanceiro = somaFinanceira;
        });
    }
    ///############################################################################################
    $scope.$on("logoutForced", function () {
        //$scope.deslogar();
    });
    ///############################################################################################
    $scope.verificaHttpStatus = function(resp) {
        if(resp.status == 401) {
            //$rootScope.$broadcast('logoutForced');
            $scope.deslogar();
        }
    }
    ///############################################################################################
    $scope.verificarNotificacoesMensagesApp = function() {
        APIService.getData("/sistema/notificacoes", function(response) { $scope.arrNotificacoes = response.data; });
        APIService.getData("/sistema/mensagens", function(response) { $scope.arrMensagens = response.data; });

        APIService.getData("/sistema/menu_lateral", function(response) { $scope.verificaHttpStatus(response); $scope.arrSideMenu = response.data;  });
    }
    ///############################################################################################
    $scope.changeLocale = function (locale) {
        $scope.currentLang = $scope.languagesList.find(e => e.locale === locale);
        $translate.use(locale);
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    $scope.deslogar = function () {
        sessionStorage.clear();
        localStorage.clear();
        APIService.resourceQuery("/../auth/logout");
        location.href = "login.html";
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
///#####################################################################################################
