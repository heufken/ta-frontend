import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Login from "./pages/Login";
import FormSuratKeluar from "./pages/FormSuratKeluar";
import ListSuratMasuk from "./pages/ListSuratMasuk";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Inisialisasi Preline setiap render
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="surat-masuk" element={<ListSuratMasuk />} />
          <Route path="form-surat-keluar" element={<FormSuratKeluar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
