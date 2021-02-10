//set up Service Client, admin is the window to have all data in the firebase
const admin = require('firebase-admin');

const functions = require('firebase-functions');
const createUser = require('./func/create_user');
const requestOnetimePassword = require('./func/request_onetime_password');
const verifyOnetimePassword = require('./func/verify_onetime_password');

const serviceAccount = require('./service_account.json')


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-authentication-13d8a-default-rtdb.firebaseio.com"
});


// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createUser = functions.https.onRequest(createUser);
exports.requestOnetimePassword = functions.https.onRequest(requestOnetimePassword);
exports.verifyOnetimePassword = functions.https.onRequest(verifyOnetimePassword);