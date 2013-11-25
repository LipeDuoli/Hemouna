$(document).ready(function() {
    $("#btnLogin").click(function(e) {
        e.preventDefault();
        var login = $("#usuario").val();
        var senha = $("#senha").val();
        
        //Ajax login
        var login = $.ajax({
            url: "./api/login?login=" + login + "&senha=" + senha,
            dataType: "json"
        });    

        login.done(function(data, textStatus, jqXHR) {            
            var jsonDados = $.toJSON(data);
            console.log(jsonDados);
            gerarCookie('hospital', jsonDados);
            window.location = "./principal.html";
        });

        login.fail(function(data, textStatus, jqXHR) {
            var alert = '';
            alert += '<div id="msg" class="alert alert-danger fade in">';
            alert += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            alert += 'Usuário ou senha inválidos';
            alert += '</div>';
            $("#messages").append(alert);
            $("#msg").alert();
            window.setTimeout(function() {
                $("#msg").fadeTo(500, 0).slideUp(500, function(){
                    $(this).remove(); 
                });
            }, 5000);
        });
    });    
});