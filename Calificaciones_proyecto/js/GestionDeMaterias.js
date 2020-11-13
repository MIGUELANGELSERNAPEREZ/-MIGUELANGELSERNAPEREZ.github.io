let mensaje = document.getElementById("mdlmensaje");
let notificacion = document.getElementById("mensaje");
let operacion = document.getElementById("operacion");
var tablaUsuarios;
var idMateria = 0;
var nombreMateria;


$(document).ready(function () {
    
    //ACCIONES DEL USUARIO ALUMNO
    let materias = document.getElementById("Materias");
    let docentes = document.getElementById("Docentes");
    let grupos   = document.getElementById("Grupos");
    let alumnos = document.getElementById("Alumnos");
    let calificaciones = document.getElementById("Calificcaiones");

    let agregarMateria = document.getElementById("agregarM");
    let btnConfirmarAgregar = document.getElementById("btnConfirmarAgregar");
    let btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar");
    let btnCancelarAgregar = document.getElementById("btnCancelarAgregar");

    btnCancelarAgregar.addEventListener("click", cancelarAgregar);


    agregarMateria.addEventListener("click", crearMateria);

     //ES EL METODO QUE SE ENCARGA DE HACER LA INSERCION A LA BD

    btnConfirmarAgregar.addEventListener("click", insertarMateria);
    btnConfirmarEliminar.addEventListener("click", deleteMateria); 

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
             window.location = "gestionAlumnos.php";
         });

        materias.addEventListener("click", function(){
            
            window.location = "formularioMaterias.php";
        });

        alumnos.addEventListener("click" , function(){
            window.location = "gestionAlumnos.php";
        });
    }

});

function cancelarAgregar(){
    debugger;
    $("mdlConfirmar").modal("hide");
    //borramos la info de los inputs
    //SE MODIFICARA LA MATERIA
    let txtnombre = document.getElementById("txtnombre");
    let txtgrado = document.getElementById("txtgrado");
    let txttipo = document.getElementById("txttipo");

    txtnombre.value = "";
    txttipo.value = "";
    txtgrado.selecteIndex = 0;

}

