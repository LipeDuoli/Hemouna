/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.servico;

import com.google.gson.Gson;
import com.hemouna.dao.BolsaDeSangueDao;
import com.hemouna.entidade.Bolsadesangue;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Fillipe
 */
@Path("/bolsadesangue")
public class RestBolsaDeSangue {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarBolsa(String hosp_str) {
        try {
            Bolsadesangue b = new Gson().fromJson(hosp_str, Bolsadesangue.class);
            BolsaDeSangueDao bDao = new BolsaDeSangueDao();
            bDao.salvar(b);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarBolsas() {
        try {
            String json = new Gson().toJson(new BolsaDeSangueDao().listarTodos());
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
  

}
