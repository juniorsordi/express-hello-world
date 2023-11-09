app.controller('ProfissionalCtrl', function ($scope, $rootScope, $routeParams, RestService, $location, $modal) {

    $scope.form = {};

    $scope.tinymceOptions = {
        selector: 'textarea',
        plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        editimage_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
        toolbar_sticky: true,
    };

    $scope.agendamentosDiaPro = function() {
        RestService.getData("/pro/agenda_dia", function(resp) {
            $scope.arrAgendamentos = resp.data;
        });
        RestService.getData("/pro/agenda_nextday", function(resp) {
            $scope.arrAgendamentos2 = resp.data;
        });
    }

    $scope.abrirAgendamento = function(item) {
        $rootScope.item_agendamento = item;
        console.log($rootScope.item_agendamento);
        goto("/pro/apontamento/"+item.id);
    }

    $scope.initProViewAgendamento = function() {
        RestService.getData("/pro/agendamento/"+$routeParams.id, function(resp) {
            $scope.item_agendamento = resp.data[0];
        });
    }

    $scope.initProFinanceiro = function() {
        RestService.getData("/pro/financeiro", function(resp) {
            $scope.arrFinanceiro = resp.data;
        });
    }

    $scope.excluirHistorico = function(item) {
        RestService.deleteData("/pro/agendamento/historico/" + item.id, function (resp) {
            $scope.initProViewAgendamento();
        });
    }

    $scope.salvarHistorico = function(form) {
        //var value = editor.getData();
        //form.historico = value;
        form.id_usuario = $scope.item_agendamento.id_usuario;
        form.id_prestador = $scope.item_agendamento.id_prestador;
        console.log(form);
        RestService.postData("/pro/agendamento/historico/" + $routeParams.id, form, function(resp) {
            $scope.initProViewAgendamento();
            $scope.form = {};
            editor.setData("");
        });
    }

})