// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDmY_eLzsaSqDj64-96lcQmT4JVrckOfoc",
  authDomain: "test-intra-push.firebaseapp.com",
  projectId: "test-intra-push",
  storageBucket: "test-intra-push.firebasestorage.app",
  messagingSenderId: "467892329861",
  appId: "1:467892329861:web:df9a81fa88f14843f4f8ec",
  measurementId: "G-PH1PLLT9Z3"
};

const app = initializeApp(firebaseConfig);

// Init analytics seulement si le navigateur le supporte
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
    console.log("✅ Firebase Analytics initialized:", analytics);
  } else {
    console.warn("⚠️ Firebase Analytics not supported in this environment.");
  }
});

export default app;
