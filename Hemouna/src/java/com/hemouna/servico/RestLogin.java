/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.servico;

import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import com.google.gson.Gson;
import com.hemouna.dao.HospitalDao;
import com.hemouna.entidade.Hospital;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Fillipe
 */
@Path("/login")
public class RestLogin {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarHospitais(@QueryParam("login") String login, @QueryParam("senha") String pass) {
        try {
            Hospital h = new HospitalDao().buscaLogin(login);
            pass = Hashing.sha1().hashString(pass, Charsets.UTF_8).toString();
            if(!pass.equals(h.getSenha())){
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
            h.setSenha("");
            String json = new Gson().toJson(h);
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

}
