const {readFile} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');


class Words{
    constructor(wordsFileName) {
        this.wordsFileName = join(__dirname, '../data',`${wordsFileName}.json`);
        this._load();
    }
    async _load() {
        this._data = JSON.parse(await readFile(this.wordsFileName,'utf8')).map(obj => obj);
    }

    create(obj) {
        const id = uuid();
        this._data.push({id, ...obj})
    }

}

