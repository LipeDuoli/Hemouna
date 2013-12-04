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
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
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
    public Response cadastrarBolsa(String bolsa_str) {
        try {
            Bolsadesangue b = new Gson().fromJson(bolsa_str, Bolsadesangue.class);
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

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response alterarBolsa(String bolsa_str) {
        try {
            Bolsadesangue b = new Gson().fromJson(bolsa_str, Bolsadesangue.class);
            BolsaDeSangueDao bDao = new BolsaDeSangueDao();
            if (bDao.alterar(b) == true) {
                return Response.status(Response.Status.OK).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response apagarBolsa(@PathParam("id") int id) {
        try {
            Bolsadesangue b = new Bolsadesangue(id);
            BolsaDeSangueDao bDao = new BolsaDeSangueDao();
            if (bDao.excluir(b) == true) {
                return Response.status(Response.Status.OK).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response obterBolsa(@PathParam("id") int id) {
        try {
            String json = new Gson().toJson(new BolsaDeSangueDao().getId(id));
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/q")
    public Response query(@QueryParam("numero") String numero, @QueryParam("tiposangue") int tiposangue, @QueryParam("tipobolsa") int tipobolsa, @QueryParam("hospital") int hospital, @QueryParam("tipo") String tipo) {
        try {
            String json = new Gson().toJson(new BolsaDeSangueDao().query(numero, tiposangue, tipobolsa, hospital, tipo));
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

}
