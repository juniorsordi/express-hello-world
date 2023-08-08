app.factory('APIService', function ($http, $modal, $resource) {
    const apiBaseURL = "api/v1";
    return {
        abrirModal: function (formulario, sc) {
            //*
            $modal({
                scope: sc,
                templateUrl: formulario,
                //backdrop: 'static',
                show: true
            });
        },
        getData: function (path, callback) {
            $http.get(apiBaseURL + path).then(callback);
        },
        postData: function (path, param, callback) {
            $http.post(apiBaseURL + path, param).then(callback);
        },
        putData: function (path, param, callback) {
            $http.put(apiBaseURL + path, param).then(callback);
        },
        deleteData: function (path, callback) {
            $http.delete(apiBaseURL + path).then(callback);
        },
        resourceQuery: function(path) {
            return $resource(apiBaseURL+path).query();
        },
        resourceGet: function(path, ID) {
            return $resource(apiBaseURL+path).get({ id: ID});
        }
    }
});