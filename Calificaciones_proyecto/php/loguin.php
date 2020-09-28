<?php
 //inclulles la conexion e la variable de sesion la declaras
    include("conexion.php");
    session_start();
   
    //validas si se dio clic sobre el boton de iniciar sesion
    //if(isset($_POST["btningresar"])){
        
        //mysqli_real sirve para evitar mysql inyeccion
        //$correo =  mysqli_real_escape_string($conectar,$_POST["txtusuario"]);
        //$pass =  mysqli_real_escape_string($conectar,$_POST["txtpass"]);
        echo $_SESSION["name"];
        echo "<script> document.getElementById('txtusuario');</script>";
        //encriptas la contraseña para poderla conparar con la de la base de datos
        $encrip = sha1($pass);

        $sentencia = "select * from usuario where usuario = '$correo' and 
        contrasena = '$encrip';";
        $ejecutarSentencia = $conectar -> query($sentencia);
        //este paso es para calcular el numero de filas que regresa la consulta
        $Nfilas = $ejecutarSentencia -> num_rows;

        //si la sentencia fue exitosa. es que existe el usuario si no entra
        //al else
        if ($Nfilas > 0){
            //fetch_assoc regresa un arreglo de todos los datos que compo
			//nen a un elemento de una tabla;
            $fila  = $ejecutarSentencia -> fetch_assoc();
            //variable de sesion
            $_SESSION["id_usuario"] = $fila["id"];

            echo "<script> alert('Bienvenido');
            window.location = 'menu.php';
            </script>";
            //header("Location: admin.php");

        }else{
           /* echo "<script> alert('No son los datos correctos. porfabor corrijelos');
            window.location = '../index.html';
            </script>;";
        */
        }

    //}

    
   
?>

