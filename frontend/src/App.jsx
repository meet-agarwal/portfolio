import { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Section from './components/Section';
import './App.css';
import Footer from './components/Footer';
import PortfolioEditor from './components/PortfolioEditor';
import AdminToggle from './components/AdminToggle';
import CreatePortfolio from './components/CreatePortfolio';
import PortfolioList from './components/PortfolioList';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/UserProfile';
import AuthDemo from './components/AuthDemo';

function AppContent() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { isAuthenticated } = useAuth();

  // // Extract portfolio ID from URL
  const getPortfolioId = () => {
    // Example: if URL is http://localhost:3000/meetagarwal
    // or http://yourdomain.com/meetagarwal
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1] || '';
  };
  console.log(getPortfolioId());
  

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const portfolioId = getPortfolioId();
        
        // If no portfolio ID, show landing page
        if (!portfolioId) {
          setPortfolioData(null);
          setLoading(false);
          return;
        }
        
        const response = await fetch(`http://localhost:5000/api/portfolio/${portfolioId}`);
        
        if (!response.ok) {
          throw new Error('Portfolio not found');
        }
        
        const data = await response.json();
        console.log(data);
        
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  console.log("portfolio",portfolioData);

  const handleSavePortfolio = async (updatedData) => {
    try {
      const portfolioId = getPortfolioId();
      const response = await fetch(`http://localhost:5000/api/portfolio/${portfolioId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save portfolio');
      }

      setPortfolioData(updatedData);
      setShowEditor(false);
    } catch (error) {
      throw new Error('Failed to save portfolio: ' + error.message);
    }
  };

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-20">Error: {error}</div>;
  
  // Show landing page if no portfolio ID
  if (!getPortfolioId()) {
    return (
      <div className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 min-h-screen">
        {/* User Profile */}
        {isAuthenticated && <UserProfile />}
        
        {/* Admin Toggle */}
        <AdminToggle onToggle={setIsAdminMode} />
        
        <div className="mx-auto max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">Portfolio Builder</h1>
            <p className="text-xl text-slate-300 mb-8">
              Create and manage your professional portfolio with ease
            </p>
            
            <div className="space-y-4">
              <ProtectedRoute requireAuth={true}>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                >
                  ➕ Create Your Portfolio
                </button>
              </ProtectedRoute>
              
              <div className="mt-8">
                <AuthDemo />
                <PortfolioList isAdminMode={isAdminMode} />
              </div>
            </div>
          </div>
        </div>

        {/* Create Portfolio Modal */}
        {showCreateModal && (
          <CreatePortfolio
            onClose={() => setShowCreateModal(false)}
            onCreated={(portfolioId) => {
              window.location.href = `/${portfolioId}`;
            }}
          />
        )}
      </div>
    );
  }
  
  if (!portfolioData) return <div className="text-white text-center py-20">No portfolio data found</div>;

  // Destructure the data from backend
  const {
    header,
    about,
    experience,
    project,
    section,
    footer
  } = portfolioData;

  const aboutTxt = about.txt;
  const aboutLink = about.link;
  const footerTxt = footer.txt;
  const footerLink = footer.link;
  

  return (
    <div className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
      <div className="__variable_20b187 group/spotlight relative">
        {/* Decorative background blob */}
        <div
          className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
          style={{
            background: 'radial-gradient(600px at 742px 105px, rgba(29, 78, 216, 0.15), transparent 80%)',
          }}
        ></div>

        {/* Admin Toggle */}
        <AdminToggle onToggle={setIsAdminMode} />

        {/* Admin Controls - only show when admin mode is enabled and user is authenticated */}
        {isAdminMode && isAuthenticated && (
          <div className="fixed top-4 right-4 z-40 flex gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              ➕ Create New
            </button>
            <button
              onClick={() => setShowEditor(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              ✏️ Edit Portfolio
            </button>
          </div>
        )}

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            <Header data={header} />
            <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
              <About text={aboutTxt} linkMap={aboutLink}/>
              <Section
                type="experience"
                data={experience}
              />
              <Section
                type="project"
                data={project}
              />
              <Section
                type="section"
                data={section}
              />
              <Footer text={footerTxt} linkMap={footerLink}/>
            </main>
          </div>
        </div>
      </div>

      {/* Portfolio Editor Modal */}
      {showEditor && (
        <PortfolioEditor
          portfolioData={portfolioData}
          onSave={handleSavePortfolio}
          onCancel={() => setShowEditor(false)}
        />
      )}

      {/* Create Portfolio Modal */}
      {showCreateModal && (
        <CreatePortfolio
          onClose={() => setShowCreateModal(false)}
          onCreated={(portfolioId) => {
            // Optionally redirect to the new portfolio
            window.location.href = `/${portfolioId}`;
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;