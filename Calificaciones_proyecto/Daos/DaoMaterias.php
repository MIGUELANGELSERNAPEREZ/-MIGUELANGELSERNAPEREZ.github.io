<?php

$error = [];
$lista = [];



class DaoMaterias{
     
    public function getAllMateriaAlumno($idAlumno){
        require_once("../clases/materias.php");
        include("../php/conexion.php");
         
    
            $sentencia = "select usuario.nombre, usuario.apellidoPaterno, usuario.apellidoMaterno,materia.idMateria, materia.nombreMateria, materia.Unidades, materia.TipoMateria
            from docente inner join usuario on docente.idusuario = usuario.id
            inner join detalle_materia_docente on detalle_materia_docente.iddocente = docente.id
            inner join materia on detalle_materia_docente.idmateria = materia.idMateria inner join detalle_grupo_materia
            on detalle_grupo_materia.idmateria = materia.idMateria 
            where detalle_grupo_materia.idgrupo = '$idAlumno';";

            $ejecuta = $conectar ->query($sentencia);
            $exitosa = $ejecuta -> num_rows;
    
        if ($exitosa > 0){

            for($i = 0; $i < $exitosa; $i++){
                $datos = $ejecuta ->fetch_assoc();
                $obj = new Materias();
                
                $obj ->nombre = $datos["nombreMateria"];
                $obj ->unidades = $datos["Unidades"];
                $obj ->tipoM = $datos["TipoMateria"];
                $obj ->apellidoP = $datos["apellidoPaterno"];
                $obj ->apellidoM = $datos["apellidoMaterno"];
                $obj ->nombreUsu = $datos["nombre"];
                $obj ->idMateria = $datos["idMateria"];
                

                array_push($GLOBALS["lista"],$obj);
            }

            echo json_encode($GLOBALS["lista"]);
                    

        }else{
            $GLOBALS["error"] = ["mensaje" => "A existido un problema al querer cargar
            las materias del alumno"];

            echo json_encode($GLOBALS["error"]);
        }

    }

        public function deleteMateria( $id ){
            include("../php/conexion.php");
            
            $sentenciaSQL = "DELETE FROM materia WHERE idMateria = $id;";
            $ejecutarSentencia = $conectar -> query($sentenciaSQL);

            if($ejecutarSentencia > 0){
                echo "true";
            }else{
                echo "false";
            }

        }

        public function getAll(){

            require_once("../clases/materias.php");
            include("../php/conexion.php");

            $sentenciaSQL = "SELECT * FROM materia;";
            $ejecutarSQL = $conectar -> query($sentenciaSQL);
            $filas = $ejecutarSQL ->num_rows;

            if($filas > 0){
                for($i = 0; $i < $filas; $i ++){

                    $datos = $ejecutarSQL ->fetch_assoc();
                    $obj = new Materias();
                    $obj->idMateria = $datos["idMateria"];
                    $obj->nombre = $datos["NombreMateria"];
                    $obj->grado = $datos["Grado"];
                    $obj->tipoM = $datos["TipoMateria"];
                    $obj->unidades = $datos["Unidades"];
                    
                    array_push($GLOBALS['lista'] , $obj);
                }

                echo json_encode($GLOBALS['lista']);

            }else{
                //error al traer los datos
                $GLOBALS['error'] = ["mensaje" => "A existido un problema al querer cargar
                las materias"];

                echo json_encode($GLOBALS['error']);
    
            }
        }

        public function insertMateria( $materia ){
            
            include("../php/conexion.php");
            $sentenciaSQL = "INSERT INTO materia(`NombreMateria`, `Grado`, `TipoMateria` , `Unidades`)
            VALUES ('$materia->nombre',$materia->grado,'$materia->tipoM',$materia->unidades);";

            $ejecutarSQL = $conectar -> query($sentenciaSQL);
            
            if($ejecutarSQL > 0){
                echo "true";
            }else{
                echo "Error: " . $sentenciaSQL . "<br>" . mysqli_error($conectar);

            }   
        }

        public function getAllMateria( $id ){
            include("../php/conexion.php");

            $sentenciaSQL = "SELECT * FROM materia WHERE idMateria = $id;";
            $ejecutarSentencia = $conectar -> query($sentenciaSQL);

            $res = $ejecutarSentencia ->num_rows;
            if($res > 0){

                $fila = $ejecutarSentencia ->fetch_assoc();

                echo json_encode($fila);
            }else{

                $GLOBALS['error'] = ["mensaje" => "A existido un problema al querer cargar
                las materia"];

                echo json_encode($GLOBALS['error']);
            }
        }

        public function editarMateria( $obj ){
            include("../php/conexion.php");

            $sentenciaSQL = " UPDATE materia 
            SET NombreMateria = '$obj->nombre',
            Grado = $obj->grado,
            TipoMateria = '$obj->tipoM',
            Unidades = $obj->unidades 
            WHERE idMateria = $obj->idMateria;";

            $ejecutarSQL = $conectar -> query($sentenciaSQL);
                        
            if($ejecutarSQL > 0){
                echo "true";
            }else{
                echo "false";
            }   
        }
}
