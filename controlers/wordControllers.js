const {readFile,writeFile,readdir} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');
const _PATHTOCATEGORIES = join(__dirname, '../data');

exports.showAllCategories = async(req,res) => {
    const allCategories = [];
    try {
        const files = await readdir(_PATHTOCATEGORIES);
        for (const file of files) {
            allCategories.push(file)
            console.log(file);
        }
    } catch (err) {
        console.error(err);
    }
    const onlyName = allCategories.map(item => item.slice(0,item.length-5))
    res.json(onlyName)
}

exports.getWordsFromOneCategories = async(req,res) => {
    const categories = req.params.categories;
    const pathToWords = join(__dirname,`../data/${categories}.json`);
    const respons = await readFile(pathToWords,'utf8');
    const wordsArray = JSON.parse(respons);
    res.json(wordsArray)
}

exports.addWordToCategories = async (req,res) => {
    const {word} = req.body;
    word.id = uuid();
    const categories = req.params.categories;
    const pathToWords = join(__dirname,`../data/${categories}.json`);
    try {
        const respons = await readFile(pathToWords,'utf8');
        const wordsArray = JSON.parse(respons);
        wordsArray.push(word)
        await writeFile(pathToWords, JSON.stringify(wordsArray));
        res.json(wordsArray)
    } catch (error) {
        const wordsArray =[];
        wordsArray.push(word)
        await writeFile(pathToWords, JSON.stringify(wordsArray));
        res.json(wordsArray)

    }
    // const respons = await readFile(pathToWords,'utf8');
    // const wordsArray = JSON.parse(respons);
    // wordsArray.push(word)
    // await writeFile(pathToWords, JSON.stringify(wordsArray));
    // res.json(wordsArray)
}

exports.deleteWord = async (req,res) => {
    const id = String(req.params.id);
    const categories = req.params.categories;
    const pathToWords = join(__dirname,`../data/${categories}.json`);
    const respons = await readFile(pathToWords, 'utf8');
    const wordsArray = JSON.parse(respons);
    const filterArray = wordsArray.filter(word => word.id !== id);
    await writeFile(pathToWords, JSON.stringify(filterArray));
    res.json(filterArray.length);
}

exports.editWord = async (req,res) => {
    const {polishWord:polish,englishWord:english} = req.body;
    const id = String(req.params.id);
    const categories = req.params.categories;
    const pathToWords = join(__dirname,`../data/${categories}.json`);
    const respons = await readFile(pathToWords,'utf8');
    const wordsArray = JSON.parse(respons);
    const word = {
        polish,
        english,
    }
    console.log(word)
    console.log('wykonuje sie edycja')
    let editArray = wordsArray.map(oneObj => {
        if (oneObj.id === id) {
            console.log('zmieniam cos')
            return {
                ...oneObj,
                ...word,
            }
        } else {
            return oneObj
        }
    })
    // console.log(editArray)
    await writeFile(pathToWords, JSON.stringify(editArray));
    res.json(editArray)
}
