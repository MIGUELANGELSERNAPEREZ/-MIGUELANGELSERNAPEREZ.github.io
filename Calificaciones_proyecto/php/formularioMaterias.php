<?php
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
        <title>FormularioMaterias</title>
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link rel="stylesheet" href="../validaciones/bootstrapValidator.min.css">
        <link rel="stylesheet" href="../css/datatables.css">
        <link rel="stylesheet" href="../css/menu.css">

    </head>
    <body>

            <!--INCLUIMOS EL MENU-->
            <?php require_once("navbar.php");?>

          <!--INICIO DEL CONTENIDO DE LA PAGINA-->

            <!--Encabezado-->
          
            <div class= "row">
                <div class= "col-sm-4 col-md-6 col-lg-10 offset-lg-1">
                    <div class="container-fluid">
                        <br>
                            <hr class="bg-info">
                            <h1 class="text-center">Gestion de Materias</h1>
                            <input type="hidden" name="txttipo" value= '<?php echo $fila["tipo"];?>' id="tipoUsu">
                            <hr class="bg-info">
                        <br>
                       
                    </div> <!--fin contenedor--->         
                </div> <!--fin columna---> 
                
            </div> <!--fin fila--->  

             <!--fin Encabezado-->

            <div class= "row">
                <div class= "col-sm-4 col-md-6 col-lg-8">
                    <div class="container-fluid">
                        
                                <!-------------------INICIA MODAL AGREGAR NUEVAS MATERIAS---------------------->
                                <div class="modal" id="mdlConfirmar" tabindex="-1" role="dialog">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">

                                            <div id="mdlmensaje">
                                                <!--Notificacion de la ejecucion-->
                                            </div>
                                            <h5 id="operacion" class="modal-title">Ingresa la informacion</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            </div>
                                            <div class="modal-body">

                                                <form id="frmAgregar">
                                                    <div class="form-group">
                                                        <label>Nombre</label>
                                                        <input type="text" name="txtnombre" id="txtnombre" class="form-control">

                                                    </div>
                                                    <div class="form-group">
                                                        <label>Unidades</label>
                                                        <input type="number" name="txtunidades" id="txtunidades" class="form-control">

                                                    </div>

                                                    <div class="form-group">
                                                        <label>Grado</label>
                                                        <select class="form-control" id="txtgrado" namespace="txtgrado">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                        </select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Clasificacion de materia</label>
                                                        <input type="text" name="txttipo" id="txttipo" class="form-control">

                                                    </div>
                                                </form>

                                            </div>
                                            <div class="modal-footer">
                                            <button type="button" id="btnCancelarAgregar" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                            <button type="button" id="btnConfirmarAgregar" class="btn btn-primary">Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--Termina modal AGREGAR NUEVA MATERIA-->

                                <!--modal ELIMINAR-->
                                                <!-------------------INICIA MODAL---------------------->
                                    <div class="modal" id="mdlEliminar" tabindex="-1" role="dialog">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                <h5 class="modal-title">Confirmar eliminación</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                </div>
                                                <div class="modal-body">
                                                <p>¿Estás seguro que deseas eliminar la materia: <strong><span id="mdlnombre"></span></strong>?</p>
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                                <button type="button" id="btnConfirmarEliminar" class="btn btn-danger">Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Termina modal -->
                                 <!--modal ELIMINAR final-->
                       
                    </div> <!--fin contenedor--->         
                </div> <!--fin columna---> 
                
            </div> <!--fin fila--->  

            <div class="row">
                <div class="col text-center">
                    
                    <div id="mensaje">
                         <!--Notificacion de la ejecucion-->
                    </div>

                        <!--Boton ara agregar-->
                        <button id="agregarM" class="btn btn-primary btn-lg">Agregar Materia</button>
                        <br>
                </div>
            
            </div>  <!--fin fila-->
            <br>
            <br>

            <div class="row">
                <div class="col-sm-4 col-md-6 col-lg-10 offset-lg-1 mb-3">
                    <div class="container-fluid text-center">
                          <!--TABLA-->
                    
                        <table id="tabla" class="table table-hover table-striped table-bordered" style="width: 100%;">
                        </table>
            
                    </div>
                
            </div>  <!--fin fila-->
            <br>
                
                <!--pie de pagina-->
                <?php require_once("footer.php");?>
                <!--fin pie de pagina-->
           

		<!--scrips librerias-->
		<script src="../js/jquery-3.4.1.js"></script>
		<script src="https://kit.fontawesome.com/4c9487c20e.js" crossorigin="anonymous"></script>
		<script src="../js/bootstrap.js"></script>
        <script src= "../js/popper.min.js"> </script>
        <script src="../validaciones/bootstrapValidator.js"></script>
        <script src="../js/datatables.js"></script>	
        <script src="../js/GestionDeMaterias.js"></script>
        
    </body>
</html>