/**
 * Sentiment Analysis Class using the AFINN-111 dataset (see ./data). Note that many problems such as cassifying 'I do not dislike sth' as negative can occur!
 * @author Mitterdorfer <mitterdorfer.moritz@gmail.com>
 * @version 0.0.1
 */

class SentimentAnalysis {

    /**
     * Constructor function 
     * @param {String} path the path to the 'AFINN-111.json' file
     */
    constructor(path) {
        this.path = path;
        let json = this.getJSON(path);
        /** words = ['word1', ...] */
        this.words = json.words;
        /** lookup = { word: score, ... } */
        this.lookup = json.lookup;
    }

    /**
     * This function returns a JSON object (AFINN-111.json)
     * @param {String} path the path to the 'AFINN-111.json' file
     */
    getJSON(path) {
        const fs = require('fs');
        let content = fs.readFileSync(path, err => {
            if(err) throw err;
        });
        return JSON.parse(content);
    }

    /**
     * This function returns the sentiment score for a particular string
     * @param {String} string the input string, for instance a sentence
     * @returns an object containing the sentiment score for the string: negative if sentiment is negative (e.g. 'sad'), positive if sentiment is positive (e.g. 'happy')
     */
    getScore(string) {
        /** lowercase */
        string = string.toLowerCase();
        /** remove dots etc. */
        let replacements = ['.', '!', '?', ':', ';', ','];
        for(let i of replacements)
            string = string.split(i).join('')
        /** split on ' ' */
        string = string.split(' ');
        /** calculate score */
        let score = 0;
        let cases = 0;
        let words = []
        for(let i of string) {
            if(this.words.includes(i)) {
                score += this.lookup[i];
                cases++;
                words.push(i);
            }
        }
        /** divide score by cases */
        score /= (cases || 1);
        return { score , cases, words };
    }

    /**
     * This function returns the sentiment score of a file 
     * @param {String} pathToFile path to the input file
     * @returns an object containing the sentiment score for the string: negative if sentiment is negative (e.g. 'sad'), positive if sentiment is positive (e.g. 'happy')
     */
    scoreFile(pathToFile) {
        let score = 0;
        let cases = 0;
        const fs = require('fs');
        let content = fs.readFileSync(pathToFile, 'utf8', err => {
            if(err) throw err;
        });
        content = content.split('\n').join(' ');
        return this.getScore(content);
    }

}

module.exports = SentimentAnalysis;