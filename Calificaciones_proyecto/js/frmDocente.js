
var notificacion = document.getElementById("notificacion");
var mdlmensaje = document.getElementById("mdlmensaje");
$(document).ready( function (){
    
    debugger;
    //carga el list-group con las materias del docente
   cargarMaterias();
  
   let btnConfirmarCambios =  document.getElementById("btnConfirmarCambios");
   let btnCancelarCambios =  document.getElementById("btnCancelarCambios");

   btnConfirmarCambios.addEventListener("click" , ConfirmarCambios);
   btnCancelarCambios.addEventListener("click" , CancelarCambios);
 
});

function cargarMaterias(){
    debugger;
    let formData = new FormData();
    formData.append('accion' , 'getAllMateriasDocente');
    formData.append('id' ,document.getElementById("txtid").value );
    fetch('consultas.php' , {
        method: 'POST',
        body: formData
    })
    .then( res => res.json())
    .then( res => {
        if (res.error) {
            // Muestras error
        } else crearListaMaterias( res );
    })
    .catch( e => function(){

    });   

}

function crearListaMaterias( materias ){
    //.bind("click" , eventoClic => idMateria)
   materias.forEach(element => {
    $("#listaMaterias").append($('<button> </button>').text(element.NombreMateria)
    .addClass("list-group-item list-group-item-action active")
    .addClass("h6")
    .attr("data-toggle", "collapse")
    .attr("data-target", "#materia"+element.NombreMateria.replace(/ /g, ""))
    .attr("aria-expanded", "false")
    .attr("aria-controls", "collapseExample")

    );

    $("#listaMaterias").append($("<div> </div>")
    .addClass("collapse")
    .attr("id" , "materia"+element.NombreMateria.replace(/ /g, ""))
    .append($('<table> </table>')
    .addClass("table table-hover table-striped table-bordered")
    .css("width","100%")
    .attr("id" , element.idMateria)
    ) 

    );

    getDataBySubjet(element.idMateria, "materia"+element.NombreMateria.replace(/ /g, ""));
   });  

}

async function getDataBySubjet(subjectId, divId) {
    formData = new FormData();
    formData.append('accion' , "getAllIdGrupo");
    formData.append("idMateria" , subjectId);
    const res = await fetch('consultas.php', {
        method: 'POST',
        body: formData,
    }).then(res => res.json());


    getOneGrupo(res.idgrupo , res.idmateria);
   

}



// Esta funcio'on regresa una promesa

