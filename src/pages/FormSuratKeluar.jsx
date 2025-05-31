import { useState } from 'react';

export default function FormSuratKeluar() {
  const [form, setForm] = useState({
    nomor: '',
    tanggal: '',
    tujuan: '',
    alamat: '',
    perihal: '',
    kategori: '',
    ringkasan: '',
    file: null,
    tembusan: '',
    penandatangan: '',
    catatan: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(f => ({
      ...f,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data ke backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <form className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6 border" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Form Surat Keluar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Nomor Surat</label>
            <input name="nomor" value={form.nomor} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Surat</label>
            <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tujuan Surat</label>
            <input name="tujuan" value={form.tujuan} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Alamat Tujuan</label>
            <input name="alamat" value={form.alamat} onChange={handleChange} className="input input-bordered w-full" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Perihal</label>
            <input name="perihal" value={form.perihal} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori Surat</label>
            <select name="kategori" value={form.kategori} onChange={handleChange} className="input input-bordered w-full" required>
              <option value="">Pilih Kategori</option>
              <option>Undangan</option>
              <option>Keputusan</option>
              <option>Permohonan</option>
              <option>Mandat</option>
              <option>Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Penandatangan</label>
            <input name="penandatangan" value={form.penandatangan} onChange={handleChange} className="input input-bordered w-full" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Ringkasan Isi Surat</label>
          <textarea name="ringkasan" value={form.ringkasan} onChange={handleChange} className="input input-bordered w-full min-h-[80px]" rows={3} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">File Surat (PDF/JPG)</label>
          <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0-4 4m4-4 4 4"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
            <span className="text-xs text-gray-500">{form.file ? form.file.name : 'Upload file surat...'}</span>
            <input type="file" name="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="hidden" />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tembusan</label>
            <input name="tembusan" value={form.tembusan} onChange={handleChange} className="input input-bordered w-full" placeholder="Pisahkan dengan koma jika lebih dari satu" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Catatan Internal</label>
            <textarea name="catatan" value={form.catatan} onChange={handleChange} className="input input-bordered w-full min-h-[40px]" rows={2} />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}