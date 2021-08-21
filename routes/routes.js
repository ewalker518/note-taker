const fs = require('fs')
const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../develop/public/index.html'));
});

// GET /notes should return the notes.html file.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../develop/public/notes.html'));
});

// GET * should return the index.html file.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../develop/public/index.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes shoudsld receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved 
// (look into npm packages that could do this for you).

module.exports = router;