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
        $("#oPosCH").html("<img src='" + retornaSrcImagem(oPosCH) + "' title='" + oPosCH + " bolsas' style='height: 120px; width: 100px;'><br><b>" + oPosCH + " bolsa(s)<b>");
        $("#oPosCP").html("<img src='" + retornaSrcImagem(oPosCP) + "' title='" + oPosCP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + oPosCP + " bolsa(s)<b>");
        $("#oPosP").html("<img src='" + retornaSrcImagem(oPosP) + "' title='" + oPosP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + oPosP + " bolsa(s)<b>");
        $("#oPosC").html("<img src='" + retornaSrcImagem(oPosC) + "' title='" + oPosC + " bolsas' style='height: 120px; width: 100px;'><br><b>" + oPosC + " bolsa(s)<b>");
        
        $("#oNegCH").html("<img src='" + retornaSrcImagem(oNegCH) + "' title='" + oNegCH + " bolsas' style='height: 120px; width: 100px;'><br><b>" + oNegCH + " bolsa(s)<b>");
        $("#oNegCP").html("<img src='" + retornaSrcImagem(oNegCP) + "' title='" + oNegCP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + oNegCP + " bolsa(s)<b>");
        $("#oNegP").html("<img src='" + retornaSrcImagem(oNegP) + "' title='" + oNegP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + oNegP + " bolsa(s)<b>");
        $("#oNegC").html("<img src='" + retornaSrcImagem(oNegC) + "' title='" + oNegC + " bolsas' style='height: 120px; width: 100px;'><br><b>" + oNegC + " bolsa(s)<b>");
        
        $("#aPosCH").html("<img src='" + retornaSrcImagem(aPosCH) + "' title='" + aPosCH + " bolsas' style='height: 120px; width: 100px;'><br><b>" + aPosCH + " bolsa(s)<b>");
        $("#aPosCP").html("<img src='" + retornaSrcImagem(aPosCP) + "' title='" + aPosCP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + aPosCP + " bolsa(s)<b>");
        $("#aPosP").html("<img src='" + retornaSrcImagem(aPosP) + "' title='" + aPosP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + aPosP + " bolsa(s)<b>");
        $("#aPosC").html("<img src='" + retornaSrcImagem(aPosC) + "' title='" + aPosC + " bolsas' style='height: 120px; width: 100px;'><br><b>" + aPosC + " bolsa(s)<b>");
        
        $("#aNegCH").html("<img src='" + retornaSrcImagem(aNegCH) + "' title='" + aNegCH + " bolsas' style='height: 120px; width: 100px;'><br><b>" + aNegCH + " bolsa(s)<b>");
        $("#aNegCP").html("<img src='" + retornaSrcImagem(aNegCP) + "' title='" + aNegCP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + aNegCP + " bolsa(s)<b>");
        $("#aNegP").html("<img src='" + retornaSrcImagem(aNegP) + "' title='" + aNegP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + aNegP + " bolsa(s)<b>");
        $("#aNegC").html("<img src='" + retornaSrcImagem(aNegC) + "' title='" + aNegC + " bolsas' style='height: 120px; width: 100px;'><br><b>" + aNegC + " bolsa(s)<b>");
        
        $("#bPosCH").html("<img src='" + retornaSrcImagem(bPosCH) + "' title='" + bPosCH + " bolsas' style='height: 120px; width: 100px;'><br><b>" + bPosCH + " bolsa(s)<b>");
        $("#bPosCP").html("<img src='" + retornaSrcImagem(bPosCP) + "' title='" + bPosCP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + bPosCP + " bolsa(s)<b>");
        $("#bPosP").html("<img src='" + retornaSrcImagem(bPosP) + "' title='" + bPosP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + bPosP + " bolsa(s)<b>");
        $("#bPosC").html("<img src='" + retornaSrcImagem(bPosC) + "' title='" + bPosC + " bolsas' style='height: 120px; width: 100px;'><br><b>" + bPosC + " bolsa(s)<b>");
        
        $("#bNegCH").html("<img src='" + retornaSrcImagem(bNegCH) + "' title='" + bNegCH + " bolsas' style='height: 120px; width: 100px;'><br><b>" + bNegCH + " bolsa(s)<b>");
        $("#bNegCP").html("<img src='" + retornaSrcImagem(bNegCP) + "' title='" + bNegCP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + bNegCP + " bolsa(s)<b>");
        $("#bNegP").html("<img src='" + retornaSrcImagem(bNegP) + "' title='" + bNegP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + bNegP + " bolsa(s)<b>");
        $("#bNegC").html("<img src='" + retornaSrcImagem(bNegC) + "' title='" + bNegC + " bolsas' style='height: 120px; width: 100px;'><br><b>" + bNegC + " bolsa(s)<b>");
        
        $("#abPosCH").html("<img src='" + retornaSrcImagem(abPosCH) + "' title='" + abPosCH + " bolsas' style='height: 120px; width: 100px;'><br><b>" + abPosCH + " bolsa(s)<b>");
        $("#abPosCP").html("<img src='" + retornaSrcImagem(abPosCP) + "' title='" + abPosCP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + abPosCP + " bolsa(s)<b>");
        $("#abPosP").html("<img src='" + retornaSrcImagem(abPosP) + "' title='" + abPosP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + abPosP + " bolsa(s)<b>");
        $("#abPosC").html("<img src='" + retornaSrcImagem(abPosC) + "' title='" + abPosC + " bolsas' style='height: 120px; width: 100px;'><br><b>" + abPosC + " bolsa(s)<b>");
        
        $("#abNegCH").html("<img src='" + retornaSrcImagem(abNegCH) + "' title='" + abNegCH + " bolsas' style='height: 120px; width: 100px;'><br><b>" + abNegCH + " bolsa(s)<b>");
        $("#abNegCP").html("<img src='" + retornaSrcImagem(abNegCP) + "' title='" + abNegCP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + abNegCP + " bolsa(s)<b>");
        $("#abNegP").html("<img src='" + retornaSrcImagem(abNegP) + "' title='" + abNegP + " bolsas' style='height: 120px; width: 100px;'><br><b>" + abNegP + " bolsa(s)<b>");
        $("#abNegC").html("<img src='" + retornaSrcImagem(abNegC) + "' title='" + abNegC + " bolsas' style='height: 120px; width: 100px;'><br><b>" + abNegC + " bolsa(s)<b>");
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