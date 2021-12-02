const express = require('express');
const {showAllCategories,getWordsFromOneCategories,addWordToCategories,deleteWord,editWord} = require("../controlers/wordControllers");
const {readdir} = require('fs').promises
const {db} = require("../utils/words");

const clientRouter = express.Router();

clientRouter
    .get('/',showAllCategories)
    .get('/:categories',getWordsFromOneCategories)
    .post('/:categories', addWordToCategories)
    .delete('/:categories/:id',deleteWord)
    .put('/:categories/:id',editWord)




module.exports = {
    clientRouter,
}