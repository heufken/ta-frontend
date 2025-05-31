import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const dummyData = Array.from({ length: 48 }, (_, i) => ({
  tgl: '13-02-2025',
  nomor: i === 0 ? '074/SIP/FIK/dll' : '16/PCA/A/III/2025',
  alamat: 'Univ Amikom YK',
  isi: i === 0 ? 'Permohonan Penelitian' : 'Lorem Ipsum',
  file: i === 0 ? 'SUR4852, 4854, 4857.pdf' : 'Lorem pen.pdf',
}));

const PER_PAGE = 8;

export default function ListSuratMasuk() {
  const [kategori, setKategori] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const filtered = dummyData.filter(row =>
    (kategori === '' || row.nomor.includes(kategori)) &&
    (search === '' || row.nomor.toLowerCase().includes(search.toLowerCase()) || row.alamat.toLowerCase().includes(search.toLowerCase()) || row.isi.toLowerCase().includes(search.toLowerCase()))
  );
  const pageCount = Math.ceil(filtered.length / PER_PAGE);
  const current = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="text-lg font-semibold">Buku Agenda Surat Masuk</div>
          <div className="flex gap-2 items-center">
            <select className="border border-gray-300 rounded px-2 py-1 text-sm" value={kategori} onChange={e => setKategori(e.target.value)}>
              <option value="">Semua Kategori</option>
              <option value="074">074</option>
              <option value="16">16</option>
            </select>
            <div className="relative">
              <input type="text" className="border border-gray-300 rounded px-2 py-1 text-sm pl-8" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} />
              <span className="absolute left-2 top-1.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 py-1">No</th>
                <th className="border border-gray-300 px-2 py-1">Tgl Upload</th>
                <th className="border border-gray-300 px-2 py-1">No. Surat</th>
                <th className="border border-gray-300 px-2 py-1">Alamat Pengirim</th>
                <th className="border border-gray-300 px-2 py-1">Isi Singkat</th>
                <th className="border border-gray-300 px-2 py-1">File Lampiran</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {current.map((row, i) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-1 text-center">{page * PER_PAGE + i + 1}</td>
                  <td className="border border-gray-300 px-2 py-1">{row.tgl}</td>
                  <td className="border border-gray-300 px-2 py-1">{row.nomor}</td>
                  <td className="border border-gray-300 px-2 py-1">{row.alamat}</td>
                  <td className="border border-gray-300 px-2 py-1">{row.isi}</td>
                  <td className="border border-gray-300 px-2 py-1 text-blue-600 underline cursor-pointer">{row.file}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    <button className="text-green-600 hover:bg-green-50 rounded p-1 mr-1" title="Edit"><svg className="w-5 h-5 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg></button>
                    <button className="text-red-600 hover:bg-red-50 rounded p-1" title="Hapus"><svg className="w-5 h-5 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6"/><path d="M19 6l-1.5 14a2 2 0 0 1-2 2H8.5a2 2 0 0 1-2-2L5 6"/></svg></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500">Showing {page * PER_PAGE + 1} - {Math.min((page + 1) * PER_PAGE, filtered.length)} of {filtered.length}</div>
          <ReactPaginate
            previousLabel={<span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg><span className="hidden sm:block">Previous</span></span>}
            nextLabel={<span className="flex items-center gap-1"><span className="hidden sm:block">Next</span><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></span>}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={({ selected }) => setPage(selected)}
            containerClassName="flex items-center -space-x-px"
            pageClassName="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            activeClassName="bg-gray-200"
            previousClassName="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            nextClassName="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            disabledClassName="opacity-50 pointer-events-none"
            forcePage={page}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 ml-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
            Tambah Arsip
          </button>
        </div>
      </div>
    </div>
  );
} 