$(document).ready(function() {
    
    function carregaGrid() {
        
        var grid = $("#grid");
        grid.empty();
        
        //Ajax bolsa
        var ajaxBolsa = $.ajax({
            url: "./api/bolsadesangue/",
            dataType: "json"
        });    

        ajaxBolsa.done(function(data, textStatus, jqXHR) {
            //console.log(data, textStatus, jqXHR);

            var content = '<table class="table table-hover">';
            content += '<thead>';
            content += '<tr>';
            content += '<th>Nº da Bolsa</th>';
            content += '<th>Validade</th>';
            content += '<th>Tipo de Bolsa</th>';
            content += '<th>Tipo de Sangue</th>';
            content += '<th style="width: 110px;">Ações</th>';
            content += '</tr>';
            content += '</thead>';
            content += '<tbody>';

            for(i=0; i<data.length; i++){
                content += '<tr>';
                content += '<td>' + data[i].numero + '</td>';
                content += '<td>' + data[i].validade + '</td>';
                content += '<td>' + data[i].tipobolsa.nomebolsa + '</td>';
                content += '<td>' + data[i].tiposangue.tiposangue + '</td>';
                content += '<td>';
                content += '<button class="btnEditar btn btn-primary" id-bolsa="' + data[i].id + '" title="Editar"><span class="glyphicon glyphicon-edit"></span></button>';
                content += '&nbsp;&nbsp;';
                content += '<button class="btnRemover btn btn-danger" id-bolsa="' + data[i].id + '" title="Remover"><span class="glyphicon glyphicon-remove"></span></button>';
                content += '</td>';
                content += '</tr>';
            }

            content += '</tbody>';
            content += '</table>';
            
            grid.append(content);

            $(".btnEditar").click(function(e) {
                var idBolsa = ($(this).attr("id-bolsa"));
                var modal = $("#modalFormBolsa");
                var form = $("#formBolsa")[0];

                form.reset();

                var ajaxBolsa = $.ajax({
                    url: "./api/bolsadesangue/" + idBolsa
                });

                ajaxBolsa.done(function(data, textStatus, jqXHR) {
                    //console.log(data);

                    $("#id").val(data[0].id);
                    $("#numero").val(data[0].numero);
                    $("#validade").val(data[0].validade);
                    $("#tiposangue").val(data[0].tiposangue.id);
                    $("#tipobolsa").val(data[0].tipobolsa.id);

                    modal.modal({show: true});
                });

                ajaxBolsa.fail(function(data, textStatus, jqXHR) {
                    console.log("Falha");
                });
            });
        });

        ajaxBolsa.fail(function(data, textStatus, jqXHR) {
            console.log(data, textStatus, jqXHR);
            alert("Falha");
        });
    }
    
    function carregaTipoSangue() {
        //Ajax tipo sanguíneo
        var ajaxTipoSangue = $.ajax({
            url: "./api/tiposangue/",
            dataType: "json"
        });    

        ajaxTipoSangue.done(function(data, textStatus, jqXHR) {
            //console.log(data);

            var content = "";

            for(i=0; i<data.length; i++){
                content += '<option value="' + data[i].id + '">' + data[i].tiposangue + '</option>';
            }

            var select = $("#tiposangue");
            select.append(content);
        });

        ajaxTipoSangue.fail(function(data, textStatus, jqXHR) {
            console.log(data, textStatus, jqXHR);
            alert("Falha");
        });
    }
    
    function carregaTipoBolsa() {
        //Ajax tipo sanguíneo
        var ajaxTipoBolsa = $.ajax({
            url: "./api/tipobolsa/",
            dataType: "json"
        });    

        ajaxTipoBolsa.done(function(data, textStatus, jqXHR) {
            //console.log(data);

            var content = "";

            for(i=0; i<data.length; i++){
                content += '<option value="' + data[i].id + '">' + data[i].nomebolsa + '</option>';
            }

            var select = $("#tipobolsa");
            select.append(content);
        });

        ajaxTipoBolsa.fail(function(data, textStatus, jqXHR) {
            console.log(data, textStatus, jqXHR);
            alert("Falha");
        });
    }
    
    $("#btnNovo").click(function(e) {
        var modal = $("#modalFormBolsa");
        var form = $("#formBolsa")[0];
        
        $("#id").val("");
        form.reset();
        modal.modal({show: true});
    });
    
    //Submit Formulário
    $("#btnSalvar").click(function(e) {
        
        //Pega dados do formulário
        var id = $("#id").val();
        var numero = $("#numero").val();
        var validade = $("#validade").val();
        var tiposangue = parseInt($("#tiposangue").val());
        var tipobolsa = parseInt($("#tipobolsa").val());
        
        var type;
        var dados;
        
        if(id == null || id == "") {
            type = "post";
            dados = {numero: numero, validade: validade, tiposangue: {id: tiposangue}, tipobolsa: {id: tipobolsa}, hospital: {id: 1}};
        }
        else {
            type = "put";
            dados = {id: id, numero: numero, validade: validade, tiposangue: {id: tiposangue}, tipobolsa: {id: tipobolsa}, hospital: {id: 1}};
        }
        
        var jsonDados = $.toJSON(dados);
        
        //Ajax salva bolsa
        
        var ajaxSalvaBolsa = $.ajax({
            url: "./api/bolsadesangue/",
            accepts: {
                text: "application/json"
            },
            contentType: "application/json",
            dataType: "json",            
            type: type,
            data: jsonDados,
            statusCode: {
                201: function() {
                    var alert = '';
                    alert += '<div id="msg" class="alert alert-success fade in">';
                    alert += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
                    alert += '<strong>Sucesso!</strong> Os dados do bolsa foram salvos com sucesso.';
                    alert += '</div>';
                    $("#messages").append(alert);
                    
                    $("#modalFormBolsa").modal('hide');
                    $("#msg").alert();
                    window.setTimeout(function() {
                        $("#msg").fadeTo(500, 0).slideUp(500, function(){
                            $(this).remove(); 
                        });
                    }, 5000);
                    carregaGrid();
                }
            }
        });
    });
    
    //Executa scripts
    validaUsuario();
    carregaGrid();
    carregaTipoSangue();
    carregaTipoBolsa();
});