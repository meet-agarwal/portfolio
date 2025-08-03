# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication with Phone Number OTP (SMS) service for your portfolio app.

## Prerequisites

1. A Google account
2. A Firebase project
3. A phone number for testing

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "portfolio-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project console, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Phone" provider
5. Enable it by clicking the toggle switch
6. Click "Save"

## Step 3: Configure Phone Authentication

1. In the Phone provider settings, you can:
   - Set up test phone numbers (for development)
   - Configure SMS templates
   - Set up reCAPTCHA verification

### Test Phone Numbers (Development Only)
For testing, you can add test phone numbers that will receive OTP codes without actually sending SMS:
1. In Phone provider settings, click "Phone numbers for testing"
2. Add your phone number in international format (e.g., +1234567890)
3. Add a test code (e.g., 123456)

## Step 4: Get Firebase Configuration

1. In your Firebase project console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "portfolio-web")
6. Copy the Firebase configuration object

## Step 5: Update Firebase Configuration

1. Open `src/firebase.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 6: Enable reCAPTCHA (Required for Phone Auth)

1. In Firebase console, go to Authentication > Settings
2. Scroll down to "reCAPTCHA Enterprise" section
3. Click "Enable reCAPTCHA Enterprise"
4. Choose "reCAPTCHA v3" or "reCAPTCHA v2"
5. Add your domain (for development, add `localhost`)

## Step 7: Test the Authentication

1. Start your development server: `npm run dev`
2. Navigate to your app
3. Try logging in with a phone number
4. If using test phone numbers, use the test code you set up
5. If using real phone numbers, you'll receive an actual SMS

## Important Notes

### Free Tier Limits
- Firebase Phone Authentication has a free tier with limits:
  - 10,000 phone number verifications per month
  - Additional verifications cost $0.01 each

### Security Considerations
- Phone authentication requires reCAPTCHA to prevent abuse
- Test phone numbers should only be used in development
- Remove test phone numbers before production deployment

### Production Deployment
1. Remove all test phone numbers
2. Configure proper reCAPTCHA domains
3. Set up proper security rules
4. Monitor usage to stay within free tier limits

## Troubleshooting

### Common Issues

1. **"reCAPTCHA not configured"**
   - Make sure reCAPTCHA is enabled in Firebase console
   - Check that your domain is added to reCAPTCHA settings

2. **"Invalid phone number format"**
   - Ensure phone numbers are in international format (+1234567890)
   - Remove any spaces or special characters

3. **"SMS not received"**
   - Check if you're using a test phone number with test code
   - Verify the phone number format
   - Check Firebase console for any error messages

4. **"Too many requests"**
   - You may have hit the rate limit
   - Wait a few minutes before trying again
   - Check your Firebase usage in the console

### Getting Help

- [Firebase Documentation](https://firebase.google.com/docs/auth)
- [Firebase Phone Auth Guide](https://firebase.google.com/docs/auth/web/phone-auth)
- [Firebase Console](https://console.firebase.google.com/)

## Environment Variables (Optional)

For better security, you can use environment variables for Firebase config:

1. Create a `.env` file in your project root
2. Add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

3. Update `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

Remember to add `.env` to your `.gitignore` file to keep your credentials secure! 