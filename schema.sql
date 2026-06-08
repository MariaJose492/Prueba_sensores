DROP TABLE IF EXISTS monitorings CASCADE;
DROP TABLE IF EXISTS zones CASCADE;
DROP TABLE IF EXISTS sensors CASCADE;

-- # Creación de la tabla de sensores
CREATE TABLE sensors (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL
    CHECK (
        tipo IN (
            'temperatura',
            'presion',
            'vibracion',
            'flujo'
        )
    ),
    fabricante VARCHAR(100) NOT NULL,
    fecha_fabricacion DATE NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo'
);


-- # Creación de la tabla de zonas
CREATE TABLE zones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(150) NOT NULL,
    estado_operativo VARCHAR(20) NOT NULL
    CHECK (
        estado_operativo IN (
            'operativa',
            'mantenimiento',
            'fuera_servicio'
        )
    )
);

-- # Creación de la tabla de monitoreos
CREATE TABLE monitorings (
    id SERIAL PRIMARY KEY,
    sensor_id INTEGER NOT NULL,
    zona_id INTEGER NOT NULL,
    fecha_instalacion DATE NOT NULL,
    tipo_lectura VARCHAR(20) NOT NULL
    CHECK (
        tipo_lectura IN (
            'temperatura',
            'presion',
            'vibracion',
            'flujo'
        )
    ),

    valor_umbral DECIMAL(10,2) NOT NULL CHECK (valor_umbral > 0),
    estado_monitoreo VARCHAR(20) NOT NULL DEFAULT 'activo' CHECK (
        estado_monitoreo IN ('activo','pausado')
    ),

    CONSTRAINT fk_monitoring_sensor
        FOREIGN KEY (sensor_id)
        REFERENCES sensors(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_monitoring_zone
        FOREIGN KEY (zona_id)
        REFERENCES zones(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_sensor_zone
        UNIQUE(sensor_id, zona_id)
);


-- # DATOS DE PRUEBA

-- # Sensores
INSERT INTO sensors
(nombre, tipo, fabricante, fecha_fabricacion, estado)
VALUES
('TMP-001','temperatura','Siemens','2024-01-15', 'activo'),
('TMP-002','temperatura','ABB','2024-02-10', 'activo'),
('PRE-001','presion','Emerson','2023-11-20', 'activo'),
('PRE-002','presion','Honeywell','2024-03-05', 'activo'),
('VIB-001','vibracion','Bosch','2024-01-25', 'activo'),
('VIB-002','vibracion','ABB','2024-02-18', 'activo'),
('FLU-001','flujo','Siemens','2024-01-30', 'pausado'),
('FLU-002','flujo','Honeywell','2024-04-01', 'pausado'),
('TMP-003','temperatura','Bosch','2024-03-10','activo'),
('TMP-004','temperatura','Honeywell','2024-03-22','activo'),
('TMP-005','temperatura','Emerson','2024-04-02','pausado'),
('PRE-003','presion','Siemens','2024-01-11','activo'),
('PRE-004','presion','ABB','2024-02-09','activo'),
('PRE-005','presion','Bosch','2024-03-19','inactivo'),
('VIB-003','vibracion','Honeywell','2024-02-14','activo'),
('VIB-004','vibracion','Siemens','2024-04-06','pausado'),
('VIB-005','vibracion','Emerson','2024-04-18','activo'),
('FLU-003','flujo','ABB','2024-03-01','activo'),
('FLU-004','flujo','Bosch','2024-03-28','activo'),
('FLU-005','flujo','Emerson','2024-04-25','inactivo');

-- # Zonas
INSERT INTO zones
(nombre, descripcion, ubicacion, estado_operativo)
VALUES
('Calderas', 'Zona de control de calderas','Bloque A','operativa'),
('Bombas','Sistema de bombeo principal','Bloque B','operativa'),
('Tanques','Almacenamiento de liquidos','Bloque C','mantenimiento'),
('Produccion A','Linea de produccion A','Bloque D','operativa'),
('Produccion B','Linea de produccion secundaria','Bloque E','operativa'),
('Compresores','Sistema de compresores industriales','Bloque F','operativa'),
('Enfriamiento','Zona de enfriamiento de maquinaria','Bloque G','mantenimiento'),
('Empaque','Area de empaque y distribucion','Bloque H','operativa'),
('Laboratorio','Zona de pruebas industriales','Bloque I','operativa'),
('Residuos','Gestion de residuos industriales','Bloque J','fuera_servicio');


-- # Monitoreos
INSERT INTO monitorings
(sensor_id,zona_id,fecha_instalacion,tipo_lectura,valor_umbral,estado_monitoreo)
VALUES
(1,1,'2025-01-10','temperatura',80,'activo'),
(2,2,'2025-01-12','temperatura',75,'activo'),
(3,1,'2025-01-15','presion',120,'activo'),
(4,3,'2025-01-20','presion',150,'pausado'),
(5,4,'2025-02-01','vibracion',20,'activo'),
(6,2,'2025-02-05','vibracion',25,'activo'),
(7,3,'2025-02-10','flujo',300,'activo'),
(8,4,'2025-02-12','flujo',280,'activo'),
(1,2,'2025-02-15','temperatura',85,'activo'),
(3,4,'2025-02-18','presion',110,'activo'),
(9,5,'2025-03-01','temperatura',78,'activo'),
(10,6,'2025-03-03','temperatura',82,'activo'),
(11,7,'2025-03-05','temperatura',90,'pausado'),
(12,5,'2025-03-07','presion',130,'activo'),
(13,6,'2025-03-10','presion',145,'activo'),
(14,8,'2025-03-12','presion',160,'pausado'),
(15,7,'2025-03-15','vibracion',18,'activo'),
(16,8,'2025-03-18','vibracion',22,'pausado'),
(17,9,'2025-03-20','vibracion',26,'activo'),
(18,5,'2025-03-22','flujo',320,'activo'),
(19,6,'2025-03-24','flujo',340,'activo'),
(20,10,'2025-03-28','flujo',360,'pausado'),
(2,5,'2025-04-01','temperatura',74,'activo'),
(4,6,'2025-04-02','presion',125,'activo'),
(6,7,'2025-04-04','vibracion',21,'activo'),
(8,8,'2025-04-06','flujo',295,'activo'),
(10,9,'2025-04-08','temperatura',88,'activo'),
(12,10,'2025-04-10','presion',170,'pausado'),
(15,5,'2025-04-12','vibracion',19,'activo'),
(18,6,'2025-04-15','flujo',310,'activo');