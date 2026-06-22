import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { suratPerintahAPI } from '../services/api';
import { SuratPerintah } from '../store/suratStore';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [suratList, setSuratList] = useState<SuratPerintah[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    loadSuratList();
  }, [page]);

  const loadSuratList = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await suratPerintahAPI.list(page, 10);
      setSuratList(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load surat list');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this surat?')) {
      try {
        await suratPerintahAPI.delete(id);
        loadSuratList();
      } catch (err) {
        setError('Failed to delete surat');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Aplikasi Surat Perintah</h1>
          <div className="flex items-center space-x-4">
            <div className="text-gray-700">
              <p className="font-semibold">{user?.full_name}</p>
              <p className="text-sm text-gray-500">{user?.position}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="mb-8 flex space-x-4">
          <button
            onClick={() => navigate('/surat/create')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            + Buat Surat Baru
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Surat List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : suratList.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No surat perintah found</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nomor Surat</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tempat</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suratList.map((surat) => (
                      <tr key={surat.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800">{surat.nomor_surat}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {new Date(surat.tanggal).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">{surat.tempat}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              surat.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : surat.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-800'
                                : surat.status === 'pending'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {surat.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button
                            onClick={() => navigate(`/surat/${surat.id}`)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                          >
                            View
                          </button>
                          {surat.status === 'draft' && (
                            <button
                              onClick={() => navigate(`/surat/${surat.id}/edit`)}
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(surat.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 flex justify-between items-center">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-700 font-semibold">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
