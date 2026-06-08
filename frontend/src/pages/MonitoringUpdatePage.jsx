import { useState } from "react";
import { updateMonitoring } from "../services/monitoringService";

function MonitoringUpdatePage() {

    const [monitoringId, setMonitoringId] = useState("");
    const [estado, setEstado] = useState("");
    const [valorUmbral, setValorUmbral] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {};

            if (estado) {

                payload.estado_monitoreo = estado;

            }

            if (valorUmbral) {

                payload.valor_umbral = Number(valorUmbral);

            }

            await updateMonitoring(

                monitoringId,
                payload
            );

            setIsError(false);

            setMessage(
                "Monitoreo actualizado correctamente"
            );

        } catch (error) {

            setIsError(true);

            if (error.response?.data?.detail) {

                setMessage(
                    error.response.data.detail
                );

            } else {

                setMessage(
                    "Error actualizando monitoreo"
                );

            }

        }

    };

    return (

        <div className="container">
            <h1>Actualizar Monitoreo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="ID monitoreo"
                    value={monitoringId}
                    onChange={(e) =>
                        setMonitoringId(e.target.value)
                    }
                    required
                />

                <select
                    value={estado}
                    onChange={(e) =>
                        setEstado(e.target.value)
                    }
                >

                    <option value="">Cambiar estado</option>
                    <option value="activo">Activo</option>
                    <option value="pausado">Pausado</option>

                </select>

                <input
                    type="number"
                    placeholder="Nuevo umbral"
                    value={valorUmbral}
                    onChange={(e) =>
                        setValorUmbral(e.target.value)
                    }
                />

                <button type="submit">Actualizar</button>

            </form>

            {message && (

                <p className={
                    isError
                        ? "error-message"
                        : "success-message"
                }>

                    {message}

                </p>

            )}

        </div>

    );

}

export default MonitoringUpdatePage;