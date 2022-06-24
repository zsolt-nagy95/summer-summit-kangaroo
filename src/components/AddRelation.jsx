import { Autocomplete, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import {org, relationShipTypes} from '../constant/org'


function AddRelation({onAdd}) {
    const [employeeFrom, setEmployeeFrom] = useState(null)
    const [employeeTo, setEmployeeTo] = useState(null)
    const [relations, setRelations] = useState([])

    const handleRelationsChange = (e) => {
        const { target: { value }} = e
        setRelations(
          typeof value === 'string' ? value.split(',') : value
        )
      }
    const handleAdd = () => {
        onAdd({from: employeeFrom, to:employeeTo, relations})
    }

    return (
        <Stack direction="row" spacing={2}>
            <Autocomplete
                disablePortal
                options={org}
                sx={{ width: 300 }}
                onChange={(event, newValue) => {
                    setEmployeeFrom(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Employee From" />}
            />
            <Autocomplete
                disablePortal
                disabled={employeeFrom===null}
                onChange={(event, newValue) => {
                    setEmployeeTo(newValue);
                }}
                options={org.filter(e => e.id!==employeeFrom?.id)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Employee To" />}
            />
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                multiple
                value={relations}
                onChange={handleRelationsChange}
                input={<OutlinedInput label="Relationship" />}
                renderValue={(selected) => selected.join(', ')}
                >
                {Object.keys(relationShipTypes).map(key => 
                    <MenuItem key={key} value={key}>
                    <Checkbox checked={relations.indexOf(key) > -1} />
                    <ListItemText primary={key} />
                    </MenuItem>
                )}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleAdd}>Add</Button>
        </Stack>
    )
}

export default AddRelation





