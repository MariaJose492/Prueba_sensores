import { useEffect, useState } from "react";

import { getZones } from "../services/zoneService";

import ZoneCard from "../components/ZoneCard";

function ZonesPage() {

    const [zones, setZones] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchZones = async () => {

            try {

                const data = await getZones();
                console.log(data);

                setZones(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchZones();

    }, []);

    if (loading) {

        return <h2>Cargando zonas...</h2>;

    }

    return (

        <div className="container">

            <h1>Zonas de Monitoreo Industrial</h1>

            <div className="zones-grid">

                {zones.map((zone) => (

                    <ZoneCard
                        key={zone.id}
                        zone={zone}
                    />

                ))}

            </div>

        </div>

    );

}

export default ZonesPage;