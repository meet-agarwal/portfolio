import { useAuth } from '../contexts/AuthContext';

const AuthDemo = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Authentication Status</h3>
        <p className="text-slate-400">Please log in to access portfolio features.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Welcome!</h3>
      <div className="space-y-2 text-slate-300">
        <p><strong>Phone:</strong> {user?.phoneNumber || 'N/A'}</p>
        <p><strong>User ID:</strong> {user?.uid || 'N/A'}</p>
        <p><strong>Email Verified:</strong> {user?.emailVerified ? 'Yes' : 'No'}</p>
        <p><strong>Last Sign In:</strong> {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'N/A'}</p>
      </div>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthDemo; 