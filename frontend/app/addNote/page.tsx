"use client"
import AddNoteLayout from "./layout"; // Import dengan huruf kapital 'A'
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import { Box, Grid2, Button } from '@mui/material';
import { Typography } from '@mui/material';

export default function AddNote() {
  return (
    <AddNoteLayout> {/* Gunakan sebagai komponen React */}
      <Grid2 justifyContent={'start'}>
        <Typography fontFamily={'Arial, sans-serif'} fontWeight={'bold'} fontSize={40} textTransform={'capitalize'}>catat hal penting dalam pikiranmu!</Typography>
        <Typography fontFamily={'Arial, sans-serif'} fontWeight={'bold'} fontSize={40} textTransform={'capitalize'}>selamat pagi</Typography>
      </Grid2>
    </AddNoteLayout>
  );
}
