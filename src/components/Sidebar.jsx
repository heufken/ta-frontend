import { NavLink } from "react-router-dom";
import { useEffect } from "react";
// import { useTheme } from '../contexts/ThemeContext'; // Keep the import for now

export default function Sidebar() {
  // const { theme } = useTheme(); // Remove useTheme hook

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, []);

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col items-center py-6">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2">
          {/* Avatar Placeholder */}
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="font-semibold text-gray-800">Nama User</div>
        <div className="text-xs text-gray-500">Jabatan</div>
      </div>

      <nav className="w-full flex-1 hs-accordion-group">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li className="px-2 lg:px-5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                "flex items-center gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                (isActive ? "bg-gray-100 text-blue-600" : "")
              }
            >
              {/* icon */}
              <svg
                className="shrink-0 mt-0.5 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Dashboard
            </NavLink>
          </li>

          {/* List Surat Masuk */}
          <li className="px-2 lg:px-5">
            <NavLink
              to="/dashboard/surat-masuk"
              className={({ isActive }) =>
                "flex items-center gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                (isActive ? "bg-gray-100 text-blue-600" : "")
              }
            >
              {/* icon */}
              <svg className="shrink-0 mt-0.5 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M3 7l3-4h12l3 4" />
              </svg>
              DUMMY List Surat Masuk
            </NavLink>
          </li>

          {/* Form Surat Keluar */}
          <li className="px-2 lg:px-5">
            <NavLink
              to="/dashboard/form-surat-keluar"
              className={({ isActive }) =>
                "flex items-center gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                (isActive ? "bg-gray-100 text-blue-600" : "")
              }
            >
              {/* icon */}
              <svg className="shrink-0 mt-0.5 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m7-7H5" />
              </svg>
              DUMMY Form Surat Keluar
            </NavLink>
          </li>

          {/* Buku Agenda Dropdown (Accordion) */}
          <li className="hs-accordion px-2 lg:px-5" id="arsip-surat-accordion">
            <button
              className="hs-accordion-toggle flex items-center gap-x-3 py-2 px-3 w-full text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden text-gray-800 hover:text-blue-600 focus:text-blue-600"
              aria-controls="arsip-surat-collapse"
              data-hs-accordion-toggle="#arsip-surat-collapse"
            >
              {/* Icon */}
              <svg
                className="shrink-0 mt-0.5 size-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M3 7l3-4h12l3 4" />
              </svg>
              Arsip Surat
              <svg
                className="hs-accordion-active:-rotate-180 shrink-0 mt-1 size-3.5 ms-auto transition"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              id="arsip-surat-collapse"
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="arsip-surat-accordion"
            >
              <ul className="flex flex-col gap-y-1 mt-1">
                <li>
                  <NavLink
                    to="/dashboard/semua-dokumen"
                    className={({ isActive }) =>
                      "flex gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                      (isActive ? "bg-gray-100 text-blue-600" : "")
                    }
                  >
                    Semua Dokumen
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/surat-masuk"
                    className={({ isActive }) =>
                      "flex gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                      (isActive ? "bg-gray-100 text-blue-600" : "")
                    }
                  >
                    Surat Masuk
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/surat-keluar"
                    className={({ isActive }) =>
                      "flex gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                      (isActive ? "bg-gray-100 text-blue-600" : "")
                    }
                  >
                    Surat Keluar
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          {/* Buku Agenda Dropdown (Accordion) */}
          <li className="hs-accordion px-2 lg:px-5" id="buku-agenda-accordion">
            <button
              className="hs-accordion-toggle flex items-center gap-x-3 py-2 px-3 w-full text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden text-gray-800 hover:text-blue-600 focus:text-blue-600"
              aria-controls="buku-agenda-collapse"
              data-hs-accordion-toggle="#buku-agenda-collapse"
            >
              {/* Icon */}
              <svg
                className="shrink-0 mt-0.5 size-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4H20v13M4 19.5V21a1 1 0 0 0 1 1h15"
                />
              </svg>
              Buku Agenda
              <svg
                className="hs-accordion-active:-rotate-180 shrink-0 mt-1 size-3.5 ms-auto transition"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              id="buku-agenda-collapse"
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="buku-agenda-accordion"
            >
              <ul className="flex flex-col gap-y-1 mt-1">
                <li>
                  <NavLink
                    to="/dashboard/semua-dokumen"
                    className={({ isActive }) =>
                      "flex gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                      (isActive ? "bg-gray-100 text-blue-600" : "")
                    }
                  >
                    Semua Dokumen
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/surat-masuk"
                    className={({ isActive }) =>
                      "flex gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                      (isActive ? "bg-gray-100 text-blue-600" : "")
                    }
                  >
                    Surat Masuk
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/surat-keluar"
                    className={({ isActive }) =>
                      "flex gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                      (isActive ? "bg-gray-100 text-blue-600" : "")
                    }
                  >
                    Surat Keluar
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          {/* Pengaturan */}
          <li className="px-2 lg:px-5">
            <NavLink
              to="/dashboard/pengaturan"
              className={({ isActive }) =>
                "flex items-center gap-x-3 py-2 px-3 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none px-3 hover:bg-gray-100 focus:outline-hidden text-gray-800 hover:text-blue-600 focus:text-blue-600 " +
                (isActive ? "bg-gray-100 text-blue-600" : "")
              }
            >
              {/* icon */}
              <svg
                className="shrink-0 mt-0.5 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-2-9a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
                <path d="M17.8 18c-.5-.8-1.6-1.4-2.8-1.7-.6-.1-1.2-.2-1.8-.3H11c-.6 0-1.2.1-1.8.3-1.2.3-2.3.9-2.8 1.7" />
              </svg>
              Pengaturan
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
