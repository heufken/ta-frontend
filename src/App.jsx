import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
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
import ViewSuratMasuk from './pages/ViewSuratMasuk';
import ViewSuratKeluar from './pages/ViewSuratKeluar';
import EditSuratKeluar from './pages/EditSuratKeluar';
import { Toaster } from 'react-hot-toast';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null; // atau spinner
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Inisialisasi Preline setiap render
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  });

  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="kategori" element={<Kategori />} />
              <Route path="pengguna" element={<Pengguna />} />
              <Route path="disposisi" element={<Disposisi />} />
              <Route path="surat-masuk" element={<ListSuratMasuk />} />
              <Route path="surat-keluar" element={<ListSuratKeluar />} />
              <Route path="form-surat-keluar" element={<FormSuratKeluar />} />
              <Route path="form-surat-masuk" element={<FormSuratMasuk />} />
              <Route path="semua-dokumen" element={<ListSemuaDokumen />} />
              <Route path="view-surat/:id" element={<ViewSuratMasuk />} />
              <Route path="view-surat-keluar/:id" element={<ViewSuratKeluar />} />
              <Route path="edit-surat-keluar/:id" element={<EditSuratKeluar />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
