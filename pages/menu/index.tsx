import { GetStaticProps, NextPage } from "next";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { MenuCatagoryDTO, MenusWithCatagoryDTO, MenuDTO } from "../../dto/menu.dto";
import { DataGrid, GridApiRef } from '@mui/x-data-grid';
import { useMuenuColumns } from '../../mock/grid-columns';
import ModifyModal from '../../components/modal/menu/modify';
import AlertDialog from "../../components/alertDialog";
import CreateModal from "../../components/modal/menu/create";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface Props {
    menuByCatagory: MenusWithCatagoryDTO[];
    catagory: MenuCatagoryDTO[];
    apiRef: GridApiRef;
}

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

const AdminMenuPage: NextPage<Props> = ({ menuByCatagory, catagory }) => {
    let rows: any[] = [];
    let rowNumber = 0;
    const [modifyItem, setModifyItem] = useState(defaultItem);
    const [createOpen, setCreateOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const madeRows = () => {
        menuByCatagory.forEach(catagory => {
            catagory.menus.forEach(menu => {
                rowNumber = rowNumber + 1;
                rows.push({
                    ...menu,
                    number: rowNumber,
                })
            });

        });
    }

    madeRows();

    const handleEditClick = (id: any) => {
        setModifyItem(id);
        setOpen(true);
    };

    const handleDeleteClick = () => {

    };

    const SetDialogOpen = (id: any) => {
        setDialogOpen(true);
        console.log('삭제');
    }

    const columns = useMuenuColumns({ handleEditClick: handleEditClick, handleDeleteClick: SetDialogOpen });
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
                    <h1>메뉴 관리</h1>
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
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>메뉴 추가</Button>
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
                    isOpen={createOpen}
                    isClose={(click: boolean) => setCreateOpen(click)}
                    item={catagory} />
                <ModifyModal
                    key={modifyItem.id}
                    isOpen={open}
                    isClose={(click: boolean) => setOpen(click)}
                    item={modifyItem}
                    itemCatagory={catagory} />
                <AlertDialog isOpen={dialogOpen} isClose={(click: boolean) => setDialogOpen(click)}
                    handleDeleteClick={handleDeleteClick} />
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/menu");
    const menuByCatagory: MenusWithCatagoryDTO[] = await res.json();
    const resCatagory = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/menu/catagory");
    const catagory: MenuCatagoryDTO[] = await resCatagory.json();

    if (!menuByCatagory && !catagory) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            menuByCatagory,
            catagory
        },
    };
};

export default AdminMenuPage;