/**
 * normalizeMood function
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description this function normalizes a mood to be in range [0;1]
 * @param {Number} mood the user's mood, which is in range [-5;5]
 */
const normalizeMood = (mood) => {
    return ((mood / 5) + 1) / 2;
}

module.exports = normalizeMood;