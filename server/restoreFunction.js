const config = require('./config/db');
const terminal = require('child_process').exec;
module.exports = function restore(name) {
    let command =
        'mongorestore --uri="' +
        config.URI +
        '" ' +
        './BACKUPS/' +
        name +
        ' --drop --gzip';
    terminal(command, err => {
        if (err) {
            console.log('x Restore Failed. Name : ', name, ', Error: ', err);
        } else {
            console.log('✔️ Restore Successful. Name : ', name);
        }
    });
};
