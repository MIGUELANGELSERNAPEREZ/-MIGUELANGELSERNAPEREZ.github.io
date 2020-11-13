<?php

$lista = [];
$error = ["mensaje" => ""];


class DaoUsuario{
  
     // Declaración de un método
     public function getAllUsuarios() {
        require_once("../clases/usuarios.php");
        include("../php/conexion.php");

        $consulta = "SELECT * FROM usuario where tipo = 'alumno';";
        $ejecutar = $conectar -> query($consulta);
        $filas = $ejecutar -> num_rows;

        if($filas > 0){

            for($i = 0; $i < $filas; $i++){
                //se accede por fila
                $datos = $ejecutar ->fetch_assoc();
                //instanacia a la clase usuarios
                $valor = new Usuario;
            
                $valor ->idUsuario = $datos["id"]; 
                $valor ->nombre = $datos["nombre"]; 
                $valor ->apellidoP = $datos["apellidoPaterno"]; 
                $valor ->apellidoM = $datos["apellidoMaterno"]; 
                $valor ->correo = $datos["correo"]; 
                $valor ->usuario = $datos["usuario"]; 
                $valor ->contrasena = $datos["contrasena"]; 
                $valor ->fechaN = $datos["fechaNacimiento"];
                $valor ->sexo = $datos["sexo"];
                $valor ->tipo = $datos["tipo"];
                $valor ->telefono = $datos["telefono"]; 
            
                //se agrega a la lista el usuario
                array_push($GLOBALS["lista"], $valor);
                
            }
            
            echo json_encode($GLOBALS["lista"]);
        }else{
            //errro al traer los datos
            $GLOBALS["error"] = ["mensaje" => "A existido un problema al querer cargar
            las informacion del alumno"];

            echo json_encode($GLOBALS["error"]);
        }

        
    }

    public function getAllAlumnos() {

        include("../php/conexion.php");
        $consulta = "SELECT * FROM alumno;";
        $ejecutar = $conectar -> query($consulta);
        $filas = $ejecutar -> num_rows;

        if($filas > 0){

            foreach($ejecutar as $datos){

                array_push( $GLOBALS["lista"] , $datos);
            }
        
            echo json_encode($GLOBALS["lista"]); 
        }else{
            
           //errro al traer los datos
           $GLOBALS["error"] = ["mensaje" => "A existido un problema al querer cargar
           las informacion del alumno"];

           echo json_encode($GLOBALS["error"]);
        }
                
    }

    public function insertUsuario( $usu ){

        include("../php/conexion.php");
        
        $encrip = sha1($usu->contrasena);
        $tel = (int) $usu->telefono;
        
        $sentenciaSQL = "INSERT INTO usuario(`nombre`,`apellidoPaterno`,
        `apellidoMaterno`,
        `correo`,
        `usuario`,
        `contrasena`,
        `fechaNacimiento`,
        `sexo`,
        `tipo`,
        `telefono`)
         VALUES ('$usu->nombre',
        '$usu->apellidoP','$usu->apellidoM','$usu->correo',
        '$usu->usuario','$encrip','$usu->fechaN','$usu->sexo',
        'alumno',$tel);";

        $ejecutarSQL = $conectar->query($sentenciaSQL);
        
        if($ejecutarSQL){
            echo "true";
        }else{
            echo "Error: " . $sentenciaSQL . "<br>" . mysqli_error($conectar);
        }   

    }

    public function insertAlumno( $usu ){

        include("../php/conexion.php");
                
        $grado = (int)$usu->grado;
        $idUsuario = (int)$usu->idUsuario;
        $idGrupo= (int)$usu->idGrupo;

        $sentenciaSQL = "INSERT INTO alumno
        (cicloEscolar,
        grado,
        curp,
        domicilio,
        CodigoPostal,
        Estatus,
        idusuario,
        idgrupo)
        VALUES
        ('$usu->cicloE',
         $grado,
        '$usu->curp',
        '$usu->domicilio',
        '$usu->codigoP',
        '$usu->estatus',
         $idUsuario,
         $idGrupo);";

        $ejecutarSQL = $conectar->query($sentenciaSQL);
        
        if($ejecutarSQL){
            echo "true";
        }else{
            echo "Error: " . $sentenciaSQL . "<br>" . mysqli_error($conectar);
        }   

    }

    public function getAllIdUsuario(){
        
        include("../php/conexion.php");

        $sentenciaSQL = "select  max(id) as id from usuario; ";
        
        $ejecutarSQL = $conectar->query($sentenciaSQL);
        
        if($ejecutarSQL){
            
            $datos = $ejecutarSQL->fetch_assoc();
            echo $datos["id"];
            
        }else{
            echo "false";
           

        }   
    }

    public function deleteUsuario( $id ){
        
        include("../php/conexion.php");

        $sentenciaSQL = "DELETE from usuario where id = $id; ";
        
        $ejecutarSQL = $conectar->query($sentenciaSQL);
        
        if($ejecutarSQL){
            
            echo "true";
            
        }else{
            echo "false";
        }   
    }

    public function getAllUsuario( $id ){
        
        include("../php/conexion.php");

        $sentenciaSQL = "SELECT * FROM usuario join alumno on 
        usuario.id = alumno.idUsuario where usuario.id = $id;";
        
        $ejecutarSQL = $conectar->query($sentenciaSQL);
        $rows = $ejecutarSQL->num_rows;
        
        if($rows > 0){
            
           $dato = $ejecutarSQL->fetch_assoc();

           echo json_encode($dato);
            
        }else{
             //errro al traer los datos
             $GLOBALS["error"] = ["mensaje" => "A existido un problema al querer cargar
             las informacion del usuario"];
 
             echo json_encode($GLOBALS["error"]);
        }   
    }

    public function updateUsuario( $obj ){

        include("../php/conexion.php");

        $sentenciaSQL = "UPDATE usuario u join alumno a on u.id = a.idusuario
        set u.nombre = '$obj->nombre', u.apellidoPaterno = '$obj->apellidoP',
        u.apellidoMaterno = '$obj->apellidoM', u.correo = '$obj->correo', 
        u.usuario = '$obj->usuario', u.fechaNacimiento ='$obj->fechaN', 
        u.sexo= '$obj->sexo', u.tipo = 'alumno', u.telefono = '$obj->telefono',  
        a.cicloEscolar = '$obj->cicloE', a.grado='$obj->grado' , 
        a.curp = '$obj->curp', a.domicilio = '$obj->domicilio',
        a.codigoPostal = '$obj->codigoP' , a.Estatus = '$obj->estatus' ,
        a.idgrupo = '$obj->idGrupo'
        WHERE u.id = $obj->idUsuario;";
        

        $ejecutarSQL = $conectar->query($sentenciaSQL);
        
        if($ejecutarSQL){
            echo "true";
        }else{
            echo "Error: " . $sentenciaSQL . "<br>" . mysqli_error($conectar);
        }   

    }

    public function getAllCalificaciones($idAlumno , $idMateria){
        include("../php/conexion.php");

        $sentenciaSQL = "select * from calificacion c join materia m on 
        c.idmateria = m.idMateria where c.idalumno = $idAlumno and c.idMateria = $idMateria;";
        $ejecutarSQL = $conectar->query($sentenciaSQL);
        $filas = $ejecutarSQL->num_rows;

        if($filas > 0){
            foreach($ejecutarSQL as $fila){
                array_push($GLOBALS["lista"] , $fila);
            }

            echo json_encode($GLOBALS["lista"]);
        }else{
            $GLOBALS["error"] = ["mensaje" => "A existido un problema al querer cargar
            las informacion de la materia"];

            echo json_encode($GLOBALS["error"]);
        }

    }

}

?>