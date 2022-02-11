import { GetServerSideProps, NextPage } from "next";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNoticeColumns } from '../../mock/grid-columns';
import ModifyModal from '../../components/modal/notice/modify';
import AlertDialog from "../../components/alertDialog";
import CreateModal from "../../components/modal/notice/create";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { NoticeDTO } from "../../dto/notice.dto";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../hooks/AuthProvider';
import { useRouter } from "next/router";
import CircularProgress from '../../components/progress';

interface Props {
    notices: NoticeDTO[];
}

const defaultItem: NoticeDTO = {
    id: '',
    title: '',
    isNotice: false,
    content: '',
    datetime: '',
}

const AdminNoticePage: NextPage<Props> = ({ notices }) => {
    const { user } = useAuth();
    const router = useRouter();
    if (!user) {
        router.push('/signup');
    }
    let rows: any[] = [];
    let rowNumber = 0;
    const [loading, setLoading] = useState<boolean>(false);
    const [modifyItem, setModifyItem] = useState(defaultItem);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [modifyModalOpen, setModifyModalOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const madeRows = () => {
        notices.forEach(notice => {
            rowNumber = rowNumber + 1;
            rows.push({
                ...notice,
                number: rowNumber,
            })
        });
    }

    madeRows();

    const handleEditClick = (id: any) => {
        setModifyItem(id);
        setModifyModalOpen(true);
    };

    const SetDialogOpen = (id: any) => {
        setDialogOpen(true);
        setModifyItem(id);
    }

    const HandleDeleteClick = async () => {
        try {
            setLoading(true);
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


    const columns = useNoticeColumns({ handleEditClick: handleEditClick, HandleDeleteClick: SetDialogOpen });

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
                <CircularProgress isOpen={loading}/>
                <CreateModal
                    isOpen={createModalOpen}
                    isClose={(click: boolean) => setCreateModalOpen(click)} />
                <ModifyModal
                    isOpen={modifyModalOpen}
                    isClose={(click: boolean) => setModifyModalOpen(click)}
                    item={modifyItem} />
                <AlertDialog isOpen={dialogOpen} isClose={(click: boolean) => setDialogOpen(click)}
                    HandleDeleteClick={HandleDeleteClick} />
                </CardContent>
            </Card>
        </>
    );
}

export const getStaticProps: GetServerSideProps = async (context) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/notice");
    const notices: NoticeDTO[] = await res.json();

    if (!notices) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            notices
        },
    };
};

export default AdminNoticePage;