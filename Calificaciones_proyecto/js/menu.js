$(document).ready(function () {
    //trae el tipo de usuario que esta loguiado
   
    let formData = new FormData();
    let tipoUsu = document.getElementById("tipoUsu");
    let mensaje = document.getElementById("mensaje");
    var info = document.getElementById("info");
    var datos;

    formData.append('tipoUsu', tipoUsu.value);
    
    if(tipoUsu.value !=""){
                debugger;
                //ruta  fetch
                fetch("traerAlumnos.php",{
                    method: 'POST',
                    body: formData

                })
                //promesa
                .then(data => data.json())
                .then(data => {
                  
                 cargarDatos(data,tipoUsu);
                   
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
});



function cargarDatos(datos, tipoUsu){

     //agregar los datos del usuario
     if(tipoUsu.value = "admin"){
                    
        let parent = document.createElement("div");
        //$("#").append(var1, var2, var3).
        info.append(parent);

      }
      
}