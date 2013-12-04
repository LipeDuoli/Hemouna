$(document).ready(function() {
    
    validaUsuario();
    
    var cookieUser = lerCookie('hospital');
    var usuarioLogado = $.parseJSON(cookieUser);
    
    $("#lblUsuario").text(usuarioLogado.nomehosp);
    
    var bolsas = null;
    
    function retornaSrcImagem(quantidade) {
        
        var urlImg;
        
        if(quantidade <= 5) {
            urlImg = "./img/bolsa_vazia.png";
        }
        else if(quantidade > 5 && quantidade <= 15) {
            urlImg = "./img/bolsa_media.png";
        }
        else {
            urlImg = "./img/bolsa_cheia.png";
        }
        
        return urlImg;
    }
    
    //Ajax bolsas de sangue
    var ajaxBolsa = $.ajax({
        url: "./api/bolsadesangue/q?hospital=" + usuarioLogado.id + "&tipo=null",
        dataType: "json"
    });    

    ajaxBolsa.done(function(data, textStatus, jqXHR) {
        bolsas = data;
        
        //Bolsas O+-
        var oPosCH = 0;
        var oPosCP = 0;
        var oPosP = 0;
        var oPosC = 0;
        var oNegCH = 0;
        var oNegCP = 0;
        var oNegP = 0;
        var oNegC = 0;
        
        //Bolsas A+-
        var aPosCH = 0;
        var aPosCP = 0;
        var aPosP = 0;
        var aPosC = 0;
        var aNegCH = 0;
        var aNegCP = 0;
        var aNegP = 0;
        var aNegC = 0;
        
        //Bolsas B+-
        var bPosCH = 0;
        var bPosCP = 0;
        var bPosP = 0;
        var bPosC = 0;
        var bNegCH = 0;
        var bNegCP = 0;
        var bNegP = 0;
        var bNegC = 0;
        
        //Bolsas AB+-
        var abPosCH = 0;
        var abPosCP = 0;
        var abPosP = 0;
        var abPosC = 0;
        var abNegCH = 0;
        var abNegCP = 0;
        var abNegP = 0;
        var abNegC = 0;
        
        //Insere quantidade em cada tipo/bolsa
        for(var i in bolsas) {
            
            console.log(bolsas[i].tiposangue.id, bolsas[i].tipobolsa.id);
            switch (bolsas[i].tiposangue.id) {
                
                case 1:
                    if(bolsas[i].tipobolsa.id == 1) oPosCH++;
                    else if(bolsas[i].tipobolsa.id == 2) oPosCP++;
                    else if(bolsas[i].tipobolsa.id == 3) oPosP++;
                    else if(bolsas[i].tipobolsa.id == 4) oPosC++;
                    break;
                case 2:
                    if(bolsas[i].tipobolsa.id == 1) oNegCH++;
                    else if(bolsas[i].tipobolsa.id == 2) oNegCP++;
                    else if(bolsas[i].tipobolsa.id == 3) oNegP++;
                    else if(bolsas[i].tipobolsa.id == 4) oNegC++;
                    break;
                case 3:
                    if(bolsas[i].tipobolsa.id == 1) aPosCH++;
                    else if(bolsas[i].tipobolsa.id == 2) aPosCP++;
                    else if(bolsas[i].tipobolsa.id == 3) aPosP++;
                    else if(bolsas[i].tipobolsa.id == 4) aPosC++;
                    break;
                case 4:
                    if(bolsas[i].tipobolsa.id == 1) aNegCH++;
                    else if(bolsas[i].tipobolsa.id == 2) aNegCP++;
                    else if(bolsas[i].tipobolsa.id == 3) aNegP++;
                    else if(bolsas[i].tipobolsa.id == 4) aNegC++;
                    break;
                case 5:
                    if(bolsas[i].tipobolsa.id == 1) bPosCH++;
                    else if(bolsas[i].tipobolsa.id == 2) bPosCP++;
                    else if(bolsas[i].tipobolsa.id == 3) bPosP++;
                    else if(bolsas[i].tipobolsa.id == 4) bPosC++;
                    break;
                case 6:
                    if(bolsas[i].tipobolsa.id == 1) bNegCH++;
                    else if(bolsas[i].tipobolsa.id == 2) bNegCP++;
                    else if(bolsas[i].tipobolsa.id == 3) bNegP++;
                    else if(bolsas[i].tipobolsa.id == 4) bNegC++;
                    break;
                case 7:
                    if(bolsas[i].tipobolsa.id == 1) abPosCH++;
                    else if(bolsas[i].tipobolsa.id == 2) abPosCP++;
                    else if(bolsas[i].tipobolsa.id == 3) abPosP++;
                    else if(bolsas[i].tipobolsa.id == 4) abPosC++;
                    break;
                case 8:
                    if(bolsas[i].tipobolsa.id == 1) abNegCH++;
                    else if(bolsas[i].tipobolsa.id == 2) abNegCP++;
                    else if(bolsas[i].tipobolsa.id == 3) abNegP++;
                    else if(bolsas[i].tipobolsa.id == 4) abNegC++;
                    break;
            }
        }
        
        //Joga dados para html
        $("#oPosCH").html("<img src='" + retornaSrcImagem(oPosCH) + "' title='" + oPosCH + " bolsas' style='height: 120px; width: 100px;'>");
        $("#oPosCP").html("<img src='" + retornaSrcImagem(oPosCP) + "' title='" + oPosCP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#oPosP").html("<img src='" + retornaSrcImagem(oPosP) + "' title='" + oPosP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#oPosC").html("<img src='" + retornaSrcImagem(oPosC) + "' title='" + oPosC + " bolsas' style='height: 120px; width: 100px;'>");
        
        $("#oNegCH").html("<img src='" + retornaSrcImagem(oNegCH) + "' title='" + oNegCH + " bolsas' style='height: 120px; width: 100px;'>");
        $("#oNegCP").html("<img src='" + retornaSrcImagem(oNegCP) + "' title='" + oNegCP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#oNegP").html("<img src='" + retornaSrcImagem(oNegP) + "' title='" + oNegP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#oNegC").html("<img src='" + retornaSrcImagem(oNegC) + "' title='" + oNegC + " bolsas' style='height: 120px; width: 100px;'>");
        
        $("#aPosCH").html("<img src='" + retornaSrcImagem(aPosCH) + "' title='" + aPosCH + " bolsas' style='height: 120px; width: 100px;'>");
        $("#aPosCP").html("<img src='" + retornaSrcImagem(aPosCP) + "' title='" + aPosCP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#aPosP").html("<img src='" + retornaSrcImagem(aPosP) + "' title='" + aPosP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#aPosC").html("<img src='" + retornaSrcImagem(aPosC) + "' title='" + aPosC + " bolsas' style='height: 120px; width: 100px;'>");
        
        $("#aNegCH").html("<img src='" + retornaSrcImagem(aNegCH) + "' title='" + aNegCH + " bolsas' style='height: 120px; width: 100px;'>");
        $("#aNegCP").html("<img src='" + retornaSrcImagem(aNegCP) + "' title='" + aNegCP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#aNegP").html("<img src='" + retornaSrcImagem(aNegP) + "' title='" + aNegP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#aNegC").html("<img src='" + retornaSrcImagem(aNegC) + "' title='" + aNegC + " bolsas' style='height: 120px; width: 100px;'>");
        
        $("#bPosCH").html("<img src='" + retornaSrcImagem(bPosCH) + "' title='" + bPosCH + " bolsas' style='height: 120px; width: 100px;'>");
        $("#bPosCP").html("<img src='" + retornaSrcImagem(bPosCP) + "' title='" + bPosCP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#bPosP").html("<img src='" + retornaSrcImagem(bPosP) + "' title='" + bPosP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#bPosC").html("<img src='" + retornaSrcImagem(bPosC) + "' title='" + bPosC + " bolsas' style='height: 120px; width: 100px;'>");
        
        $("#bNegCH").html("<img src='" + retornaSrcImagem(bNegCH) + "' title='" + bNegCH + " bolsas' style='height: 120px; width: 100px;'>");
        $("#bNegCP").html("<img src='" + retornaSrcImagem(bNegCP) + "' title='" + bNegCP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#bNegP").html("<img src='" + retornaSrcImagem(bNegP) + "' title='" + bNegP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#bNegC").html("<img src='" + retornaSrcImagem(bNegC) + "' title='" + bNegC + " bolsas' style='height: 120px; width: 100px;'>");
        
        $("#abPosCH").html("<img src='" + retornaSrcImagem(abPosCH) + "' title='" + abPosCH + " bolsas' style='height: 120px; width: 100px;'>");
        $("#abPosCP").html("<img src='" + retornaSrcImagem(abPosCP) + "' title='" + abPosCP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#abPosP").html("<img src='" + retornaSrcImagem(abPosP) + "' title='" + abPosP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#abPosC").html("<img src='" + retornaSrcImagem(abPosC) + "' title='" + abPosC + " bolsas' style='height: 120px; width: 100px;'>");
        
        $("#abNegCH").html("<img src='" + retornaSrcImagem(abNegCH) + "' title='" + abNegCH + " bolsas' style='height: 120px; width: 100px;'>");
        $("#abNegCP").html("<img src='" + retornaSrcImagem(abNegCP) + "' title='" + abNegCP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#abNegP").html("<img src='" + retornaSrcImagem(abNegP) + "' title='" + abNegP + " bolsas' style='height: 120px; width: 100px;'>");
        $("#abNegC").html("<img src='" + retornaSrcImagem(abNegC) + "' title='" + abNegC + " bolsas' style='height: 120px; width: 100px;'>");
    });
    
    ajaxBolsa.fail(function(data, textStatus, jqXHR) {
        var alert = '';
        alert += '<div id="msg" class="alert alert-danger fade in">';
        alert += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
        alert += '<strong>Erro!</strong> Não foi possível carregar o dashboard.';
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