import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { suratPerintahAPI } from '../services/api';
import { SuratPerintah } from '../store/suratStore';

export const ViewSuratPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [surat, setSurat] = useState<SuratPerintah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSurat();
  }, [id]);

  const loadSurat = async () => {
    try {
      const response = await suratPerintahAPI.get(id!);
      setSurat(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load surat');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    const element = document.getElementById('surat-content');
    const opt = {
      margin: 10,
      filename: `${surat?.nomor_surat}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };
    // @ts-ignore
    if (window.html2pdf) {
      // @ts-ignore
      window.html2pdf().set(opt).from(element).save();
    }
  };

  const handleApprove = async () => {
    if (window.confirm('Approve this surat?')) {
      try {
        await suratPerintahAPI.approve(id!);
        loadSurat();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to approve surat');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !surat) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            ← Back to Dashboard
          </button>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Surat not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            ← Back
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            📥 Export PDF
          </button>
          {surat.status !== 'approved' && (
            <button
              onClick={handleApprove}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              ✓ Approve
            </button>
          )}
        </div>

        <div id="surat-content" className="surat-container bg-white p-8 shadow-lg">
          <div className="surat-header">
            <div className="surat-title">SURAT PERINTAH</div>
            <div className="surat-nomor">NOMOR : {surat.nomor_surat}</div>
          </div>

          <div className="surat-section">
            <span className="surat-section-title">Menimbang</span>
            <div className="surat-content">: {surat.menimbang}</div>
          </div>

          <div className="surat-section">
            <span className="surat-section-title">Dasar</span>
            <div className="surat-content">:</div>
            <ol className="surat-list">
              {(surat.dasar as any).map((dasar: string, idx: number) => (
                <li key={idx} className="surat-list-item">
                  {dasar}
                </li>
              ))}
            </ol>
          </div>

          <div className="text-center font-bold my-8">MEMERINTAHKAN:</div>

          <div className="surat-section">
            <span className="surat-section-title">Kepada</span>
            <div className="surat-content">: Daftar Nama Pejabat/Pegawai (terlampir)</div>
            <table className="surat-table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>NAMA PEGAWAI</th>
                </tr>
              </thead>
              <tbody>
                {(surat.kepada_nama as any).map((nama: string, idx: number) => (
                  <tr key={idx}>
                    <td className="text-center">{idx + 1}</td>
                    <td>{nama}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="surat-section mt-8">
            <span className="surat-section-title">Untuk</span>
            <div className="surat-content">:</div>
            <ol className="surat-list">
              {(surat.untuk as any).map((item: string, idx: number) => (
                <li key={idx} className="surat-list-item">
                  {idx + 1}. {item}
                </li>
              ))}
            </ol>
          </div>

          <div className="surat-signature">
            <p>{surat.tempat}, {new Date(surat.tanggal).toLocaleDateString('id-ID')}</p>
            <div className="surat-signature-box">
              <div className="surat-signature-name">{surat.ttd_nama}</div>
              <p>{surat.ttd_nip}</p>
              <p>{surat.ttd_jabatan}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
