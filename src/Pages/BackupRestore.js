import React, { useState } from 'react';
import {
    Container,
    Button,
    FormGroup,
    FormControl,
    FormLabel,
    Dropdown
} from 'react-bootstrap';
import axios from 'axios';
const apiLinks = require('../api/config.json');

function BackupRestore() {
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    // const [backupFiles, setBackupFiles] = useState({});
    function handleBackup(e) {
        e.preventDefault();
        // Headers
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios
            .post(apiLinks.BACKUP, { name: name }, headersConfig)
            .then(res => {
                if (res.status === 200) alert('Backup Successful');
                else alert('Backup Failed!');
                window.location.reload(false);
            })
            .catch(err => console.log('Error code: ', err));
    }
    function handleRestore(e) {
        e.preventDefault();
        // Headers
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios
            .post(apiLinks.RESTORE, { name: file }, headersConfig)
            .then(res => {
                if (res.status === 200) alert('Restore Successful');
                else alert('Restore Failed!');
                window.location.reload(false);
            });
    }
    return (
        <Container>
            <h1>Backup</h1>
            <form onSubmit={handleBackup}>
                <FormGroup controlId="Backup_Name">
                    <FormControl
                        autoFocus
                        type="string"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <Button block bssize="large" type="submit" color="primary">
                    Backup
                </Button>
            </form>
            <h1>Restore</h1>

            <form onSubmit={handleRestore}>
                <FormGroup controlId="Restore_Name">
                    <FormControl
                        autoFocus
                        type="string"
                        value={file}
                        onChange={e => {
                            setFile(e.target.value);
                        }}
                    ></FormControl>
                </FormGroup>
                <Button block bssize="large" type="submit" color="primary">
                    Backup
                </Button>
            </form>
        </Container>
    );
}

export default BackupRestore;
