package org.utl.dsm.rest;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.dms.Electrodomesticos.controller.controllerUser;
import org.utl.dsm.Electrodomesticos.model.User;

@Path("usuario")
public class UsuariosREST {
    
    @POST
@Path("login")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public Response login(
    @FormParam("nombre") String nombre,
    @FormParam("contrasenia") String contrasenia
) {
    try {
        controllerUser controller = new controllerUser();
        User u = controller.loginConValidacion(nombre, contrasenia);

        if (u != null) {
            String json = String.format(
                "{\"idUsuario\":%d,\"userName\":\"%s\",\"correo\":\"%s\",\"nombre\":\"%s\",\"app\":\"%s\",\"apm\":\"%s\",\"numero\":\"%s\",\"rol\":\"%s\",\"estatus\":%b}",
                u.getIdUsuario(),
                u.getUserName(),
                u.getCorreo(),
                u.getNombre(),
                u.getApp(),
                u.getApm(),
                u.getNumero(),
                u.getRol(),
                u.isEstatus()
            );
            return Response.ok(json).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                .entity("{\"error\":\"Credenciales inválidas\"}")
                .build();
        }
    } catch (Exception e) {
        e.printStackTrace();
        return Response.serverError()
            .entity("{\"error\":\"" + e.getMessage() + "\"}")
            .build();
    }
}


    @POST
    @Path("insertar")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertar(
        @FormParam("userName") String userName,
        @FormParam("correo") String correo,
        @FormParam("nombre") String nombre,
        @FormParam("app") String app,
        @FormParam("apm") String apm,
        @FormParam("numero") String numero,
        @FormParam("contrasenia") String contrasenia
    ) {
        try {
            controllerUser controller = new controllerUser();
            User u = new User();

            u.setUserName(userName);
            u.setCorreo(correo);
            u.setNombre(nombre);
            u.setApp(app);
            u.setApm(apm);
            u.setNumero(numero);
            u.setContrasenia(contrasenia);
            u.setEstatus(true);
            u.setRol("cliente");

            int idGenerado = controller.insertarUsuario(u);

            if (idGenerado > 0) {
                return Response.ok("{\"mensaje\":\"Usuario insertado correctamente\",\"id\":" + idGenerado + "}").build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST)
                               .entity("{\"error\":\"No se pudo insertar el usuario.\"}")
                               .build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"error\":\"" + e.getMessage() + "\"}")
                           .build();
        }
    }
    
}
