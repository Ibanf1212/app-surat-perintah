import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { suratPerintahAPI } from '../services/api';

export const CreateSuratPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    menimbang: '',
    dasar: [''],
    kepada_nama: [''],
    untuk: [''],
    ttd_nama: '',
    ttd_nip: '',
    ttd_jabatan: '',
    tempat: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const arr = [...(formData as any)[field]];
    arr[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: arr,
    }));
  };

  const addArrayField = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev as any)[field], ''],
    }));
  };

  const removeArrayField = (field: string, index: number) => {
    const arr = (formData as any)[field].filter((_: string, i: number) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: arr,
    }));
  };

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'pending' = 'draft') => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        ...formData,
        dasar: formData.dasar.filter((d) => d.trim() !== ''),
        kepada_nama: formData.kepada_nama.filter((k) => k.trim() !== ''),
        untuk: formData.untuk.filter((u) => u.trim() !== ''),
      };

      await suratPerintahAPI.create(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create surat');
    } finally {
      setLoading(false);
    }
  };

  if (preview) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setPreview(false)}
            className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            ← Back to Edit
          </button>
          <div className="surat-container bg-white p-8 shadow-lg">
            {/* Surat Preview Content */}
            <div className="surat-header">
              <div className="surat-title">SURAT PERINTAH</div>
              <div className="surat-nomor">NOMOR : [AUTO-GENERATED]</div>
            </div>

            <div className="surat-section">
              <span className="surat-section-title">Menimbang</span>
              <div className="surat-content">: {formData.menimbang}</div>
            </div>

            <div className="surat-section">
              <span className="surat-section-title">Dasar</span>
              <div className="surat-content">:</div>
              <ol className="surat-list">
                {formData.dasar.filter((d) => d.trim()).map((dasar, idx) => (
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
                  {formData.kepada_nama.filter((k) => k.trim()).map((nama, idx) => (
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
                {formData.untuk.filter((u) => u.trim()).map((item, idx) => (
                  <li key={idx} className="surat-list-item">
                    {idx + 1}. {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="surat-signature">
              <p>{formData.tempat}, {new Date().toLocaleDateString('id-ID')}</p>
              <div className="surat-signature-box">
                <div className="surat-signature-name">{formData.ttd_nama}</div>
                <p>{formData.ttd_nip}</p>
                <p>{formData.ttd_jabatan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Buat Surat Perintah Baru</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={(e) => handleSubmit(e, 'draft')} className="space-y-6">
            {/* Menimbang */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Menimbang</label>
              <textarea
                name="menimbang"
                value={formData.menimbang}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Isi menimbang..."
              />
            </div>

            {/* Dasar */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Dasar</label>
              {formData.dasar.map((dasar, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={dasar}
                    onChange={(e) => handleArrayChange('dasar', idx, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder={`Dasar ${idx + 1}...`}
                  />
                  {formData.dasar.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('dasar', idx)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('dasar')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2"
              >
                + Add Dasar
              </button>
            </div>

            {/* Kepada Nama */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Kepada (Nama Pegawai)</label>
              {formData.kepada_nama.map((nama, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => handleArrayChange('kepada_nama', idx, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder={`Nama Pegawai ${idx + 1}...`}
                  />
                  {formData.kepada_nama.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('kepada_nama', idx)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('kepada_nama')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2"
              >
                + Add Nama Pegawai
              </button>
            </div>

            {/* Untuk */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Untuk (Perintah)</label>
              {formData.untuk.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('untuk', idx, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder={`Perintah ${idx + 1}...`}
                  />
                  {formData.untuk.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('untuk', idx)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('untuk')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2"
              >
                + Add Perintah
              </button>
            </div>

            {/* TTD Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Tanda Tangan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="ttd_nama"
                  value={formData.ttd_nama}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Nama (TTD)"
                />
                <input
                  type="text"
                  name="ttd_nip"
                  value={formData.ttd_nip}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="NIP"
                />
                <input
                  type="text"
                  name="ttd_jabatan"
                  value={formData.ttd_jabatan}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Jabatan"
                />
              </div>
            </div>

            {/* Tempat */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Tempat</label>
              <input
                type="text"
                name="tempat"
                value={formData.tempat}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Tempat penandatanganan..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => setPreview(true)}
                className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                Preview
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400"
              >
                {loading ? 'Saving...' : 'Save as Draft'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
