import { useState } from 'react';

const initialCategories = [
  'Undangan',
  'Surat Keputusan',
  'Dispensasi',
  'Permohonan',
  'Mandat',
];

export default function Kategori() {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Data Kategori</h2>
      <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4 font-semibold transition">
        Tambah Kategori
        <span className="text-lg">+</span>
      </button>
      <div className="border rounded-lg divide-y">
        {categories.map((cat, idx) => (
          <div key={cat} className="flex items-center px-4 py-3 hover:bg-gray-50">
            <span className="mr-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h3.28a2 2 0 011.7.89l.94 1.42A2 2 0 0013.28 8H19a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
            </span>
            <span className="flex-1 text-gray-800 font-medium">{cat}</span>
            <button className="p-2 hover:bg-gray-100 rounded" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z" /></svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded" title="Hapus">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

