<?php

    include("conexion.php");
    session_start();
    require_once("../clases/materias.php");
    require_once("../clases/usuarios.php");
    require_once("../clases/calificaciones.php");
    require_once("../Daos/DaoUsuario.php");
    require_once("../Daos/DaoMaterias.php");
    require_once("../Daos/DaoGrupos.php");
    require_once("../Daos/DaoDocente.php");
    



    $mensaje = [];
    $sesion = $_SESSION["id_usuario"];
    $accion = $_POST["accion"];
 
    if($accion!=""){

        switch($accion){
            case "getAllMateriaAlumno":
                $idgrupo = $_POST["grupo"];   

                // aqui ya no se utilisa echo ya que en el dao ya se esta usando
                //para retornar los datos. asi que aqui ya no es necesario
                //ya que si lo utilizaramos aqui se enviarian doble ves
              $ins = new DaoMaterias();
              $ins ->getAllMateriaAlumno($idgrupo);          

            break;
            case 'agregarMateria':
                 // aqui ya no se utilisa echo ya que en el dao ya se esta usando
                //para retornar los datos. asi que aqui ya no es necesario
                //ya que si lo utilizaramos aqui se enviarian doble ves
                $txtnombre = mysqli_real_escape_string($conectar,$_POST['txtnombre']);
                $txtgrado = mysqli_real_escape_string($conectar,$_POST['txtgrado']);
                $txttipo = mysqli_real_escape_string($conectar,$_POST['txttipo']);
                $txtunidades = mysqli_real_escape_string($conectar,$_POST['txtunidades']);

                
                if(strlen($txtnombre) > 5 && strlen($txtnombre) <= 20){
                    if( strlen($txttipo) > 5 && strlen($txttipo) <= 40){
                        if(strlen($txtgrado) == 1 ){
                            
                            $obj = new Materias();
                            $obj ->nombre = $txtnombre;
                            $obj ->grado = $txtgrado;
                            $obj ->tipoM = $txttipo;
                            $obj ->unidades = $txtunidades;
            
            
                            $ins = new DaoMaterias();
                            $ins ->insertMateria($obj); 

                        
                            
                        }else{
                            echo "Error con los datos introducidos,corrigelos";
                        }
                    }else{
                        echo "Error con los datos introducidos, corrigelos";
                    }
                }else{
                    echo "Error con los datos introducidos, corrigelos";
                }

            break;
            case "getAllMaterias":
               
                
                $ins = new DaoMaterias();
                $ins->getAll();
                
            break;

            case "deleteMateria":
                    $id = $_POST["id"];
                    $ins = new DaoMaterias();
                    $ins->deleteMateria( $id );
            break;

            case "getAllMateria":
                $id = $_POST["id"];
                $ins = new DaoMaterias();
                $ins->getAllMateria( $id );
            break;

            case "editarMateria":
                $id = $_POST["id"];
                $txtnombre = mysqli_real_escape_string($conectar,$_POST['txtnombre']);
                $txtgrado = mysqli_real_escape_string($conectar,$_POST['txtgrado']);
                $txttipo = mysqli_real_escape_string($conectar,$_POST['txttipo']);
                $txtunidades = mysqli_real_escape_string($conectar,$_POST['txtunidades']);

                if(strlen($txtnombre) > 5 && strlen($txtnombre) <= 20){
                    if( strlen($txttipo) > 5 && strlen($txttipo) <= 40){
                        if(strlen($txtgrado) == 1 ){
                            
                            $obj = new Materias();
                            $obj ->idMateria = $id;
                            $obj ->nombre = $txtnombre;
                            $obj ->grado = $txtgrado;
                            $obj ->tipoM = $txttipo;
                            $obj ->unidades = $txtunidades;
            
            
                            $ins = new DaoMaterias();
                            $ins->editarMateria( $obj );
                        
                            
                        }else{
                            echo "Error con los datos introducidos,corrigelos";
                        }
                    }else{
                        echo "Error con los datos introducidos, corrigelos";
                    }
                }else{
                    echo "Error con los datos introducidos, corrigelos";
                }

                
            break;

            case "getAllGrupos":
                $ins = new DaoGrupos();
                $ins->getAllGrupos();

            break;

            case 'insertUsuario':
                $txtnombre = mysqli_real_escape_string($conectar,$_POST["txtnombre"]);
                $txtapellidoP = mysqli_real_escape_string($conectar,$_POST["txtapellidoP"]);
                $txtapellidoM = mysqli_real_escape_string($conectar,$_POST["txtapellidoM"]);
                $txtcorreo = mysqli_real_escape_string($conectar,$_POST["txtcorreo"]);
                $txtusuario = mysqli_real_escape_string($conectar,$_POST["txtusuario"]);
                $txtpass = mysqli_real_escape_string($conectar,$_POST["txtpass"]);
                $txtfechaN = mysqli_real_escape_string($conectar,$_POST["txtfechaN"]);
                $txtsexo = mysqli_real_escape_string($conectar,$_POST["txtsexo"]);
                $txttelefono = mysqli_real_escape_string($conectar,$_POST["txttelefono"]);

                if($txtsexo == "option1"){
                    $txtsexo = "Hombre";
                }else{
                    $txtsexo = "Mujer";
                }
                $obj = new Usuario();
                $obj->nombre = $txtnombre;
                $obj->apellidoP = $txtapellidoP;
                $obj->apellidoM = $txtapellidoM;
                $obj->correo = $txtcorreo;
                $obj->usuario = $txtusuario;
                $obj->contrasena = $txtpass;
                $obj->fechaN = $txtfechaN;
                $obj->sexo = $txtsexo;
                $obj->tipo = 'alumno';
                $obj->telefono = $txttelefono;
                 
                $dao = new DaoUsuario();
                $dao->insertUsuario( $obj );
                
            break;

            case "insertAlumno":
                $txtid = mysqli_real_escape_string($conectar,$_POST["id"]);
                $txtciclo = mysqli_real_escape_string($conectar,$_POST["txtciclo"]);
                $txtgrado = mysqli_real_escape_string($conectar,$_POST["txtgrado"]);
                $txtCURP = mysqli_real_escape_string($conectar,$_POST["txtCURP"]);
                $txtdomicilio = mysqli_real_escape_string($conectar,$_POST["txtdomicilio"]);
                $txtcodigoP = mysqli_real_escape_string($conectar,$_POST["txtcodigoP"]);
                $txtestatus = mysqli_real_escape_string($conectar,$_POST["cbestatus"]);
                $txtidGrupo = mysqli_real_escape_string($conectar,$_POST["idGrupo"]);

                $obj = new Usuario();
                $obj->cicloE = $txtciclo;
                $obj->grado = $txtgrado;
                $obj->curp = $txtCURP;
                $obj->domicilio = $txtdomicilio;
                $obj->codigoP = $txtcodigoP;
                $obj->estatus = $txtestatus;
                $obj->idUsuario = $txtid;
                $obj->idGrupo = $txtidGrupo;
                
                 
                $dao = new DaoUsuario();
                $dao->insertAlumno( $obj );
              
                
            break;

            case "getAllUsuarios":
                $inst = new DaoUsuario();
                $inst->getAllUsuarios();
                
            break;

            case "getAllAlumnos":
                $alu = new DaoUsuario();
                $alu->getAllAlumnos();
            break;

            case "getAllIdUsuario":
                $alu = new DaoUsuario();
                $alu->getAllIdUsuario();
            break;

            case "deleteUsuario":
               $id = $_POST["id"];

                $alu = new DaoUsuario();
                $alu->deleteUsuario( $id );
            break;

            case "getAllUsuario":
                $id = $_POST["id"];
                $ins = new DaoUsuario();
                $ins->getAllUsuario( $id);
            break; 
            case "editarUsuario":

                $txtnombre = mysqli_real_escape_string($conectar,$_POST["txtnombre"]);
                $txtapellidoP = mysqli_real_escape_string($conectar,$_POST["txtapellidoP"]);
                $txtapellidoM = mysqli_real_escape_string($conectar,$_POST["txtapellidoM"]);
                $txtcorreo = mysqli_real_escape_string($conectar,$_POST["txtcorreo"]);
                $txtusuario = mysqli_real_escape_string($conectar,$_POST["txtusuario"]);
                $txtpass = mysqli_real_escape_string($conectar,$_POST["txtpass"]);
                $txtfechaN = mysqli_real_escape_string($conectar,$_POST["txtfechaN"]);
                $txtsexo = mysqli_real_escape_string($conectar,$_POST["txtsexo"]);
                $txttelefono = mysqli_real_escape_string($conectar,$_POST["txttelefono"]);
                $txtid = mysqli_real_escape_string($conectar,$_POST["id"]);
                $txtciclo = mysqli_real_escape_string($conectar,$_POST["txtciclo"]);
                $txtgrado = mysqli_real_escape_string($conectar,$_POST["txtgrado"]);
                $txtCURP = mysqli_real_escape_string($conectar,$_POST["txtCURP"]);
                $txtdomicilio = mysqli_real_escape_string($conectar,$_POST["txtdomicilio"]);
                $txtcodigoP = mysqli_real_escape_string($conectar,$_POST["txtcodigoP"]);
                $txtestatus = mysqli_real_escape_string($conectar,$_POST["cbestatus"]);
                $txtidGrupo = mysqli_real_escape_string($conectar,$_POST["idGrupo"]);
                
                if($txtsexo == "option1"){
                    $txtsexo = "Hombre";
                }else{
                    $txtsexo = "Mujer";
                }

                $obj = new Usuario();
                $obj->nombre = $txtnombre;
                $obj->apellidoP = $txtapellidoP;
                $obj->apellidoM = $txtapellidoM;
                $obj->correo = $txtcorreo;
                $obj->usuario = $txtusuario;
                $obj->contrasena = $txtpass;
                $obj->fechaN = $txtfechaN;
                $obj->sexo = $txtsexo;
                $obj->tipo = 'alumno';
                $obj->telefono = $txttelefono;
                $obj->cicloE = $txtciclo;
                $obj->grado = $txtgrado;
                $obj->curp = $txtCURP;
                $obj->domicilio = $txtdomicilio;
                $obj->codigoP = $txtcodigoP;
                $obj->estatus = $txtestatus;
                $obj->idUsuario = $txtid;
                $obj->idGrupo = $txtidGrupo;      

                $ins = new DaoUsuario();
               
               $ins->updateUsuario( $obj);
            break; 

            case 'getAllMateriasDocente':

                $ins = new DaoDocente();
                $ins->getAllMateriasDocente($_POST["id"]);
            break;

            case 'getAllGrupoD':

                $idGrupo = $_POST["idGrupo"];
                $idDocente = $_POST["idDocente"];
                $idMateria = $_POST["idMateria"];
                $ins =  new DaoDocente();
                $ins->getAllGrupo($idDocente ,$idMateria , $idGrupo);
            break;

            case 'getAllIdGrupo':
                
                $idMateria = $_POST["idMateria"];
                $ins =  new DaoDocente();
                $ins->getAllIdGrupo( $idMateria );
               
            break;

            case 'getCalificacion':
                
                $idMateria = $_POST["idmateria"];
                $idAlumno = $_POST["idalumno"];
                $idDocente = $_POST["idDocente"];
                $ins =  new DaoDocente();
                $ins->getCalificacion( $idMateria , $idAlumno , $idDocente );
               
            break;
            case 'updateCalificacion':
                
                $idMateria = $_POST["idmateria"];
                $idAlumno = $_POST["idalumno"];
                $idDocente = $_POST["iddocente"];
                $calificacion = $_POST["calificacion"];
                $bimestre = $_POST["bimestre"];
                $fecha = $_POST["fecha"];
                $idcalificacion = $_POST["idcalificacion"];

                $obj = new Calificaciones();
                $obj->idcalificacion = $idcalificacion;
                $obj->calificacion = $calificacion;
                $obj->bimestre = $bimestre;
                $obj->fecha = $fecha;
                $obj->idalumno = $idAlumno;
                $obj->idmateria = $idMateria;
                $obj->iddocente = $idDocente;
              
                $ins =  new DaoDocente();
    
                $ins->update( $obj);
               
            break;

            case 'insertCalificacion':
                
                $idMateria = $_POST["idmateria"];
                $idAlumno = $_POST["idalumno"];
                $idDocente = $_POST["iddocente"];
                $calificacion = $_POST["calificacion"];
                $bimestre = $_POST["bimestre"];
                $fecha = $_POST["fecha"];

                $obj = new Calificaciones();
                $obj->calificacion = $calificacion;
                $obj->bimestre = $bimestre;
                $obj->fecha = $fecha;
                $obj->idalumno = $idAlumno;
                $obj->idmateria = $idMateria;
                $obj->iddocente = $idDocente;
              
                $ins =  new DaoDocente();
    
                $ins->insert( $obj);
               
            break;
            case "getAllCalificaciones":
                $idMateria = $_POST["idmateria"];
                $idAlumno = $_POST["idalumno"];

                $ins =  new DaoUsuario();
    
                $ins->getAllCalificaciones( $idAlumno , $idMateria);
                
            break;
          
        }

    }else{
        //no llego la accion a realizar
        $GLOBALS["mensaje"] = ["mensaje" => "no sea posido realizar la petision 
        de los datos. vuelva a intertarlo"];
        echo json_encode($GLOBALS["mensaje"]);
    }