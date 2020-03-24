const config = require('./config/db');
const terminal = require('child_process').exec;

module.exports = function backup(name, isAuto) {
    // if (!name) name = '';
    var path = '.';
    if (name === '') {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '-' + mm + '-' + yyyy;
        //Add date to path
        path = './BACKUPS/BACKUP_' + today;
    } else {
        path = './BACKUPS/' + name;
    }
    const command =
        'mongodump --uri="' + config.URI + '" --out="' + path + '" --gzip';

    terminal(command, err => {
        if (err) {
            var msg = () => {
                return (
                    'x Database Backup Failed. Status: ' +
                    (isAuto ? 'Auto' : 'Manual') +
                    ', Error: ' +
                    err
                );
            };
            console.log(msg);
            return msg;
        } else {
            var msg = () => {
                return (
                    '✔️ Database Backup Completed. Status: ',
                    isAuto ? 'Auto' : 'Manual',
                    ', Path: ',
                    path
                );
            };
            console.log();
            return msg;
        }
    });
};
