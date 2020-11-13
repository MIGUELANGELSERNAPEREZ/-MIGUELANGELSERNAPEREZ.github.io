//variables para notificar al usuario
let notificacion = document.getElementById("notificacion");
let mdlmensaje =  document.getElementById("mdlmensaje");
let operacion = document.getElementById("operacion");
var tablaUsuarios;
var idUsuario;
var nombreUsuario;
var idAlumno;

$(document).ready(function () {
    
    //ACCIONES DEL USUARIO ALUMNO
    let materias = document.getElementById("Materias");
    let docentes = document.getElementById("Docentes");
    let grupos   = document.getElementById("Grupos");
    let alumnos   = document.getElementById("Alumnos");
    let calificaciones = document.getElementById("Calificcaiones");
    
    //boton agrgar nuevo alumno
   let btnAgregarAlumno = document.getElementById("btnAgregarAlumno");
   let btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar");
   let btnCancelarAgregar = document.getElementById("btnCancelarAgregar");

   btnCancelarAgregar.addEventListener("click", cancelarAgregar);
    //metodo para mostrar el modal 
   btnAgregarAlumno.addEventListener("click", function(e){
        //mostramos el modal para que pueda agregar un nuevo alumno
        $("#mdlConfirmar").modal("toggle");
   });

   //boton para confirmar si se va agregar el alumno
   let btnConfirmarAgregar = document.getElementById("btnConfirmarAgregar");


   btnConfirmarEliminar.addEventListener("click", deleteUsuario); 

   btnConfirmarAgregar.addEventListener( "click" , insertUsuario);

   //cargarGrupos en el modal
   cargarGrupos();
   //llenar tabla
   traerDatos();

   //si es usuario es un alumno podra ver las materias que cursa
    //los docentes que tiene y calificaciones
    if(tipoUsu.value == "alumno"){

        materias.addEventListener("click", cargarMaterias);

    }else if(tipoUsu.value == "director"){
        /*si el usuario es el director redireccionara a otra ventana 
        para poder crear nuevos datos y mostrarlos.*/
       grupos.addEventListener("click" ,
         function(){
             window.location = "gestionMaterias.php";
         });

        materias.addEventListener("click", function(){
            
            window.location = "formularioMaterias.php";
        });

        alumnos.addEventListener("click" , function(){
            window.location = "gestionAlumnos.php";
        });
    }


    // Add event listener for opening and closing details
    $('#tabla').on('click', 'td.details-control', function () {
        debugger;
        var tr = $(this).closest('tr');
        var row = tablaUsuarios.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    });

});


function cancelarAgregar(){
    debugger;
    $("mdlConfirmar").modal("hide");
    //borramos la info de los inputs
    //SE MODIFICARA LA MATERIA
    //borramos la info de los inputs
    document.getElementById("txtnombre").value = "";
    document.getElementById("txtapellidoP").value = "";
    document.getElementById("txtapellidoM").value = "";
    document.getElementById("txtcorreo").value = "";
    document.getElementById("txtusuario").value = "";
    document.getElementById("txtpass").value = "";
    document.getElementById("txtfechaN").value = "";
    document.getElementById("exampleRadios1").checked;
    document.getElementById("txttelefono").value = "";
    document.getElementById("txtciclo").value = "";
    document.getElementById("txtgrado").selecteIndex = 0;
    document.getElementById("txtCURP").value = "";
    document.getElementById("txtdomicilio").value = "";
    document.getElementById("txtcodigoP").value = "";
    document.getElementById("cbestatus").selecteIndex = 0;
    document.getElementById("txtgrupoID").selecteIndex = 0;
    
    mdlmensaje.innerHTML = '';

}


