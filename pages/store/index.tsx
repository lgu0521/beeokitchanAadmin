import { GetServerSideProps, NextPage } from "next";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useStoreColumns } from '../../mock/grid-columns';
import ModifyModal from '../../components/modal/store/modify';
import AlertDialog from "../../components/alertDialog";
import CreateModal from "../../components/modal/store/create";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { StoreDTO } from "../../dto/store.dto";
import { useAuth } from '../../hooks/AuthProvider';
import { useRouter } from "next/router";
import useDeleteStorage from "../../hooks/useDeleteStorage";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '../../components/progress';
interface Props {
    stores: StoreDTO[];
}

const defaultItem: StoreDTO = {
    id: '',
    datetime: '',
    title: '',
    phonenumber: '',
    operation: '',
    image: {
        storageRef: '',
        downloadUrl: '',
        fileName: ''
    }
}



const AdminStorePage: NextPage<Props> = ({ stores }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    if (!user) {
        router.push('/signup');
    }
    let rows: any[] = [];
    let rowNumber = 0;
    const [modifyItem, setModifyItem] = useState(defaultItem);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [modifyModalOpen, setModifyModalOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const deleteStorage = useDeleteStorage;

    const madeRows = () => {
        stores.forEach(store => {
            rowNumber = rowNumber + 1;
            rows.push({
                ...store,
                number: rowNumber,
            })
        });
    }

    madeRows();

    const handleEditClick = (id: any) => {
        setModifyItem(id);
        setModifyModalOpen(true);
    };

    const HandleDeleteClick = async () => {
        try {
            setLoading(true);
            setDialogOpen(false);
            await deleteStorage(modifyItem.image);
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/store/delete", {
                method: "POST",
                body: JSON.stringify({ id: modifyItem.id }),
            });
            router.replace(router.asPath);
            router.reload()
        } catch (e) {
            alert("다시 시도해주세요");
        }
    };

    const SetDialogOpen = (id: any) => {
        setModifyItem(id);
        setDialogOpen(true);
    }

    const columns = useStoreColumns({ handleEditClick: handleEditClick, HandleDeleteClick: SetDialogOpen });

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
                        <Typography gutterBottom variant="h4" component="div">매장 관리</Typography>
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
                        HandleDeleteClick={HandleDeleteClick} />
                    <CircularProgress isOpen={loading}/>
                </CardContent>
            </Card>
        </>
    );
}

export const getStaticProps: GetServerSideProps = async (context) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/store");
    const stores: StoreDTO[] = await res.json();

    if (!stores) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            stores
        },
    };
};

export default AdminStorePage;