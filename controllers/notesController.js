const { Console } = require('console');
const fs = require('fs');
const path = require('path');

const getNotes = function(req,res) {
    fs.readFile(path.join(__dirname,'./../db','db.json'), 'utf8', (err,data) => {
        if(err) {
            return res.status(400).json({err});
        }
        res.json(JSON.parse(data));
    });
}

const insertNote = function(req,res) {
    const note = req.body;
    fs.readFile(path.join(__dirname,'./../db','db.json'), 'utf8', (err,data) => {
        if(err) {
            return res.status(400).json({err});
        }
        let noteJSONData = JSON.parse(data);
        console.log(note);
        res.json(note);
        const newNote = {

        }

    });
}

const deleteNoteById = function(req,res) {

}

const getNoteById = function(req,res) {

}

const updateNoteById = function(req,res) {

}

module.exports = {getNotes, insertNote, deleteNoteById, getNoteById, updateNoteById};