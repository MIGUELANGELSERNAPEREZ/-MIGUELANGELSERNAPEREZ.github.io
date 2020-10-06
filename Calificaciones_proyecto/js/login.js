$(document).ready(function () {
    let mensaje = document.getElementById("mensaje");
    let formulario = document.getElementById("formlogin");
    //se le agrega el evento clic al boton de iniciar
    //para que este desenboque la validacion
    $("#btningresar").click(function () {
        //llamamos el metodo de boostrapvalidator
        $("#formlogin").data('bootstrapValidator').validate();

        //si el metodo retorna un true quiere desir que los campos
        //estan bien  y redireccionara al login.php para iniciar
        //sesion
        if ($("#formlogin").data('bootstrapValidator').isValid()) {
            
            //creamos un objeto nuevo todos los elementos que contiene
            //formulario
            let datos = new FormData(formulario);  

            //utilizamos ajax para que se realisen asincronamente
            //php y javascrip utilizando fetch-api

            //usaremos post por que queremos enviar datos, cuando
            //queremos resibir usamos get
            //podemos usar fetch o jquery(ajax)
           
        
                 //ruta  fetch
                 fetch("php/loguin.php",{
                    method: 'POST',
                    body: datos

                })
                //promesa
                .then(data => data.text())
                .then(data => {
                   
                   //si la consulta regresa un 1 es que existe, por lo tanto
                   // regresa un existe 
                    if(data == "existe\r\n"){
                        window.location = "php/menu.php";

                    }else if(data == "no existe\r\n" ){
                        mensaje.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                        El usuario no existe!!
                        </div>`;    
                    }else{
                        mensaje.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                        Problema con el servidor!!
                        </div>`;    
                    }
                   
                }).catch(e =>{
                    console.log(e);
                
                });
                   
            
               /* utilizando jquery(ajax)
               
                 let datos = $(formulario).serialize();
                $.ajax(
                    {
                        type: "POST",
                        url: "php/loguin.php",
                        data: datos,
                        success:function(r){
                            alert(r);
                            debugger;
                            if(r == "existe\r\n"){
    
                               window.location = "php/menu.php";
                            }else{
                                mensaje.innerHTML = `
                                <div class="alert alert-danger" role="alert">
                                El usuario no existe!!
                                </div>`;    
                            }
                            
                        } 
                    }
                   
                );
                */
        
           //else en caso de que no sea correcta la validacion
           //en el formulario mandamos un mensaje de notifica
           //cion al usuario 
        } else {
            mensaje.innerHTML = `
            <div class="alert alert-danger" role="alert">
            Hay error en la información!!
            </div>`;
        }
    }); //Aqui termina el click

    //boostrap validator. aqui es donde se colocan los canpos a validar
    //en el fomulario

    $('#formlogin').bootstrapValidator({
        framework: 'bootstrap',
        excluded: [':disabled', ':hidden'],
        fields: {
            txtusuario: {
                validators: {
                    notEmpty: { message: 'El usuario es obligatorio' },
                    stringLength: {
                        min: 5,
                        max: 20,
                        message: 'El usuario debe de tener minimo 5 caracteres y maximo 20'
                    }
                }
            },
            txtpass: {
                validators: {
                    notEmpty: { message: 'La contraseña es obligatoria' },
                    regexp: {
                        regexp: /^[\w]{3,8}$/i,
                        message: 'Solo deben ser valores alfanuméricos 8 caracteres'
                    }
                }
            }
        }
    });


});



  



