"use client"
import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Button, Typography, Modal, Box, TextField, TextareaAutosize } from '@mui/material';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },

];

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

export default function DashboardLayoutBasic(props: any) {
    const router = useDemoRouter('/dashboard');
    const [openModal, isOpenModal] = React.useState(false)
    const [judul, setJudul] = React.useState(''); // State untuk judul
    const [konten, setKonten] = React.useState(''); // State untuk konten

    const handleSubmit = async (event) => {
        event.preventDefault(); // Mencegah refresh halaman
        const dataNote = {
            judul: judul,
            conteks: konten,
            status: 'belum'
        }
        console.log(dataNote)
        const resback = await window.BloopAPI.handleCreateNote(dataNote)
      
        handleModalClose(); // Tutup modal setelah submit (opsional)
      };

    const handleModalOpen = () => {
        isOpenModal(true)
    }
    const handleModalClose = () => {
        isOpenModal(false)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px', // Tambahkan border radius
    };
    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout>
                <PageContainer>
                    <Button variant='contained' sx={{ width: 'auto', padding: '14px', textTransform: 'capitalize', fontWeight: 'bold', fontSize: 20 }} onClick={handleModalOpen}>Tambah Baru</Button>

                </PageContainer>
            </DashboardLayout>
            {/* Modal MUI */}
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" onSubmit={handleSubmit} sx={style}> {/* Tambahkan component="form" dan onSubmit */}
                    <Typography id="modal-modal-title" variant="h5" component="h2" align="center" gutterBottom>
                        Tambah Catatan Baru
                    </Typography>
                    <TextField
                        label="Judul"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={judul} // Bind value dengan state judul
                        onChange={(e) => setJudul(e.target.value)} // Update state judul saat input berubah
                        required // Field judul wajib diisi
                    />
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Konten catatan..."
                        style={{ width: '100%', marginTop: '16px', resize: 'vertical', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} // Style textarea
                        value={konten} // Bind value dengan state konten
                        onChange={(e) => setKonten(e.target.value)} // Update state konten saat input berubah
                        required // Field konten wajib diisi
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button onClick={handleModalClose} sx={{ mr: 2 }}>
                            Tutup
                        </Button>
                        <Button type="submit" variant="contained" color="primary"> {/* Ubah jadi tombol submit */}
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </AppProvider>
    );
}
