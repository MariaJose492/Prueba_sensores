import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SensorsPage from "./pages/SensorsPage";
import ZoneDetailPage from "./pages/ZoneDetailPage";
import MonitoringUpdatePage from "./pages/MonitoringUpdatePage";
import CreateMonitoringPage from "./pages/CreateMonitoringPage";
import MonitoringListPage from "./pages/MonitoringListPage";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/sensors"
        element={<SensorsPage />}
      />

      <Route
        path="/zones/:id"
        element={<ZoneDetailPage />}
      />

      <Route
        path="/monitorings/update"
        element={<MonitoringUpdatePage />}
      />
      <Route
        path="/monitorings"
        element={<MonitoringListPage />}
      />
      <Route
        path="/monitorings/create"
        element={<CreateMonitoringPage />}
      />

    </Routes>

  );

}

export default App;