const getOneSubject = (id) => {
    formData = new FormData();
    formData.append('accion' , "getAllIdGrupo");
    formData.append("idMateria" , id.id);
    
    return fetch('consultas.php' , {
        method: 'POST',
        body: formData
    }).then(res => res.json());
  }
  

  async function getOneGrupo (idgrupo, idmateria){
    debugger;
    formData = new FormData();
    formData.append('accion' , "getAllGrupoD");
    formData.append("idMateria" , idmateria);
    formData.append("idDocente" , document.getElementById("txtid").value);
    formData.append("idGrupo" , idgrupo);
    const res = await fetch('consultas.php' , {
            method: 'POST',
            body: formData
        })
        .then( res => res.json())
    

        llenarTabla(res , idmateria);
  }

  async function editar(idmateria , idalumno, unidades){
        debugger;
    document.getElementById("operacion").innerText = "Modificar Calificacion";

    let formData =  new FormData();
    formData.append("accion" , 'getCalificacion');
    formData.append("idmateria" , idmateria);
    formData.append("idalumno" , idalumno);
    formData.append("idDocente" , document.getElementById("txtid").value);


        const calificaciones = await fetch("consultas.php", {
            method: 'POST',
            body: formData
        }).then( calificacio => calificacio.json());

        console.log(calificaciones);
        debugger;
        if(calificaciones.error == null){
            //con datos
            
            crearCuadrosUnidades( unidades , true , calificaciones);
        }else{
            //basios
            //aun no se le an asignada calificaciones al alumno, notificar con 
            //un modal
            document.getElementById("mdl-titulo").innerText = "Notificacion";
            document.getElementById("mdl-texto").innerText = "EL alumno a un no tiene asignadas calificaciones";
            $("#mdl-color").addClass("bg-danger");

            $("#mdl-notificacion").modal("toggle");
        }

         
  }

  
  var arreCalificaciones= [];

  function crearCuadrosUnidades( cuadros , accion , calificaciones){
    debugger;
    arreCalificaciones = [];

    let posicion = document.getElementById("mdlunidades");
        
       if(accion){
            //editar
            document.getElementById("operacion").innerText = "Modificar Calificacion";
            //traen informacion
            let i = 0;
            calificaciones.forEach(calificacion => {
                
                arreCalificaciones.push(calificacion);
    
                if(calificacion.bimestre == (i+1)){
                    posicion.innerHTML += `
                    <div class="col">
                        <label for="">${(i + 1)}</label>
                        <input class="form-control" type="text" name="txt${i}" id="txt${i}"
                        value= "${calificacion.calificacion}" style = "width:50px;">  
                    </div>
                    `;
                   }
                   i++;     
            });
    
            if(i == cuadros){
                
             
            }else{
                let tamano = cuadros - i;
                for(let j = 0 ; j < tamano; j++){
                    posicion.innerHTML += `
                    <div class="col">
                        <label for="">${i + 1}</label>
                        <input class="form-control" type="text" name="txt${i}" id="txt${i}"
                        style = "width:50px;" disabled>  
                    </div>`;   
                    i++; 
                }
            }   
               
            
            $("#mdlConfirmar").modal("toggle"); 
    

       }else{
            //agregar
            document.getElementById("operacion").innerText = "Agregar Calificacion";
            //traen informacion
            let i = 0;
            calificaciones.forEach(calificacion => {
                
                arreCalificaciones.push(calificacion);
    
                if(calificacion.bimestre == (i+1)){
                    posicion.innerHTML += `
                    <div class="col">
                        <label for="">${(i + 1)}</label>
                        <input class="form-control" type="text" name="txt${i}" id="txt${i}"
                        value= "${calificacion.calificacion}"   style = "width:50px;" disabled>  
                    </div>
                    `;
                   }
                   i++;     
            });
    
            if(i == cuadros){
                
             
            }else{
                let tamano = cuadros - i;
                for(let j = 0 ; j < tamano; j++){
                    posicion.innerHTML += `
                    <div class="col">
                        <label for="">${i + 1}</label>
                        <input class="form-control" type="number" name="txt${i}" id="txt${i}"
                        style = "width:50px;" >  
                    </div>`;   
                    i++; 
                }
            }   
               
            //mostrar calificaciones
            $("#mdlConfirmar").modal("toggle"); 
       }
        

  }

