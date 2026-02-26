importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js")

firebase.initializeApp({
  apiKey: "AIzaSyD2sp4YsZDlEr2r_RIq5zbE1hqgI20lmvw",
  authDomain: "joking-app-d3e29.firebaseapp.com",
  projectId: "joking-app-d3e29",
  storageBucket: "joking-app-d3e29.firebasestorage.app",
  messagingSenderId: "156633010732",
  appId: "1:156633010732:web:5ac80fcc9fcbb0aec9f789",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon-192.png",
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})