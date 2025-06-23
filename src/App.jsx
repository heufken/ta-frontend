import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Login from "./pages/Login";
import FormSuratKeluar from "./pages/FormSuratKeluar";
import FormSuratMasuk from "./pages/FormSuratMasuk";
import ListSuratMasuk from "./pages/ListSuratMasuk";
import ListSuratKeluar from "./pages/ListSuratKeluar";
import ListSemuaDokumen from "./pages/ListSemuaDokumen";
import Kategori from "./pages/Kategori";
import Pengguna from "./pages/Pengguna";
import Disposisi from "./pages/Disposisi";

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
          <Route path="kategori" element={<Kategori />} />
          <Route path="pengguna" element={<Pengguna />} />
          <Route path="disposisi" element={<Disposisi />} />
          <Route path="surat-masuk" element={<ListSuratMasuk />} />
          <Route path="surat-keluar" element={<ListSuratKeluar />} />
          <Route path="form-surat-keluar" element={<FormSuratKeluar />} />
          <Route path="form-surat-masuk" element={<FormSuratMasuk />} />
          <Route path="semua-dokumen" element={<ListSemuaDokumen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