async function ConfirmarCambios(){
                debugger;
                let operacion = document.getElementById("operacion");

                if(operacion.innerText == "Modificar Calificacion"){

                    let modificaciones = [];
                    
                    for(let i = 0; i< arreCalificaciones.length; i++){
                    let dato =  document.getElementById(`txt${i}`);
                        
                        if(dato.value == arreCalificaciones[i].calificacion){

                        }else{
                            debugger;
                            let obj = {};
                            obj.calificacion = dato.value;
                            obj.bimestre = arreCalificaciones[i].bimestre;
                            obj.fecha = fecha();
                            obj.idalumno = arreCalificaciones[i].idalumno;
                            obj.idmateria = arreCalificaciones[i].idmateria;
                            obj.iddocente = arreCalificaciones[i].iddocente;
                            obj.idcalificacion = arreCalificaciones[i].idcalificacion;

                            modificaciones.push(obj);
                        
                        }
                    }

                    
                    
                    const respuesta = await EjecutarCambios(modificaciones);
                    if(respuesta){
                        //se actualizo correctamente
                        debugger;
                        document.getElementById("mdl-titulo").innerText = "Notificacion";
                        document.getElementById("mdl-texto").innerText = "Se a actualizado correctamente la calificacion!";
                        $("#mdl-color").addClass("bg-primary");

                        $("#mdl-notificacion").modal("toggle");
                            //mostramos el modal que muestra las unidades
                        
                        $("#mdlConfirmar").modal("toggle");

                        //borramos los datos del modal
                        CancelarCambios();
                        arreCalificaciones = [];
                    }else{
                        debugger;
                        document.getElementById("mdl-titulo").innerText = "Problema";
                        document.getElementById("mdl-texto").innerText = "A ocurrido un error al querer actuzlizar las calificacion!";
                        $("#mdl-color").addClass("bg-danger");

                        $("#mdl-notificacion").modal("toggle");
                            //mostramos el modal que muestra las unidades
                        $("#mdlConfirmar").modal("toggle");
                        CancelarCambios();
                        arreCalificaciones = [];
                    }

                }else if(operacion.innerText == "Agregar Calificacion"){
                    
                    let idalumno;
                    let idmateria;
                    let iddocente; 
                    let modificaciones = [];

                    if(arreCalificaciones.length < 1){
                        //esta basio
                        idalumno = Gidalumno;
                        idmateria = Gidmateria;
                        iddocente = document.getElementById("txtid").value; 

                        for(let i = 0; i< cUnidades; i++){
                            let dato =  document.getElementById(`txt${i}`);
                            
                            if(dato.value!=""){
                                debugger;
                                let obj = {};
                                obj.calificacion = dato.value;
                                obj.bimestre = `${i+1}`;
                                obj.fecha = fecha();
                                obj.idalumno = idalumno;
                                obj.idmateria = idmateria;
                                obj.iddocente = iddocente;
                
                                modificaciones.push(obj);
                            }
                        }

                    }else{
                        //esta lleno
                        idalumno = arreCalificaciones[0].idalumno;
                        idmateria = arreCalificaciones[0].idmateria;
                        iddocente = arreCalificaciones[0].iddocente;
                        debugger;
                        for(let i = 0; i< cUnidades; i++){
                            let dato =  document.getElementById(`txt${i}`);
                            
                            if(i < arreCalificaciones.length){

                                if(dato.value == arreCalificaciones[i].calificacion){
                
                                }else{

                                    if(dato.value != ""){
                                        debugger;
                                        let obj = {};
                                        obj.calificacion = dato.innerText;
                                        obj.bimestre = `${i+1}`;
                                        obj.fecha = fecha();
                                        obj.idalumno = idalumno;
                                        obj.idmateria = idmateria;
                                        obj.iddocente = iddocente;
                        
                                        modificaciones.push(obj);
                                    }
                                
                                
                            }
                            }else{

                                debugger;
                                if(dato.value != ""){
                                    debugger;
                                    let obj = {};
                                    obj.calificacion = dato.value;
                                    obj.bimestre = `${i+1}`;
                                    obj.fecha = fecha();
                                    obj.idalumno = idalumno;
                                    obj.idmateria = idmateria;
                                    obj.iddocente = iddocente;
                    
                                    modificaciones.push(obj);
                                }
                            }    
                        
                        }
            
                }

            
                const respuesta = await insertarCalificacion(modificaciones);
                alert(respuesta);
                if(respuesta){
                
                    document.getElementById("mdl-titulo").innerText = "Notificacion";
                    document.getElementById("mdl-texto").innerText = "Se a agregado correctamente la calificacion!";
                    $("#mdl-color").addClass("bg-primary");
                    $("#mdl-notificacion").modal("toggle");
                        //mostramos el modal que muestra las unidades

                    $("#mdlConfirmar").modal("toggle");
                    CancelarCambios();
                    arreCalificaciones = [];

                }else{
                    document.getElementById("mdl-titulo").innerText = "Problema";
                    document.getElementById("mdl-texto").innerText = "Se a producido un eror al ingresar la calificacion!";
                    $("#mdl-color").addClass("bg-danger");
                    $("#mdl-notificacion").modal("toggle");
                        //mostramos el modal que muestra las unidades
                }

            
            }      

}

  const insertarCalificacion = async (calificacion) => {
    debugger;
    // Con el map creamos una promesa por cada id (cada id se convierte en una petición
    // El Promise.all hace todas las peticiones al mismo tiemo logrando un mejor desempeño
    return Promise.all(calificacion.map(obj => insert(obj)));
  }

  const insert = (obj) => {
    debugger;
        let formData = new FormData();
        formData.append("accion" , "insertCalificacion");
        formData.append("calificacion" , obj.calificacion);
        formData.append("bimestre" , obj.bimestre);
        formData.append("fecha" , obj.fecha);
        formData.append("idmateria" , obj.idmateria);
        formData.append("iddocente" , obj.iddocente);
        formData.append("idalumno" , obj.idalumno);
    
        return fetch("consultas.php" ,{
            method: "POST",
            body: formData
        }).then(res => res.text());
    
      }

  const EjecutarCambios = async (calificacion) => {
  debugger;
    // Con el map creamos una promesa por cada id (cada id se convierte en una petición
    // El Promise.all hace todas las peticiones al mismo tiemo logrando un mejor desempeño
    return Promise.all(calificacion.map(obj => update(obj)));
  }

  function CancelarCambios(){
    let posicion = document.getElementById("mdlunidades");
    posicion.innerHTML = "";
  }

