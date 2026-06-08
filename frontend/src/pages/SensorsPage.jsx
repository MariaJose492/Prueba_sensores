import { useEffect, useState } from "react";
import { getSensors } from "../services/sensorService";

function SensorsPage() {

    const [sensors, setSensors] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {

        const fetchSensors = async () => {

            try {

                const data = await getSensors();
                setSensors(data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchSensors();

    }, []);

    const filteredSensors = sensors.filter((sensor) => {

        if (filter === "all") return true;
        return sensor.estado.toLowerCase() === filter;

    });

    return (

        <div className="container">

            <h1>Listado de Sensores</h1>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="all"> Todos</option>
                <option value="activo">Activos</option>
                <option value="pausado">Pausados</option>
                <option value="inactivo">Inactivos</option>
            </select>

            <div className="zones-grid">

                {filteredSensors.map((sensor) => (

                    <div
                        key={sensor.id}
                        className={`card sensor-card ${sensor.estado.toLowerCase()}`}
                    >

                        <h3>{sensor.nombre}</h3>

                        <p><strong>Tipo:</strong> {sensor.tipo}</p>
                        <p><strong>Fabricante:</strong> {sensor.fabricante}</p>
                        <p><strong>Estado:</strong> {sensor.estado}</p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default SensorsPage;