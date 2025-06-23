import { useState } from 'react';

const dummyUsers = [
  { nama: 'Jane Doe', noAnggota: '00.11.44.6543', role: 'Superadmin', status: true },
  { nama: 'Jane Doe', noAnggota: '00.11.44.6543', role: 'Admin', status: true },
  { nama: 'Jane Doe', noAnggota: '00.11.44.6543', role: 'Admin', status: true },
  { nama: 'Jane Doe', noAnggota: '00.11.44.6543', role: 'User', status: true },
  { nama: 'Jane Doe', noAnggota: '00.11.44.6543', role: 'User', status: true },
];

export default function Pengguna() {
  const [users] = useState(dummyUsers);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow max-w-5xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Data Pengguna</h2>
      <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4 font-semibold transition border border-gray-400">
        Tambah Pengguna
        <span className="text-lg font-bold">+</span>
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-300">Nama</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-300">No. Anggota</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-300">Role</th>
              <th className="px-4 py-2 text-center font-semibold text-gray-700 border-b border-gray-300">Status</th>
              <th className="px-4 py-2 text-center font-semibold text-gray-700 border-b border-gray-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center gap-2">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </span>
                  {user.nama}
                </td>
                <td className="px-4 py-2">{user.noAnggota}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 text-center">
                  {user.status && (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-center flex items-center justify-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded" title="Lihat">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z" /></svg>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded" title="Hapus">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
