import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateForm } from '../services/api';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { copies, eventData } = location.state || {};
  const [selectedCopy, setSelectedCopy] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!copies || !eventData) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-yellow-50 p-4 rounded-md">
          <p className="text-yellow-700">
            無法載入結果。請返回首頁重新生成。
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            返回首頁
          </button>
        </div>
      </div>
    );
  }

  const handleCreateForm = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await generateForm({
        ...eventData,
        copyText: copies[selectedCopy]
      });
      // TODO: 處理表單生成結果
      console.log(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow sm:rounded-lg p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            文案生成結果
          </h1>
          <p className="text-gray-600">
            為「{eventData.title}」生成的宣傳文案
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {copies.map((copy, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 cursor-pointer ${
                selectedCopy === index
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-200'
              }`}
              onClick={() => setSelectedCopy(index)}
            >
              <h3 className="font-medium text-gray-900 mb-2">
                版本 {index + 1}
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            重新生成
          </button>
          <button
            onClick={handleCreateForm}
            disabled={loading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? '建立中...' : '建立報名表單'}
          </button>
        </div>
      </div>
    </div>
  );
} 