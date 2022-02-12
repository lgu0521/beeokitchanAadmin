//basic
import { NextPage } from "next";
import React, { useState } from 'react';
import { useRouter } from "next/router";
//service
import useSWR from "swr";
//mock
import { useMuenuColumns } from '../../mock/grid-columns';
//component
import ModifyModal from '../../components/modal/menu/modify';
import AlertDialog from "../../components/alertDialog";
import CreateModal from "../../components/modal/menu/create";
import CircularProgress from '../../components/progress';
//dto
import { MenuDTO } from "../../dto/menu.dto";
//hook
import { useAuth } from '../../hooks/AuthProvider';
import useDeleteStorage from "../../hooks/useDeleteStorage";
import { menuMadeRows } from '../../hooks/useMakeRows';
//style
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const defaultItem: MenuDTO = {
    id: '',
    datetime: '',
    catagory: '',
    title: '',
    content1: '',
    content2: '',
    image: {
        storageRef: '',
        downloadUrl: '',
        fileName: ''
    }
}

const AdminMenuPage: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        router.push('/signup');
    }

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_URL + '/api/menu', fetcher);

    const [modifyItem, setModifyItem] = useState(defaultItem);
    const [createModalOpen, setCreateModal] = useState<boolean>(false);
    const [modifyModalOpen, setModifyModal] = useState<boolean>(false);
    const [progressOpen, setProgress] = useState<boolean>(false);
    const [dialogOpen, setDialog] = useState<boolean>(false);

    const deleteStorage = useDeleteStorage;
    const makeRows = menuMadeRows;

    const handleEditClick = (id: any) => {
        setModifyItem(id);
        setModifyModal(true);
    };

    const HandleDeleteClick = async () => {
        setProgress(true);
        setDialog(false);
        try {
            await deleteStorage(modifyItem.image);
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/menu/delete", {
                method: "POST",
                body: JSON.stringify({ id: modifyItem.id }),
            });
            router.reload()
        } catch (e) {
            alert("다시 시도해주세요");
        }
    };

    const SetDialogOpen = (id: any) => {
        setModifyItem(id);
        setDialog(true);
    }

    const columns = useMuenuColumns({ handleEditClick: handleEditClick, HandleDeleteClick: SetDialogOpen });

    if (error) { return <div>데이터를 불러오지 못했습니다...</div>; }
    if (!data) { return <div>데이터를 불러오는 중 입니다...</div>; }

    const rows = makeRows(data);
    console.log(rows);

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
                        <Typography gutterBottom variant="h4" component="div">메뉴 관리</Typography>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateModal(true)}>추가하기</Button>
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
                        }}>
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
                        isClose={(click: boolean) => setCreateModal(click)} />
                    <ModifyModal
                        key={modifyItem.id}
                        isOpen={modifyModalOpen}
                        isClose={(click: boolean) => setModifyModal(click)}
                        item={modifyItem} />
                    <AlertDialog isOpen={dialogOpen} isClose={(click: boolean) => setDialog(click)}
                        HandleDeleteClick={HandleDeleteClick} />
                </CardContent>
                <CircularProgress isOpen={progressOpen} />
            </Card>
        </>
    );
}

export default AdminMenuPage;