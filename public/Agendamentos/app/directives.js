///######################################################################
function goto(path) {
    location.href = "#!" + path;
}
///#####################################################################################################
function removeModal(id) {
    $('#' + id).modal('hide');
    $('#' + id).modal().hide();
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '0px');
    $('.modal-backdrop').remove();
}
///#####################################################################################################
app.factory('RestService', function ($http) {
    return {
        getData: function (path, callback) {
            $http.get("/../api" + path).then(callback);
        },
        postData: function (path, param, callback) {
            $http.post("/../api" + path, param).then(callback);
        },
        putData: function (path, param, callback) {
            $http.put("/../api" + path, param).then(callback);
        },
        deleteData: function (path, callback) {
            $http.delete("/../api" + path).then(callback);
        }
    }
});
///#####################################################################################################
app.factory('PagSeguroService', function($http) {
    return {
        post: function(url, param, callback) {
            $http({
                method: 'POST',
                url: url,
                data: param, // pass in data as strings
                headers: {
                    'Authorization': 'Bearer 14114BD04646725884AAEFAA263B4606'
                } // set the headers so angular passing info as form data (not request payload)
            }).then(callback);
        }
    }
});
///#####################################################################################################
///#####################################################################################################
app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '<i class="fa fa-star"></i>' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});
///################################################################################################################
app.filter('Timestamp', function () {
    return function (unix_time, tipo) {
        if (tipo == null) { tipo = 0; }
        if (unix_time == undefined) { return ""; }
        ///
        var t1;
        if (unix_time.indexOf("Z") !== -1) {
            var temp1 = unix_time.replace("T", " ").replace("Z", "");
            t1 = temp1.split(" ");
        } else {
            t1 = unix_time.split(" ");
        }
        if (t1 == null) { return unix_time; }

        var t2 = t1[1].split(":");
        var hora = t2[0];

        var t3 = t1[0].split("-");
        var dataT = t3[2] + "/" + t3[1] + "/" + t3[0];

        var novaData = dataT;
        if (tipo == 1) {
            novaData += " " + hora + ":" + t2[1] + ":" + t2[2];
        } else if (tipo == 2) {
            novaData = " " + hora + ":" + t2[1] + ":" + t2[2].substring(0, 2);
        }
        //var data1 = new Date(novaData);
        return novaData;
    }
});
///#####################################################################################################
app.filter('Booleano', function () {
    return function (valor) {
        if (valor == 1) { return "Sim"; }
        if (valor == 0) { return "Não"; }
        if (valor == false) { return "Não"; }
        if (valor == true) { return "Sim"; }
    }
});
///#####################################################################################################