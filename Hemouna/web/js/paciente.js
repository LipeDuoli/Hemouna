$(document).ready(function() {
    
    function carregaGrid() {
        
        var grid = $("#grid");
        grid.empty();
        
        //Ajax paciente
        var ajaxPaciente = $.ajax({
            url: "./api/paciente/",
            dataType: "json"
        });    

        ajaxPaciente.done(function(data, textStatus, jqXHR) {
            //console.log(data, textStatus, jqXHR);

            var content = '<table class="table table-hover">';
            content += '<thead>';
            content += '<tr>';
            content += '<th style="vertical-align: middle;">Paciente</th>';
            content += '<th style="width: 130px;">Tipo de Sangue</th>';
            content += '<th style="width: 100px;">Qtd. Bolsas</th>';
            content += '<th style="width: 110px;">Ações</th>';
            content += '</tr>';
            content += '</thead>';
            content += '<tbody>';

            for(i=0; i<data.length; i++){
                content += '<tr>';
                content += '<td>' + data[i].nome + '</td>';
                content += '<td>' + data[i].tiposangue.tiposangue + '</td>';
                content += '<td>&nbsp;</td>';
                content += '<td>';
                content += '<button class="btnEditar btn btn-primary" id-paciente="' + data[i].id + '" title="Editar"><span class="glyphicon glyphicon-edit"></span></button>';
                content += '&nbsp;&nbsp;';
                content += '<button class="btnRemover btn btn-danger" id-paciente="' + data[i].id + '" title="Remover"><span class="glyphicon glyphicon-remove"></span></button>';
                content += '</td>';
                content += '</tr>';
            }

            content += '</tbody>';
            content += '</table>';
            
            grid.append(content);

            $(".btnEditar").click(function(e) {
                var idPaciente = ($(this).attr("id-paciente"));
                var modal = $("#modalFormPaciente");
                var form = $("#formPaciente")[0];

                form.reset();

                var ajaxPaciente = $.ajax({
                    url: "./api/paciente/" + idPaciente
                });

                ajaxPaciente.done(function(data, textStatus, jqXHR) {
                    //console.log(data);

                    $("#id").val(data[0].id);
                    $("#nome").val(data[0].nome);
                    $("#cpf").val(data[0].cpf);
                    $("#tiposangue").val(data[0].tiposangue.id);

                    modal.modal({show: true});
                });

                ajaxPaciente.fail(function(data, textStatus, jqXHR) {
                    console.log("Falha");
                });
            });
        });

        ajaxPaciente.fail(function(data, textStatus, jqXHR) {
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
    
    $("#btnNovo").click(function(e) {
        var modal = $("#modalFormPaciente");
        var form = $("#formPaciente")[0];
        
        $("#id").val("");
        form.reset();
        modal.modal({show: true});
    });
    
    //Submit Formulário
    $("#btnSalvar").click(function(e) {
        
        //Pega dados do formulário
        var id = $("#id").val();
        var nome = $("#nome").val();
        var cpf = $("#cpf").val();
        var tiposangue = parseInt($("#tiposangue").val());
        
        var type;
        var dados;
        
        if(id == null || id == "") {
            type = "post";
            dados = {nome: nome, cpf: cpf, tiposangue: {id: tiposangue}, hospital: {id: 1}};
        }
        else {
            type = "put";
            dados = {id: id, nome: nome, cpf: cpf, tiposangue: {id: tiposangue}, hospital: {id: 1}};
        }
        
        var jsonDados = $.toJSON(dados);
        
        //Ajax salva paciente
        
        var ajaxSalvaPaciente = $.ajax({
            url: "./api/paciente/",
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
                    alert += '<strong>Sucesso!</strong> Os dados do paciente foram salvos com sucesso.';
                    alert += '</div>';
                    $("#messages").append(alert);
                    
                    $("#modalFormPaciente").modal('hide');
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
});