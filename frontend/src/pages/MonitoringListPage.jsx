import { useEffect, useState } from "react";
import { getMonitorings } from "../services/monitoringService";

function MonitoringListPage() {

    const [monitorings, setMonitorings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchMonitorings = async () => {

            try {
                const data = await getMonitorings();
                setMonitorings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

        };

        fetchMonitorings();

    }, []);

    if (loading) {
        return <h2>Cargando monitoreos...</h2>;
    }

    return (
        <div className="container">
            <h1>Monitoreos</h1>

            <div className="sensor-list">
                {monitorings.map((monitoring) => (
                    <div
                        key={monitoring.id}
                        className="sensor-card"
                    >
                        <h3>Monitoreo #{monitoring.id}</h3>
                        <p><strong>Sensor:</strong> {monitoring.sensor_id}</p>
                        <p><strong>Zona:</strong> {monitoring.zona_id}</p>
                        <p><strong>Fecha:</strong> {monitoring.fecha_instalacion}</p>
                        <p><strong>Lectura:</strong> {monitoring.tipo_lectura}</p>
                        <p><strong>Umbral:</strong> {monitoring.valor_umbral}</p>
                        <p><strong>Estado:</strong> {monitoring.estado_monitoreo}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default MonitoringListPage;