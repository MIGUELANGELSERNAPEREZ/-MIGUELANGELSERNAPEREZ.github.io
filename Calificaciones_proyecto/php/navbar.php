<?php
   //aqui no se reanuda la session por que esta clase esta siendo inportada
   //a otra que ya esta asiendo referencia a la sesion 
   

   $id = $_SESSION["id_usuario"];
   $sentencia = "SELECT * FROM usuario WHERE id = '$id';";
   $ejecutar = $conectar -> query($sentencia);
   $n = $ejecutar -> num_rows;
       
   if($row > 0){
    $fila = $ejecutar -> fetch_assoc();
    
    }else{
        header('Location: ../index.html');
    }

   $menu =[];
   if($n > 0){
   switch($fila["tipo"]){
      case "admin":
        $menu = ["Materias","Grupos","Alumnos","Docentes"];
      break;
      case "alumno":
        $menu = ["Materias"];
      break;
      case "docente":
        $menu = ["Materias","grupos"];
      break;
      case "director":
        $menu = ["Materias","Grupos","Alumnos","Docentes"];
      break;
   }
  }else{
    header("location: ../index.html");
  }
?>


<nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <a class="navbar-brand" style="color: white;" href="menu.php">SCPMG</a>
  <button class="navbar-toggler btn btn-primary" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">

      <?php
      foreach($menu as $valor){         

      ?>
      <li class="nav-item">
        <a class="nav-link" id="<?php echo $valor;?>" style="color: white;">
        
          <?php echo $valor?>
        </a>
      </li>

      <?php
       }
      ?>
     
    </ul>

  </div>
</nav>