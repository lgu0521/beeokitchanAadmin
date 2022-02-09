import { GetStaticProps, NextPage } from "next";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useFaqColumns } from '../../../mock/grid-columns';
import ModifyModal from '../../../components/modal/faq/modify';
import AlertDialog from "../../../components/alertDialog";
import CreateModal from "../../../components/modal/faq/create";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { FaqDTO } from "../../../dto/faq-create.dto";

interface Props {
    faqs: FaqDTO[];
}

const defaultItem: FaqDTO = {
    id: '',
    order: 0,
    title: '',
    content: ''
}

const AdminFaqPage: NextPage<Props> = ({ faqs }) => {
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

    const handleDeleteClick = () => {

    };

    const SetDialogOpen = (id: any) => {
        setDialogOpen(true);
        console.log('삭제');
    }

    const columns = useFaqColumns({ handleEditClick: handleEditClick, handleDeleteClick: SetDialogOpen });

    return (
        <>
            <div style={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}
                >
                    <h1>FAQ 관리</h1>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        p: 1,
                        m: 1,
                        // bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}>
                    <Button variant="contained" startIcon={<AddIcon />}>추가하기</Button>
                </Box>
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
                    key={modifyItem.id}
                    isOpen={createModalOpen}
                    isClose={(click: boolean) => setCreateModalOpen(click)} />
                <ModifyModal
                    key={modifyItem.id}
                    isOpen={modifyModalOpen}
                    isClose={(click: boolean) => setModifyModalOpen(click)}
                    item={modifyItem} />
                <AlertDialog isOpen={dialogOpen} isClose={(click: boolean) => setDialogOpen(click)}
                    handleDeleteClick={handleDeleteClick} />
            </div>
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