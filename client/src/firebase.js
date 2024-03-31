// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1OHUIp40pvVYXqIdBKxgcp2TkMx-5Db4",
  authDomain: "practicess.firebaseapp.com",
  projectId: "practicess",
  storageBucket: "practicess.appspot.com",
  messagingSenderId: "119585651761",
  appId: "1:119585651761:web:a61fd10aac816e293da910",
  measurementId: "G-6RRGRRZJ2R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
