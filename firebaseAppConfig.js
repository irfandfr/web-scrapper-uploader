const firebaseAppConfig = () =>{
  const firebaseConfig = {
    apiKey: "YourAPIKEY",
    authDomain: "yourDomain.firebaseapp.com",
    databaseURL: "https://yourDomain-default-rtdb.firebaseio.com",
    projectId: "yourAppProjectId",
    storageBucket: "yourDomain.appspot.com",
    messagingSenderId: "senderId",
    appId: "appID",
    measurementId: "measurementID"
  };
  return firebaseConfig
}

module.exports = {firebaseAppConfig}