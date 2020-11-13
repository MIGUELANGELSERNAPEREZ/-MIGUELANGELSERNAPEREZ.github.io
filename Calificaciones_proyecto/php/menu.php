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
$sentencia = "SELECT * FROM usuario WHERE id = '$id';";
$ejecutar = $conectar -> query($sentencia);
$row = $ejecutar -> num_rows;

if($row > 0){
	$fila = $ejecutar -> fetch_assoc();
	
}else{
	header('Location: ../index.html');
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu</title>
	<link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/menu.css">
</head>
<body >
	
		<!--inicio navbar-->
		<?php require_once("navbar.php"); ?>
		<!--final navbar-->
		
		<!--input hidden para saber el tipo de usuario-->
		<input type="hidden" name="txttipo" value= '<?php echo $fila["tipo"];?>' id="tipoUsu">
		<input type="hidden" name="idgrupo" id="idgrupo">
		<input type="hidden" name="alumnoId" id="alumnoId">
		<!--encabezado del usuario -->
		<div class="container-fluid mt-5 mx-0 ">
			<div class="row" > <!--row-->

			 <!--alert para notificar al usuario-->
			 
			
				<div class="col-lg-4 col-sm-6" >
					<!--cilumna izquierda-->
					<div class="card text-white bg-success mb-3" style="width:100%; heidth:100%;">
						<!--titulo de la card-->
						<div class="card-header text-center" style="border: solid 3px white;">
						  <i class= "ace-icon fas fa-user-circle" style= "font-size:30px;">
							Perfil</i>
						</div><!--fin titulo de la card-->
						<!--cuerpo de la card-->
						<div class="card-body" style="border: solid 3px white;" id="info">	
							<!--subtitulo de la card-->
							<div class="card-groups text-center">
								<label for="">Datos del Usuario:</label>  
							
							</div><!--fin subtitulo de la card-->
							<!--columnas de la card-->
							<div class="card-columns text-center" >
								<label for="">n°Control:</label>  
								<p class="card-text"><?php echo $fila["id"]; ?> </p>
							
							</div>

							<div class="card-columns text-center" >
								<label for="">Usuario:</label>  
								<p class="card-text"><?php echo $fila["usuario"]; ?> </p>
							
							</div>
							<div class="card-columns text-center">
								<label for="">Nombre:</label>
								<p class="card-text"> <?php echo $fila["nombre"]; ?> </p>
							
							
							</div>
							

							<div class="card-columns text-center mr-0">
								<label for="">Apellido:</label>  
								<p class="card-text"><?php echo $fila["apellidoPaterno"]; ?> </p>
							
							</div>
							<div class="card-columns text-center">

								<label for="">Sexo:</label>  
								<p class="card-text"><?php echo $fila["sexo"]; ?> </p>
							
							</div>
							
							<div class="card-columns text-center">
								<label for="">Telefono:</label>  
								<p class="card-text"><?php echo $fila["telefono"]; ?> </p>
							
							</div>
							 
							
						</div><!--fin cuerpo de la card-->
					</div>
				</div><!--fin col-4-->
				<div class="col-12 col-sm-6 col-lg-8 px-0" >
					<div class="container text-center" >
						<!--Mensaje de Bienvenida-->
						<h1 style = "background-color: lightcyan;">Bienvenido <?php echo $fila["tipo"] ;?></h1>
					  	<h3 style = "background-color: lightcyan;"><?php echo $fila["nombre"] ;?></h3>
							<br>
							<div id="mensaje">

							</div>
							<br>
						<!--Tabla que sera llenada con el script FrmGestionTitulos, usando el WebService-->
         				<table id="tabla" class="table table-bordered table-hover"></table>
					  
					</div>
				
				</div>
					
			</div><!--fin row-->
			<div class="row">
				<!-------------------INICIA MODAL AGREGAR NUEVAS MATERIAS---------------------->
				<div class="modal" id="mdlConfirmar" tabindex="-1" role="dialog" >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">

                            <div id="mdlmensaje">
                             <!--Notificacion de la ejecucion-->
                            </div>
                            <h5 id="operacion" class="modal-title">Calificaciones</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <form id="frmCalificacion">
                           
                                <div class= "row" id="mdlunidades">
                               
                                    

                                
                                </div><!--fin row-->
                                
                                
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="button" id="btnCancelarCambios" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>			
			</div>
		
		</div><!--final del encabezado-->
			
		
		<!--pie de pagina-->
		<?php require_once("footer.php");?>
		<!--fin pie de pagina-->

		<!--scrips librerias-->
		<script src="../js/jquery-3.4.1.js"></script>
		<script src="https://kit.fontawesome.com/4c9487c20e.js" crossorigin="anonymous"></script>
		<script src="../js/bootstrap.js"></script>
		<script src="../js/popper.min.js"></script>
		<script src="../js/menu.js"></script>
		
	</body>
</html>

