app.controller("SistemaCtrl", function($scope, RestService) {
    ///############################################################################################
    ///############################################################################################
    $scope.salvarFormulario = function () {
        var dados = $("form").serializeFormJSON();
        console.log(dados);
    }
    ///############################################################################################
    $scope.listarUsuarios = function () {
        RestService.postData2("Sistema", "listarUsuarios", 2, {}, function (data) {
            $scope.arrUsuarios = data;
            ///
            var table = $("#Tabela1").DataTable({
                data: data,
                language: {
                    oPaginate: {
                        sNext: '<i class="fa fa-forward"></i>',
                        sPrevious: '<i class="fa fa-backward"></i>',
                        sFirst: '<i class="fa fa-step-backward"></i>',
                        sLast: '<i class="fa fa-step-forward"></i>'
                    }
                },
                pagingType: 'full_numbers',
                pageLength: 15,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'copyHtml5',
                        text: '<i class="far fa-file-alt"></i>',
                        titleAttr: 'Copy'
                    },
                    {
                        extend: 'excelHtml5',
                        text: '<i class="far fa-file-excel"></i>',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'pdfHtml5',
                        text: '<i class="far fa-file-pdf"></i>',
                        titleAttr: 'PDF'
                    }
                ],
                columns: [
                    { data: "nome" },
                    { data: "email" },
                    { data: "nivel_acesso" },
                    { data: "unidade" },
                    { data: "setor" },
                    { data: "situacao" },
                    /*{
                        data: null,
                        defaultContent: '<i class="fas fa-edit"/>',
                        orderable: false
                    }, //*/{
                        targets: -1,
                        data: null,
                        orderable: false,
                        defaultContent: "<i id='edit' class='fas fa-edit'></i>"
                    }, {
                        targets: -1,
                        data: null,
                        orderable: false,
                        defaultContent: "<i id='trash' class='fas fa-trash'></i>"
                    }/*,
                    {
                        data: null,
                        defaultContent: '<i class="fa fa-trash"/>',
                        orderable: false
                    },//*/
                ]
            });
            ///
            $('#Tabela1 tbody').on('click', '#edit', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data);
                //alert(data[0] + "'s salary is: " + data[5]);
            });
            $('#Tabela1 tbody').on('click', '#trash', function () {
                var data = table.row($(this).parents('tr')).data();
                alert("Delete ID " + data.id);
                //alert(data[0] + "'s salary is: " + data[5]);
            });
            ///
        });
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
});
///################################################################################################
app.controller("ChamadosCtrl", function ($scope, RestService, $routeParams) {
    ///############################################################################################
    $scope.listarChamadosAbertos = function() {
        RestService.postData2("Chamados", "listarChamadosAbertos", 2, {}, function(data) {
            $scope.arrChamados = data;
        })
    }
    ///############################################################################################
    $scope.initViewChamado = function() {
        $scope.id = $routeParams.id;

        $scope.pegarDadosChamado();
    }
    ///############################################################################################
    $scope.pegarDadosChamado = function () {
        RestService.postData2("Chamados", "pegarDadosChamado", 2, { ID: $routeParams.id }, function (data) {
            $scope.infoChamado = data;
        })
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
});
///################################################################################################
app.controller("TICtrl", function ($scope, RestService) {

    $scope.initTelaImpressoras = function() {
        var options = {
            series: [50, 51, 52, 59],
            chart: {
                height: 300,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    startAngle: 180,
                    endAngle: 0,
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: false,
                            label: 'Total',
                            formatter: function (w) {
                                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                return 249
                            }
                        }
                    }
                }
            },
            colors: ['#00FFFF', '#FF00FF', '#FFE87C', '#000000'],
            labels: ['Cyan', 'Magenta', 'Yellow', 'Black'],
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
        ///
        $scope.grafico2();
        $scope.grafico3();
        ///
    }
    ///############################################################################################
    $scope.grafico2 = function() {
        var options = {
            series: [67],
            chart: {
                height: 300,
                type: 'radialBar',
                offsetY: -10
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            fontSize: '16px',
                            color: undefined,
                            offsetY: 120
                        },
                        value: {
                            offsetY: 76,
                            fontSize: '22px',
                            color: undefined,
                            formatter: function (val) {
                                return val + "%";
                            }
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91]
                },
            },
            stroke: {
                dashArray: 4
            },
            labels: ['Median Ratio'],
        };

        var chart = new ApexCharts(document.querySelector("#chart2"), options);
        chart.render();
    }
    ///############################################################################################
    $scope.grafico3 = function() {
        var options = {
            series: [76],
            chart: {
                height: 300,
                type: 'radialBar',
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                        margin: 5, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: '#999',
                            opacity: 1,
                            blur: 2
                        }
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            offsetY: -2,
                            fontSize: '22px'
                        }
                    }
                }
            },
            grid: {
                padding: {
                    top: -10
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    shadeIntensity: 0.4,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 53, 91]
                },
            },
            labels: ['Average Results'],
        };

        var chart = new ApexCharts(document.querySelector("#chart3"), options);
        chart.render();
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################

});
///################################################################################################
app.controller("FinancasCtrl", function ($scope, RestService, Upload) {

    ///############################################################################################
    $scope.testeRelatorioOFX = function () {
        APIService.getData("/../ofx/upload", function (resp) {
            $scope.infoOFX = resp.data;
        })
    }
    ///############################################################################################
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/sicoob/ofx/upload',
            data: { file: file }
        }).then(function (resp) {
            $scope.infoOFX = resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    ///############################################################################################
    $scope.exportXLS = function () {
        alasql('SELECT * INTO XLSX("exportacao.xlsx",{headers:true}) FROM ?', [$scope.infoOFX.transacoes]);
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
})
///################################################################################################
///################################################################################################
///################################################################################################