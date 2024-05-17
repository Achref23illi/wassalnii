// backend/firebase.js
const admin = require("firebase-admin");

// Replace the following with your service account JSON file path
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wassalni-7002c-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

module.exports = { db, FieldValue: admin.firestore.FieldValue };
