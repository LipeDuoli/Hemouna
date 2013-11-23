/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.servico;

import com.google.gson.Gson;
import com.hemouna.dao.PacienteDao;
import com.hemouna.entidade.Paciente;
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
@Path("/paciente")
public class RestPaciente {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarPaciente(String paciente_str) {
        try {
            Paciente p = new Gson().fromJson(paciente_str, Paciente.class);
            PacienteDao pDao = new PacienteDao();
            pDao.salvar(p);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarPacientes() {
        try {
            String json = new Gson().toJson(new PacienteDao().listarTodos());
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response alterarPaciente(String paciente_str) {
        try {
            Paciente p = new Gson().fromJson(paciente_str, Paciente.class);
            PacienteDao pDao = new PacienteDao();
            pDao.alterar(p);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response apagarPaciente(@PathParam("id") int id) {
        try {
            Paciente p = new Paciente(id);
            PacienteDao pDao = new PacienteDao();
            pDao.excluir(p);
            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response obterHospital(@PathParam("id") int id) {
        try {
            String json = new Gson().toJson(new PacienteDao().getId(id));
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/bolsas")
    public Response retornaAsBolasDeSangueDoPaciente(@PathParam("id") int id) {
        try {
            String json = new Gson().toJson(new PacienteDao().getbolsas(id));
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/q")
    public Response query(@QueryParam("nome") String nome, @QueryParam("tiposangue") int tiposangue){
        try {
            String json = new Gson().toJson(new PacienteDao().query(nome, tiposangue));
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}
