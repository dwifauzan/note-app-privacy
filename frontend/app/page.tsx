import { Box, Grid2, Button } from '@mui/material';
import {Typography} from '@mui/material';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Clock from './component/clock';
import Link from 'next/link';

export default function Home() {
	return (
		<Grid2 container direction={'column'} justifyContent={'center'} alignItems={'center'} sx={{ height: '100vh', padding: '1em' }} spacing={4}>
			<Typography fontFamily={'Arial, sans-serif'} fontWeight={'bold'} fontSize={40} textTransform={'capitalize'}>catat hal penting dalam pikiranmu!</Typography>
			<Box display={'flex'} gap={4} alignItems={'flex-start'}>
				<WbCloudyIcon sx={{fontSize: 200, bgcolor: 'red', color: 'white', width: '250', height: '250', borderRadius: 10, padding: '12px', boxShadow: '0px 15px 15px rgba(0, 0, 0, 0.2)'}}/>
				<Box>
					<Typography fontFamily={'Arial, sans-serif'} fontWeight={'bold'} fontSize={40} textTransform={'capitalize'}>selamat pagi</Typography>
					<Clock/>
					<Box display={'flex'} gap={2}>
						<Link href={'/addNote'}>
							<Button variant='contained' endIcon={<AddLinkIcon/>} sx={{width: '50vh', padding: '14px', textTransform: 'capitalize', fontWeight: 'bold', fontSize: 20}}>LIhat Note</Button>
						</Link>
					</Box>
				</Box>
			</Box>
		</Grid2>
	)
}
