import { Routes, Route } from "react-router-dom";

import ZonesPage from "./pages/ZonesPage";
import ZoneDetailPage from "./pages/ZoneDetailPage";

function App() {

  return (

    <Routes>

      <Route path="/" element={<ZonesPage />} />

      <Route path="/zones/:id" element={<ZoneDetailPage />} />

    </Routes>

  );

}

export default App;