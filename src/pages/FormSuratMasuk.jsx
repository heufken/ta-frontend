import { useState, useRef, useEffect } from 'react';
import { createInboxApi } from '../api/inbox';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCategoriesApi } from '../api/category';

export default function FormSuratMasuk() {
  const [form, setForm] = useState({
    nomor: '',
    alamatPengirim: '',
    tanggal: '',
    kategori: '',
    recievedDate: '',
  });
  const [isiSurat, setIsiSurat] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const dropRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('number', form.nomor);
    formData.append('category', form.kategori);
    formData.append('date', form.tanggal);
    formData.append('recievedDate', form.recievedDate || new Date().toISOString());
    formData.append('origin', form.alamatPengirim);
    formData.append('summary', isiSurat);
    if (uploadedFile) {
      formData.append('attachments', uploadedFile);
    }
    try {
      const res = await createInboxApi(formData);
      toast.success('Surat masuk berhasil dibuat!');
      navigate(`/dashboard/view-surat/${res.data.inbox._id}`);
    } catch (err) {
      toast.error('Gagal membuat surat masuk!');
    }
  };

  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data);
      } catch (err) {
        // handle error (opsional: toast)
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
      <form className="w-full max-w-3xl mx-auto bg-white rounded-2xl p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Form Pengisian Surat Masuk</h2>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6 mb-6">
          <div>
            <label className="pl-form-label block text-xs font-semibold text-gray-600 mb-1">No Surat*</label>
            <input name="nomor" value={form.nomor} onChange={handleChange} className="pl-form-input input input-bordered w-full" required />
          </div>
          <div>
            <label className="pl-form-label block text-xs font-semibold text-gray-600 mb-1">Alamat Pengirim*</label>
            <input name="alamatPengirim" value={form.alamatPengirim} onChange={handleChange} className="pl-form-input input input-bordered w-full" required />
          </div>
          <div>
            <label className="pl-form-label block text-xs font-semibold text-gray-600 mb-1">Tanggal Surat*</label>
            <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} className="pl-form-input input input-bordered w-full" required />
          </div>
          <div>
            <label className="pl-form-label block text-xs font-semibold text-gray-600 mb-1">Tanggal Diterima*</label>
            <input type="date" name="recievedDate" value={form.recievedDate} onChange={handleChange} className="pl-form-input input input-bordered w-full" required />
          </div>
          <div>
            <label className="pl-form-label block text-xs font-semibold text-gray-600 mb-1">Kategori*</label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="pl-form-input input input-bordered w-full"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 mb-6">
            <label className="pl-form-label block text-xs font-semibold text-gray-600 mb-1">Ringkasan Surat*</label>
            <textarea
              name="isiSurat"
              value={isiSurat}
              onChange={e => setIsiSurat(e.target.value)}
              className="pl-form-input input input-bordered w-full min-h-[100px]"
              required
            />
          </div>
          <div className="md:col-span-2 mb-6">
            <label className="pl-form-label block text-xs font-semibold text-gray-600 mb-1">Upload File Surat (Opsional)</label>
            <div
              ref={dropRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-8 bg-gray-50 text-gray-500 cursor-pointer transition hover:border-blue-400"
              style={{ minHeight: 150 }}
              onClick={() => dropRef.current.querySelector('input[type=file]').click()}
            >
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="application/pdf,image/*,.doc,.docx"
              />
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z" /></svg>
                {uploadedFile ? (
                  <span className="text-sm text-gray-700">{uploadedFile.name}</span>
                ) : (
                  <span className="text-sm">Drag & Drop your files or <span className="text-blue-600 underline">Browse</span></span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="submit" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Simpan Data
          </button>
          <button type="button" className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition">
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}