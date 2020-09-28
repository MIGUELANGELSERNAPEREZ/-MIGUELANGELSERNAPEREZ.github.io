<?php
include("config.php");

$conectar = new mysqli($server,$use,$pass,$bd);

if($conectar){

    print_r("conexion exitosa");
}else{
    echo "conexion fallida";
}
   
?>