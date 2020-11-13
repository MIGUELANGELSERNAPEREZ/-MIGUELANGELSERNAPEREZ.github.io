   //VARIABLES GLOBALES. PARA MOSTRAR TABLAS
   var tablaMateriaMostrar = false;
   


$(document).ready(function () {
    debugger;
   
    //trae el tipo de usuario que esta loguiado
   
    //VARIABLES GENERALES PARA FUNCIONAR
    var formData = new FormData();
    let tipoUsu = document.getElementById("tipoUsu");
    let mensaje = document.getElementById("mensaje");
    var info = document.getElementById("info");
    let btnCancelarCambios =  document.getElementById("btnCancelarCambios");

    btnCancelarCambios.addEventListener("click" , CancelarCambios);

    //ACCIONES DEL USUARIO ALUMNO
    let materias = document.getElementById("Materias");
    let docentes = document.getElementById("Docentes");
    let grupos   = document.getElementById("Grupos");
    let alumnos = document.getElementById("Alumnos");
    let calificaciones = document.getElementById("Calificcaiones");
    var datos;

    if(tipoUsu.value !="admin" && tipoUsu.value !="director"){


        formData.append('tipoUsu', tipoUsu.value);
        
        if(tipoUsu.value !=""){
                
                    //ruta  fetch
                    fetch("traerDatosUsuarios.php",{
                        method: 'POST',
                        body: formData

                    })
                    //promesa
                    .then(data => data.json())
                    .then(data => {
                        console.log(data);
                    if(data.idusuario == ""){
                        
                        mensaje.innerHTML = 
                        ` <div class="alert alert-danger" role="alert">
                            ${data.mensaje}
                        </div>
                        `;
                    }else{
                        cargarDatosUsuario(data , tipoUsu.value);

                        if(tipoUsu.value == "alumno"){
                            $("#idgrupo").attr("value", data.idgrupo)
                            document.getElementById("alumnoId").value = data.idAlumno;
                            
                        }
                    }    
        
                    
                    
                    }).catch(e =>{
                        console.log(e);
                    
                    });

        }else{

            mensaje.innerHTML = 
            ` <div class="alert alert-danger" role="alert">
                Error al cargar la informacion del usuario
            </div>
            `;
            
        }
    }else{
        //como es director o admin solo necesitmos insertar el 
        //botton de cerrado de sesion

        $("#info").append($("<div></div>").addClass("card-footer text-center")
        .append($("<a></a>").html("Cerrar Sesion").addClass("btn btn-danger btn-lg")
        .attr("href","cerrarSesion.php")
        )
         
        );

    }


    /*CREAMOS EVENTOS CLICK PARA LOS ENLACES QUE ESTAN EL EL NAVBAR(MENU)
    YA QUE ESTOS HARAN FUNCIONALIDADES PARA MOSTRAR INFORMACION DEL USU
    */

    //si es usuario es un alumno podra ver las materias que cursa
    //los docentes que tiene y calificaciones
    if(tipoUsu.value == "alumno"){

        materias.addEventListener("click", cargarMaterias);
    }else if(tipoUsu.value == "director"){
        /*si el usuario es el director redireccionara a otra ventana 
        para poder crear nuevos datos y mostrarlos.*/
       grupos.addEventListener("click" ,
         function(){
             window.location = "gestionAlumnos.php";
         });

        materias.addEventListener("click", function(){
            
            window.location = "formularioMaterias.php";
        });

        alumnos.addEventListener("click" , function(){
            window.location = "gestionAlumnos.php";
        });
    }else if(tipoUsu.value == "docente"){
        
        materias.addEventListener("click" , function(){
            window.location = "frmDocente.php";
        });
    }
      

});


function cargarMaterias(){
    
    
    if(tablaMateriaMostrar == true){
       
            $("#tabla").toggle();
    

    }else{

    
    debugger;
    let grupo = document.getElementById("idgrupo");
    let formData = new FormData();

   formData.append('accion', "getAllMateriaAlumno");
   formData.append('grupo', grupo.value);     
   let tabla = document.getElementById("tabla");

   fetch("consultas.php",{
    method: "POST",
    body: formData

   })
   .then(res => res.json())
   .then(res =>{
     
    tablaMaterias(res);

   }).catch(e =>{
     console.log(e);

    })
 }
}

function tablaMaterias(lista){

    debugger;
    $("#tabla").append($("<thead></thead>")
    .append($("<tr></tr>")
    .append($("<th></th>").attr("scope","col").text(""))
    .append($("<th></th>").attr("scope","col").text("Materia"))
    .append($("<th></th>").attr("scope","col").text("Tipo"))
    .append($("<th></th>").attr("scope","col").text("Unidades"))
    .append($("<th></th>").attr("scope","col").text("Docente"))
    
    
    )//dentro del tr
    
    )//dentro de la tabla
    .append($("<tbody></tbody>").addClass("table-ligth").attr("id","contenedor")
    //dentro del body
    );

    //cuerpo de la tabla. llenarla con los datos

    debugger;
    let insertar = document.getElementById("contenedor");
    let sum = 1;
    for(let i of lista){
        insertar.innerHTML += `
            <tr>
                <th scope="row" onclick="calificcaiones(${i.idMateria} , ${i.unidades})">${sum}</th>
                <td>${i.nombre}</td>
                <td>${i.tipoM}</td>
                <td>${i.unidades}</td>
                <td>${i.nombreUsu + " " + i.apellidoP + " " + i.apellidoM}</td>
            </tr>
         
        `;
        sum ++;
    
    }
    //indicamos que la tabla ya a sido mostrada
    tablaMateriaMostrar = true;


}

