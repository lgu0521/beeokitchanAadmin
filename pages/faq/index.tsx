import { GetStaticProps, NextPage } from "next";
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

interface Props {
    faqs: FaqDTO[];
}

const defaultItem: FaqDTO = {
    id: '',
    datetime: '',
    title: '',
    content: ''
}

const AdminFaqPage: NextPage<Props> = ({ faqs }) => {
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
        faqs.forEach(faq => {
            rowNumber = rowNumber + 1;
            rows.push({
                ...faq,
                number: rowNumber,
            })
        });
    }

    madeRows();

    const handleEditClick = (item: any) => {
        setModifyItem(item);
        setModifyModalOpen(true);
    };

    const SetDialogOpen = (id: any) => {
        setModifyItem(id);
        setDialogOpen(true);
    }

    const handleDeleteClick = async () => {
        try {
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/faq/delete", {
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
    const columns = useFaqColumns({ handleEditClick: handleEditClick, handleDeleteClick: SetDialogOpen });

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
                <AlertDialog isOpen={dialogOpen} isClose={(click: boolean) => setDialogOpen(click)}
                    handleDeleteClick={handleDeleteClick} />
                </CardContent>
            </Card>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/faq/");
    const faqs: FaqDTO[] = await res.json();

    if (!faqs) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            faqs
        },
    };
};

export default AdminFaqPage