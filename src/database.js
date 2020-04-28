/**
 * src/database.js
 * @authors Biswas, Maitz, Miterdorfer
 * @version 0.0.1
 * @date 04/2020
 * @description database connection (mySQL)
 */

 /** the database npm module */
 const mysql = require('mysql');

 const connection = mysql.createConnection({
     host: '',
     user: process.env.DB_USER ? '' : '',
     password: process.env.DB_PASSWORD ? '' : ''
 });