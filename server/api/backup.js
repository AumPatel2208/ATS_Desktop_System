const config = require('../config/db');
const express = require('express');
const router = express.Router();
// const mongodbRestore = require('mongodb-restore');
const mongodbBackup = require('mongodb-backup');
const terminal = require('child_process').exec;
const backup = require('../backupFunction');

router.post('/', (q, a) => {
    var msg = '';
    if (q.body.name || q.body.name !== '') backup(q.body.name, false);
    else backup('', false);

    // console.log(msg);

    // a.status(503).json({ msg: msg });

    a.send();

    // isDone
    //     ?
    //     :
});

module.exports = router;
