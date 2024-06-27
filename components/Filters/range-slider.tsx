import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {

  return `${value}`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([0, 2000]); // Default range set in state

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleClick = () => {
    console.log(`Selected range: ${value[0]} - ${value[1]}`);
  };

  return (
    <Box sx={{ width: 150 }}>
      <button onClick={handleClick} className='text-xs flex flex-col row-span-1 justify-center items-center w-full hover:cursor-pointer hover:rounded-md p-2 hover:underline'>
        Set price range:
      </button>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={10}
        min={0}     // Minimum value for the slider
        max={2000}  // Maximum value for the slider
        sx={{
          '& .MuiSlider-thumb': {
            color: 'black', // Change thumb color
            width: 12,  // Smaller width for the thumb
            height: 12,
          },
          '& .MuiSlider-track': {
            color: '#485942', // Change track color
          },
          '& .MuiSlider-rail': {
            color: '#daffcc',
          }
        }}
      />
    </Box>
  );
}
