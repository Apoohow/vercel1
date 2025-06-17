import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateCopy, getLocationDetails } from '../services/api';

export default function HomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    datetime: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 驗證地點
      const locationResult = await getLocationDetails(formData.location);
      
      // 生成文案
      const copyResult = await generateCopy({
        ...formData,
        location: locationResult.formatted_address
      });

      // 導航到結果頁面
      navigate('/result', { 
        state: { 
          copies: copyResult.copies,
          eventData: {
            ...formData,
            location: locationResult.formatted_address
          }
        } 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          活動宣傳文案生成器
        </h1>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              活動名稱
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">
              日期時間
            </label>
            <input
              type="datetime-local"
              id="datetime"
              value={formData.datetime}
              onChange={(e) => setFormData(prev => ({ ...prev, datetime: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              地點
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              活動描述
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? '生成中...' : '生成文案'}
          </button>
        </form>
      </div>
    </div>
  );
} 