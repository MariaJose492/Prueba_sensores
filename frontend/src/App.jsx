import { useEffect } from "react";
import { getZones } from "./services/zoneService";

function App() {

  useEffect(() => {

    const fetchZones = async () => {

      try {

        const data = await getZones();

        console.log("Zonas:", data);

      } catch (error) {

        console.error("Error conectando con backend:", error);

      }

    };

    fetchZones();

  }, []);

  return (
    <div>
      <h1>Frontend funcionando</h1>
    </div>
  );
}

export default App;