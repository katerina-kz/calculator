import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function ProjectFeaturesInputs(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Check</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Platforms</TableCell>
                        <TableCell>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="left"
                                        control={<Checkbox color="primary" />}
                                        label="Web"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="left"
                                        control={<Checkbox color="primary" />}
                                        label="Mobile"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="left"
                                        control={<Checkbox color="primary" />}
                                        label="Desktop"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Buildings count</TableCell>
                        <TableCell>
                            <TextField
                                className='number-input'
                                label="Number"
                                type="number"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Building facade complexity</TableCell>
                        <TableCell>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="left"
                                        control={<Checkbox color="primary" />}
                                        label="Minimal"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="left"
                                        control={<Checkbox color="primary" />}
                                        label="Middle"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="left"
                                        control={<Checkbox color="primary" />}
                                        label="Maximum"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Unique buildings count</TableCell>
                        <TableCell>
                            <TextField
                                className='number-input'
                                label="Number"
                                type="number"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Unique apartment count</TableCell>
                        <TableCell>
                            <TextField
                                className='number-input'
                                label="Number"
                                type="number"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>360-tours count - apartments</TableCell>
                        <TableCell>
                            <TextField
                                className='number-input'
                                label="Number"
                                type="number"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>360-tours count - amenities</TableCell>
                        <TableCell>
                            <TextField
                                className='number-input'
                                label="Number"
                                type="number"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Environment complexity</TableCell>
                        <TableCell>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="left"
                                        control={<Checkbox color="primary" />}
                                        label="Minimal"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="left"
                                        control={<Checkbox color="primary" />}
                                        label="Middle"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="left"
                                        control={<Checkbox color="primary" />}
                                        label="Maximum"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                </TableBody>
        </TableContainer>
    );
}

export default ProjectFeaturesInputs;