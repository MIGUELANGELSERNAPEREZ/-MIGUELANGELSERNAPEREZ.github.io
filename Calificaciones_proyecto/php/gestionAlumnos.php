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
    <title>Gestion Alumnos</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../validaciones/bootstrapValidator.min.css">
    <!--<link rel="stylesheet" href="../css/datatables.css">-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="../css/menu.css">
   

</head>
<body>

                <!--INCLUIMOS EL MENU-->
                <?php require_once("navbar.php");?>

                <!--INICIO DEL CONTENIDO DE LA PAGINA-->

              
        <!--Encabezado-->
        <div class="container-fluid text-center"> 
            <div class="row">
                <div class=col>
                <br>
                    <hr class="bg-info">
                        <h1>Gestion Alumnos</h1>
                        <input type="hidden" name="txttipo" value= '<?php echo $fila["tipo"];?>' id="tipoUsu">

                    <hr class="bg-info">
                <br>
                </div><!--fin col-->
            </div><!--fin row-->
        </div> <!--fin contenedor-->

        <!--botones-->
        <div class="container-fluid"> 
            <div class="row text-center">
                <div class=col>
                    <button class="btn btn-primary btn-lg" id="btnAgregarAlumno">Agregar Alumno</button>
                </div><!--fin col-->
              
            </div><!--fin row-->
        </div> <!--fin contenedor-->

        <br>
        <br>
        <!--MOSTRAR TABLAS-->
        <div class="container-fluid">
            <!--mensaje de error-->
            <div class="row">
                <div class="col">
                   <div id="notificacion" class="text-center">

                   </div>
                    
                </div>
            </div>
            <br>
            <br>
            <div class="row">
                <div class="col text-center">
                    <!--TABLA-->
                    <table id="tabla" class="display" class="table table-hover table-striped table-bordered">
                    </table>
                    
                </div>
            </div>
        
        </div>
        <!--MOSTRAR TABLAS-->
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
                    </div><!--fin header-->                   
                    <div class="modal-body">

                        <form id="frmAgregar">
                            <div class="form-group">
                                <label>Nombre</label>
                                <input type="text" name="txtnombre" id="txtnombre" 
                                class="form-control" placeholder= "escribe el nombre">

                            </div>

                            <div class="form-group">
                                <label>Apellido P</label>
                                <input type="text" name="txtapellidoP" id="txtapellidoP" 
                                class="form-control" placeholder= "escribe el apellido">

                            </div>

                            <div class="form-group">
                                <label>Apellido M</label>
                                <input type="text" name="txtapellidoM" id="txtapellidoM" 
                                class="form-control" placeholder= "escribe el segundo apellido">

                            </div>

                            <div class="form-group">
                                <label>Correo</label>
                                <input type="email" name="txtcorreo" id="txtcorreo" 
                                class="form-control" placeholder= "ejemplo@gmail.com">

                            </div>

                            <div class="form-group">
                                <label>Usuario</label>
                                <input type="text" name="txtusuario" id="txtusuario" 
                                class="form-control" placeholder= "juanito10">

                            </div>

                            <div class="form-group">
                                <label>Contraseña</label>
                                <input type="password" name="txtpass" id="txtpass" class="form-control">

                            </div>

                            <div class="form-group">
                                <label>Fecha de Nacimiento</label>
                                <input type="text" placeholder="aaaa-mm-dd" name="txtfechaN" id="txtfechaN"  class="form-control">

                            </div class = "form-group">
                                <label for="">Sexo </label>
                                <br>

                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="txtsexo" id="exampleRadios1" value="option1" checked>
                                    <label class="form-check-label" for="exampleRadios1">
                                        Hombre
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="txtsexo" id="exampleRadios2" value="option2">
                                    <label class="form-check-label" for="exampleRadios2">
                                        Mujer
                                    </label>
                                </div>
                            <div>   
                            
                            
                            </div>

                            <br>
                            <br>
                            <div class="form-group">
                                <label>Telefono</label>
                                <input type="tel" name="txttelefono" id="txttelefono" class="form-control">

                            </div>


                            <div class="form-group">
                                <label>Ciclo Escolar</label>
                                <input type="date" name="txtciclo" id="txtciclo" class="form-control">

                            </div>

                            <div class="form-group">
                                <label>Grado</label>
                                    <select class="form-control" namespace="txtgrado" id="txtgrado" name="txtgrado">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </select>
                            </div>

                            <div class="form-group">
                                <label>CURP</label>
                                <input type="text" name="txtCURP" id="txtCURP" class="form-control">

                            </div>

                            <div class="form-group">
                                <label>Domicilio</label>
                                <input type="text" name="txtdomicilio" id="txtdomicilio" class="form-control">

                            </div>

                            <div class="form-group">
                                <label>Codigo Postal</label>
                                <input type="number" name="txtcodigoP" id="txtcodigoP" class="form-control">

                            </div>

                            <div class="form-group">
                                <label>Estatus</label>
                                <select class="form-control" namespace="cbestatus" name="cbestatus" id="cbestatus">
                                    <option>Inscrito</option>
                                    <option>No Inscrito</option>
                               
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Grupo</label>
                                    <select class="form-control" id="txtgrupoID" name="txtgrupo">
                                     
                                    </select>
                            </div>

                           
                        </form>

                    </div><!--body fin-->

                    <div class="modal-footer">
                        <button type="button" id="btnCancelarAgregar" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        <button type="button" id="btnConfirmarAgregar" class="btn btn-primary">Agregar</button>
                    </div>
                     
                </div>
            </div>
        </div>
                                <!--MODAL AGREGAR-->
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
                                                <p>¿Estás seguro que deseas eliminar el usuario: <strong><span id="mdlnombre"></span></strong>?</p>
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

    <!--pie de pagina-->
    <?php require_once("footer.php");?>
    <!--fin pie de pagina-->

  <!--scrips librerias-->
 <!-- <script src="../js/jquery-3.4.1.js"></script>-->
  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
  <script src="https://kit.fontawesome.com/4c9487c20e.js" crossorigin="anonymous"></script>
  <script src="../js/bootstrap.js"></script>
  <script src= "../js/popper.min.js"> </script>
  <script src="../validaciones/bootstrapValidator.js"></script>
  <!--<script src="../js/datatables.js"></script>	-->
  <script src="../js/GestionAlumnos.js"></script>
    
</body>
</html>