<?php

$lista = [];
$mensaje = [];

class DaoDocente{

    public function getAllMateriasDocente( $id ){
        include("../php/conexion.php");

        $sentenciaSQL = "SELECT d.iddocente, d.idmateria , 
        m.idMateria, m.NombreMateria from detalle_materia_docente 
        d join  materia m on d.idmateria = m.idMateria 
        where d.iddocente = $id;";

        $ejecutarSentenciaSQL = $conectar->query($sentenciaSQL);
        
        $filas = $ejecutarSentenciaSQL->num_rows;

        if($filas > 0){

            foreach($ejecutarSentenciaSQL as $nuevo ){
                array_push( $GLOBALS["lista"] , $nuevo);
                
            }

            echo json_encode( $GLOBALS["lista"] );
            

        }else{
            //uvo un error
            echo "Error: " . $sentenciaSQL . "<br>" . mysqli_error($conectar);

        }


    }

    public function getAllGrupo( $idDocente , $idMateria , $idGrupo ){
        
        include("../php/conexion.php");

        $sentenciaSQL = "
        select a.idAlumno, u.nombre, concat(u.apellidoPaterno , ' ' ,u.apellidoMaterno) as Apellidos , g.nombre as nombreGrupo, m.NombreMateria, md.iddocente, m.idMateria , g.idgrupo , m.Unidades 
        from usuario u  join alumno a on u.id = a.idusuario 
        join grupo g on a.idgrupo = g.idgrupo 
        join detalle_grupo_materia gm on g.idgrupo = gm.idgrupo
        join materia m on m.idMateria = gm.idmateria
        join detalle_materia_docente md on md.idmateria = m.idMateria
        where md.iddocente = $idDocente and md.idmateria = $idMateria and g.idgrupo = $idGrupo;";

        $ejecutarSentenciaSQL = $conectar->query($sentenciaSQL);
        $filas = $ejecutarSentenciaSQL->num_rows;

        if( $filas ){

            foreach($ejecutarSentenciaSQL as $datos){
                
                array_push( $GLOBALS["lista"] , $datos);

            }

            echo json_encode($GLOBALS["lista"]);

        }else{
            //uvo un error
            echo "Error: " . $sentenciaSQL . "<br>" . mysqli_error($conectar);

        }

    }

    public function getAllIdGrupo( $idMateria ){

        include("../php/conexion.php");

        $sentenciaSQL = " 
        select * from detalle_grupo_materia 
        where idmateria = $idMateria;";

        $ejecutarSentenciaSQL = $conectar->query( $sentenciaSQL );
        $row = $ejecutarSentenciaSQL->num_rows;
        
        if($row > 0){

            echo json_encode($ejecutarSentenciaSQL->fetch_assoc());
        }else{

                    //error
                    echo "Error: " . $sentenciaSQL . "<br>" . mysqli_error($conectar);
        }
    }

    public function getCalificacion($idMateria , $idAlumno , $idDocente){
        include("../php/conexion.php");

        $sentenciaSQL = "SELECT *from calificacion where idalumno = $idAlumno 
        and idmateria = $idMateria and iddocente = $idDocente order by bimestre asc;";

        $ejecutarSentenciaSQL = $conectar->query($sentenciaSQL);
        $fila = $ejecutarSentenciaSQL->num_rows;

        if($fila > 0){

            foreach($ejecutarSentenciaSQL as $calificacion){
                array_push( $GLOBALS["lista"] , $calificacion);
            }

            echo json_encode($GLOBALS["lista"]);

        }else{
            $GLOBALS['mensaje'] = ["error" => "A existido un problema al querer cargar
            las materias"];

            echo json_encode($GLOBALS['mensaje']);

        }

        

    }

    public function update($obj){
        include("../php/conexion.php");

        $sentenciaSQL = "
        UPDATE `mahatmagandhi`.`calificacion`
        SET
        `calificacion` = $obj->calificacion,
        `bimestre` =  $obj->bimestre,
        `fecha` = '$obj->fecha',
        `idalumno` = $obj->idalumno,
        `idmateria` = $obj->idmateria,
        `iddocente` = $obj->iddocente
        WHERE `idcalificacion` = $obj->idcalificacion;  
        ";

        $ejecutarSentenciaSQL = $conectar->query($sentenciaSQL);

        if($ejecutarSentenciaSQL){
            echo true;
        }else{
            echo false;
        }
    }

    public function insert( $obj ){
        include("../php/conexion.php");

        $sentenciaSQL = "
        INSERT INTO `mahatmagandhi`.`calificacion`
        (`calificacion`,
        `bimestre`,
        `fecha`,
        `idalumno`,
        `idmateria`,
        `iddocente`)values($obj->calificacion,
        $obj->bimestre,
        '$obj->fecha',
        $obj->idalumno,
        $obj->idmateria,
        $obj->iddocente);";

        $ejecutarSentenciaSQL = $conectar->query($sentenciaSQL);

        if($ejecutarSentenciaSQL){
            echo true;
        }else{
            echo "Error: " . $sentenciaSQL . "<br>" . mysqli_error($conectar);
        }
    }
    
}