var cUnidades=0;
var Gidalumno, Gidmateria;

async function agregar(idmateria ,idalumno , unidades){
   arreCalificaciones = [];
    document.getElementById("operacion").innerText = "Agregar Calificacion";
    cUnidades = unidades;
    let formData =  new FormData();
    formData.append("accion" , 'getCalificacion');
    formData.append("idmateria" , idmateria);
    formData.append("idalumno" , idalumno);
    formData.append("idDocente" , document.getElementById("txtid").value);


        const calificaciones = await fetch("consultas.php", {
            method: 'POST',
            body: formData
        }).then( calificacio => calificacio.json());

        console.log(calificaciones);
        debugger;
        
        if(calificaciones.error ==null){
            //con datos
            
            crearCuadrosUnidades( unidades , false , calificaciones);
        }else{
            //basios
            let P_unidades = document.getElementById("mdlunidades");
           
           for(let i=0; i< unidades; i++){

            P_unidades.innerHTML += `
            <div class="col">
                <label for="">${i + 1}</label>
                <input class="form-control" type="text" name="txt${i}" id="txt${i}"
                style = "width:70px;">  
            </div>`;   
           
           }
   
           $("#mdlConfirmar").modal("toggle");
           Gidalumno = idalumno;
           Gidmateria = idmateria;
        }   
  }

const update = (obj) => {
debugger;
    let formData = new FormData();
    formData.append("accion" , "updateCalificacion");
    formData.append("idcalificacion" , obj.idcalificacion);
    formData.append("calificacion" , obj.calificacion);
    formData.append("bimestre" , obj.bimestre);
    formData.append("fecha" , obj.fecha);
    formData.append("idmateria" , obj.idmateria);
    formData.append("iddocente" , obj.iddocente);
    formData.append("idalumno" , obj.idalumno);

    return fetch("consultas.php" ,{
        method: "POST",
        body: formData
    }).then(res => res.text());

  }

function fecha(){
    var f = new Date();
   
    return (f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate());
}

function llenarTabla(datos , idtabla) {


    //Almacenamos la referencia a la tabla con el plugin aplicado, ya que la usaremos para los filtros
      
        let tablaUsuarios = $(`#${idtabla}`).DataTable({
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
            
            { title: "Nombre", data: "nombre" },
            { title: "Apellidos", data: "Apellidos" },
            { title: "Nombre Grupo", data: "nombreGrupo" },
            { title: "Nombre Materia", data: "NombreMateria" },
             //Si quiere mostrarse el id se descomenta esta linea
            

            { //Esta columna coloca los botones que representarán las operaciones de cada renglón
                //Este tipo de especificación también nos permite manipular la visualización de una columna
                //por ejemplo, hay veces que en una propiedad del objeto que es entera o trae datos representativos
                //como el Genero, solemos colocar solo M y F, y cuando los mostramos en la tabla queremos que se vea 
                //como Masculino y Femenino

                title: "Unidades", data: null, render:
                    //En este otro caso data trae el objeto que se carga en la fila, por ello podemos 
                    //acceder a todos los valores que vengan en el objeto
                    function (data, type, row) {
        
                        
                        return `<div class="row justify-content-center">
                                <button type="button" onclick="editar(${data.idMateria} , ${data.idAlumno} , ${data.Unidades} )" class="btn btn-success">Editar Calificaciones</button> 
                                <button type="button" onclick="agregar(${data.idMateria} , ${data.idAlumno} , ${data.Unidades} )" class="btn btn-primary">Agregar Calificaciones</button> 

                                </div>`;
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

