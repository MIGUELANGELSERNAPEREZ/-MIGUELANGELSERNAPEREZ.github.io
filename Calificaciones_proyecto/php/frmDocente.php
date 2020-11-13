 <?php
    include("conexion.php");
    session_start();    
    //validas si existe una variable de sesion ya para si no regresarlo al login.
    //a que inicie sesion
        if(!isset($_SESSION["id_usuario"])){
            header("location: ../index.html");
        }
        
        $id = $_SESSION["id_usuario"];
        $sentencia = "SELECT * FROM docente WHERE idusuario = '$id';";
        $ejecutar = $conectar -> query($sentencia);
        $row = $ejecutar -> num_rows;
        if($row > 0){
            $info = $ejecutar -> fetch_assoc();
            
        }else{
            header('Location: ../index.html');
        }
   

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Materias</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link rel="stylesheet" href="../validaciones/bootstrapValidator.min.css">
        <link rel="stylesheet" href="../css/datatables.css">
        <link rel="stylesheet" href="../css/menu.css">
</head>
<body>

    <?php require_once("navbar.php"); ?>
    <input type="hidden" name="txtid" value='<?php echo $info['id'];?>' id="txtid">
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <hr class="bg-info">
                <h1 class= "text-center">Materias</h1>
                <hr class="bg-info">
                <br>
                <br>
                <div id="notificacion">
                <!--mensajes de notificacion-->
                </div>
                <br>
                <br>
                <div class="list-group" id="listaMaterias">
                    
                </div>
            </div>
        </div><!--row-->
        <div class="row">
            <!-------------------INICIA MODAL AGREGAR NUEVAS MATERIAS---------------------->
            <div class="modal" id="mdlConfirmar" tabindex="-1" role="dialog" >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">

                            <div id="mdlmensaje">
                             <!--Notificacion de la ejecucion-->
                            </div>
                            <h5 id="operacion" class="modal-title">Agregar Calificacion</h5>
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
                            <button type="button" id="btnConfirmarCambios" class="btn btn-primary">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
                                <!--Termina modal AGREGAR NUEVA MATERIA-->
        </div><!--fin row modal-->
        <div class="row">
            <div class= "col">
            <div class="modal" tabindex="-1" id="mdl-notificacion">
           <div class="modal-dialog">
             <div class="modal-content">
               <div class="modal-header">
                 <h5 class="modal-title" id="mdl-titulo">Problema</h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
               <div class="modal-body" id="mdl-color">
                 <p id="mdl-texto">El alumno a un no cuenta con calificaciones asignadas.</p>
               </div>
               <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Enterado</button>
               </div>
             </div>
           </div>
         </div>>  
            </div>

        </div>

    </div> <!--fin container-->

    <script src="../js/jquery-3.4.1.js"></script>
		<script src="https://kit.fontawesome.com/4c9487c20e.js" crossorigin="anonymous"></script>
		<script src="../js/bootstrap.js"></script>
        <script src= "../js/popper.min.js"> </script>
        <script src="../validaciones/bootstrapValidator.js"></script>
        <script src="../js/datatables.js"></script>	
        <script src="../js/frmDocente.js"></script>
    
</body>
</html>