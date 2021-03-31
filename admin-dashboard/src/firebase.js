import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA6tHLZ8KZOFjVNFfzwBL4JAmYTZa6lhbQ',
  authDomain: 'mon-projet-test-5146e.firebaseapp.com',
  projectId: 'mon-projet-test-5146e',
  storageBucket: 'mon-projet-test-5146e.appspot.com',
  messagingSenderId: '385213710178',
  appId: '1:385213710178:web:f7fef9ffe6a981086a763b',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
