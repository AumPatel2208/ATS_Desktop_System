const config = require('./config/db');
const terminal = require('child_process').exec;

// Function that performs the Restore.
// It runs a command on the terminal that uses the MongoDB CLI with the passed in name.
module.exports = function restore(name) {
    let command =
        'mongorestore --uri="' +
        config.URI +
        '" ' +
        './BACKUPS/' +
        name +
        ' --drop --gzip';
    terminal(command, (err) => {
        if (err) {
            console.log('x Restore Failed. Name : ', name, ', Error: ', err);
            return false;
        } else {
            console.log('✔️ Restore Successful. Name : ', name);
            return true;
        }
    });
};
