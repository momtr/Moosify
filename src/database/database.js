/**
 * src/database.js
 * @authors Biswas, Maitz, Miterdorfer
 * @version 0.0.1
 * @date 04/2020
 * @description database connection (Google Firebase)
 */

 /** use NPM module */
 const admin = require('firebase-admin');
 /** retrieve credentails from json file */
 const serviceAccount = require('./credentials/moosify.json');
 /** initialize the app */
 admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: 'https://moosify-832c9.firebaseio.com'
 });
 
 /** create the database */
 const db = admin.database();
 const ref = db.ref('restricted_access/secret_document');
 
 /**
  * @description this function inserts data into the database
  * @param {String} table the root node that we want to access (e.g. 'users')
  * @param {String} id the id (i.e. primary key) of the object we want to store
  * @param {JSON} json the json data of the users
  */
 function insertData(table, id, json) {
     let idRef = ref.child(table).child(id);
     idRef.set(json);
 }
 
 /**
  * @description this function returns all data of a specified root node (e.g. 'users')
  * @param {String} table the root node 
  * @returns a promise that contains the data when resolved
  */
 async function getData(table) {
     return await ref.child(table).once('value').then(data => data.val());
 }