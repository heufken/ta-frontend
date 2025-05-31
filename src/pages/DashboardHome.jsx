export default function DashboardHome() {
  return (
    <>
      {/* Statistik Cards */}
      <div className="overflow-x-auto w-full">
        <div className="flex gap-4 w-full">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-xl  p-5 flex flex-col justify-between h-32 min-w-[16rem] max-w-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">114</span>
                <span className="ml-auto">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
              </div>
              <div className="text-gray-600 text-left">Total Dokumen</div>
            </div>
            <button className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline mt-2">
              Lihat Selengkapnya{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-xl  p-5 flex flex-col justify-between h-32 min-w-[16rem] max-w-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">48</span>
                <span className="ml-auto">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </span>
              </div>
              <div className="text-gray-600 text-left">Surat Masuk</div>
            </div>
            <button className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline mt-2">
              Lihat Selengkapnya{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-xl  p-5 flex flex-col justify-between h-32 min-w-[16rem] max-w-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">66</span>
                <span className="ml-auto">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 8v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" />
                    <polyline points="16 2 12 6 8 2" />
                  </svg>
                </span>
              </div>
              <div className="text-gray-600 text-left">Surat Keluar</div>
            </div>
            <button className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline mt-2">
              Lihat Selengkapnya{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Card 4 */}
          <div className="bg-white border border-gray-200 rounded-xl  p-5 flex flex-col justify-between h-32 min-w-[16rem] max-w-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">6</span>
                <span className="ml-auto">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="7" r="4" />
                    <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
                  </svg>
                </span>
              </div>
              <div className="text-gray-600 text-left">Pengguna</div>
            </div>
            <button className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline mt-2">
              Lihat Selengkapnya{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Statistik dan Kategori Surat Keluar */}
      <div className="flex gap-4 w-full">
        {/* Statistik */}
        <div className="bg-white border border-gray-200 rounded-xl  p-5 flex flex-col w-3/4 h-80 flex-shrink-0">
          <div className="font-semibold mb-2">Statistik</div>
          <div className="flex-1 flex items-center justify-center text-gray-400">
            {/* Placeholder grafik */}
            <span className="text-sm">
              [Grafik Statistik Surat Masuk & Keluar]
            </span>
          </div>
        </div>
        {/* Kategori Surat Keluar */}
        <div className="bg-white border border-gray-200 rounded-xl  p-5 flex flex-col w-80 h-80 flex-shrink-0">
          <div className="font-semibold mb-2">Kategori Surat Keluar</div>
          <div className="flex-1 flex items-center justify-center text-gray-400">
            {/* Placeholder pie chart */}
            <span className="text-sm">[Pie Chart Kategori Surat Keluar]</span>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="bg-white border border-gray-200 rounded-xl  p-5 w-full">
        <div className="font-semibold mb-4">Quick Menu</div>
        <div className="flex gap-4 w-full">
          {/* Card 1 */}
          <div className="border-opacity-80 rounded-lg p-4 flex items-center gap-4 bg-gray-50 flex-1 min-w-[16rem] max-w-xs">
            <div className="flex-1">
              <div className="font-medium">Backup Database</div>
              <div className="text-sm text-gray-500">
                Ekspor dan download database
              </div>
            </div>
            <div className="text-gray-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <ellipse cx="12" cy="7" rx="8" ry="3" />
                <path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" />
                <path d="M4 17c0 1.7 3.6 3 8 3s8-1.3 8-3" />
              </svg>
            </div>
          </div>
          {/* Card 2 */}
          <div className="border-opacity-80 rounded-lg p-4 flex items-center gap-4 bg-gray-50 flex-1 min-w-[16rem] max-w-xs">
            <div className="flex-1">
              <div className="font-medium">Backup Dokumen</div>
              <div className="text-sm text-gray-500">
                Download semua file dokumen
              </div>
            </div>
            <div className="text-gray-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 5v14m7-7H5" />
              </svg>
            </div>
          </div>
          {/* Card 3 */}
          <div className="border-opacity-80 rounded-lg p-4 flex items-center gap-4 bg-gray-50 flex-1 min-w-[16rem] max-w-xs">
            <div className="flex-1">
              <div className="font-medium">Pengguna</div>
              <div className="text-sm text-gray-500">Kelola data pengguna</div>
            </div>
            <div className="text-gray-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
