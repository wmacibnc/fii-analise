var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");
require('dotenv').config()
module.exports = admin.initializeApp({

  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key.replace(/\\n/g, '\n'),
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o0uwt%40fii-analise.iam.gserviceaccount.com"
    
  }),



});

const db = admin.firestore();

module.exports = db;