function deleteMateria(){

    $("#mdlEliminar").modal("hide");
    
    formData = new FormData();
    formData.append("accion" , "deleteMateria");
    formData.append("id" , idMateria);

    fetch("consultas.php",{
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(res => {
       
        if(res == "true"){
            notificacion.innerHTML = `
            <div class="alert alert-success" role="alert">
                La Materia <strong> ${nombreMateria} </strong> ha sido eliminada!!
           </div>`;

           llenarTabla();
       }else{
           //no se pudo eliminar la materia
           notificacion.innerHTML = `
             <div class="alert alert-danger" role="alert">
                La Materia <strog> ${nombreMateria} </strog> no se pudo eliminar!!
            </div>`;
       }
    })
    .catch(e =>{
        console.log(e)
    });

}

function editar( id ){
    
    if(id!=""){
        formData = new FormData();
        formData.append("accion", "getAllMateria");
        formData.append("id", id);

       fetch("consultas.php", {
           method: 'POST',
           body: formData
       })
       .then( res => res.json())
       .then( res => {
          

            if(res.idMateria !=""){

                //insertamos los datos traidos a los elementos HTML
                $("#mdlConfirmar").modal("show");
                operacion.innerText = "Modificar";
                document.getElementById("txtnombre").value = res.NombreMateria;
                document.getElementById("txttipo").value = res.TipoMateria;
                document.getElementById("txtgrado").value = res.Grado;
                document.getElementById("txtunidades").value = res.Unidades;

                //EDITAR MATERIA
                idMateria = id;
               
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

      idMateria = id; 
      nombreMateria = nombre;
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

function insertarMateria(){
    debugger;
    //llamamos el metodo de boostrapvalidator
    $("#frmAgregar").data('bootstrapValidator').validate();

    //si el metodo retorna un true quiere desir que los campos
        //estan bien  y redireccionara al login.php para iniciar
        //sesion
        if ($("#frmAgregar").data('bootstrapValidator').isValid()) {
            
            if(operacion.innerText == "Modificar"){
                //SE MODIFICARA LA MATERIA
                let txtnombre = document.getElementById("txtnombre");
                let txtgrado = document.getElementById("txtgrado");
                let txttipo = document.getElementById("txttipo");
                let txtunidades = document.getElementById("txtunidades");
    
                let formDate = new FormData();
                formDate.append('accion' , 'editarMateria');
                formDate.append('txtnombre' , txtnombre.value);
                formDate.append('txtgrado', parseInt( txtgrado.value));
                formDate.append('txttipo', txttipo.value);
                formDate.append('txtunidades', parseInt(txtunidades.value));
                formDate.append('id' , idMateria);
    
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
                              La Materia <strong> ${txtnombre.value} </strong> ha sido modificada correctamente!!
                             </div>`;
    
                        //borramos la info de los inputs
                        txtnombre.value = "";
                        txttipo.value = "";
                        txtgrado.selecteIndex = 0;
    
                        //Actualizamos la tabla    
                    
                        traerDatos();
    
                    }else if(res == "false"){
                         //si fue correcta
                        mensaje.innerHTML = 
                        `<div class="alert alert-danger" role="alert">
                          La Materia <strong> ${txtnombre.value} </strong> no a sido modificada, error en la 
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
                // SE INSERTARA UNA MATERIA  NUEVA
                let txtnombre = document.getElementById("txtnombre");
                let txtgrado = document.getElementById("txtgrado");
                let txttipo = document.getElementById("txttipo");
                let txtunidades = document.getElementById("txtunidades");
            
                let formDate = new FormData();
            formDate.append('accion','agregarMateria');
            formDate.append('txtnombre',txtnombre.value);
            formDate.append('txtgrado',parseInt( txtgrado.value));
            formDate.append('txttipo',txttipo.value);
            formDate.append('txtunidades', parseInt(txtunidades.value));

            fetch('consultas.php',{
                method: 'POST',
                body: formDate

            })
            .then(res => res.text())
            .then( res => {
                    
               
                if(res == "true"){
                       
                    $("#mdlConfirmar").modal("hide");
                    notificacion.innerHTML = 
                        `<div class="alert alert-success" role="alert">
                          La Materia <strong> ${txtnombre.value} </strong> ha sido agregada correctamente!!
                         </div>`;

                    //borramos la info de los inputs
                    txtnombre.value = "";
                    txttipo.value = "";
                    txtgrado.selecteIndex = 0;

                    //Actualizamos la tabla
                    
	
                
                    traerDatos();

                }else if(res == "false"){
                    mensaje.innerHTML = 
                    `<div class="alert alert-danger" role="alert">
                        La Materia no a sido agregada. problema con la conexion!!
                     </div>`;
                }else{
                    mensaje.innerHTML = 
                    `<div class="alert alert-danger" role="alert">
                        La Materia no a sido agregada.!!
                        ${res}
                     </div>`;
                }


            })
            .catch(e =>{
                console.log(e);
            
            });

        }

       //else en caso de que no sea correcta la validacion
       //en el formulario mandamos un mensaje de notifica
       //cion al usuario 
    } else {
        mensaje.innerHTML = `
            <div class="alert alert-danger" role="alert">
            Hay error en la información!!
            </div>`;
    }


}

function crearMateria(){

    $("#mdlConfirmar").modal("show");
    
}


function llenarTabla(datos) {


    //Almacenamos la referencia a la tabla con el plugin aplicado, ya que la usaremos para los filtros
       tablaUsuarios = $('#tabla').dataTable({
        destroy: true,
        //Asignamos la colección de datos en JSON que se mostrarán en la tabla
        data: datos,
        //La tabla ajusta cada columna de acuerdo a los datos contenidos en ellas
        //pero podemos también asignar un ancho fijo de esta manera, targets representa los 
        //índices de las columnas a los que se les aplicará este tamaño

        columnDefs: [
            { width: "5%", targets: [0 , 2] },
            { width: "20%", targets: [1 , 3, 4] }
            
           
        ],
        columns: [
           
            //el valor colocado en title es el texto que aparecerá en la columna y el valor colocado en 
            //data deberá ser el nombre de la propiedad del pojo que recibirémos en la colección de datos
            { title: "ID", data: "idMateria" },
            { title: "Nombre", data: "nombre" }, //Si quiere mostrarse el id se descomenta esta linea
            { title: "Grado", data: "grado" },
            { title: "Clasificacion", data: "tipoM" },
            { title: "Unidades", data: "unidades" },



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
                            '<button type="button" onclick="editar(' + data.idMateria + ')" class="btn btn-primary">Editar</button>' +
                            '<button type="button" onclick="eliminar(' + data.idMateria + ', \'' + data.nombre + '\')" class="btn btn-danger">Eliminar</button>' +
                            '</div>';
                    }
            }
        ]
        //Cuando queremos hacer alguna adecuación del aspecto de la fila, por ejemplo, colorear una celda o 
        //toda la fila de acuerdo al valor de algún atributo
        //"fnRowCallback": function (row, data, displayIndex) {
        //sentencias de revisión de datos y adecuaciones de aspecto
        //},
    });  
   
}

//boostrap validator. aqui es donde se colocan los canpos a validar
//en el fomulario
$('#frmAgregar').bootstrapValidator({
    framework: 'bootstrap',
    excluded: [':disabled', ':hidden'],
    fields: {
        txtnombre: {
            validators: {
                notEmpty: { message: 'La materia debe de tener un nombre' },
                stringLength: {
                    min: 5,
                    max: 20,
                    message: 'El usuario debe de tener minimo 5 caracteres y maximo 20'
                }
            }
        },
        txttipo: {
            validators: {
                notEmpty: { message: 'El tipo de Materia es obligatoria' },
                stringLength:{
                    min: 5,
                    max: 40,
                    message: 'El campo debe de contar con minimo 5 caracteres y maximo 20'
                }
            }
        },

        txtgrado: {
            validators: {
                notEmpty: { message: 'El grado de la Materia es obligatoria' },
                stringLength:{
                    max: 1,
                    message: 'El campo debe de contar con maximo 1 caracter'
                }
            }
        },

        txtunidades: {
            validators: {
                notEmpty: { message: 'La cantidad de unidades es necesaria' },
                stringLength:{
                    min: 1,
                    max: 12,
                    message: 'El campo debe de contar con minimo 1 unidad'
                }
            }
        }

    }
});