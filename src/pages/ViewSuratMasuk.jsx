import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getInboxByIdApi, updateInboxApi } from '../api/inbox';
import { getCategoriesApi } from '../api/category';
import toast from 'react-hot-toast';

export default function ViewSuratMasuk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = new URLSearchParams(location.search).get('edit') === '1';

  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  // Fetch surat & kategori
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resSurat, resCat] = await Promise.all([
          getInboxByIdApi(id),
          getCategoriesApi()
        ]);
        setSurat(resSurat.data.inbox);
        setCategories(resCat.data);
      } catch (err) {
        toast.error('Gagal mengambil data surat!');
        navigate('/dashboard/surat-masuk');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  // Set edit form state saat masuk mode edit
  useEffect(() => {
    if (isEdit && surat) {
      setEditForm({
        nomor: surat.number,
        alamatPengirim: surat.origin,
        tanggal: surat.date?.slice(0, 10) || '',
        recievedDate: surat.recievedDate?.slice(0, 10) || '',
        kategori: surat.category,
        isiSurat: surat.summary,
      });
    }
  }, [isEdit, surat]);

  // Handle edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('number', editForm.nomor);
      formData.append('category', editForm.kategori);
      formData.append('date', editForm.tanggal);
      formData.append('recievedDate', editForm.recievedDate);
      formData.append('origin', editForm.alamatPengirim);
      formData.append('summary', editForm.isiSurat);
      // Lampiran: tidak diubah di edit inline ini (bisa ditambah jika mau)
      await updateInboxApi(id, formData);
      toast.success('Surat berhasil diupdate!');
      navigate(`/dashboard/view-surat/${id}`);
    } catch (err) {
      toast.error('Gagal update surat!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!surat) return null;

  // --- VIEW MODE ---
  if (!isEdit) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 relative">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Detail Surat Masuk</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-4">
            <span className="font-semibold text-gray-700 w-40">Nomor Surat:</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{surat.number}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-gray-700 w-40">Tanggal Surat:</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{surat.date ? new Date(surat.date).toLocaleDateString() : '-'}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-gray-700 w-40">Tanggal Diterima:</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{surat.recievedDate ? new Date(surat.recievedDate).toLocaleDateString() : '-'}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-gray-700 w-40">Pengirim:</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{surat.origin}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-gray-700 w-40">Kategori:</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{surat.category}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Ringkasan Surat:</span>
            <div className="mt-1 p-3 bg-gray-50 rounded text-gray-800 whitespace-pre-line border">{surat.summary}</div>
          </div>
          {surat.attachmentUrls && surat.attachmentUrls.length > 0 && (
            <div>
              <span className="font-semibold text-gray-700">Lampiran:</span>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {surat.attachmentUrls.map((url, idx) => {
                  // Ambil nama file dari url
                  const fileName = url.split('/').pop();
                  const ext = fileName.split('.').pop().toLowerCase();
                  // Pilih ikon sesuai tipe file
                  let icon = (
                    <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v16h16V8l-6-6H4z"/><path d="M14 2v6h6"/></svg>
                  );
                  if (["jpg","jpeg","png","gif","webp"].includes(ext)) {
                    icon = (
                      <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><circle cx="8" cy="10" r="2"/><path d="m21 15-5-5L5 21"/></svg>
                    );
                  } else if (ext === "pdf") {
                    icon = (
                      <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2h9l6 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M14 2v6h6"/><text x="8" y="17" fontSize="8" fill="red">PDF</text></svg>
                    );
                  }
                  return (
                    <div key={idx} className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition">
                      {icon}
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 text-sm truncate">{fileName}</div>
                        <div className="text-xs text-gray-500">.{ext.toUpperCase()}</div>
                      </div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-semibold shadow"
                        download
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v12m0 0-4-4m4 4 4-4"/><path d="M20 20H4"/></svg>
                        Download
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-8 gap-2">
          <button
            onClick={() => navigate(`/dashboard/view-surat/${id}?edit=1`)}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition text-sm font-semibold flex items-center gap-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
            Edit
          </button>
          <button
            onClick={() => navigate('/dashboard/surat-masuk')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // --- EDIT MODE ---
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Edit Surat Masuk</h2>
      <form onSubmit={handleEditSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Nomor Surat</label>
          <input
            name="nomor"
            value={editForm?.nomor || ''}
            onChange={handleEditChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Surat</label>
            <input
              type="date"
              name="tanggal"
              value={editForm?.tanggal || ''}
              onChange={handleEditChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Diterima</label>
            <input
              type="date"
              name="recievedDate"
              value={editForm?.recievedDate || ''}
              onChange={handleEditChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Pengirim</label>
          <input
            name="alamatPengirim"
            value={editForm?.alamatPengirim || ''}
            onChange={handleEditChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori</label>
          <select
            name="kategori"
            value={editForm?.kategori || ''}
            onChange={handleEditChange}
            className="input input-bordered w-full"
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Ringkasan Surat</label>
          <textarea
            name="isiSurat"
            value={editForm?.isiSurat || ''}
            onChange={handleEditChange}
            className="input input-bordered w-full min-h-[100px]"
            required
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition"
            onClick={() => navigate(`/dashboard/view-surat/${id}`)}
            disabled={saving}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
