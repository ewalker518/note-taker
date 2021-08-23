const fs = require('fs')
const path = require('path');
const router = require('express').Router();
const notes = require('../db/db');
const generateUniqueId = require('generate-unique-id');

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', function (req, res) {
    res.json(notes);
});

router.get('/api/notes/:id', (req, res) => {
    res.json((notes[req.params.id]));
});

// POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client.
router.post('/api/notes', (req, res) => {
    console.log(notes);
    const newNote = req.body;
    const id = generateUniqueId({ // https://www.npmjs.com/package/generate-unique-id
        length: 5
       });
    newNote.id = id;
    notes.push(newNote);
    updateNotes();
    res.json(newNote);
});

function updateNotes() {
    fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
        if (err) throw err;
        return true;
    });
};

// function copied from https://stackoverflow.com/questions/3396088/how-do-i-remove-an-object-from-an-array-with-javascript
var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);
           return arr;
       }
    }
}

router.delete('/api/notes/:id', (req, res) => {
    removeByAttr(notes, 'id', req.params.id);
    updateNotes();
    res.json(notes);
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// GET /notes should return the notes.html file.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;