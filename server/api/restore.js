const config = require('../config/db');
const express = require('express');
const router = express.Router();
// const mongodbRestore = require('mongodb-restore');
const terminal = require('child_process').exec;
const restore = require('../restoreFunction');
const testFolder = './BACKUPS';
const fs = require('fs');

// Run the restore function with the given name.
router.post('/', async (q, a) => {
    restore(q.body.name);
    a.send();
});

// Get restores that have been stored in the local BACKUPS/ directory
router.get('/', (q, a) => {
    fs.readdir(testFolder, (err, files) => {
        var listOfFiles = [];
        files.forEach((file) => {
            var tempFile = file;
            tempFile = tempFile.toString();
            listOfFiles.push(tempFile);
        });
        listOfFiles = listOfFiles.filter((file) => file !== '.DS_Store');
        a.json({ listOfFiles });
    });
});

module.exports = router;
