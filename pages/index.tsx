import { GetStaticProps, NextPage } from "next";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useMainColumns } from '../mock/grid-columns';
import ModifyModal from '../components/modal/home/modify';
import AlertDialog from "../components/alertDialog";
import CreateModal from "../components/modal/home/create";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../hooks/AuthProvider';
import { useRouter } from "next/router";
import useDeleteStorage from "../hooks/useDeleteStorage";
import { BannerDTO } from "../dto/banner.dto";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Props {
    banners: BannerDTO[],
}

const defaultItem: BannerDTO = {
    id: '',
    type: 'PC',
    datetime: '',
    storageRef: '',
    downloadUrl: '',
    fileName: ''
}

const AdminHomePage: NextPage<Props> = ({ banners }) => {
    const { user } = useAuth();
    const router = useRouter();
    if (!user) {
        router.push('/signup');
    }
    let rows: any[] = [];
    let rowNumber = 0;
    const [modifyItem, setModifyItem] = useState(defaultItem);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [modifyModalOpen, setModifyModalOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const madeRows = () => {
        banners.forEach(banner => {
            rowNumber = rowNumber + 1;
            rows.push({
                ...banner,
                number: rowNumber,
            })
        });
    }

    madeRows();

    const handleEditClick = (id: any) => {
        setModifyItem(id);
        setModifyModalOpen(true);
    };

    const handleDeleteClick = async () => {
        try {
            await useDeleteStorage(modifyItem);
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/banner/delete", {
                method: "POST",
                body: JSON.stringify({ id: modifyItem.id }),
            });

            if (typeof window != null) {
                window.location.reload();
            }
        } catch (e) {
            alert("다시 시도해주세요");
        }
    };

    const SetDialogOpen = (id: any) => {
        setModifyItem(id);
        setDialogOpen(true);
    }

    const columns = useMainColumns({ handleEditClick: handleEditClick, handleDeleteClick: SetDialogOpen });

    return (
        <>
            <Card sx={{ width: '100%', borderRadius: '12px' }}>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            p: 1,
                            m: 1,
                            borderRadius: 1,
                        }}>
                        <Typography gutterBottom variant="h4" component="div">메인 관리</Typography>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateModalOpen(true)}>추가하기</Button>
                    </Box>
                </CardContent>
                <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        p: 1,
                        m: 1,
                        // bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}
                >
                    <div style={{ height: 630, width: '100%', background: 'white', margin: 'auto' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            hideFooterSelectedRowCount />
                    </div>
                </Box>
                <CreateModal
                    isOpen={createModalOpen}
                    isClose={(click: boolean) => setCreateModalOpen(click)} />
                <ModifyModal
                    key={modifyItem.id}
                    isOpen={modifyModalOpen}
                    isClose={(click: boolean) => setModifyModalOpen(click)}
                    item={modifyItem} />
                <AlertDialog
                    isOpen={dialogOpen}
                    isClose={(click: boolean) => setDialogOpen(click)}
                    handleDeleteClick={handleDeleteClick} />
                </CardContent>
            </Card>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const res1 = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/banner");
    const banners: BannerDTO[] = await res1.json();

    if (!banners) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            banners
        },
    };
};

export default AdminHomePage;