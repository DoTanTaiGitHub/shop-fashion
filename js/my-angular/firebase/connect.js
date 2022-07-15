var app = angular.module("app", ["firebase"]);
app.config(function() {
  var config = {
    apiKey: "AIzaSyAZHYcZeOoGe6CXajIRAjwquPrN-C6vN3U",               // Your Firebase API key
    authDomain:"assignmentweb207-8edcb.firebaseapp.com",       // Your Firebase Auth domain ("*.firebaseapp.com")
    databaseURL: "https://assignmentweb207-8edcb-default-rtdb.firebaseio.com",    // Your Firebase Database URL ("https://*.firebaseio.com")
    storageBucket: "assignmentweb207-8edcb.appspot.com"  // Your Cloud Storage for Firebase bucket ("*.appspot.com")
  };
  firebase.initializeApp(config);
});

