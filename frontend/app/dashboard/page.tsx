import AddNoteLayout from "@/addNote/layout"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { Grid2 } from "@mui/material";
import OutlinedCard from "@/component/card";

export default function dashboard() {
    return (
        <AddNoteLayout>
            <Grid2 padding={'1.5em'}>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: '13px' }}>
                        <Link
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            href="/"
                        >
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            MUI
                        </Link>
                        <Link
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            href="/material-ui/getting-started/installation/"
                        >
                            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Core
                        </Link>
                        <Typography
                            sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
                        >
                            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Breadcrumb
                        </Typography>
                    </Breadcrumbs>
                </div>

                <OutlinedCard
                    title="Catatan Simpan"
                    subtitle="Expired on 12 Februari 2020"
                    buttonLabel="Read More" // Optional: Customize the button label
                />
            </Grid2>
        </AddNoteLayout>
    )
}