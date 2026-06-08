import { useEffect, useState } from "react";

import { getSensors } from "../services/sensorService";
import { getZones } from "../services/zoneService";
import { createMonitoring } from "../services/monitoringService";

function MonitoringForm() {

    const [sensors, setSensors] = useState([]);

    const [zones, setZones] = useState([]);

    const [message, setMessage] = useState("");

    const [isError, setIsError] = useState(false);

    const [formData, setFormData] = useState({

        sensor_id: "",
        zona_id: "",
        fecha_instalacion: "",
        tipo_lectura: "",
        valor_umbral: ""

    });

    useEffect(() => {

        const fetchData = async () => {

            try {

                const sensorsData = await getSensors();

                const zonesData = await getZones();

                setSensors(sensorsData);

                setZones(zonesData);

            } catch (error) {

                console.error(error);

            }

        };

        fetchData();

    }, []);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createMonitoring({

                ...formData,

                sensor_id: Number(formData.sensor_id),

                zona_id: Number(formData.zona_id),

                valor_umbral: Number(formData.valor_umbral)

            });

            setIsError(false);

            setMessage("Monitoreo creado correctamente");

            setFormData({

                sensor_id: "",
                zona_id: "",
                fecha_instalacion: "",
                tipo_lectura: "",
                valor_umbral: ""

            });

        } catch (error) {

            console.error(error.response?.data);

            setIsError(true);

            if (error.response?.data?.detail) {

                setMessage(error.response.data.detail);

            } else {

                setMessage(
                    "Ocurrió un error inesperado al crear el monitoreo"
                );

            }

        }

    };

    return (

        <div className="form-container">

            <h2>Asignar Sensor a Zona</h2>

            <form onSubmit={handleSubmit}>

                <select
                    name="sensor_id"
                    value={formData.sensor_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Selecciona un sensor
                    </option>

                    {sensors.map((sensor) => (

                        <option
                            key={sensor.id}
                            value={sensor.id}
                        >

                            {sensor.nombre}

                        </option>

                    ))}

                </select>

                <select
                    name="zona_id"
                    value={formData.zona_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Selecciona una zona
                    </option>

                    {zones.map((zone) => (

                        <option
                            key={zone.id}
                            value={zone.id}
                        >

                            {zone.nombre}

                        </option>

                    ))}

                </select>

                <input
                    type="date"
                    name="fecha_instalacion"
                    value={formData.fecha_instalacion}
                    onChange={handleChange}
                    required
                />

                <select
                    name="tipo_lectura"
                    value={formData.tipo_lectura}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Tipo de lectura
                    </option>

                    <option value="temperatura">
                        Temperatura
                    </option>

                    <option value="presion">
                        Presión
                    </option>

                    <option value="vibracion">
                        Vibración
                    </option>

                    <option value="flujo">
                        Flujo
                    </option>

                </select>

                <input
                    type="number"
                    name="valor_umbral"
                    placeholder="Valor umbral"
                    value={formData.valor_umbral}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    Crear monitoreo

                </button>

            </form>

            {message && (

                <p className={isError ? "error-message" : "success-message"}>

                    {message}

                </p>

            )}

        </div>

    );

}

export default MonitoringForm;