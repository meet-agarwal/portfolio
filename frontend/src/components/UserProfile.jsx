import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="fixed top-4 left-4 z-40 bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">
            {user?.phoneNumber ? user.phoneNumber.slice(-2) : 'U'}
          </span>
        </div>
        <div className="text-white">
          <p className="text-sm font-medium">
            {user?.phoneNumber || 'User'}
          </p>
          <p className="text-xs text-slate-400">Logged in</p>
        </div>
        <button
          onClick={handleLogout}
          className="ml-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 