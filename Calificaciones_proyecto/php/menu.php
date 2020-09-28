<?php
//incluyes la conecion;
include("conexion.php");
session_start();

//validas si existe una variable de sesion ya para si no regresarlo al login.
//a que inicie sesion
if(!isset($_SESSION["id_usuario"])){
 header("location: ../index.html");
}


$id = $_SESSION["id_usuario"];
$sentencia = "SELECT id, nombre FROM usuario WHERE id = '$id';";
$ejecutar = $conectar -> query($sentencia);
$row = $ejecutar -> num_rows;

if($row > 0){
	$fila = $ejecutar -> fetch_assoc();

}else{
	echo "<script> alert('error en la consulta');";
}



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu</title>
	<link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/css.css">
</head>
<body >
	
		<!--inicio navbar-->
		<?php require_once("navbar.php"); ?>
		<!--final navbar-->
        
		<?php require_once("footer.php");?>


		<!--scrips librerias-->
		<script src="../js/jquery-3.4.1.js"></script>
		<script src="https://kit.fontawesome.com/4c9487c20e.js" crossorigin="anonymous"></script>
		<script src="../js/bootstrap.js"></script>
		
	</body>
</html>

