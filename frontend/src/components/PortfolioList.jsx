import { useState, useEffect } from 'react';

const PortfolioList = ({ isAdminMode = false }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolios');
      
      if (!response.ok) {
        throw new Error('Failed to fetch portfolios');
      }
      
      const data = await response.json();
      setPortfolios(data.portfolios);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDelete = async (portfolioId) => {
    if (!confirm(`Are you sure you want to delete the portfolio "${portfolioId}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/portfolio/${portfolioId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete portfolio');
      }

      // Refresh the portfolio list
      fetchPortfolios();
      alert('Portfolio deleted successfully!');
    } catch (error) {
      alert('Error deleting portfolio: ' + error.message);
    }
  };

  if (loading) return <div className="text-white text-center py-8">Loading portfolios...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">Available Portfolios</h3>
      {portfolios.length === 0 ? (
        <p className="text-slate-400">No portfolios found. Create the first one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolios.map((portfolioId) => (
            <div
              key={portfolioId}
              className="p-4 bg-gray-800 rounded-lg border border-gray-600"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-medium text-white capitalize">
                  {portfolioId.replace(/-/g, ' ')}
                </h4>
                {isAdminMode && (
                  <button
                    onClick={() => handleDelete(portfolioId)}
                    className="text-red-400 hover:text-red-300 text-sm"
                    title="Delete portfolio"
                  >
                    🗑️
                  </button>
                )}
              </div>
              <a
                href={`/${portfolioId}`}
                className="text-slate-400 text-sm hover:text-white transition-colors"
              >
                View portfolio →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList; 