function editar( id ){
    
    if(id!=""){
        formData = new FormData();
        formData.append("accion", "getAllUsuario");
        formData.append("id", id);

       fetch("consultas.php", {
           method: 'POST',
           body: formData
       })
       .then( res => res.json())
       .then( res => {
          
            if(res.id !=""){

                //insertamos los datos traidos a los elementos HTML
                $("#mdlConfirmar").modal("show");
                operacion.innerText = "Modificar";
                
                document.getElementById("txtnombre").value = res.nombre;
                document.getElementById("txtapellidoP").value = res.apellidoPaterno;
                document.getElementById("txtapellidoM").value = res.apellidoMaterno;
                document.getElementById("txtcorreo").value = res.correo;
                document.getElementById("txtusuario").value = res.usuario;
                document.getElementById("txtpass").value = res.contrasena;
                document.getElementById("txtfechaN").value = res.fechaNacimiento;
                if(res.sexo == "Hombre"){
                    document.getElementById("exampleRadios1").checked;
                }else{
                    document.getElementById("exampleRadios1").checked;
                }
               debugger;
                document.getElementById("txttelefono").value = res.telefono;
                document.getElementById("txtciclo").value = res.cicloEscolar;
                document.getElementById("txtgrado").selecteIndex = res.grado -1;
                document.getElementById("txtCURP").value = res.curp;
                document.getElementById("txtdomicilio").value = res.domicilio;
                document.getElementById("txtcodigoP").value = res.CodigoPostal;

                if(res.Estatus == "vigente"){
                    document.getElementById("cbestatus").selecteIndex = 0;

                }else{
                    document.getElementById("cbestatus").selecteIndex = 1;

                }
                document.getElementById("txtgrupoID").selecteIndex = res.idgrupo + 1;

                //EDITAR MATERIA
                idUsuario = id;
               
            }else{
               notificacion.innerText = 
               `<div class="alert alert-danger" role="alert">
                    ${res.error}!!
                </div> `;
            }
       })
       .catch( e => {
           console.log(e);
       });

   }else{
        //ubo un problema al extraer el id de la materia
        notificacion,innerHTML = 
        `<div class="alert alert-danger" role="alert">
            No se a podido obtener el id de la materia!!
        </div>`;
   }

   
}

function eliminar( id , nombre ){

    debugger;
    //insertamos en nombre del elemento a eliminar al modal
    document.getElementById("mdlnombre").innerText = nombre;

    $("#mdlEliminar").modal("show");

      idUsuario = id; 
      nombreUsuario = nombre;
}

