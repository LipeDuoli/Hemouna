/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.servico;

import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import com.hemouna.dao.HospitalDao;
import com.hemouna.entidade.Hospital;
import com.google.gson.Gson;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Fillipe
 */
@Path("/hospital")
public class RestHospital {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarHospital(String hosp_str) {
        try {
            Hospital h = new Gson().fromJson(hosp_str, Hospital.class);
            HospitalDao hDao = new HospitalDao();
            String pass = Hashing.sha1().hashString(h.getSenha(), Charsets.UTF_8).toString();
            h.setSenha(pass);
            hDao.salvar(h);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarHospitais() {
        try {
            String json = new Gson().toJson(new HospitalDao().listarTodos());
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response alterarHospital(String hosp_str) {
        try {
            Hospital h = new Gson().fromJson(hosp_str, Hospital.class);
            HospitalDao hDao = new HospitalDao();
            hDao.alterar(h);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response apagarHospital(@PathParam("id") int id) {
        try {
            Hospital h = new Hospital(id);
            HospitalDao hDao = new HospitalDao();
            hDao.excluir(h);
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
            String json = new Gson().toJson(new HospitalDao().getId(id));
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}
