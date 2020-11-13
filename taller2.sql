-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mahatmagandhi
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mahatmagandhi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mahatmagandhi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mahatmagandhi` ;

-- -----------------------------------------------------
-- Table `mahatmagandhi`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mahatmagandhi`.`usuario` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(20) NOT NULL,
  `apellidoPaterno` VARCHAR(25) NOT NULL,
  `apellidoMaterno` VARCHAR(25) NOT NULL,
  `correo` VARCHAR(50) NOT NULL,
  `usuario` VARCHAR(20) NOT NULL,
  `contrasena` VARCHAR(90) NOT NULL,
  `fechaNacimiento` DATE NOT NULL,
  `sexo` ENUM('Hombre', 'Mujer') NULL DEFAULT NULL,
  `tipo` ENUM('admin', 'director', 'docente', 'alumno') NULL DEFAULT NULL,
  `telefono` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `usuario` ON `mahatmagandhi`.`usuario` (`usuario` ASC) VISIBLE;

select * from usuario;
ALTER TABLE usuario
DROP inscrito;
alter table usuario change telefono telefono INT(11) NULL;

select * from usuario;

-- -----------------------------------------------------
-- Table `mahatmagandhi`.`grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mahatmagandhi`.`grupo` (
  `idgrupo` INT NOT NULL,
  `nombre` VARCHAR(35) NOT NULL,
  PRIMARY KEY (`idgrupo`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `mahatmagandhi`.`detalle_docente_grupo`
-- -----------------------------------------------------

create table detalle_docente_grupo(
id int auto_increment primary key,
iddocente int not null,
idgrupo int not null,
constraint fk_detDoc foreign key(iddocente) references docente(id),
constraint fk_detGrup foreign key(idgrupo) references grupo(idgrupo)
);

-- -----------------------------------------------------
-- Table `mahatmagandhi`.`alumno`
-- -----------------------------------------------------

CREATE TABLE `alumno` (
  `idAlumno` int(11) NOT NULL AUTO_INCREMENT,
  `cicloEscolar` varchar(25) NOT NULL,
  `grado` enum('primero','segundo','tercer','cuarto','quinto','sexto') DEFAULT NULL,
  `curp` varchar(18) NOT NULL,
  `domicilio` varchar(50) NOT NULL,
  `CodigoPostal` char(5) NOT NULL,
  `Estatus` varchar(25) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `idgrupo` int(11) NOT NULL,
  PRIMARY KEY (`idAlumno`,`idusuario`),
  UNIQUE KEY `idusuario` (`idusuario`),
  KEY `fk_grup` (`idgrupo`),
  CONSTRAINT `fk_alum` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `fk_grup` FOREIGN KEY (`idgrupo`) REFERENCES `grupo` (`idgrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

alter table alumno change `fk_alum`  `fk_alum` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`);

select * from alumno;
select * from usuario;
alter table alumno drop Municipio;
alter table alumno change Localidad domicilio VARCHAR(50) NOT NULL;

select * from grupo;
alter table alumno change curp curp VARCHAR(18) NOT NULL;
alter table alumno change grupo_idgrupo idgrupo int not null;
alter table alumno change fechaTerminacion fechaTerminacialumnoalumnoon DATE NULL;


alter table alumno change usuario_id idusuario int(11) not null unique;
alter table alumno add constraint fk_grup foreign key(idgrupo) references grupo(idgrupo);
alter table alumno add constraint fk_alum foreign key(idusuario) references usuario(id);

-- -----------------------------------------------------
-- Table `mahatmagandhi`.`director`
-- -----------------------------------------------------
create table director(
iddirector int auto_increment primary key,
estudios varchar(30) not null,
constraint fk_dire_usu foreign key(iddirector) references usuario(id)
);

-- -----------------------------------------------------
-- Table `mahatmagandhi`.`docente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mahatmagandhi`.`docente` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `NumeroHoras` INT(11) NOT NULL,
  `NivelEstudios` VARCHAR(40) NULL DEFAULT NULL,
  `idusuario` INT(11) NOT NULL unique,
  PRIMARY KEY (`id`, `usuario_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

alter table docente change usuario_id idusuario int(11) not null unique;
alter table docente drop foreign key fk_docente;
alter table docente add constraint fk_docente foreign key(idusuario) references usuario(id);

select * from docente;
alter table docente drop Domicilio;


-- -----------------------------------------------------
-- Table `mahatmagandhi`.`materia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mahatmagandhi`.`materia` (
  `idMateria` INT(11) NOT NULL AUTO_INCREMENT,
  `NombreMateria` VARCHAR(20) NOT NULL,
  `Grado` INT(11) NOT NULL,
  `TipoMateria` varchar(40) NOT NULl,
  PRIMARY KEY (`idMateria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

alter table materia drop horario;
alter table materia add Unidades int not null; 
alter table materia drop iddocente;
alter table materia change NombreMateria  NombreMateria varchar(40) NOT NULl;
alter table materia change docente_id iddocente INT(11) NOT NULL;
alter table materia add constraint fk_doc foreign key(iddocente) references docente(id);
alter table materia drop foreign key fk_doc;

-- -----------------------------------------------------
-- Table `mahatmagandhi`.`detalle_materia_docente`
-- -----------------------------------------------------

create table detalle_materia_docente(
id int auto_increment primary key,
iddocente int(11) not null,
idmateria int(11) not null,
horario time not null,
constraint fk_deta_mate_doc foreign key(idmateria) references materia(idmateria),
constraint fk_deta_doc_mate foreign key(iddocente) references docente(id)
);
-- -----------------------------------------------------
-- Table `mahatmagandhi`.`detalle_grupo_materia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mahatmagandhi`.`detalle_grupo_materia` (
  `id` INT AUTO_INCREMENT,
  `idgrupo` INT NOT NULL,
  `idmateria` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

alter table detalle_grupo_materia add constraint fk_grupo foreign key(idgrupo) references grupo(idgrupo);
alter table detalle_grupo_materia add constraint fk_materia foreign key(idmateria) references materia(idMateria);


-- -----------------------------------------------------
-- Table `mahatmagandhi`.`calificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mahatmagandhi`.`calificacion` (
  `idcalificacion` INT NOT NULL AUTO_INCREMENT,
  `calificacion` FLOAT NOT NULL,
  `bimestre` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `idalumno` INT NOT NULL,
  `idmateria` INT NOT NULL,
  `iddocente` INT NOT NULL,
  PRIMARY KEY (`idcalificacion`))
ENGINE = InnoDB;

alter table calificacion add constraint fk_alumC foreign key(idalumno) references alumno(idalumno);
alter table calificacion add constraint fk_doceC foreign key(iddocente) references docente(id);
alter table calificacion add constraint fk_mateC foreign key(idmateria) references materia(idmateria);




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



-- -----------------------------------------------------
-- inserts
-- -----------------------------------------------------



-- INSERT GRUPOS----------------------------------------------------------------------
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('1', '1A');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('2', '1B');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('3', '1C');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('4', '3A');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('5', '3B');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('6', '3C');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('7', '5A');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('8', '5B');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('9', '5C');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('10', '6A');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('11', '6B');
INSERT INTO `mahatmagandhi`.`grupo` (`idgrupo`, `nombre`) VALUES ('12', '6C');

-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

-- INSERT ALUMNOS
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `Localidad`, `Municipio`, `CodigoPostal`, `FechaInicio`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-2021', 'primero', 'werWYGWHJNJDN', 'Iramuco', 'Uruangato', '76548', '2020-06-12', 'vigente', '100007', '1');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `Localidad`, `Municipio`, `CodigoPostal`, `FechaInicio`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-2021', 'primero', 'djdj7677878jw', 'Celaya', 'Moroleon', '76578', '2020-06-12', 'vigente', '100008', '1');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'jhskhdnkhdjksjdk', 'salamanca', '76456', 'Vigente', '100010', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100011', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100041', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100044', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100045', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100063', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100061', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100059', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100057', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100053', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100076', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100075', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100074', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100073', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'tercer', 'kdjskdskdlsklkdsla', 'salamanca', '76456', 'Vigente', '100068', '3');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'cuarto', 'kdjskdskdlsklkdsla', 'Uriangato', '76456', 'Vigente', '100078', '4');
INSERT INTO `mahatmagandhi`.`alumno` (`cicloEscolar`, `grado`, `curp`, `domicilio`, `CodigoPostal`, `Estatus`, `idusuario`, `idgrupo`) VALUES ('2020-10-30', 'cuarto', 'kdjskdskdlsklkdsla', 'Uriangato', '76456', 'Vigente', '100080', '4');

-- INSERT usuarios -------------------------------------------------------------------------------
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`, `inscrito`) VALUES ('esqui', 'prueva', 'prueva2', 's16120272@alumnos.itsur.edu.mx', 'esqui', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '1997-12-17', 'Hombre', 'docente', '445462251', '1');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`, `inscrito`) VALUES ('Ivan', 'Vega', 'Ortez', 'ivan@gmail.com', 'ivanVega', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '1997-12-17', 'Hombre', 'docente', '445462251', '1');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`, `inscrito`) VALUES ('Jorge', 'Serrato', 'Torres', 'Jorge@gmail.com', 'jorguito', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '1997-12-17', 'Hombre', 'docente', '445462251', '1');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`, `inscrito`) VALUES ('Patricia', 'Vega', 'Cortes', 'paty@gmail.com', 'patyVega', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '1997-12-17', 'Mujer', 'docente', '445462251', '1');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`, `inscrito`) VALUES ('David', 'Lopez', 'Perez', 'david@gmail.com', 'davidLopez', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '1997-12-17', 'Hombre', 'alumno', '445462255', '1');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`, `inscrito`) VALUES ('Pablo', 'Serna', 'Dominguez', 'pablito@gmail.com', 'pablito', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '1997-12-17', 'Hombre', 'alumno', '445462255', '1');

-- ------------------------------------------------------------

--  INSERTAR DOCENTES ---------------------------------------------------------------------------------
INSERT INTO `mahatmagandhi`.`docente` (`id`, `NumeroHoras`, `NivelEstudios`, `Domicilio`, `idusuario`) VALUES ('1', '8', 'universitario', 'mineros #43', '100001');
INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `Domicilio`, `idusuario`) VALUES ('8', 'Maestria', 'Vicente #45', '100004');
INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `Domicilio`, `idusuario`) VALUES ('5', 'Doctorado', 'Vicente #48', '100005');
INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `Domicilio`, `idusuario`) VALUES ('7', 'Universitario', 'Vicente #43', '100006');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`) VALUES ('German', 'Guzman', 'Guzman', 'germanG@gmail.com', 'germanL', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2000-12-08', 'Hombre', 'docente', '1234564324');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`) VALUES ('Luiz', 'Perez', 'Fuentes', 'fuentes@gmail.com', 'fuentesLuiz', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2000-12-08', 'Hombre', 'docente', '1234564324');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`) VALUES ('Patricia', 'Torres', 'Pintores', 'patriciaL@gmail.com', 'pintoresP', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2000-12-08', 'Mujer', 'docente', '1234564324');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`) VALUES ('Brenda', 'Ambrano', 'Serrato', 'brendaL@gmail.com', 'brendaA', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2000-12-08', 'Mujer', 'docente', '1234564324');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`) VALUES ('Monserrat', 'Camoranesi', 'Carmona', 'monseL@gmail.com', 'monseL', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2000-12-08', 'Mujer', 'docente', '1234564324');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`) VALUES ('Efren', 'Lopez', 'Muños', 'efrenL@gmail.com', 'efrens', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2000-12-08', 'Hombre', 'docente', '1234564324');
INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`) VALUES ('Oswaldo', 'Carmona', 'Flores', 'oswaldoL@gmail.com', 'oswaldosr', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2000-12-08', 'Hombre', 'docente', '1234564324');

INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `idusuario`) VALUES ('7', 'Universitario', '100088');
UPDATE `mahatmagandhi`.`docente` SET `NumeroHoras` = '7' WHERE (`id` = '4') and (`idusuario` = '100005');
UPDATE `mahatmagandhi`.`docente` SET `NumeroHoras` = '7' WHERE (`id` = '3') and (`idusuario` = '100004');
UPDATE `mahatmagandhi`.`docente` SET `NumeroHoras` = '7' WHERE (`id` = '2') and (`idusuario` = '100003');
UPDATE `mahatmagandhi`.`docente` SET `NumeroHoras` = '7' WHERE (`id` = '1') and (`idusuario` = '100001');
INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `idusuario`) VALUES ('7', 'Universitario', '100089');
INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `idusuario`) VALUES ('7', 'Universitario', '100090');
INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `idusuario`) VALUES ('7', 'Universitario', '100091');
INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `idusuario`) VALUES ('7', 'Universitario', '100092');
INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `idusuario`) VALUES ('7', 'Universitario', '100093');
INSERT INTO `mahatmagandhi`.`docente` (`NumeroHoras`, `NivelEstudios`, `idusuario`) VALUES ('7', 'Universitario', '100094');

-- ------------------------------------------------------------------------------------------------------
--  INSERTAR MATERIAS ---------------------------------------------------------------------------------
INSERT INTO `mahatmagandhi`.`materia` (`idMateria`, `NombreMateria`, `Grado`, `TipoMateria`) VALUES ('1', 'Calculo Diferencial', '5', 'Matematicas');
INSERT INTO `mahatmagandhi`.`materia` (`idMateria`, `NombreMateria`, `Grado`, `TipoMateria`) VALUES ('2', 'Calculo Integral', '6', 'Matematicas');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`) VALUES ('Mates Discretas', '1', 'Calculos');
UPDATE `mahatmagandhi`.`materia` SET `TipoMateria` = 'Calculos' WHERE (`idMateria` = '2');
UPDATE `mahatmagandhi`.`materia` SET `TipoMateria` = 'Calculos' WHERE (`idMateria` = '1');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`) VALUES ('Probabilidad 1', '1', 'Probabilidad');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`) VALUES ('Fundamentos Pro', '1', 'Programacion');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`) VALUES ('Taller 2', '6', 'Investigaciones');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`) VALUES ('Taller 1', '5', 'Investigacion');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`) VALUES ('Redes 1', '3', 'Telecomunicaciones');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`) VALUES ('Redes 2', '4', 'Telecomunicaciones');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Administracion', '1', 'Empresarial', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Tutorias 1', '1', 'Asesorias', '4');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Contabilidad', '2', 'Empresarial', '4');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Programacion Orientada a Objetos', '2', 'Programacion', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Desarrollo Sustentable', '3', 'Naturalesa', '4');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Probabilidad y Estadistica', '3', 'Estadisticas', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Tutorias 2', '4', 'Asesorias', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Estracurricular 1', '4', 'Deportes', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Extracurricular 2', '5', 'Deportes', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Calculo Vectorial', '5', 'Calculos', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Estructura de Datos', '6', 'Programacion', '6');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Cultura Empresarial', '6', 'Empresarial', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Algebra Lineal', '1', 'Calculos', '4');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Sistemas Operativos', '2', 'Sistemas Operativos', '4');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Fisica General', '3', 'Fisica', '6');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Topicos Avanzados de Programacion', '4', 'Programacion', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Lenguajes y Automatas 1', '5', 'Programacion', '4');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Lenguajes y Automatas 2', '6', 'Programacion', '3');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Fundamentos de Base de Datos', '1', 'Programacion', '5');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Taller de Sistemas OPerativos', '2', 'Sistemas Operativos', '4');
INSERT INTO `mahatmagandhi`.`materia` (`NombreMateria`, `Grado`, `TipoMateria`, `Unidades`) VALUES ('Principios Electricos', '3', 'Fisica', '4');