function calificcaiones(idmateria , unidades){
    CancelarCambios();
    debugger;
    let idalumno = document.getElementById("alumnoId").value;
    let formData = new FormData();
    formData.append("accion", "getAllCalificaciones");
    formData.append("idmateria", idmateria);
    formData.append("idalumno" , idalumno);
    
    fetch("consultas.php" , {
        method: 'POST',
        body: formData

    })
    .then( calificacion => calificacion.json())
    .then( calificacion => {
      
        console.log(calificacion);
        if(calificacion.mensaje == null){
            mostrarCalificcaiones(calificacion, unidades);
        }else{
            //error
            mensaje.innerHTML = 
            ` <div class="alert alert-danger" role="alert">
                A un no hay calificaciones asignadas en la materia
            </div>
            `;
        }
        
    })
    .catch( e =>{
        mensaje.innerHTML = 
        ` <div class="alert alert-danger" role="alert">
            A un no hay calificaciones asignadas en la materia
        </div>
        `;
    });
    
}
function CancelarCambios(){
    let posicion = document.getElementById("mdlunidades");
    posicion.innerHTML = "";
  }

function mostrarCalificcaiones(calificaciones , unidades){
debugger;
    let posicion = document.getElementById("mdlunidades");
    let cal = 0;
    for(let i =0; i< calificaciones.length; i++) {
        posicion.innerHTML += `
        <div class="col">
            <label for="">${calificaciones[i].bimestre}</label>
            <input class="form-control" type="text" name="txt${calificaciones[i].bimestre}" id="txt${calificaciones[i].bimestre}"
            style = "width:50px;" value = "${calificaciones[i].calificacion}">  
        </div>`;   
        cal+=  parseInt(calificaciones[i].calificacion);
        console.log(cal);
    }

    console.log(cal/unidades);
    posicion.innerHTML += `
        <div class="col">
            <label for="">Calificacion promedio</label>
            <input class="form-control" type="text" name="txtPromedio" id="txtPromedio"
            style = "width:70px;" value = "${cal/unidades}">  
        </div>`;  


    $("#mdlConfirmar").modal("toggle"); 
   
}

function cargarDatosUsuario(datos, tipoUsu){
    let id = 1;
    debugger;
     //agregar los datos del usuario (alumno)
     if(tipoUsu == "alumno"){
                       
        $("#info").append($("<div></div>").addClass("card-columns text-center").attr("id",id)
        .append($("<label></label>").html("Ciclo"))
        .append($("<p></p>").html(datos.cicloEscolar))
    
        );

        id++;
        $("#info").append($("<div></div>").addClass("card-columns text-center").attr("id",id)
        .append($("<label></label>").html("Grado"))
        .append($("<p></p>").html(datos.grado))
         
        );

        id++;
        $("#info").append($("<div></div>").addClass("card-columns text-center").attr("id",id)
        .append($("<label></label>").html("Localidad"))
        .append($("<p></p>").html(datos.Localidad))
         
        );
        id++;

        $("#info").append($("<div></div>").addClass("card-columns text-center").attr("id",id)
        .append($("<label></label>").html("Estatus"))
        .append($("<p></p>").html(datos.Estatus))
         
        );
        id++;
        $("#info").append($("<div></div>").addClass("card-footer text-center").attr("id",id)
        .append($("<a></a>").html("Cerrar Sesion").addClass("btn btn-danger btn-lg")
        .attr("href","cerrarSesion.php")
        )
         
        );
        
        //quiere desir que es un docente y cargaremos los datos
        // -------------------------DOCENTE.----------------
      }else if(tipoUsu == "docente"){
        $("#info").append($("<div></div>").addClass("card-columns text-center").attr("id",id)
        .append($("<label></label>").html("Horas"))
        .append($("<p></p>").html(datos.NumeroHoras))
    
        ); 

            id++;

        $("#info").append($("<div></div>").addClass("card-columns text-center").attr("id",id)
        .append($("<label></label>").html("Nivel Estudios"))
        .append($("<p></p>").html(datos.NivelEstudios))
    
        ); 

        id++;

        $("#info").append($("<div></div>").addClass("card-columns text-center").attr("id",id)
        .append($("<label></label>").html("Domicilio"))
        .append($("<p></p>").html(datos.Domicilio))
    
        ); 

        $("#info").append($("<div></div>").addClass("card-footer text-center").attr("id",id)
        .append($("<a></a>").html("Cerrar Sesion").addClass("btn btn-danger btn-lg")
        .attr("href","cerrarSesion.php")
        )
         
        );

      }
      
}

