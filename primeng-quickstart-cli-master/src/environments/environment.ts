// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzENXVZsU2KF9d_aAfxw-M8J1BMU1dDU8",
  authDomain: "xstreaming-bf235.firebaseapp.com",
  projectId: "xstreaming-bf235",
  storageBucket: "xstreaming-bf235.appspot.com",
  messagingSenderId: "389904840919",
  appId: "1:389904840919:web:f51c67dd53b1d557401892",
  measurementId: "G-19DG85T21R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
