/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.servico;

import com.hemouna.dao.HospitalDao;
import com.hemouna.entidade.Hospital;
import com.google.gson.Gson;
import java.util.LinkedList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
@Path("/hospital")
public class RestHospital {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarHospital(String hosp_str) {
        try {
            Hospital h = new Gson().fromJson(hosp_str, Hospital.class);
            HospitalDao hDao = new HospitalDao();
            hDao.salvar(h);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarHospital() {
        try {
            String json = new Gson().toJson(new HospitalDao().pesquisar("teste"));
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response obterHospital(@PathParam("id") int id) {
        try {
            return null;

        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
