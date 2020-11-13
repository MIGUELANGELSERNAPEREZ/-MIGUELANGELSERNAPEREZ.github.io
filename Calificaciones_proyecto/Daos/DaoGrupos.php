<?php
    $lista = [];
    $error = [];

class DaoGrupos{

    public function getAllGrupos(){
        include("../php/conexion.php");

        $sentecniaSQL = "SELECT * FROM grupo;";
        $resul = $conectar ->query($sentecniaSQL);
        $con = $resul ->num_rows;
        
        
        if($con > 0){
    
           foreach($resul as $val){
                array_push( $GLOBALS["lista"] , $val );
           } 
           
           echo json_encode( $GLOBALS["lista"] );
            
        }else{
           //error al traer los datos
           $GLOBALS['error'] = ["mensaje" => "A existido un problema al querer cargar
           los grupos"];

           echo json_encode($GLOBALS['error']);

        }
    }

}