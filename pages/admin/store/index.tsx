import { GetStaticProps, NextPage } from "next";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useStoreColumns } from '../../../mock/grid-columns';
import ModifyModal from '../../../components/modal/store/modify';
import AlertDialog from "../../../components/alertDialog";
import CreateModal from "../../../components/modal/store/create";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { StoreDTO } from "../../../dto/store-create.dto";

interface Props {
    stores: StoreDTO[];
}

const defaultItem: StoreDTO = {
    id: '',
    order: 0,
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
    let rows: any[] = [];
    let rowNumber = 0;
    const [modifyItem, setModifyItem] = useState(defaultItem);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [modifyModalOpen, setModifyModalOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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

    const handleDeleteClick = () => {

    };

    const SetDialogOpen = (id: any) => {
        setDialogOpen(true);
        console.log('삭제');
    }

    const columns = useStoreColumns({ handleEditClick: handleEditClick, handleDeleteClick: SetDialogOpen });

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
                    <h1>매장 관리</h1>
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
                    isClose={(click: boolean) => setCreateModalOpen(click)}/>
                <ModifyModal
                    key={modifyItem.id}
                    isOpen={modifyModalOpen}
                    isClose={(click: boolean) => setModifyModalOpen(click)}
                    item={modifyItem}/>
                <AlertDialog 
                    isOpen={dialogOpen} 
                    isClose={(click: boolean) => setDialogOpen(click)}
                    handleDeleteClick={handleDeleteClick} />
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
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