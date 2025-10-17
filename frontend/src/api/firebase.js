import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const API_KEY = import.meta.env.VITE_APIKEY
const AUTH_DOMAIN = import.meta.env.VITE_AUTHDOMAIN
const PROJECT_ID = import.meta.env.VITE_PROJECTID
const STORAGE_BUCKET = import.meta.env.VITE_STORAGEBUCKET
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGINGSENDERID
const APP_ID = import.meta.env.VITE_APPID
const MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENTID

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = async (file) => {
  if (!file) return null;

  const timestamp = Date.now();
  const fileName = `profile-images/${timestamp}-${file.name}`;
  const storageRef = ref(storage, fileName);

  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};