importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyD54IEHcdVYW5DTZ8NDV364PJTVvzTxgGM',
  authDomain: 'molde-c0a96.firebaseapp.com',
  databaseURL: 'https://molde-c0a96.firebaseio.com',
  projectId: 'molde-c0a96',
  storageBucket: 'molde-c0a96.appspot.com',
  messagingSenderId: '76982314600',
  appId: '1:76982314600:web:cd427b9662357cfb697ddd',
});

const messaging = firebase.messaging();
