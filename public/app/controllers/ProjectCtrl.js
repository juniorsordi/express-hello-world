app.controller("ProjectCtrl", function ($scope, $rootScope, $routeParams, APIService, $window, $resource, $modal, $translate) {
    $scope.versao = "1.0.1";
    $scope.form = {};

    $scope.arrAnos = [];
    $scope.selectedItem = null;
    $scope.anoAtendimento = "2023";
    $scope.anoAtendimentoSelected = "2023";
    $scope.ano_selecionado = 2023;

    $scope.closed_activity_status = 2;
    $scope.canceled_activity_status = 2;

    $scope.criarListaAnos = function () {
        var currentYear = (new Date()).getUTCFullYear();
        for (var i = 2020; i < currentYear + 1; i++) {
            $scope.arrAnos.push({ id: i, label: '' + i });
        }
    }
    $scope.criarListaAnos();

    ///############################################################################################
    $scope.initDashboard = function () {
        $scope.arrRanking = APIService.resourceQuery("/dashboard/ranking");
        $scope.arrProjetosSituacao = APIService.resourceQuery("/dashboard/projects");
        $scope.arrProjetosAno = APIService.resourceQuery("/dashboard/projectsYear");
        $scope.gerarGraficosDashboard();
        $scope.gerarGraficoProjetosEntreguesPorAno();
    }
    ///############################################################################################
    $scope.initProjectsView = function () {
        $scope.projectsList = APIService.resourceQuery("/projects/:id");
        $scope.arrStatus = APIService.resourceQuery("/company/status");
        $scope.filtro = {};
    }
    ///############################################################################################
    $scope.initProjectView = function () {
        //$scope.projectInfo = APIService.resourceQuery("/dashboard/projectsYear");
        $scope.projectInfo = $resource("api/v1/project/:id").get({ id: $routeParams.id });
    }
    ///############################################################################################
    ///############################################################################################
    $scope.setFilter = function (id) {
        $scope.filtro.id_situacao = id;
    }
    ///############################################################################################
    ///############################################################################################
    $scope.exportProjects = function() {
        var workbook = ExcelBuilder.Builder.createWorkbook();
        var stylesheet = workbook.getStyleSheet();
        var sheet1 = workbook.createWorksheet({
            name: 'Data1'
        });
        var headings = stylesheet.createFormat({
            "fill": {
                "type": 'pattern',
                "patternType": 'solid',
                "fgColor": '4BACC6'
            }
        });
        var jsonData = [
            [
                { value: 'sample', metadata: { style: headings.id } }, 
                { value: 'data', metadata: { style: headings.id } }, 
                { value: 'for', metadata: { style: headings.id } }
            ],
            //['generating', 'excel', 'in'],
            //['java', 'script', ' ']
        ];
        $scope.projectsList.map(el => {
            jsonData.push([el.id, el.nome, el.esforco_estimado, el.esforco_atual, el.percentual_completo, el.valor_hora, el.inicio_estimado, el.termino_estimado]);
        });
        console.log(jsonData);
        //*
        sheet1.setData(jsonData);
        workbook.addWorksheet(sheet1);
        ExcelBuilder.Builder.createFile(workbook, {
            type: "blob"
        }).then(function (data) {
            saveAs(new Blob([data], {
                type: "base64"
            }), "Demo.xlsx");
        });
        //*/
    }
    ///############################################################################################
    ///############################################################################################
    $scope.apontarHoras = function (item, element) {
        $scope.selectedItem = item;
        $scope.form = {};
        //*
        $modal({
            title: 'My Title',
            //template: 'app/views/Modals/ModalTest2.html',
            template: 'app/views/Projects/Modals/ModalApontamentoAtividade.html',
            show: true,
            scope: $scope,
        });
        //*/
        /*
        $ocModal.open({
            url: 'app/views/Modals/ModalApontamentoAtividade.html',
            cls: 'test fade-in',
            onOpen: function () {

            }
        })
        //*/
        /*
        myModal = new bootstrap.Modal(document.getElementById(element), { backdrop: true });
        myModal.show();
        //*/
    }
    ///############################################################################################
    //JJZFA5KPHNSGWQCUMVKHOUBKNRZCG5D5
    $scope.addTask = function (element) {
        $scope.form = {};

        $modal({
            title: 'My Title',
            template: 'app/views/Projects/Modals/ModalNovaAtividade.html',
            show: true,
            scope: $scope,
        });
    }
    ///############################################################################################
    $scope.saveNewTask = function () {
        var id = $routeParams.id;
        APIService.postData(`/project/${id}/task`, $scope.form, function (resp) {
            if (resp.data.affectedRows > 0) {
                $scope.initProjectView();
            }
        });
    }
    ///############################################################################################
    $scope.salvarApontamento = function () {
        var temp = $scope.form.data_apontamento.toISOString().substr(0, 10);
        var selectedItem = $scope.selectedItem;
        var apontamento = {
            id_atividade: selectedItem.id,
            id_usuario: $scope.Usuario.id,
            horas: $scope.form.duracao,
            data: temp,
            observacao: $scope.form.observacao
        };
        APIService.postData("/project/" + selectedItem.id_projeto + "/time_entry", apontamento, function (response) {
            $scope.initProjectView();
        });
    }
    ///############################################################################################
    $scope.atualizarGraficosAtendimento = function () {
        $scope.anoAtendimento = $scope.form.ano;
        $scope.gerarGraficosDashboard();
    }
    ///############################################################################################
    ///############################################################################################
    $scope.Highcharts3DPie = function (id, dados2, labelSeries) {
        Highcharts.chart(id, {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: ' '
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b> <br>{point.y} h'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: labelSeries,
                colorByPoint: true,
                data: dados2
            }],
            exporting: {
                showTable: false,
                csv: {
                    columnHeaderFormatter: function (item, key) {
                        if (!item || item instanceof Highcharts.Axis) {
                            return "Tipo de Projeto"
                        } else {
                            return item.name;
                        }
                    }
                }
            }
        });
    }
    ///############################################################################################
    $scope.Highcharts3DColumn = function (id, categorias, dados, labelSeries) {
        new Highcharts.Chart({
            chart: {
                renderTo: id,
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0,
                    depth: 100,
                    viewDistance: 25
                }
            },
            xAxis: {
                categories: categorias
            },
            yAxis: {
                title: {
                    enabled: false
                }
            },
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: labelSeries + '{point.y}'
            },
            title: {
                text: '',
                align: 'left'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            series: [{
                data: dados,
                colorByPoint: true
            }]
        });
    }
    ///############################################################################################
    ///############################################################################################
    $scope.gerarGraficosDashboard = function () {
        APIService.getData(`/dashboard/graphByType?ano=${$scope.ano_selecionado}`, function (res) {
            var temp01 = res.data;
            var dados2 = [];
            for (var i = 0; i < temp01.length; i++) {
                dados2.push({ name: temp01[i].tipo_projeto, y: parseFloat(temp01[i].total) });
            }
            $scope.Highcharts3DPie("graph01", dados2, "Horas");
            //*/
        });

        APIService.getData(`/dashboard/graphByClient?ano=${$scope.ano_selecionado}`, function (res) {
            var temp01 = res.data;
            var dados2 = [];
            for (var i = 0; i < temp01.length; i++) {
                dados2.push({ name: temp01[i].cliente, y: parseFloat(temp01[i].total) });
            }
            $scope.Highcharts3DPie("graph02", dados2, "Horas");
        });
    }
    ///############################################################################################
    $scope.gerarGraficoProjetosEntreguesPorAno = function () {
        ///
        APIService.getData(`/dashboard/projectsYear`, function (res) {
            var temp01 = res.data;
            var cats = [];
            var values = [];
            for (var i = 0; i < temp01.length; i++) {
                var item = temp01[i];
                cats.push(item.ano);
                values.push(item.total);
            }
            $scope.Highcharts3DColumn("TotalProjectsFinished", cats, values, "Projetos No Ano: ");
        });
    }
    ///############################################################################################
    $scope.archiveProject = function() {
        var fields = [
            {
                field: 'id_situacao',
                value: 7
            }
        ]
        APIService.putData("/project/" + $routeParams.id, fields, function(resp) {

        });
    }
    ///############################################################################################
    $scope.postProjectComment = function(form) {
        form.project_id = $routeParams.id;
        APIService.postData("/project/comment", form, function(resp) {
            $scope.initProjectView();
            $scope.form = {};
        })
    }
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################
    ///############################################################################################

});
///#####################################################################################################
app.controller("NewProjectCtrl", function ($scope, $resource, APIService) {

    $scope.form = {
        name: "Testes de Psicopedagogia",
        description: "Testes de Psicopedagogia utilizando uma planilha de excel como exemplo para os calculos e entrada de campos.",
        start_date: "10/05/2023",
        due_date: "10/09/2023",
        budget: 9000,
        id_client: 11,
        id_category: 4,
        estimated_effort: 440,
        hour_value: 20.00,
        priority: 1,
        status: 2
    };
    $scope.arrPriorities = [
        { id: 0, label: 'Low', value: '0' },
        { id: 1, label: 'Medium', value: '1' },
        { id: 2, label: 'High', value: '2' }
    ];

    $scope.arrStatus = [
        { id: 1, label: 'On Hold' },
        { id: 2, label: 'In Progress' },
        { id: 3, label: 'Completed' }
    ];

    $scope.init = function () {
        $scope.arrTipoProjeto = APIService.resourceQuery("/company/projectTypes");
        $scope.arrClientes = APIService.resourceQuery("/company/clients");
        $scope.arrClients = APIService.resourceQuery("/company/clients");
        $scope.arrCategorias = APIService.resourceQuery("/company/categories");
        $scope.arrCategories = APIService.resourceQuery("/company/categories");
        $scope.arrStatus = APIService.resourceQuery("/company/status");
    }

    $scope.inserirNovoProjeto = function () {
        APIService.postData("/project", $scope.form, function (resp) {
            console.log(resp.data);
        })
    }

    $scope.init();
});
///#####################################################################################################
app.controller("ProjectActivityCtrl", function ($scope, $resource, $routeParams, APIService) {

    $scope.init = function() {
        APIService.getData("/company/activity_status", function(resp) { $scope.arrActivityStatus = resp.data; });
        APIService.getData("/activity/"+$routeParams.id, function(resp) {
            $scope.projectInfo = resp.data;
        });
    }

    $scope.init();
});
///#####################################################################################################
app.controller("KanbanViewCtrl", function ($scope, $resource, $routeParams, APIService) {

    $scope.id_projeto = 4;
    ///############################################################################################
    $scope.initKaban = function () {
        $scope.kanban = {
            columns: [
                { name: "Roteirização", id: "1", barColor: "#f9ba25", cards: [{ id: 1, title: 'Video Aula 01', description: 'Card de Teste 1', user: 'Cristian Scheffel Biacchi', photo: 'assets/img/users/cristian_scheffel_biacchi.jpg' }] },
                { name: "Revisão Textual", id: "2", cards: [] },
                { name: "Design/Programação", id: "3", cards: [] },
                { name: "Audiovisual", id: "4", cards: [] },
                //{ name: "Concluido", id: "5", cards: [] }
            ]
        };
        $scope.kanbanRest = APIService.resourceQuery("/kanbanProjects/" + $scope.id_projeto);
    }
    ///############################################################################################
    $scope.onDrop = function (data, targetColId) {
        console.log([data.id, targetColId]);
        APIService.putData("/kanbanProjects/" + $scope.id_projeto, { id_atividade: data.id, id_situacao: targetColId }, function (resp) {
            $scope.kanbanRest = APIService.resourceQuery("/kanbanProjects/" + $scope.id_projeto);
        });
        /*
        boardService.canMoveTask(data.ColumnId, targetColId)
            .then(function (canMove) {
                if (canMove) {
                    boardService.moveTask(data.Id, targetColId).then(function (taskMoved) {
                        $scope.isLoading = false;
                        boardService.sendRequest();
                    }, onError);
                    $scope.isLoading = true;
                }

            }, onError);
        //*/
    };
});
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################
///#####################################################################################################