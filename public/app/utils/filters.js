app.filter('sumByKey', function () {
  return function (data, key) {
    if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
      return 0;
    }
    var sum = 0;
    for (var i = data.length - 1; i >= 0; i--) {
      sum += parseFloat(data[i][key]);
    }
    return sum;
  };
});
///################################################################################################################
app.filter('sumOfValue', function () {
        return function (data, key) {        
            if (angular.isUndefined(data) || angular.isUndefined(key))
                return 0;        
            var sum = 0;        
            angular.forEach(data,function(value){
                sum = sum + parseInt(value[key], 10);
            });        
            return sum;
        }
    })
///################################################################################################################
app.filter('Timestamp', function () {
  return function (unix_time, tipo) {
    if (tipo == null) {
      tipo = 0;
    }
    if (unix_time == undefined) {
      return "";
    }
    ///
    var t1;
    if (unix_time.indexOf("Z") !== -1) {
      var temp1 = unix_time.replace("T", " ").replace("Z", "");
      t1 = temp1.split(" ");
    } else {
      t1 = unix_time.split(" ");
    }
    if (t1 == null) {
      return unix_time;
    }

    var t2 = t1[1].split(":");
    var hora = t2[0];

    var t3 = t1[0].split("-");
    var dataT = t3[2] + "/" + t3[1] + "/" + t3[0];

    var novaData = dataT;
    if (tipo == 1) {
      novaData += " " + hora + ":" + t2[1] + ":" + t2[2];
    } else if (tipo == 2) {
      novaData = " " + hora + ":" + t2[1]; // + ":" + t2[2].substring(0,2);
    } else if (tipo == 3) {
      novaData = " " + t3[2] + "/" + t3[1]; // + ":" + t2[2].substring(0,2);
    }
    //var data1 = new Date(novaData);
    return novaData;
  }
});
///################################################################################################################
app.filter('total', function () {
  return function (input, property) {
    var i = input.length;
    var total = 0;
    while (i--)
      total += input[i][property];
    return total;
  }
});
///################################################################################################################
app.filter('boolean', function () {
    return function (valor) {
        if (valor == 1) { return "Sim"; }
        if (valor == 0) { return "Não"; }
    }
});
///################################################################################################################
app.filter('tipo_financeiro', function () {
    return function (valor) {
        if (valor == 1) { return "Realizado"; }
        if (valor == 0) { return "Previsto"; }
    }
});
///################################################################################################################
app.filter('finance_type_item', function () {
    return function (valor) {
        if (valor == 1) { return "Entrada"; }
        if (valor == 2) { return "Saída"; }
    }
});
///################################################################################################################
///################################################################################################################
///################################################################################################################
///################################################################################################################
///################################################################################################################
///################################################################################################################
///################################################################################################################
///################################################################################################################