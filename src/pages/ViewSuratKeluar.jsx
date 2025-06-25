import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOutboxByIdApi } from '../api/outbox';
import toast from 'react-hot-toast';
import moment from 'moment-hijri';

function formatHijri(date) {
  if (!date) return '-';
  const m = moment(date);
  const bulan = [
    'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir', 'Jumadil Awal', 'Jumadil Akhir',
    'Rajab', 'Sya\'ban', 'Ramadhan', 'Syawwal', 'Dzulkaidah', 'Dzulhijjah'
  ];
  return `${m.iDate()} ${bulan[m.iMonth()]} ${m.iYear()} H`;
}

export default function ViewSuratKeluar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        setLoading(true);
        const res = await getOutboxByIdApi(id);
        setSurat(res.data.outbox);
      } catch {
        toast.error('Gagal mengambil data surat keluar');
        navigate('/dashboard/surat-keluar');
      } finally {
        setLoading(false);
      }
    };
    fetchSurat();
  }, [id, navigate]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!surat) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 mt-8" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold">PIMPINAN CABANG 'AISYIYAH</h2>
        <h3 className="text-lg font-semibold">MOJOTENGAH</h3>
        <p>DAERAH KABUPATEN WONOSOBO<br />
          Alamat: Jalan Jawar Km.01 Kalibeber Mojotengah Telp. 085729469606
        </p>
        <hr className="my-2 border-black" />
      </div>

      <div className="mt-6">
        <p>Nomor: {surat.number}</p>
        <p>Lamp: {surat.attachment ? surat.attachment + ' berkas' : '-'}</p>
        <p>Hal: {surat.category}</p>
        <p className="text-right font-medium mt-2">
          Mojotengah, {formatHijri(surat.date)} / {surat.date ? new Date(surat.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'} M
        </p>
      </div>

      <div className="mt-6">
        <p>Kepada Yth:</p>
        <p>{surat.destination}</p>
      </div>

      <div className="mt-6">
        <div className="mt-6 surat-content" dangerouslySetInnerHTML={{ __html: surat.content }} />
        <style>
        {`
          .surat-content table {
            border-collapse: collapse;
            width: 100%;
          }
          .surat-content th, .surat-content td {
            border: 1px solid #000;
            padding: 4px 8px;
          }
        `}
        </style>
      </div>

      {surat.attachmentUrls && surat.attachmentUrls.length > 0 && (
        <div className="mt-6">
          <span className="font-semibold">Lampiran:</span>
          <ul className="list-disc ml-6 mt-1">
            {surat.attachmentUrls.map((url, idx) => (
              <li key={idx}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Download Lampiran {idx + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between mt-12">
        <div className="text-center w-1/2">
          <p>Ketua,</p>
          <br /><br /><br />
          <p><strong>{surat.sign || 'Nama Ketua'}</strong></p>
        </div>
        <div className="text-center w-1/2">
          <p>Sekretaris,</p>
          <br /><br /><br />
          <p><strong>Masitoh</strong></p>
        </div>
      </div>
    </div>
  );
}
