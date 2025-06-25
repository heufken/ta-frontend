import { useState } from 'react';

const dummyDisposisi = [
  { status: 'Terkonfirmasi', tipe: 'Surat Masuk', tgl: '17/06/2023', pengirim: 'Groove street', isi: 'Lorem ipsum' },
  { status: 'Terkonfirmasi', tipe: 'Surat Masuk', tgl: '17/06/2023', pengirim: 'Groove street', isi: 'Lorem ipsum' },
  { status: 'Menunggu', tipe: 'Surat Masuk', tgl: '17/06/2023', pengirim: 'Groove street', isi: 'Lorem ipsum' },
  { status: 'Menunggu', tipe: 'Surat Masuk', tgl: '17/06/2023', pengirim: 'Groove street', isi: 'Lorem ipsum' },
  { status: 'Menunggu', tipe: 'Surat Masuk', tgl: '17/06/2023', pengirim: 'Groove street', isi: 'Lorem ipsum' },
  { status: 'Menunggu', tipe: 'Surat Masuk', tgl: '17/06/2023', pengirim: 'Groove street', isi: 'Lorem ipsum' },
  { status: 'Menunggu', tipe: 'Surat Masuk', tgl: '17/06/2023', pengirim: 'Groove street', isi: 'Lorem ipsum' },
];

export default function Disposisi() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 7;

  const filtered = dummyDisposisi.filter(d =>
    (!filter || d.status === filter) &&
    (!search || d.pengirim.toLowerCase().includes(search.toLowerCase()) || d.isi.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPage = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page-1)*perPage, page*perPage);

  const countTerkonfirmasi = dummyDisposisi.filter(d => d.status === 'Terkonfirmasi').length;
  const countMenunggu = dummyDisposisi.filter(d => d.status === 'Menunggu').length;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow max-w-6xl mx-auto mt-8">
      <div className="flex gap-6 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-lg p-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white text-2xl">
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg>
          </span>
          <div>
            <div className="font-semibold text-gray-700">Terkonfirmasi</div>
            <div className="text-2xl font-bold">{countTerkonfirmasi}</div>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-lg p-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white text-2xl">
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3' /></svg>
          </span>
          <div>
            <div className="font-semibold text-gray-700">Menunggu</div>
            <div className="text-2xl font-bold">{countMenunggu}</div>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Filter</span>
          <select className="input input-bordered" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">by Status</option>
            <option value="Terkonfirmasi">Terkonfirmasi</option>
            <option value="Menunggu">Menunggu</option>
          </select>
        </div>
        <input
          type="text"
          className="input input-bordered w-56"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2">No</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Tipe Surat</th>
              <th className="px-2 py-2">Tgl Diterima</th>
              <th className="px-2 py-2">Alamat Pengirim</th>
              <th className="px-2 py-2">Isi Singkat</th>
              <th className="px-2 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr><td colSpan={7} className="text-center py-4 text-gray-400">Data tidak ditemukan</td></tr>
            )}
            {paginated.map((d, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-2 py-2 text-center">{(page-1)*perPage + idx + 1}</td>
                <td className="px-2 py-2 text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${d.status === 'Terkonfirmasi' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-gray-100 text-gray-600 border border-gray-300'}`}>{d.status}</span>
                </td>
                <td className="px-2 py-2 text-center">{d.tipe}</td>
                <td className="px-2 py-2 text-center">{d.tgl}</td>
                <td className="px-2 py-2 text-center">{d.pengirim}</td>
                <td className="px-2 py-2 text-center">{d.isi}</td>
                <td className="px-2 py-2 text-center">
                  <button className="p-2 hover:bg-gray-100 rounded" title="Detail">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0A9 9 0 11 3 12a9 9 0 0118 0z" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          disabled={page === 1}
          onClick={() => setPage(p => Math.max(1, p-1))}
        >Previous</button>
        <span className="px-2 py-1">{page} / {totalPage || 1}</span>
        <button
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          disabled={page === totalPage || totalPage === 0}
          onClick={() => setPage(p => Math.min(totalPage, p+1))}
        >Next</button>
      </div>
    </div>
  );
}


