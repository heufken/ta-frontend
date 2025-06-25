import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getOutboxApi, deleteOutboxApi } from '../api/outbox';
import { getCategoriesApi } from '../api/category';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PER_PAGE = 8;

export default function ListSuratKeluar() {
  const [kategori, setKategori] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch kategori untuk filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data);
      } catch (err) {
        toast.error('Gagal mengambil kategori');
      }
    };
    fetchCategories();
  }, []);

  // Fetch surat keluar dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = {
          page: page + 1,
          limit: PER_PAGE,
          ...(kategori && { category: kategori }),
          ...(search && { search }),
        };
        const res = await getOutboxApi(params);
        setData(res.data.data);
        setTotal(res.data.totalData);
      } catch (err) {
        toast.error('Gagal mengambil data surat keluar');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [kategori, search, page]);

  const pageCount = Math.ceil(total / PER_PAGE);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus surat ini?')) return;
    try {
      await deleteOutboxApi(id);
      setData(data.filter(row => row._id !== id));
      toast.success('Surat berhasil dihapus');
    } catch {
      toast.error('Gagal menghapus surat');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="text-lg font-semibold">Buku Agenda Surat Keluar</div>
          <div className="flex gap-2 items-center">
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={kategori}
              onChange={e => setKategori(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <div className="relative">
              <input
                type="text"
                className="border border-gray-300 rounded px-2 py-1 text-sm pl-8"
                placeholder="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
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
                <th className="border border-gray-300 px-2 py-1">Tgl Surat</th>
                <th className="border border-gray-300 px-2 py-1">No. Surat</th>
                <th className="border border-gray-300 px-2 py-1">Tujuan</th>
                <th className="border border-gray-300 px-2 py-1">Isi Singkat</th>
                <th className="border border-gray-300 px-2 py-1">File Lampiran</th>
                <th className="border border-gray-300 px-2 py-1">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">Loading...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">Tidak ada data</td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr key={row._id} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1 text-center">{page * PER_PAGE + i + 1}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.date ? new Date(row.date).toLocaleDateString() : '-'}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.number}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.destination}</td>
                    <td className="border border-gray-300 px-2 py-1">{row.summary}</td>
                    <td className="border border-gray-300 px-2 py-1">
                      {row.attachmentUrls && row.attachmentUrls.length > 0
                        ? row.attachmentUrls.map((url, idx) => (
                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block">
                              Lampiran {idx + 1}
                            </a>
                          ))
                        : '-'}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <button
                        className="text-blue-600 underline"
                        onClick={() => navigate(`/dashboard/view-surat-keluar/${row._id}`)}
                        title="Lihat Detail"
                      >
                        Lihat
                      </button>
                      <button
                        className="text-green-600 hover:bg-green-50 rounded p-1 mr-1"
                        title="Edit"
                        onClick={() => navigate(`/dashboard/edit-surat-keluar/${row._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:bg-red-50 rounded p-1"
                        title="Hapus"
                        onClick={() => handleDelete(row._id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500">
            Showing {page * PER_PAGE + 1} - {Math.min((page + 1) * PER_PAGE, total)} of {total}
          </div>
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