import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const PillsDropdown = () => {
    return (
        <>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"

                label="Age"

            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </>
    )
}

export default PillsDropdown
