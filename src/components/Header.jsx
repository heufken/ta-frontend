export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      {/* Judul atau logo */}
      <div className="text-xl font-semibold text-gray-800">Dashboard</div>
      <div className="flex items-center gap-x-4">
        {/* Icon setting */}
        {/* <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.34a1 1 0 0 0 .26-1.09l-1-1.73a1 1 0 0 1 .21-1.23l1.52-1.52a1 1 0 0 0 0-1.41l-2.12-2.12a1 1 0 0 0-1.41 0l-1.52 1.52a1 1 0 0 1-1.23.21l-1.73-1a1 1 0 0 0-1.09.26l-1.06 1.06a1 1 0 0 0-.26 1.09l1 1.73a1 1 0 0 1-.21 1.23l-1.52 1.52a1 1 0 0 0 0 1.41l2.12 2.12a1 1 0 0 0 1.41 0l1.52-1.52a1 1 0 0 1 1.23-.21l1.73 1a1 1 0 0 0 1.09-.26l1.06-1.06z" />
          </svg>
        </button> */}
        {/* User info */}
        {/* <div className="flex items-center gap-x-2 bg-gray-100 px-3 py-1 rounded-full">
          <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20c0-2.21 3.58-4 6-4s6 1.79 6 4" />
          </svg>
          <span className="font-medium text-gray-700">Superadmin</span>
        </div> */}
      </div>
    </header>
  );
} 