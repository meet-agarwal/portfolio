import { useState } from 'react';

const AdminToggle = ({ onToggle }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');

  const handleAdminToggle = () => {
    if (!isAdmin) {
      setShowPasswordInput(true);
    } else {
      setIsAdmin(false);
      onToggle(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Simple password check - you can change this to any password you want
    if (password === 'admin123' || password === 'edit') {
      setIsAdmin(true);
      onToggle(true);
      setShowPasswordInput(false);
      setPassword('');
    } else {
      alert('Incorrect password. Try: admin123 or edit');
      setPassword('');
    }
  };

  const handleSecretClick = () => {
    // Alternative way to enable admin mode - click 5 times on the logo area
    if (!isAdmin) {
      setIsAdmin(true);
      onToggle(true);
    }
  };

  return (
    <>
      {/* Secret click area - click 5 times on the top-left corner to enable admin mode */}
      <div
        onClick={handleSecretClick}
        className="fixed top-0 left-0 w-8 h-8 z-50 cursor-pointer"
        title="Click 5 times to enable admin mode"
      />

      {/* Admin toggle button */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={handleAdminToggle}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            isAdmin 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {isAdmin ? '🔓 Admin Mode' : '🔒 Enable Edit'}
        </button>
      </div>

      {/* Password input modal */}
      {showPasswordInput && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Enter Admin Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white mb-4"
                placeholder="Password"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordInput(false);
                    setPassword('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm mt-2">
              Hint: Try "admin123" or "edit"
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminToggle; 