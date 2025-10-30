// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import firebaseConfig from "./firebaseEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

GoogleSignin.configure({
  webClientId:
    "375700181421-338cbpovcsvscl9gm7tuvr7m6uqg8n5n.apps.googleusercontent.com",
});

export const db = getFirestore(app);

const storage = getStorage(app);

export const getStorageRef = (path) => ref(storage, path);

export const getDownloadUrl = async (path) => {
  const storageRef = getStorageRef(path);
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
};
