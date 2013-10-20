/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.servico;

import com.google.gson.Gson;
import com.hemouna.dao.TipoBolsaDao;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Fillipe
 */
@Path("/tipobolsa")
public class RestTipoBolsa {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarTipoBolsa() {
        try {
            String json = new Gson().toJson(new TipoBolsaDao().listarTodos());
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

}
