

/**ZROBIC WALIDACJE **/
//
// class Word{
//     constructor(obj) {
//         const {polish,english,id} = obj;
//         if(!id || typeof id !== 'string') {
//             throw new ValidationError('Id musi byc tekstem')
//         }
//
//         if(!polish || typeof  polish !== 'string' || polish.length < 1) {
//             throw new ValidationError('Słowo nie może być pustym stringiem');
//         }
//
//         if(!english || typeof  english !== 'string' || english.length < 1) {
//             throw new ValidationError('Słowo nie może być pustym stringiem');
//         }
//
//
//         this.id = id;
//         this.polish = polish;
//         this.english = english
//
//     }
// }
//
// module.exports = {
//     Word,
// }