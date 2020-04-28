// Association-rule mining (Apriori algorithm) 
// Mitterdorfer, 2020

class Apriori {

    constructor(data, minSupport = 2, minConfidence = .4) {
        this.data = data;
        this.els = [];
        this.elsScores = {};
        this.minSupport = minSupport; 
        this.minConfidence = minConfidence;
        for(let i of this.data) {
            for(let j of i) {
                if(this.els.indexOf(j) === -1) {
                    let score = this.support([j]);
                    if(score >= this.minSupport) {
                        this.els.push(j);
                        this.elsScores[j] = score
                    }
                }
            }
        }
    }

    async expand() {
        let els = [];
        for(let i = 0; i < this.els.length; i++) {
            for(let j = i+1; j < this.els.length; j++) {
                els.push([this.els[i], this.els[j]]);
            }
        }
        return await this.expandList(els, 0, els.filter(a => this.support(a) >= this.minSupport));
    }

    async getRules() {
        let sets = await this.expand();
        let rules = [];
        for(let set of sets) {
            for(let j = 0; j < set.length; j++) {
                let rule = [set.slice(0,j).concat(set.slice(j+1,set.length)), [set[j]]];
                let confidence = this.confidence(rule);
                if(confidence >= this.minConfidence)
                    rules.push({ rule, confidence });
            }
        }
        return rules.sort((a, b) => {
            if(a.confidence > b.confidence) return -1;
            else                            return 1;
        });
    }

    async expandList(els, k = 0, current = []) {
        console.log('k', k)
        /** get all pairs */
        let newPairs = [];
        for(let i = 0; i < els.length; i++) {
            let a = els[i].slice(0, k + 1);
            for(let j = i+1; j < els.length; j++) {
                let b = els[j].slice(0, k + 1);
                if(this.arEquals(a, b)) {
                    let lastPart = els[j].slice(k + 1, k + 2);
                    newPairs.push(els[i].concat(lastPart));
                }
            }
        }
        /** check if it is allowed to exist => filter array */
        newPairs = newPairs.filter(a => this.support(a) >= this.minSupport);
        if(newPairs.length === 0)
            return current;
        for(let i of newPairs)
            current.push(i);
        return this.expandList(newPairs, k+1, current);
    }

    support(el) {
        let sum = 0;
        for(let i of this.data) {
            if(this.isSubset(i, el))
                sum++;
        }
        return sum;
    }

    confidence(rule) {
        let a = Array.isArray(rule[0]) ? rule[0] : [rule[0]],
            b = Array.isArray(rule[1]) ? rule[1] : [rule[1]];
        return this.support(a.concat(b)) / this.support(a);
    }

    arEquals(arA, arB) {
        if(arA.length != arB.length) return false;
        for(let i = 0; i < arA.length; i++) 
            if(arA[i] != arB[i]) return false;
        return true;
    }

    isSubset(set, subset) {
        for(let i of subset) {
            if(!set.includes(i)) return false;
        }
        return true;
    }

}