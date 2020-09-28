$(document).ready(function () {
    //se le agrega el evento clic al boton de iniciar
    //para que este desenboque la validacion
    $("#btningresar").click(function () {
        //llamamos el metodo de boostrapvalidator
        $("#formlogin").data('bootstrapValidator').validate();

        //si el metodo retorna un true quiere desir que los campos
        //estan bien  y redireccionara al login.php para iniciar
        //sesion
        if ($("#formlogin").data('bootstrapValidator').isValid()) {
            
            
            $_SESSION['name'] = document.getElementById("txtusuario");
            window.location = "php/loguin.php";
        } else {

            alert("error");
        }
    }); //Aqui termina el click

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



  



