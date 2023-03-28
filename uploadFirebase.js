// Import necessary firebase functions, to initialize app and get auth credentials 
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

// Import your firebase config or paste the firebase config in your Firebase Project Settings > General
const {firebaseAppConfig} = require('./firebaseAppConfig')

// axios for making API request to the Firebase REST API 
const axios = require('axios')

// dotenv enable the use of .env files
const dotenv = require('dotenv')
dotenv.config()

/**
 * A function to upload to your Firebase's Realtime Database using Firebase's REST API PUT command. 
 * returns a Promise Object
 * @param payload : JSON object containing multiple Objects
 * @returns A promise object that resolve with response of the API Request and reject with the API Error Msg
 */
async function firebaseUpload(payload){
  const firebaseConfig = firebaseAppConfig()
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  return new Promise((resolve,reject) => {
    signInWithEmailAndPassword(auth, process.env.FIREBASE_ACCOUNT_EMAIL, process.env.FIREBASE_ACCOUNT_PASSWORD)
    .then((userCredential) => {
      const user = userCredential.user;
      axios({
        method: 'put',
        url: `${process.env.FIREBASE_DATABASE_URL}.json?auth=${user.accessToken}`,
        data:{list:payload}
      }).then( res => resolve(res))
    })
    .catch((error) => {
      reject(error)
  });
  })
}

module.exports = {firebaseUpload}
