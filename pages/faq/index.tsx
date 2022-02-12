import { GetServerSideProps, NextPage } from "next";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useFaqColumns } from '../../mock/grid-columns';
import ModifyModal from '../../components/modal/faq/modify';
import AlertDialog from "../../components/alertDialog";
import CreateModal from "../../components/modal/faq/create";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { FaqDTO } from "../../dto/faq.dto";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../hooks/AuthProvider';
import { useRouter } from "next/router";
import CircularProgress from '../../components/progress';
import useSWR from "swr";
import useMakeRows from "../../hooks/useMakeRows";

const defaultItem: FaqDTO = {
    id: '',
    datetime: '',
    title: '',
    content: ''
}

const AdminFaqPage: NextPage = () => {
    const router = useRouter();
    const { user } = useAuth();

    if (!user) {
        router.push('/signup');
    }

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_URL + '/api/faq', fetcher);

    const [modifyItem, setModifyItem] = useState(defaultItem);
    const [createModalOpen, setCreateModal] = useState<boolean>(false);
    const [modifyModalOpen, setModifyModal] = useState<boolean>(false);
    const [progressOpen, setProgress] = useState<boolean>(false);
    const [dialogOpen, setDialog] = useState<boolean>(false);

    const makeRows = useMakeRows;

    const handleEditClick = (id: any) => {
        setModifyItem(id);
        setModifyModal(true);
    };

    const HandleDeleteClick = async () => {
        setProgress(true);
        setDialog(false);
        try {
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/faq/delete", {
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

    const columns = useFaqColumns({ handleEditClick: handleEditClick, HandleDeleteClick: SetDialogOpen });

    if (error) { return <div>데이터를 불러오지 못했습니다...</div>; }
    if (!data) { return <div>데이터를 불러오는 중 입니다...</div>; }

    const rows = makeRows(data);
    
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
                        <Typography gutterBottom variant="h4" component="div">FAQ 관리</Typography>
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
                        isClose={(click: boolean) => setCreateModal(click)} />
                    <ModifyModal
                        key={modifyItem.id}
                        isOpen={modifyModalOpen}
                        isClose={(click: boolean) => setModifyModal(click)}
                        item={modifyItem} />
                    <AlertDialog isOpen={dialogOpen} isClose={(click: boolean) => setDialog(click)}
                        HandleDeleteClick={HandleDeleteClick} />
                </CardContent>
            </Card>
            <CircularProgress isOpen={progressOpen} />
        </>
    );
}

export default AdminFaqPage