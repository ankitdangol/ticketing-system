import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function Dropdown(props: any) {
    return (
        <Box sx={{ maxWidth: '85px' }}>
            <FormControl fullWidth>
                <NativeSelect
                    defaultValue='none'
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}

                >
                    <option value="none" disabled>
                        {props.title}
                    </option>
                    <option value='all'>All</option>
                    <option value='bug'>Bug</option>
                    <option value='task'>Task</option>
                    <option value='feature'>Feature</option>
                </NativeSelect>
            </FormControl>
        </Box>
    );
}