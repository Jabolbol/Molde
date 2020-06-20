import Firebase from 'firebase/app';
import 'firebase/messaging';

export const firebase = Firebase.initializeApp({
  apiKey: 'AIzaSyD54IEHcdVYW5DTZ8NDV364PJTVvzTxgGM',
  authDomain: 'molde-c0a96.firebaseapp.com',
  databaseURL: 'https://molde-c0a96.firebaseio.com',
  projectId: 'molde-c0a96',
  storageBucket: 'molde-c0a96.appspot.com',
  messagingSenderId: '76982314600',
  appId: '1:76982314600:web:cd427b9662357cfb697ddd',
});

export const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  'BNaeYUGqkJWAvNbQVDA5QI7lQm1z0lkjNmnwXWmMZv9HMdXIBK7jC3F-cx1876PgHDyknGOgRn8H4qf1fI9YXbQ'
);
