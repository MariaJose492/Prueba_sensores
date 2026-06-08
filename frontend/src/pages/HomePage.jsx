import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getZones } from "../services/zoneService";
import ZoneCard from "../components/ZoneCard";
import MonitoringForm from "../components/MonitoringForm";

function HomePage() {

    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchZones = async () => {

        try {
            const data = await getZones();
            setZones(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchZones();
    }, []);

    if (loading) {
        return <h2>Cargando zonas...</h2>;
    }

    return (
        <div className="container">
            <h1>Monitoreo Industrial</h1>
            <div className="zones-grid">
                {zones.map((zone) => (
                    <ZoneCard
                        key={zone.id}
                        zone={zone}
                    />
                ))}
            </div>

            <div className="navigation-buttons">
                <Link to="/monitorings">
                    <button>
                        Ver monitoreos
                    </button>
                </Link>

                <Link to="/sensors">
                    <button>
                        Ver todos los sensores
                    </button>
                </Link>

                <Link to="/monitorings/create">
                    <button>
                        Asignar monitoreo
                    </button>
                </Link>

                <Link to="/monitorings/update">
                    <button>
                        Actualizar monitoreo
                    </button>
                </Link>
            </div>
        </div>

    );

}

export default HomePage;