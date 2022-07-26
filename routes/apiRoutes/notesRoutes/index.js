const router = require('express').Router();
const notesController = require('./../../../controllers/notesController');

router.route('/')
    .get(notesController.getNotes)
    .post(notesController.insertNote);

router.route('/:noteId')
    .delete(notesController.deleteNoteById);

module.exports = router;