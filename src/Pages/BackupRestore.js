import React, { useState, useEffect } from 'react';
import {
    Container,
    Button,
    FormGroup,
    FormControl,
    FormLabel,
    Dropdown,
} from 'react-bootstrap';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
const apiLinks = require('../api/config.json');

// Backup and restore page
function BackupRestore() {
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [backupFiles, setBackupFiles] = useState([]);

    useEffect(() => {
        axios
            .get(apiLinks.RESTORE)
            .then(async (res) => {
                setBackupFiles(await res.data.listOfFiles);
            })
            .catch((err) => console.log('Error code: ', err));
    }, [backupFiles]);

    async function handleBackup(e) {
        e.preventDefault();
        // Headers
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        await axios
            .post(apiLinks.BACKUP, { name: name }, headersConfig)
            .then((res) => {
                if (res.status === 200) alert('Backup Successful');
                else alert('Backup Failed!');
                window.location.reload(false);
            })
            .catch((err) => console.log('Error code: ', err));

        await axios
            .get(apiLinks.RESTORE)
            .then(async (res) => {
                setBackupFiles(await res.data.listOfFiles);
            })
            .catch((err) => console.log('Error code: ', err));
    }
    function handleRestore(e) {
        e.preventDefault();
        // Headers
        const headersConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        axios
            .post(apiLinks.RESTORE, { name: file }, headersConfig)
            .then((res) => {
                if (res.status === 200) alert('Restore Successful');
                else alert('Restore Failed!');
                window.location.reload(false);
            });
    }
    return (
        <Container>
            <br></br>
            <h2>
                <strong>Backup</strong>
            </h2>

            <form onSubmit={handleBackup}>
                <FormGroup controlId="Backup_Name">
                    <FormControl
                        autoFocus
                        type="string"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <p></p>

                <Button block bssize="large" type="submit" color="primary">
                    Backup
                </Button>
            </form>
            <br></br>
            <br></br>
            <br></br>
            <h2>
                <strong>Restore</strong>
            </h2>
            <p></p>

            <form onSubmit={handleRestore}>
                <Autocomplete
                    id="combo-box-customers"
                    options={backupFiles}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Backups"
                            variant="outlined"
                        />
                    )}
                    onChange={(event, value) => {
                        setFile(value);
                    }}
                />
                <br></br>

                <Button block bssize="large" type="submit" color="primary">
                    Restore
                </Button>
            </form>
        </Container>
    );
}

export default BackupRestore;
