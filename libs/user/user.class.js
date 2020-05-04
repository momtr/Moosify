/**
 * /auth index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description class for storing/retrieving user data from the DB
 */

class UserStorage {

    /**
     * @description returns user object from database
     */
    static async getUserObject(userID) {
        const firebaseDB = require('../database/database');
        const db = new firebaseDB.FirebaseRealTime();
        /** get his songs */
        let response = await db.getData('users/' + userID);
        b.off();
        return response;
    }

    /**
     * @description returns recently played songs
     */
    static async getRecentlyPlayedSongs(userID) {
        const firebaseDB = require('../database/database');
        const db = new firebaseDB.FirebaseRealTime();
        let reponse = await db.getData(`users/${userID}/recentlyPlayedSongs`);
        b.off();
        return response;
    }

    /**
     * @description stores a user in the database
     */
    static storeUser(json) {
        const firebaseDB = require('../database/database');
        const db = new firebaseDB.FirebaseRealTime();
        json.recentlyPlayedSongs = [0];
        db.insertData('users', json.id, json);
        db.off();
    }

}

module.exports = UserStorage;