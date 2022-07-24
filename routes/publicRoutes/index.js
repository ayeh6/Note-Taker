const router = require('express').Router();
const path = require('path');

router.route('/')
    .get((req,res) => {
        res.sendFile(path.join(__dirname, './../../public/index.html'));
    });

router.route('/notes')
    .get((req,res) => {
        res.sendFile(path.join(__dirname, './../../public/notes.html'));
    });

module.exports = router;