-- ------------------------------------------DETALLE_MATERIA_DOCENTE ----------------------------------------
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('1', '2', '08:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('1', '5', '09:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('1', '6', '10:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('1', '7', '11:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('1', '8', '12:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('2', '9', '08:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('2', '10', '09:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('2', '11', '10:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('2', '12', '11:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('2', '13', '12:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('2', '14', '13:00:00');

-- ---------------------------------------------------------------------------------
-- INSERT director

INSERT INTO `mahatmagandhi`.`usuario` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `usuario`, `contrasena`, `fechaNacimiento`, `sexo`, `tipo`, `telefono`, `inscrito`) VALUES ('Miguel', 'Cruz', 'Pino', 'Miguel@gmail.com', 'miguelCruz', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '1997-12-17', 'Hombre', 'director', '445462255', '1');

-- -----------------------------------------------------------------------------------------------

use mahatmagandhi;
select * from alumno;
SELECT * FROM docente;
select * from usuario;
select * from grupo;
select * from materia;
select * from detalle_grupo_materia;
select * from detalle_materia_docente;

ALTER TABLE detalle_materia_docente AUTO_INCREMENT=50;

INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('1', '7');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('2', '1');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('2', '2');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('2', '3');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('2', '4');
UPDATE `mahatmagandhi`.`detalle_grupo_materia` SET `idmateria` = '1' WHERE (`id` = '1');
UPDATE `mahatmagandhi`.`detalle_grupo_materia` SET `idmateria` = '2' WHERE (`id` = '2');
UPDATE `mahatmagandhi`.`detalle_grupo_materia` SET `idgrupo` = '1' WHERE (`id` = '3');
UPDATE `mahatmagandhi`.`detalle_grupo_materia` SET `idgrupo` = '1' WHERE (`id` = '4');
UPDATE `mahatmagandhi`.`detalle_grupo_materia` SET `idgrupo` = '1', `idmateria` = '5' WHERE (`id` = '5');
UPDATE `mahatmagandhi`.`detalle_grupo_materia` SET `idgrupo` = '1', `idmateria` = '6' WHERE (`id` = '6');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('2', '5');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('2', '6');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('2', '7');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('3', '1');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('3', '2');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('3', '3');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('3', '4');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('3', '5');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('3', '6');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('3', '7');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('4', '8');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('4', '9');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('4', '10');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('4', '11');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('4', '12');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('4', '13');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('4', '14');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('5', '8');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('5', '9');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('5', '10');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('5', '11');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('5', '12');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('5', '13');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('5', '14');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('6', '8');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('6', '9');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('6', '10');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('6', '11');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('6', '12');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('6', '13');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('6', '14');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('7', '15');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('7', '16');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('7', '17');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('7', '18');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('7', '19');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('7', '20');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('7', '21');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('8', '15');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('8', '16');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('8', '17');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('8', '18');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('8', '19');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('8', '20');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('8', '21');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('9', '15');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('9', '16');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('9', '17');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('9', '18');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('9', '19');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('9', '20');
INSERT INTO `mahatmagandhi`.`detalle_grupo_materia` (`idgrupo`, `idmateria`) VALUES ('9', '21');




INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('8', '53', '16:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('8', '54', '15:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('8', '55', '14:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('8', '56', '13:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('9', '57', '12:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('9', '58', '11:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('9', '59', '10:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('9', '60', '09:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('9', '61', '08:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('9', '61', '07:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('9', '63', '16:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('10', '64', '15:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('10', '65', '14:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('10', '66', '13:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('10', '67', '12:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('10', '68', '17:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('10', '69', '18:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('10', '70', '19:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('11', '71', '19:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('11', '72', '18:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('11', '73', '17:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('4', '22', '12:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('4', '23', '13:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('4', '24', '14:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('4', '25', '15:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('4', '26', '16:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('4', '27', '17:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('4', '28', '18:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('5', '29', '07:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('5', '30', '08:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('5', '31', '09:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('5', '32', '10:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('5', '33', '11:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('5', '34', '12:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('5', '35', '13:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('6', '36', '07:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('6', '37', '08:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('6', '38', '09:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('6', '39', '10:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('6', '40', '11:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('6', '41', '12:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('6', '42', '13:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('7', '43', '07:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('7', '44', '08:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('7', '45', '09:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('7', '46', '10:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('7', '47', '11:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('7', '48', '12:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('7', '49', '13:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('8', '50', '13:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('8', '51', '15:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('8', '52', '16:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('3', '15', '14:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('3', '16', '15:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('3', '17', '16:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('3', '18', '17:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('3', '19', '18:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('3', '20', '19:00:00');
INSERT INTO `mahatmagandhi`.`detalle_materia_docente` (`iddocente`, `idmateria`, `horario`) VALUES ('3', '21', '12:00:00');



use bookstartzz;

select * from alumno;

select * from usuario where id = "100000";
SELECT * FROM alumno where id='100000';
SELECT id, nombre FROM usuario WHERE id = 100000;
-- -----------------------------------------------------
-- consultas
-- -----------------------------------------------------


select * from usuario;
select  max(id) as id from usuario; 

-- -----------------------------------------------------
-- CONSULTAS PARA EL ALUMNO
-- -----------------------------------------------------

-- SELECT PARA TRAER LA INFORMACION DE LA MATERIAS QUE CURSA EL USUARIO ALUMNO LOGUIADO
select materia.IdMateria, materia.NombreMateria, materia.Grado, materia.TipoMateria
from materia inner join detalle_grupo_materia on materia.idMateria = detalle_grupo_materia.idmateria where idgrupo="1";

-- SELECT PARA TRAER LA INFORMACION DEl Docente QUE da clases al USUARIO ALUMNO LOGUIADO
select * from docente;
select * from  detalle_docente_grupo;

select * from docente inner join detalle_docente_grupo 
on docente.id = detalle_docente_grupo.iddocente 
where detalle_docente_grupo.idgrupo="1";

--   SEELCT MATERIA, DOCENTE, DETALLES_GRUPO_MATERIA Y DETALLES_GRUPO_DOCENTE     ---------------------------------------------------
select * from docente inner join detalle_docente_grupo 
on docente.id = detalle_docente_grupo.iddocente 
inner join detalle_grupo_materia on detalle_docente_grupo.idgrupo = detalle_grupo_materia.idgrupo
inner join materia on materia.idMateria = detalle_grupo_materia.idmateria 
WHERE detalle_grupo_materia.idgrupo = "1";

-- TRAER EL NOMBRE DE LA MATERIA Y EL NOMBRE DEL DOCENTE -------------------------
select * from detalle_materia_docente;

-- TRAER LAS MATERIAS QUE INPARTE EL DOCENTE
select * from materia;


select usuario.nombre, usuario.apellidoPaterno, usuario.apellidoMaterno, materia.nombreMateria, materia.grado, materia.TipoMateria
from docente inner join usuario on docente.idusuario = usuario.id
inner join detalle_materia_docente on detalle_materia_docente.iddocente = docente.id
inner join materia on detalle_materia_docente.idmateria = materia.idMateria inner join detalle_grupo_materia
on detalle_grupo_materia.idmateria = materia.idMateria 
where detalle_grupo_materia.idgrupo = 1 and d.iddocente = 1;


-- DELETE --------------------------------------------

use mahatmagandhi;
select * from materia;
select * from docente;
select *from usuario;
select * from detalle_materia_docente;


delete from materia where idMateria = 12;

-- editar usuario y alumno a la ves
    update usuario u join alumno a on u.id = a.idusuario
    set u.nombre = 'Hulices', u.apellidoPaterno = 'Garcia', u.apellidoMaterno = 'Vamos', u.correo = 'vamos@gmail.com', 
    u.usuario = 'hulices', u.fechaNacimiento ='1997-12-17', u.sexo= 'Hombre', u.tipo = 'alumno', u.telefono = '1234567546',  
    a.cicloEscolar = '2020-2021', a.grado='primero' , a.curp = 'sisemodifico', a.domicilio = 'mineros #23',
    a.codigoPostal = '39876' , a.Estatus = 'Vigente' , a.idgrupo = "1"
    WHERE u.id = 100079;
select *from grupo;
--  u.nombre, u.apellidoPaterno, u.apellidoMaterno, g.nombre , m.NombreMateria, d.iddocente , c.calificacion , c.bimestre, c.fecha
-- join calificacion c on c.idmateria = m.idMateria 


select d.iddocente, d.idmateria , m.idMateria, m.NombreMateria, dg.idgrupo  from detalle_materia_docente d 
join  materia m on d.idmateria = m.idMateria 
join detalle_docente_grupo dg on d.iddocente = dg.iddocente 
where dg.id = 1;

select dg.id, dg.iddocente , g.idgrupo ,g.nombre from detalle_docente_grupo dg join grupo g on g.idgrupo = dg.idgrupo 
where iddocente = 1;

select * from detalle_materia_docente md join materia m on md.idmateria = m.idMateria
where md.iddocente = 1; 

-- join detalle_docente_grupo d on d.id = g.idgrupo 


select u.nombre, concat(u.apellidoPaterno , " " ,u.apellidoMaterno) as Apellidos , g.nombre as nombreGrupo , m.NombreMateria, md.iddocente, m.idMateria , g.idgrupo , m.Unidades 
from usuario u  join alumno a on u.id = a.idusuario 
join grupo g on a.idgrupo = g.idgrupo 
join detalle_grupo_materia gm on g.idgrupo = gm.idgrupo
join materia m on m.idMateria = gm.idmateria
join detalle_materia_docente md on md.idmateria = m.idMateria
where md.iddocente = 2 and md.idmateria = 14 and g.idgrupo = 7;
 
select * from detalle_grupo_materia;
select * from detalle_materia_docente;
select * from detalle_docente_grupo;
use mahatmagandhi;
select *from docente;
select *from materia;
select * from alumno;
select * from grupo;
select*from usuario;
select *from calificacion where idalumno = 1 and idmateria = 3 and iddocente = 1 order by bimestre asc;
select * from calificacion c join materia m on c.idmateria = m.idMateria where c.idalumno = 1 and c.idMateria = 8;





