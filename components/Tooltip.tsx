import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function SampleTooltip() {
  return (
    <Tooltip title="Hide All Templates" arrow>
      <Button color='success'>
      <MoreVertIcon/>
      </Button>
    </Tooltip>
  );
}