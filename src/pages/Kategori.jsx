import { useEffect, useState } from 'react';
import {
  getCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi
} from '../api/category';
import toast from 'react-hot-toast';

export default function Kategori() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch kategori dari backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategoriesApi();
        setCategories(res.data);
      } catch (err) {
        toast.error('Gagal mengambil data kategori');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Tambah kategori
  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await createCategoryApi(newCategory.trim());
      setCategories([...categories, res.data.category]);
      setNewCategory('');
      toast.success('Kategori berhasil ditambahkan');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menambah kategori');
    }
  };

  // Edit kategori
  const handleEdit = async (id) => {
    if (!editName.trim()) return;
    try {
      const res = await updateCategoryApi(id, editName.trim());
      setCategories(categories.map(cat => cat._id === id ? res.data.category : cat));
      setEditId(null);
      setEditName('');
      toast.success('Kategori berhasil diubah');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengedit kategori');
    }
  };

  // Hapus kategori
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus kategori ini?')) return;
    try {
      await deleteCategoryApi(id);
      setCategories(categories.filter(cat => cat._id !== id));
      toast.success('Kategori berhasil dihapus');
    } catch (err) {
      toast.error('Gagal menghapus kategori');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Data Kategori</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="Tambah kategori baru"
          className="input input-bordered flex-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Tambah
        </button>
      </div>
      {loading ? (
        <div className="text-gray-500 text-center py-8">Loading...</div>
      ) : (
        <div className="border rounded-lg divide-y">
          {categories.map(cat => (
            <div key={cat._id} className="flex items-center px-4 py-3 hover:bg-gray-50">
              <span className="mr-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h3.28a2 2 0 011.7.89l.94 1.42A2 2 0 0013.28 8H19a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
              </span>
              {editId === cat._id ? (
                <>
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="input input-bordered flex-1"
                  />
                  <button
                    onClick={() => handleEdit(cat._id)}
                    className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => { setEditId(null); setEditName(''); }}
                    className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-gray-800 font-medium">{cat.name}</span>
                  <button
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Edit"
                    onClick={() => { setEditId(cat._id); setEditName(cat.name); }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z" /></svg>
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Hapus"
                    onClick={() => handleDelete(cat._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

