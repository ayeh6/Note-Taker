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
            let noteJSONData = JSON.parse(data);
            const newId = noteJSONData[noteJSONData.length-1].id + 1;
            console.log(newId);
            const newNote = {
                title,
                text,
                id: newId
            }
            noteJSONData.push(newNote);
            fs.writeFile(path.join(__dirname,'./../db','db.json'), JSON.stringify(noteJSONData), (err,data) => {
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
        let dataObj = JSON.parse(data);
        let dataPostDelete = [];
        let deletedNote;
        for(let i=0; i<dataObj.length; i++) {
            if(dataObj[i].id === deleteId) {
                deletedNote = dataObj[i];
                dataPostDelete = dataObj.slice(0,i).concat(dataObj.slice(i+1,dataObj.length));
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

}

const updateNoteById = function(req,res) {

}

module.exports = {getNotes, insertNote, deleteNoteById, getNoteById, updateNoteById};