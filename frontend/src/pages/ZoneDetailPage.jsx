import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSensorsByZone } from "../services/monitoringService";

function ZoneDetailPage() {

    const { id } = useParams();
    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchSensors = async () => {

            try {
                const data = await getSensorsByZone(id);
                setSensors(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

        };

        fetchSensors();

    }, [id]);

    if (loading) {
        return <h2>Cargando sensores...</h2>;
    }

    return (
        <div className="container">
            <h1>Detalle Zona</h1>
            <div className="sensor-list">
                {sensors.map((sensor) => (
                    <div
                        key={sensor.monitoring_id}
                        className={`sensor-card ${sensor.supera_umbral ? "alert" : ""}`}>
                        <h2>{sensor.sensor_nombre}</h2>
                        <p><strong>Tipo:</strong> {sensor.sensor_tipo}</p>
                        <p><strong>Lectura:</strong> {sensor.tipo_lectura}</p>
                        <p><strong>Umbral:</strong> {sensor.valor_umbral}</p>
                        <p><strong>Valor actual:</strong> {sensor.valor_actual}</p>
                        <p><strong>Estado:</strong>{" "}{sensor.estado_monitoreo}</p> </div>

                ))}
            </div>
        </div>
    );
}

export default ZoneDetailPage;