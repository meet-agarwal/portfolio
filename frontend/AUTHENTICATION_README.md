# Portfolio App Authentication System

This portfolio app now includes Firebase Authentication with Phone Number OTP (SMS) service. Users can log in using their phone number and receive a verification code via SMS.

## Features

- ✅ Phone number authentication with OTP
- ✅ reCAPTCHA integration for security
- ✅ Protected routes for admin features
- ✅ User profile display
- ✅ Automatic session management
- ✅ Logout functionality
- ✅ Loading states and error handling

## How It Works

### 1. Authentication Flow
1. User enters their phone number
2. reCAPTCHA verification is completed
3. Firebase sends an OTP to the phone number
4. User enters the 6-digit verification code
5. Upon successful verification, user is logged in
6. Session persists across browser refreshes

### 2. Protected Features
- Creating new portfolios (requires authentication)
- Editing existing portfolios (requires authentication + admin mode)
- Admin controls (requires authentication + admin mode)

### 3. User Experience
- Clean, modern login interface
- Loading states during authentication
- Error handling with user-friendly messages
- User profile display with logout option
- Automatic redirect after successful login

## File Structure

```
src/
├── firebase.js                 # Firebase configuration
├── contexts/
│   └── AuthContext.jsx        # Authentication context provider
├── components/
│   ├── Login.jsx              # Login component with OTP
│   ├── ProtectedRoute.jsx     # Route protection wrapper
│   ├── UserProfile.jsx        # User profile display
│   ├── LoadingSpinner.jsx     # Loading animation
│   └── AuthDemo.jsx           # Authentication demo
├── hooks/
│   └── useAuthState.js        # Custom auth hook
└── App.jsx                    # Main app with auth integration
```

## Components Overview

### Login.jsx
- Handles phone number input and OTP verification
- Integrates with Firebase Phone Authentication
- Includes reCAPTCHA verification
- Provides error handling and loading states

### AuthContext.jsx
- Manages global authentication state
- Provides user information throughout the app
- Handles automatic session persistence
- Offers logout functionality

### ProtectedRoute.jsx
- Wraps components that require authentication
- Automatically shows login screen for unauthenticated users
- Seamlessly integrates with existing components

### UserProfile.jsx
- Displays current user information
- Shows phone number and login status
- Provides logout button
- Positioned in top-left corner

## Usage Examples

### Basic Authentication Check
```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user.phoneNumber}!</div>;
}
```

### Protected Component
```jsx
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ProtectedRoute requireAuth={true}>
      <AdminPanel />
    </ProtectedRoute>
  );
}
```

### Custom Hook Usage
```jsx
import { useAuthState } from './hooks/useAuthState';

function MyComponent() {
  const { user, loading, logout } = useAuthState();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <p>Phone: {user?.phoneNumber}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Security Features

1. **reCAPTCHA Integration**: Prevents automated attacks
2. **Phone Number Verification**: Ensures real phone numbers
3. **Session Management**: Secure session handling
4. **Error Handling**: Prevents information leakage
5. **Rate Limiting**: Firebase handles abuse prevention

## Configuration

### Environment Variables
Create a `.env` file in your project root:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Firebase Setup
1. Create a Firebase project
2. Enable Phone Authentication
3. Configure reCAPTCHA
4. Add test phone numbers (for development)
5. Update the configuration in `src/firebase.js`

## Testing

### Development Testing
1. Add test phone numbers in Firebase console
2. Use test codes instead of real SMS
3. Test authentication flow
4. Verify protected routes work correctly

### Production Testing
1. Remove test phone numbers
2. Test with real phone numbers
3. Verify SMS delivery
4. Test logout and session management

## Troubleshooting

### Common Issues

1. **"reCAPTCHA not configured"**
   - Enable reCAPTCHA in Firebase console
   - Add your domain to reCAPTCHA settings

2. **"Invalid phone number"**
   - Use international format (+1234567890)
   - Remove spaces and special characters

3. **"SMS not received"**
   - Check Firebase console for errors
   - Verify phone number format
   - Check if using test phone numbers

4. **"Authentication failed"**
   - Check Firebase configuration
   - Verify API keys are correct
   - Check network connectivity

## Best Practices

1. **Security**
   - Use environment variables for sensitive data
   - Enable reCAPTCHA for production
   - Monitor Firebase usage

2. **User Experience**
   - Provide clear error messages
   - Show loading states
   - Handle edge cases gracefully

3. **Development**
   - Use test phone numbers for development
   - Test on multiple devices
   - Monitor Firebase console logs

## Future Enhancements

- [ ] Email authentication option
- [ ] Social login (Google, Facebook)
- [ ] Two-factor authentication
- [ ] User profile management
- [ ] Password reset functionality
- [ ] Account deletion
- [ ] Multi-language support

## Support

For issues related to:
- **Firebase Configuration**: Check [Firebase Documentation](https://firebase.google.com/docs)
- **Authentication Issues**: Review [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- **App-specific Issues**: Check the console logs and Firebase console

## License

This authentication system is part of the portfolio app and follows the same license terms. 