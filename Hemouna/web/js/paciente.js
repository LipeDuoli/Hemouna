$(document).ready(function() {
    
    validaUsuario();
    
    var cookieUser = lerCookie('hospital');
    var usuarioLogado = $.parseJSON(cookieUser);
    
    $("#lblUsuario").text(usuarioLogado.nomehosp);
    
    function carregaGrid(query) {
        
        var url;
        
        var grid = $("#grid");
        grid.empty();
        
        if(query === null) {
            url = "./api/paciente/q?hospital=" + usuarioLogado.id;
        }
        else {
            url = "./api/paciente/q?hospital=" + usuarioLogado.id + "&nome=" + query;
        }
        
        //Ajax paciente
        var ajaxPaciente = $.ajax({
            url: url,
            dataType: "json"
        });

        ajaxPaciente.done(function(data, textStatus, jqXHR) {
            //console.log(data, textStatus, jqXHR);

            var content = '<table class="table table-hover">';
            content += '<thead>';
            content += '<tr>';
            content += '<th style="vertical-align: middle;">Paciente</th>';
            content += '<th>CPF</th>';
            content += '<th style="width: 130px;">Tipo de Sangue</th>';
            //content += '<th style="width: 100px;">Qtd. Bolsas</th>';
            content += '<th style="width: 110px;">Ações</th>';
            content += '</tr>';
            content += '</thead>';
            content += '<tbody>';

            for(i=0; i<data.length; i++){
                content += '<tr>';
                content += '<td>' + data[i].nome + '</td>';
                content += '<td>' + data[i].cpf + '</td>';
                content += '<td>' + data[i].tiposangue.tiposangue + '</td>';
                //content += '<td>&nbsp;</td>';
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
                    
                    $("#divBolsasAssociadas").show();
                    
                    var ajaxBolsasAssociadas = $.ajax({
                        url: "./api/paciente/" + idPaciente + "/bolsas"
                    });
                    
                    ajaxBolsasAssociadas.done(function(data, textStatus, jqXHR) {
                        listaBolsasAssociadas(data);
                    });
                    
                    ajaxBolsasAssociadas.fail(function(data, textStatus, jqXHR) {
                        console.log("Falha");
                    });                    
                    
                    modal.modal({show: true});
                });

                ajaxPaciente.fail(function(data, textStatus, jqXHR) {
                    console.log("Falha");
                });
            });
            
            $(".btnRemover").click(function(e) {
                var idPaciente = ($(this).attr("id-paciente"));
                var modal = $("#modalRemovePaciente");
                var form = $("#formRemovePaciente")[0];

                form.reset();
                
                $("#remove-id").val(idPaciente);
                
                modal.modal({show: true});
            });
        });

        ajaxPaciente.fail(function(data, textStatus, jqXHR) {
            console.log(data, textStatus, jqXHR);
            console.log("Falha");
        });
    }
    
    function listaBolsasAssociadas(data) {
        
        var grid = $("#gridListaBolsasAssociadas");
        grid.empty();
        
        var content = '<table class="table table-hover">';
        content += '<thead>';
        content += '<tr>';
        content += '<th>Nº da Bolsa</th>';
        content += '<th>Validade</th>';
        content += '<th>Tipo de Bolsa</th>';
        content += '<th>Tipo de Sangue</th>';
        content += '<th>Data de Saída</th>';
        content += '<th style="width: 55px;">&nbsp;</th>';
        content += '</tr>';
        content += '</thead>';
        content += '<tbody>';

        for(i=0; i<data.length; i++){
            content += '<tr>';
            content += '<td>' + data[i].numero + '</td>';
            content += '<td>' + data[i].validade + '</td>';
            content += '<td>' + data[i].tipobolsa.nomebolsa + '</td>';
            content += '<td>' + data[i].tiposangue.tiposangue + '</td>';
            content += '<td>' + data[i].datasaida + '</td>';
            content += '<td>';
            content += '<button class="btnDesassociar btn btn-danger" id-bolsa="' + data[i].id + '" title="Desassociar"><span class="glyphicon glyphicon-remove"></span></button>';
            content += '</td>';
            content += '</tr>';
        }

        content += '</tbody>';
        content += '</table>';

        grid.append(content);

        $(".btnDesassociar").click(function(e) {
            
            e.preventDefault();
            
            var idBolsa = ($(this).attr("id-bolsa"));
            var modal = $("#modalDesassociaBolsa");
            var form = $("#formDesassociaBolsa")[0];

            form.reset();

            $("#desassocia-id").val(idBolsa);

            modal.modal({show: true});
        });
    }
    
    function listaBolsas(data) {
        
        var grid = $("#gridListaBolsas");
        grid.empty();
        
        var content = '<table class="table table-hover">';
        content += '<thead>';
        content += '<tr>';
        content += '<th>Nº da Bolsa</th>';
        content += '<th>Validade</th>';
        content += '<th>Tipo de Bolsa</th>';
        content += '<th>Tipo de Sangue</th>';
        content += '<th style="width: 55px;">&nbsp;</th>';
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
            content += '<button class="btnAssociar btn btn-primary" id-bolsa="' + data[i].id + '" title="Associar"><span class="glyphicon glyphicon-share-alt"></span></button>';
            content += '</td>';
            content += '</tr>';
        }

        content += '</tbody>';
        content += '</table>';

        grid.append(content);

        $(".btnAssociar").click(function(e) {
            var idBolsa = ($(this).attr("id-bolsa"));
            var idPaciente = $("#id").val();
            
            var ajaxBolsa = $.ajax({
                url: "./api/bolsadesangue/" + idBolsa
            });

            ajaxBolsa.done(function(data, textStatus, jqXHR) {
                //console.log(data);

                var idBolsa = data[0].id;
                var numero = data[0].numero;
                var validade = data[0].validade;
                var tiposangue = data[0].tiposangue.id;
                var tipobolsa = data[0].tipobolsa.id;
                
                var d = new Date();
                
                var dia = ("0" + d.getDate()).slice(-2);
                var mes = ("0" + (d.getMonth() + 1)).slice(-2);
                var ano = d.getFullYear();
                var datasaida = dia + "/" + mes + "/" + ano; 
                
                var dados = {id: idBolsa, numero: numero, validade: validade, tiposangue: {id: tiposangue}, tipobolsa: {id: tipobolsa}, hospital: {id: usuarioLogado.id}, paciente: {id: idPaciente}, datasaida: datasaida};
                
                var jsonDados = $.toJSON(dados);
                
                var ajaxAssociaBolsa = $.ajax({
                    url: "./api/bolsadesangue/",
                    accepts: {
                        text: "application/json"
                    },
                    contentType: "application/json",
                    dataType: "json",            
                    type: "put",
                    data: jsonDados,
                    statusCode: {
                        200: function() {
                            var alert = '';
                            alert += '<div id="msg" class="alert alert-success fade in">';
                            alert += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
                            alert += '<strong>Sucesso!</strong> A bolsa foi associada ao paciente com sucesso.';
                            alert += '</div>';
                            $("#messages").append(alert);
                            $("#modalListaBolsas").modal('hide');
                            $("#modalFormPaciente").modal('hide');
                            $("#msg").alert();
                            window.setTimeout(function() {
                                $("#msg").fadeTo(500, 0).slideUp(500, function(){
                                    $(this).remove(); 
                                });
                            }, 5000);
                            carregaGrid(null);
                        },
                        201: function() {
                            var alert = '';
                            alert += '<div id="msg" class="alert alert-success fade in">';
                            alert += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
                            alert += '<strong>Sucesso!</strong> A bolsa foi associada ao paciente com sucesso.';
                            alert += '</div>';
                            $("#messages").append(alert);
                            $("#modalListaBolsas").modal('hide');
                            $("#modalFormPaciente").modal('hide');
                            $("#msg").alert();
                            window.setTimeout(function() {
                                $("#msg").fadeTo(500, 0).slideUp(500, function(){
                                    $(this).remove(); 
                                });
                            }, 5000);
                            carregaGrid(null);
                        }
                    }
                });
            });

            ajaxBolsa.fail(function(data, textStatus, jqXHR) {
                console.log("Falha");
            });
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
            console.log("Falha");
        });
    }
    
    //Novo Paciente
    $("#btnNovo").click(function(e) {
        var modal = $("#modalFormPaciente");
        var form = $("#formPaciente")[0];
        
        $("#id").val("");        
        $("#divBolsasAssociadas").hide();
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
            dados = {nome: nome, cpf: cpf, tiposangue: {id: tiposangue}, hospital: {id: usuarioLogado.id}};
        }
        else {
            type = "put";
            dados = {id: id, nome: nome, cpf: cpf, tiposangue: {id: tiposangue}, hospital: {id: usuarioLogado.id}};
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
                200: function() {
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
                    carregaGrid(null);
                },
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
                    carregaGrid(null);
                }
            }
        });
    });
    
    //Remove paciente
    $("#btnExcluir").click(function(e) {
        
        var id = $("#remove-id").val();
        
        //Ajax remove paciente        
        var ajaxRemovePaciente = $.ajax({
            url: "./api/paciente/" + id,
            type: "delete"
        });
        
        ajaxRemovePaciente.done(function(data, textStatus, jqXHR) {
            
            var alert = '';
            alert += '<div id="msg" class="alert alert-success fade in">';
            alert += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            alert += '<strong>Sucesso!</strong> O paciente foi removido com sucesso.';
            alert += '</div>';
            $("#messages").append(alert);

            $("#modalRemovePaciente").modal('hide');
            $("#msg").alert();
            window.setTimeout(function() {
                $("#msg").fadeTo(500, 0).slideUp(500, function(){
                    $(this).remove(); 
                });
            }, 5000);
            carregaGrid(null);
        });

        ajaxRemovePaciente.fail(function(data, textStatus, jqXHR) {
            //console.log(data, textStatus, jqXHR);
            //console.log("Falha");
            
            var alert = '';
            alert += '<div id="msg" class="alert alert-danger fade in">';
            alert += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            alert += '<strong>Erro!</strong> Existem bolsas associadas a este paciente.';
            alert += '</div>';
            $("#messages").append(alert);

            $("#modalRemovePaciente").modal('hide');
            $("#msg").alert();
            window.setTimeout(function() {
                $("#msg").fadeTo(500, 0).slideUp(500, function(){
                    $(this).remove(); 
                });
            }, 5000);
            carregaGrid(null);
        });
    });
    
    //Abre modal para associar bolsa
    $("#btnAssociaBolsa").click(function(e) {
        
        e.preventDefault();
                
        var ajaxBuscaBolsas = $.ajax({
            url: "./api/bolsadesangue/q?hospital=" + usuarioLogado.id + "&tipo=null"
        });
        
        ajaxBuscaBolsas.done(function(data, textStatus, jqXHR) {
            listaBolsas(data);
        });

        ajaxBuscaBolsas.fail(function(data, textStatus, jqXHR) {
            console.log("Falha");
        });
    });
    
    //Desassocia a bolsa
    $("#btnDesassociaBolsa").click(function(e) {
        
        var idBolsa = $("#desassocia-id").val();
            
        var ajaxBolsa = $.ajax({
            url: "./api/bolsadesangue/" + idBolsa
        });

        ajaxBolsa.done(function(data, textStatus, jqXHR) {
            //console.log(data);

            var idBolsa = data[0].id;
            var numero = data[0].numero;
            var validade = data[0].validade;
            var tiposangue = data[0].tiposangue.id;
            var tipobolsa = data[0].tipobolsa.id;

            var dados = {id: idBolsa, numero: numero, validade: validade, tiposangue: {id: tiposangue}, tipobolsa: {id: tipobolsa}, hospital: {id: usuarioLogado.id}, paciente: null, datasaida: null};
            
            var jsonDados = $.toJSON(dados);
            console.log(jsonDados);
            var ajaxDesassociaBolsa = $.ajax({
                url: "./api/bolsadesangue/",
                accepts: {
                    text: "application/json"
                },
                contentType: "application/json",
                dataType: "json",            
                type: "put",
                data: jsonDados,
                statusCode: {
                    200: function() {
                        var alert = '';
                        alert += '<div id="msg" class="alert alert-success fade in">';
                        alert += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
                        alert += '<strong>Sucesso!</strong> A bolsa foi desassociada do paciente com sucesso.';
                        alert += '</div>';
                        $("#messages").append(alert);
                        $("#modalDesassociaBolsa").modal('hide');
                        $("#modalListaBolsas").modal('hide');
                        $("#modalFormPaciente").modal('hide');
                        $("#msg").alert();
                        window.setTimeout(function() {
                            $("#msg").fadeTo(500, 0).slideUp(500, function(){
                                $(this).remove(); 
                            });
                        }, 5000);
                        carregaGrid(null);
                    },
                    201: function() {
                        var alert = '';
                        alert += '<div id="msg" class="alert alert-success fade in">';
                        alert += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
                        alert += '<strong>Sucesso!</strong> A bolsa foi desassociada do paciente com sucesso.';
                        alert += '</div>';
                        $("#messages").append(alert);
                        $("#modalDesassociaBolsa").modal('hide');
                        $("#modalListaBolsas").modal('hide');
                        $("#modalFormPaciente").modal('hide');
                        $("#msg").alert();
                        window.setTimeout(function() {
                            $("#msg").fadeTo(500, 0).slideUp(500, function(){
                                $(this).remove(); 
                            });
                        }, 5000);
                        carregaGrid(null);
                    }
                }
            });
        });

        ajaxBolsa.fail(function(data, textStatus, jqXHR) {
            console.log("Falha");
        });
    });
    
    $("#btnPesquisaPaciente").click(function(e) {
        
        e.preventDefault();
        
        var query = $("#txtPesquisaPaciente").val();
        carregaGrid(query);
    });
    
    //Executa scripts
    carregaGrid(null);
    carregaTipoSangue();
});