const fs = require('fs')
const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// GET /notes should return the notes.html file.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// GET * should return the index.html file.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', function(req, res) {
    res.json(notes);
});

router.get('/api/notes/:id', (req, res) => {
    res.json((notes[req.params.id]));
});

// POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client.
router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    createNewNote()
});

function createNewNote() {
    fs.writeFile('./db/db.json', JSON.stringify(notes))
}
// You'll need to find a way to give each note a unique id when it's saved 
// (look into npm packages that could do this for you).

module.exports = router;