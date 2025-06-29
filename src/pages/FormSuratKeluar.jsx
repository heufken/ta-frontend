import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { createOutboxApi } from '../api/outbox';
import { getCategoriesApi } from '../api/category';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function FormSuratKeluar() {
  const [form, setForm] = useState({
    nomor: '',
    kategori: '',
    tanggal: '',
    destination: '',
    summary: '',
    sign: '',
  });
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const [lastPayload, setLastPayload] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('number', form.nomor);
      formData.append('category', form.kategori);
      formData.append('date', form.tanggal);
      formData.append('destination', form.destination);
      formData.append('summary', form.summary);
      formData.append('sign', form.sign);
      formData.append('content', content);
      attachments.forEach(file => formData.append('attachments', file));
      await createOutboxApi(formData);
      toast.success('Surat keluar berhasil dibuat!');
      navigate('/dashboard/surat-keluar');
    } catch (err) {
      toast.error('Gagal membuat surat keluar!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <form className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-10 shadow-xl border border-gray-100" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center tracking-tight drop-shadow">Form Pengisian Surat Keluar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">No Surat<span className="text-red-500">*</span></label>
            <input name="nomor" value={form.nomor} onChange={handleChange} className="input input-bordered w-full focus:ring-2 focus:ring-blue-200" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori<span className="text-red-500">*</span></label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-200"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Surat<span className="text-red-500">*</span></label>
            <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} className="input input-bordered w-full focus:ring-2 focus:ring-blue-200" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tujuan Surat<span className="text-red-500">*</span></label>
            <input name="destination" value={form.destination} onChange={handleChange} className="input input-bordered w-full focus:ring-2 focus:ring-blue-200" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Ringkasan Surat<span className="text-red-500">*</span></label>
            <input name="summary" value={form.summary} onChange={handleChange} className="input input-bordered w-full focus:ring-2 focus:ring-blue-200" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Penandatangan<span className="text-red-500">*</span></label>
            <input name="sign" value={form.sign} onChange={handleChange} className="input input-bordered w-full focus:ring-2 focus:ring-blue-200" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Lampiran (opsional)</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 1 0 2.828 2.828l6.586-6.586a2 2 0 1 0-2.828-2.828z"/></svg>
              <input type="file" multiple onChange={e => setAttachments([...e.target.files])} className="w-full text-sm text-gray-600 bg-transparent focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Isi Surat<span className="text-red-500">*</span></label>
          <div className="rounded border border-gray-200 shadow-sm overflow-hidden">
            <Editor
              apiKey="m7vuqqw15g7uh89d0emklrwfxa39f2phpah7hvrfrox5c1gd"
              value={content}
              onEditorChange={setContent}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'table', 'lists', 'link', 'autolink', 'paste', 'fontfamily', 'fontsize'
                ],
                toolbar: 'undo redo | fontfamily fontsize | bold italic underline forecolor backcolor | bullist numlist | table | link',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition font-semibold flex items-center gap-2" disabled={loading}>
            {loading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M4 12a8 8 0 018-8"/></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            )}
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
          <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition font-semibold" onClick={() => navigate('/dashboard/surat-keluar')}>
            Kembali
          </button>
        </div>
      </form>
      {/* Tampilkan payload hasil submit untuk testing */}
      {lastPayload && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="font-semibold mb-2 text-gray-700">Payload yang dikirim ke backend:</div>
          <pre className="text-xs text-gray-800 whitespace-pre-wrap">{JSON.stringify(lastPayload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}