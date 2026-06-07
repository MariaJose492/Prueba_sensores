DROP TABLE IF EXISTS monitorings CASCADE;
DROP TABLE IF EXISTS zones CASCADE;
DROP TABLE IF EXISTS sensors CASCADE;

# Creación de la tabla de sensores
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
    fecha_fabricacion DATE NOT NULL
);


# Creación de la tabla de zonas
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

# Creación de la tabla de monitoreos
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


# DATOS DE PRUEBA

# Sensores
INSERT INTO sensors
(nombre, tipo, fabricante, fecha_fabricacion)
VALUES
('TMP-001','temperatura','Siemens','2024-01-15'),
('TMP-002','temperatura','ABB','2024-02-10'),
('PRE-001','presion','Emerson','2023-11-20'),
('PRE-002','presion','Honeywell','2024-03-05'),
('VIB-001','vibracion','Bosch','2024-01-25'),
('VIB-002','vibracion','ABB','2024-02-18'),
('FLU-001','flujo','Siemens','2024-01-30'),
('FLU-002','flujo','Honeywell','2024-04-01');

# Zonas
INSERT INTO zones
(nombre, descripcion, ubicacion, estado_operativo)
VALUES
('Calderas', 'Zona de control de calderas','Bloque A','operativa'),
('Bombas','Sistema de bombeo principal','Bloque B','operativa'),
('Tanques','Almacenamiento de liquidos','Bloque C','mantenimiento'),
('Produccion A','Linea de produccion A','Bloque D','operativa');

# Monitoreos
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
(3,4,'2025-02-18','presion',110,'activo');