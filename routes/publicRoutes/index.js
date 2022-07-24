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

router.route('/assets/css/style.css')
    .get((req,res) => {
        res.sendFile(path.join(__dirname, './../../public/assets/css/styles.css'));
    });

router.route('/assets/js/index.js')
    .get((req,res) => {
        res.sendFile(path.join(__dirname, './../../public/assets/js/index.js'));
    });

module.exports = router;