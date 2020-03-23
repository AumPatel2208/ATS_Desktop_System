const config = require('../config/db');
const express = require('express');
const router = express.Router();
// const mongodbRestore = require('mongodb-restore');
const mongodbBackup = require('mongodb-backup');
const terminal = require('child_process').exec;
const backup = require('../backupFunction');

router.post('/', (q, a) => {
    if (q.body.name) backup(q.body.name, false);
    else backup('', false);

    a.json({ msg: 'Backup Up Data' });
});

module.exports = router;
