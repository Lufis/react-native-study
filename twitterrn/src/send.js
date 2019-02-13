var admin = require("firebase-admin");

var serviceAccount = require("../pushnotficationtwitterrn-firebase-adminsdk-5r5bk-dd0ec1975a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pushnotficationtwitterrn.firebaseio.com"
});