import { Link } from "react-router-dom";

function ZoneCard({ zone }) {

    return (

        <Link
            to={`/zones/${zone.id}`}
            className="zone-card"
        >

            <h2>{zone.nombre}</h2>

            <p>
                <strong>Descripción:</strong> {zone.descripcion}
            </p>

            <p>
                <strong>Ubicación:</strong> {zone.ubicacion}
            </p>

            <p>
                <strong>Estado:</strong> {zone.estado_operativo}
            </p>
            <p>
                <strong>Sensores activos:</strong> {zone.sensores_activos}
            </p>

        </Link>

    );

}

export default ZoneCard;