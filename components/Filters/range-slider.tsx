"use client"

import * as React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import qs from 'query-string'
import { toast } from "react-hot-toast"
import { TbFaceId } from 'react-icons/tb'
import { Slider } from "@/components/ui/slider"
import  Button  from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([0, 2000]) // Default range set in state
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleChange = (newValue: number[]) => {
    setValue(newValue)
  }

//   // Custom Toast Success
  const toastSuccess = (message: string) => {
    toast.error(message, {
      style: {
        background: "white",
        color: "green",
      },
      icon: <TbFaceId size={30} />,
    });
  };

  const handleClick = () => {
    const current = qs.parse(searchParams.toString())
    const query = { ...current, minPrice: value[0], maxPrice: value[1] }

    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipNull: true }
    )
    // console.log('url', url)
    router.push(url)
    toastSuccess(`Price range set between $${value[0]} and $${value[1]}`)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-sm font-medium">Set a price range</CardTitle>
      </CardHeader>
      <CardContent>
        <Slider
          defaultValue={value}
          max={2000}
          min={0}
          step={10}
          onValueChange={handleChange}
          className="w-full"
        />
        <div className="mt-2 flex justify-between text-sm">
          <span>${value[0]}</span>
          <span>${value[1]}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick} className="w-full">
          Apply
        </Button>
      </CardFooter>
    </Card>
  )
}



// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
// import { useSearchParams, useRouter } from 'next/navigation';
// import qs from 'query-string';
// import { toast } from "react-hot-toast";
// import { TbFaceId } from 'react-icons/tb';

// function valuetext(value: number) {
//   return `${value}`;
// }

// export default function RangeSlider() {
//   const [value, setValue] = React.useState<number[]>([0, 2000]); // Default range set in state
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const handleChange = (event: Event, newValue: number | number[]) => {
//     setValue(newValue as number[]);
//   };

//   // Custom Toast Success
//   const toastSuccess = (message: string) => {
//     toast.error(message, {
//       style: {
//         background: "white",
//         color: "green",
//       },
//       icon: <TbFaceId size={30} />,
//     });
//   };
  

//   const handleClick = () => {
//     const current = qs.parse(searchParams.toString());
//     const query = { ...current, minPrice: value[0], maxPrice: value[1] };

//     const url = qs.stringifyUrl(
//       { url: window.location.href, query },
//       { skipNull: true }
//     );
//     console.log('url', url);
//     router.push(url);
//     toastSuccess('Price range set between ' + value[0] + ' and ' + value[1]);
//   };

//   return (
//       // <Box sx={{ width: 150 }}>
//       <Box className="w-[300px] sm:w-[150px] p-4">
//         <div className='flex flex-col justify-center items-center'>
//           <h2 className='flex flex-row text-sm'>
//             Set a price range
//           </h2>
//         </div>
//         <Slider
//           getAriaLabel={() => 'Price range'}
//           value={value}
//           onChange={handleChange}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           step={10}
//           min={0}     // Minimum value for the slider
//           max={2000}  // Maximum value for the slider
//           sx={{
//             '& .MuiSlider-thumb': {
//               color: 'black', // Change thumb color
//               width: 12,  // Smaller width for the thumb
//               height: 12,
//             },
//             '& .MuiSlider-track': {
//               color: 'black', // Change track color
//             },
//             '& .MuiSlider-rail': {
//               color: '#daffcc',
//             }
//           }}
//         />
//         <button onClick={handleClick} className='text-sm flex flex-col row-span-1 justify-start items-center w-full hover:cursor-pointer hover:rounded-md hover:underline'>
//           Apply
//         </button>
//       </Box>
//   );
// }
