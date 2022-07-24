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
    const {title, text} = req.body;
    fs.readFile(path.join(__dirname,'./../db','db.json'), 'utf8', (err,data) => {
        if(err) {
            return res.status(500).json({err});
        }
        if(title && text) {
            let notesData = JSON.parse(data);
            let newId;
            if(notesData.length === 0) {
                newId = 0;
            } else {
                newId = notesData[notesData.length-1].id + 1;
            }
            console.log(newId);
            const newNote = {
                title,
                text,
                id: newId
            }
            notesData.push(newNote);
            fs.writeFile(path.join(__dirname,'./../db','db.json'), JSON.stringify(notesData), (err,data) => {
                if(err) {
                    console.log(err);
                    res.status(500).json("Error in posting note");
                }
            });
            const response = {
                status: "Success",
                body: newNote,
            };
            console.log(response);
            res.status(201).json(response);
        } else {
            res.status(400).json("Error in posting note");
        }
    });
}

const deleteNoteById = function(req,res) {
    let deleteId = parseInt(req.params.noteId);
    console.log(deleteId);
    console.log(typeof deleteId);
    fs.readFile(path.join(__dirname,'./../db','db.json'), 'utf8', (err,data) => {
        if(err) {
            return res.status(400).json({err});
        }
        let notesData = JSON.parse(data);
        let dataPostDelete = [];
        let deletedNote;
        for(let i=0; i<notesData.length; i++) {
            if(notesData[i].id === deleteId) {
                deletedNote = notesData[i];
                dataPostDelete = notesData.slice(0,i).concat(notesData.slice(i+1,notesData.length));
                break;
            }
        }
        fs.writeFile(path.join(__dirname,'./../db','db.json'), JSON.stringify(dataPostDelete), (err,data) => {
            if(err) {
                console.log(err);
                res.status(500).json("Error in posting note");
            }
        });
        const response = {
            status: "Success",
            body: deletedNote,
        };
        res.status(200).json(response);
    });
}

const getNoteById = function(req,res) {
    let getId = parseInt(req.params.noteId);
    fs.readFile(path.join(__dirname,'./../db','db.json'), 'utf8', (err,data) => {
        if(err) {
            return res.status(400).json({err});
        }
        notesData = JSON.parse(data);
        let getNote;
        for(let i=0; i<notesData.length; i++) {
            if(notesData[i].id === getId) {
                getNote = notesData[i];
            }
        }
        if(getNote !== undefined) {
            res.json(getNote);
        } else {
            res.status(404).json("Cannot find note");
        }
    });
}

module.exports = {getNotes, insertNote, deleteNoteById, getNoteById};