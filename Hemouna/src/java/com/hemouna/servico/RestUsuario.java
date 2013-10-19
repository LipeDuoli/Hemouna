/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.servico;

import com.hemouna.dao.UsuariosDao;
import com.hemouna.entidade.Usuarios;
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

@Path("/usuario")
public class RestUsuario {
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarUsuario(String usu_str){
       try {
           Usuarios u = new Gson().fromJson(usu_str, Usuarios.class);
           UsuariosDao uDao = new UsuariosDao();
           uDao.salvar(u);
           return Response.status(Response.Status.CREATED).build();
       } catch (Exception e) {
           return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
       }
    }
}
