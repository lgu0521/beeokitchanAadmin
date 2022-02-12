//basic
import { NextPage } from "next";
import React, { useState } from 'react';
import { useRouter } from "next/router";
//service
import useSWR from "swr";
//mock
import { useNoticeColumns } from '../../mock/grid-columns';
//component
import ModifyModal from '../../components/modal/notice/modify';
import AlertDialog from "../../components/alertDialog";
import CreateModal from "../../components/modal/notice/create";
import CircularProgress from '../../components/progress';
//dto
import { NoticeDTO } from "../../dto/notice.dto";
//hook
import { useAuth } from '../../hooks/AuthProvider';
import useMakeRows from "../../hooks/useMakeRows";
//style
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const defaultItem: NoticeDTO = {
    id: '',
    title: '',
    isNotice: false,
    content: '',
    datetime: '',
}

const AdminNoticePage: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        router.push('/signup');
    }

    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_URL + '/api/notice', fetcher);

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
        try {
            setProgress(true);
            setDialog(false);
            //await useDeleteStorage(modifyItem.image);
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/notice/delete", {
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

    const columns = useNoticeColumns({ handleEditClick: handleEditClick, HandleDeleteClick: SetDialogOpen });

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
                        <Typography gutterBottom variant="h4" component="div">공지사항 관리</Typography>
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
                    <CircularProgress isOpen={progressOpen} />
                    <CreateModal
                        isOpen={createModalOpen}
                        isClose={(click: boolean) => setCreateModal(click)} />
                    <ModifyModal
                        isOpen={modifyModalOpen}
                        isClose={(click: boolean) => setModifyModal(click)}
                        item={modifyItem} />
                    <AlertDialog isOpen={dialogOpen} isClose={(click: boolean) => setDialog(click)}
                        HandleDeleteClick={HandleDeleteClick} />
                </CardContent>
            </Card>
        </>
    );
}

export default AdminNoticePage;