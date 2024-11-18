import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo() {
  return (<div className='hover:bg-neutral-300'>

    <Box sx={{ minWidth: 150 }} >
      <FormControl fullWidth>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'Template Gallery',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Template 1</option>
          <option value={20}>Template 2</option>
          <option value={30}>Template 3</option>
        </NativeSelect>
      </FormControl>
    </Box>
    </div>
  );
}