function traerDatos(){
    
    let formData = new FormData;
    formData.append('accion', 'getAllMaterias');

    fetch("consultas.php", {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(res => {
       
        llenarTabla(res);
    })
    .catch(e =>{
        console.log(e);
    
    });
    
}

function insertUsuario(){
debugger;
    //llamamos el metodo de boostrapvalidator
    $("#frmAgregar").data('bootstrapValidator').validate();

    //si el metodo retorna un true quiere desir que los campos
        //estan bien  y redireccionara al login.php para iniciar
        //sesion
        if ($("#frmAgregar").data('bootstrapValidator').isValid()) {
            debugger;
            if(operacion.innerText == "Modificar"){
                //SE MODIFICARA LA MATERIA
               let fomulario = document.getElementById("frmAgregar");
               var select = document.getElementById("txtgrupoID"); /*Obtener el SELECT */
               var idgrupo = select.options[select .selectedIndex].id;
               let formDate = new FormData( fomulario );
                
               formDate.append('accion' , 'editarUsuario');
                formDate.append('id' , idUsuario);
                formDate.append('idGrupo' , idgrupo);
    
                fetch('consultas.php',{
                    method: 'POST',
                    body: formDate
    
                })
                .then(res => res.text())
                .then( res => {
                        
                   alert(res);
                    if(res == "true"){
                           //si fue correcta
                        $("#mdlConfirmar").modal("hide");
                        notificacion.innerHTML = 
                            `<div class="alert alert-success" role="alert">
                              El añumno <strong> ${txtnombre.value} </strong> ha sido modificado correctamente!!
                             </div>`;
    
                        //borramos la info de los inputs
                        document.getElementById("txtnombre").value = "";
                        document.getElementById("txtapellidoP").value = "";
                        document.getElementById("txtapellidoM").value = "";
                        document.getElementById("txtcorreo").value = "";
                        document.getElementById("txtusuario").value = "";
                        document.getElementById("txtpass").value = "";
                        document.getElementById("txtfechaN").value = "";
                        document.getElementById("exampleRadios1").checked;
                        document.getElementById("txttelefono").value = "";
                        document.getElementById("txtciclo").value = "";
                        document.getElementById("txtgrado").selecteIndex = 0;
                        document.getElementById("txtCURP").value = "";
                        document.getElementById("txtdomicilio").value = "";
                        document.getElementById("txtcodigoP").value = "";
                        document.getElementById("cbestatus").selecteIndex = 0;
                        document.getElementById("txtgrupoID").selecteIndex = 0;
    
                        //Actualizamos la tabla    
                    
                        traerDatos();
    
                    }else if(res == "false"){
                         //si fue correcta
                        mensaje.innerHTML = 
                        `<div class="alert alert-danger" role="alert">
                          El alumno <strong> ${txtnombre.value} </strong> no a sido modificada, error en la 
                          conexion!!
                         </div>`;
                    }else{
                         //si los canpos estaban mal
                        mensaje.innerHTML = 
                        `<div class="alert alert-danger" role="alert">
                          ${res}
                         </div>`;
                    }
    
    
                })
                .catch(e =>{
                    console.log(e);
                
                });

            }else{
            
                //AGREGAR USUARIOS NUEVOS
                    let formulario = document.getElementById("frmAgregar");

                    let formData = new FormData(formulario);

                    formData.append("accion" , 'insertUsuario');
                    
                    debugger;
                
                    fetch("consultas.php", {
                        method: 'POST',
                        body: formData
                    })
                    .then( res => res.text() )
                    .then( res => {
                        
                        
                        if(res == "true"){
                        
                        traerId();

                        }else{
                            mdlmensaje.innerHTML = 
                            `<div class="alert alert-danger" role="alert">
                                Problemas en la conexion para poder agregar al alumno {1}
                            </div>`;
                        }   
                        
                    })
                    .catch( e=> {
                    alert(e);
                    });

                }
        }else{
            mdlmensaje.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Hay error en la información!!
            </div>`;
        }
       
}



function insertAlumno( idUsu ){
    mdlmensaje.innerHTML = '';
   debugger;

   var select = document.getElementById("txtgrupoID"); /*Obtener el SELECT */
   var idgrupo = select.options[select .selectedIndex].id;
   let txtnombre = document.getElementById("txtnombre");
   let formulario = document.getElementById("frmAgregar");

   let formData = new FormData(formulario);
   debugger;
   formData.append("accion" , 'insertAlumno');
   formData.append("id" , idUsu);
   formData.append("idGrupo" , idgrupo );
  
   fetch("consultas.php", {
       method: 'POST',
       body: formData
   })
   .then( res => res.text() )
   .then( res => {
      
       if(res == "true"){
          //si fue correcta
          $("#mdlConfirmar").modal("hide");
          
          notificacion.innerHTML = 
              `<div class="alert alert-success" role="alert">
                El alumno <strong> ${txtnombre.value} </strong> ha sido agregado correctamente!!
               </div>`;

          //borramos la info de los inputs
          
          txtnombre.value = "";
          document.getElementById("txtapellidoP").value = "";
          document.getElementById("txtapellidoM").value = "";
          document.getElementById("txtcorreo").value = "";
          document.getElementById("txtusuario").value = "";
          document.getElementById("txtpass").value = "";
          document.getElementById("txtfechaN").value = "";
          document.getElementById("exampleRadios1").checked;
          document.getElementById("txttelefono").value = "";
          document.getElementById("txtciclo").value = "";
          document.getElementById("txtgrado").selecteIndex = 0;
          document.getElementById("txtCURP").value = "";
          document.getElementById("txtdomicilio").value = "";
          document.getElementById("txtcodigoP").value = "";
          document.getElementById("cbestatus").selecteIndex = 0;
          document.getElementById("txtgrupoID").selecteIndex = 0;
       

          //Actualizamos la tabla    
      
          traerDatos();    

       }else{
           mdlmensaje.innerHTML = 
           `<div class="alert alert-danger" role="alert">
               Problemas en la conexion para poder agregar al alumno {2}
           </div>`;
       }   
       
   })
   .catch( e=> {

   });


}


function traerId(){

    let id;
    let formData = new FormData();

    formData.append("accion" , 'getAllIdUsuario');
   
    fetch("consultas.php", {
        method: 'POST',
        body: formData
    })
    .then( res => res.text() )
    .then( (res) => {
       return res
    })
    .then((res) =>{
        
        insertAlumno(res);
    })
    .catch( e => {
      console.log(e);
    });  

}

function deleteUsuario(){

    $("#mdlEliminar").modal("hide");
    
    formData = new FormData();
    formData.append("accion" , "deleteUsuario");
    formData.append("id" , idUsuario);

    fetch("consultas.php",{
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(res => {
       
        alert( res );
        if(res == "true"){
            notificacion.innerHTML = `
            <div class="alert alert-success" role="alert">
                El alumno <strong> ${nombreUsuario} </strong> ha sido eliminado!!
           </div>`;

           traerDatos();

       }else{
           //no se pudo eliminar la materia
           notificacion.innerHTML = `
             <div class="alert alert-danger" role="alert">
                El alumno <strong> ${nombreUsuario} </strong> no se pudo eliminar!!
            </div>`;
       }
    })
    .catch(e =>{
        console.log(e)
    });

}

function eliminar( id , nombre){
    
    //insertamos en nombre del elemento a eliminar al modal
    document.getElementById("mdlnombre").innerText = nombre;

    $("#mdlEliminar").modal("show");

      idUsuario = id; 
      nombreUsuario = nombre;
}

function traerDatos(){
    
    debugger;
    let formData = new FormData;
    formData.append('accion', 'getAllUsuarios');

    fetch("consultas.php", {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(res => {
       
        traerAlumnos( res );
        
    })
    .catch(e =>{
        console.log(e);
    
    });
    
}

function traerAlumnos( usuarios ){
    
    let formData = new FormData;
    formData.append('accion', 'getAllAlumnos');

    fetch("consultas.php", {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(res => {

       console.log(res);
       var con = 0;
     usuarios.forEach(element1 => {
        
        res.forEach(element2 => {
        
            if(element1.idUsuario == element2.idusuario){
               
                element1.idAlumno = element2.idAlumno;
                element1.cicloE = element2.cicloEscolar;
                element1.grado = element2.grado;
                element1.curp = element2.curp;
                element1.domicilio = element2.domicilio;
                element1.codigoP = element2.CodigoPostal;
                element1.estatus = element2.Estatus;
                element1.idgrupo = element2.idgrupo;
                element1.idusuario = element2.idusuario;
            }
        
           
        });           
            
       
     });
     
     console.log(usuarios);
     llenarTabla(usuarios);
        
    })
    .catch(e =>{
        console.log(e);
    
    });
}


    

function llenarTabla(datos) {

    //Almacenamos la referencia a la tabla con el plugin aplicado, ya que la usaremos para los filtros
      
    tablaUsuarios = $('#tabla').DataTable({
        destroy: true,
        //Asignamos la colección de datos en JSON que se mostrarán en la tabla
        data: datos,
        //La tabla ajusta cada columna de acuerdo a los datos contenidos en ellas
        //pero podemos también asignar un ancho fijo de esta manera, targets representa los 
        //índices de las columnas a los que se les aplicará este tamaño

        columns: [
            {"className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
        
            },
           
            //el valor colocado en title es el texto que aparecerá en la columna y el valor colocado en 
            //data deberá ser el nombre de la propiedad del pojo que recibirémos en la colección de datos
            { title: "ID", data: "idUsuario" },
            { title: "Nombre", data: "nombre" }, //Si quiere mostrarse el id se descomenta esta linea
            { title: "Paterno", data: "apellidoP" },
            { title: "Materno", data: "apellidoM" },
            { title: "Correo", data: "correo" },
            { title: "Usuario", data: "usuario" },
            


            { //Esta columna coloca los botones que representarán las operaciones de cada renglón
                //Este tipo de especificación también nos permite manipular la visualización de una columna
                //por ejemplo, hay veces que en una propiedad del objeto que es entera o trae datos representativos
                //como el Genero, solemos colocar solo M y F, y cuando los mostramos en la tabla queremos que se vea 
                //como Masculino y Femenino

                title: "", data: null, render:
                    //En este otro caso data trae el objeto que se carga en la fila, por ello podemos 
                    //acceder a todos los valores que vengan en el objeto
                    function (data, type, row) {
                        return '<div class="row justify-content-center">' +
                            '<button type="button" onclick="editar(' + data.idUsuario + ')" class="btn btn-primary">Editar</button>' +
                            '<button type="button" onclick="eliminar(' + data.idUsuario + ', \'' + data.nombre + '\')" class="btn btn-danger">Eliminar</button>' +
                            '</div>';
                    }
            }
        ],
        
        "order": [[1, 'asc']]
 
        //Cuando queremos hacer alguna adecuación del aspecto de la fila, por ejemplo, colorear una celda o 
        //toda la fila de acuerdo al valor de algún atributo
        //"fnRowCallback": function (row, data, displayIndex) {
        //sentencias de revisión de datos y adecuaciones de aspecto
        //},
    }); 
   
}


/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Password:</td>'+
            '<td>'+d.contrasena+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Fecha de Nacimiento:</td>'+
            '<td>'+d.fechaN+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Sexo:</td>'+
            '<td>'+d.sexo+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Telefono:</td>'+
            '<td>'+d.telefono+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Ciclo Escolar:</td>'+
            '<td>'+d.cicloE+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>grado:</td>'+
            '<td>'+d.grado+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>CURP:</td>'+
            '<td>'+d.curp+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Domicilio:</td>'+
            '<td>'+d.domicilio+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Codigo Postal:</td>'+
            '<td>'+d.codigoP+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Estatus:</td>'+
            '<td>'+d.estatus+'</td>'+
        '</tr>'+
    '</table>';
}


function cargarGrupos(){

    let formData = new FormData;
    formData.append('accion', 'getAllGrupos');

    fetch("consultas.php", {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(res => {
       
        if(res.idgrupo!=""){
                crearOpcions( res );

        }else if(res.mensaje!=""){
            notificacion.innerHTML = 
            `<div class="alert alert-danger" role="alert">
                ${res.mensaje}!!
            </div>`;
        }else{

        }
    })
    .catch(e =>{
        console.log(e);
    
    });
}

function crearOpcions( grupos ){
    debugger;
    grupos.forEach(element => {
        $("#txtgrupoID").append($("<option></option>")
        .text(element.nombre)
        .attr("id" , element.idgrupo)
        );     
    });
   

 }



 
 $('#frmAgregar').bootstrapValidator({
    framework: 'bootstrap',
    excluded: [':disabled', ':hidden'],
    fields: {
        txtnombre: {
            validators: {
                notEmpty: { message: 'El alumno debe de tener un nombre' },
                stringLength: {
                    min: 5,
                    max: 20,
                    message: 'El alumno debe de tener minimo 5 caracteres y maximo 20'
                }
            }
        },
        txtapellidoP: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                stringLength:{
                    min: 4,
                    max: 25,
                    message: 'El campo debe de contar con minimo 5 caracteres y maximo 25'
                }
            }
        },

        txtapellidoM: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                stringLength:{
                    min: 4,
                    max: 25,
                    message: 'El campo debe de contar con minimo 5 caracteres y maximo 25'
                }
            }
        },

        txtcorreo: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                emailAddress: {
                    message: 'El valor no es valido'
                }
            }
        },

        txtusuario: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                stringLength:{
                    min: 5,
                    max: 20,
                    message: 'El campo debe de contar con minimo 5 caracteres y maximo 20'
                }
            }
        },

        txtpass: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                stringLength:{
                    min: 3,
                    max: 8,
                    message: 'El campo debe de contar con minimo 3 caracteres y maximo 8'
                }
            
            }
        },

        txtfechaN: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                date:{
                    format: 'YYYY-MM-DD',
                    message: 'El campo no cuenta con un formato de fecha valida'
                }
            }
        },

        txttelefono:{
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                stringLength:{
                    min: 10,
                    max: 10,
                    message: 'El campo debe de contar con minimo 3 caracteres y maximo 8'
                }
            }


         },

         txtciclo: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                date:{
                    format: 'YYYY-MM-DD',
                    message: 'El campo no cuenta con un formato de fecha valida'
                }
            }
        },

        txtCURP: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                stringLength:{
                    min: 18,
                    max: 18,
                    message: 'El campo debe de contar con 18 caracteres'
                }
            }
        },

        
        txtdomicilio: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                stringLength:{
                    min: 5,
                    max: 50,
                    message: 'El campo debe de contar con minimo 5 caracteres y maximo 50'
                }
            }
        },
   
        txtcodigoP: {
            validators: {
                notEmpty: { message: 'El campo es obligatoria' },
                stringLength:{
                    min: 5,
                    max: 5,
                    message: 'El campo debe de contar con 5 caracteres'
                }
            }
        }  
}});