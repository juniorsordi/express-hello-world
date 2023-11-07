'use strict';
adminApp.config(function ($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
});
adminApp.factory('RestService', function ($http) {
    return {
        checkPostalCode: function(code, callback) {
            $http.get("http://cep.republicavirtual.com.br/web_cep.php?cep=" + code + "&formato=json").then(callback);
        },
        showGritter: function(title, text, image, sticky, time) {
            $.gritter.add({
                title: title,
                text: text,
                image: 'assets/img/user/user-12.jpg',
                sticky: sticky,
                time: (time ? time : ''),
                class_name: 'my-sticky-class'
            });
        },
        getData: function (endpoint, callback) {
            $http.get("app/proxy.php?endpoint=" + endpoint).then(callback);
        },
        getDataComParam: function (modulo, metodo, tipo, param, callback) {
            $http.get("app/rest/?sc=" + tipo + "&Modulo=" + modulo + "&metodo=" + metodo + "&" + param).success(callback);
        },
        getDataComParam2: function (modulo, metodo, tipo, param, callback) {
            $http.get("app/rest/?sc=" + tipo + "&Modulo=" + modulo + "&metodo=" + metodo, param).success(callback);
        },
        postJQ: function (modulo, metodo, tipo, param, callback) {
            $.post("app/rest/?Modulo=" + modulo + "&metodo=" + metodo + "&sc=" + tipo, param, callback);
        },
        postData: function (endpoint, param, callback) {
            $http({
                method: 'POST',
                url: "https://app.primelaser.com.br/PrimeAngular/app/rest/" + endpoint,
                data: param, // pass in data as strings
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                } // set the headers so angular passing info as form data (not request payload)
            }).success(callback);
        },
        postData2: function (modulo, metodo, tipo, param, callback) {
            $http({
                method: 'POST',
                url: "app/rest/rest/" + modulo + "/" + metodo,
                data: param,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(callback);
        },
        postDataComTabela: function (modulo, metodo, tipo, param, tabela, callback) {
            $http({
                method: 'POST',
                url: "app/rest/?sc=" + tipo + "&Modulo=" + modulo + "&metodo=" + metodo + "&tabela=" + tabela,
                data: param, // pass in data as strings
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                } // set the headers so angular passing info as form data (not request payload)
            }).success(callback);
        },
        postDataRetorno: function (modulo, metodo, tipo, param) {
            $http.post("app/rest/?sc=" + tipo + "&Modulo=" + modulo + "&metodo=" + metodo, {
                params: {
                    pesquisa: param.pesquisa,
                    sensor: false
                }
            }).then(function (res) {
                var addresses = [];
                addresses = res.data;
                return addresses;
            });
        }
    };
});
////###################################################################################
