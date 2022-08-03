import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux'
import axios from 'axios'
import Swal from "sweetalert2";


export default function BasicRating({rating, id}) {
    const [newValue, setNewValue] = useState(null);

  const [value, setValue] = useState(rating);

    const token = useSelector((state)=>state.usuario)

    useEffect(() => {
        newValue&&axios.put('/admin/rating', {token, id, rating:newValue}).then((w)=>{
    Swal.fire({
    icon: 'success',
    showConfirmButton:false,
    timer: 1000
  })
  setValue(newValue)
})
 }, [newValue])




  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newWalue) => {
        setNewValue(newWalue);
        }}
      />
    </Box>
  );
}

