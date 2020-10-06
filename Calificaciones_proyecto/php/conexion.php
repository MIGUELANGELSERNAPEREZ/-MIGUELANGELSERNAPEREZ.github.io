<?php
include("config.php");

$conectar = new mysqli($server,$use,$pass,$bd);

if($conectar == false){
    die("Connection failed: " . mysqli_error());
    
}else{
       // echo "Connected successfully";
        //mysqli_close($conectar);
    }
    
?>