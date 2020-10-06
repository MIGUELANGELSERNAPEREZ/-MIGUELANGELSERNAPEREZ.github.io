<?php

include("conexion.php");
session_start();

$usuario = $_POST["tipoUsu"];
$id = $_SESSION['id_usuario'];
if($usuario!=""){
    $usuario = "admin";
    $consulta = "";
    $mensaje = ["mensaje" => "Error"];

    switch($usuario){       
        case 'admin':
            $consulta = "SELECT * FROM alumno where idusuario='$id';";
            $ejecutar = $conectar -> query($consulta);
            $filas = $ejecutar -> num_rows;

            if($filas > 0){
                $datos = $ejecutar -> fetch_assoc();

              
                echo json_encode($datos); 
            }else{
                
                echo json_encode($mensaje);
            }
            break;
        case 'docente':
            $consulta = "SELECT * FROM docente where idusuario='100001';";
            $ejecutar = $conectar -> query($consulta);
            $filas = $ejecutar -> num_rows;

            if($filas > 0){
                $datos = $ejecutar -> fetch_assoc();

              
                echo json_encode($datos); 
            }else{
                
                echo json_encode($mensaje);
            }

            break;
        case 'director':

            break;
    }

}else{
    $error = ["mensaje" => "error: no se a podido definir la sesion"];
    echo json_encode($error);
     }
 

