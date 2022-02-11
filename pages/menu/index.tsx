import { GetServerSideProps, NextPage } from "next";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { MenuCatagoryDTO, MenusWithCatagoryDTO, MenuDTO } from "../../dto/menu.dto";
import { DataGrid, GridApiRef } from '@mui/x-data-grid';
import { useMuenuColumns } from '../../mock/grid-columns';
import ModifyModal from '../../components/modal/menu/modify';
import AlertDialog from "../../components/alertDialog";
import CreateModal from "../../components/modal/menu/create";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import useDeleteStorage from "../../hooks/useDeleteStorage";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../hooks/AuthProvider';
import { useRouter } from "next/router";
import CircularProgress from '../../components/progress';

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
    const { user } = useAuth();
    const router = useRouter();
    if (!user) {
        router.push('/signup');
    }
    const [loading, setLoading] = useState<boolean>(false);
    const [modifyItem, setModifyItem] = useState(defaultItem);
    const [open, setOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const deleteStorage = useDeleteStorage;
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
    const SetDialogOpen = (id: any) => {
        setModifyItem(id);
        setDialogOpen(true);
    }

    const HandleDeleteClick = async () => {
        setLoading(true);
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
    const columns = useMuenuColumns({ handleEditClick: handleEditClick, HandleDeleteClick: SetDialogOpen });
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
                    isClose={(click: boolean) => setCreateModalOpen(click)}
                    item={catagory} />
                <ModifyModal
                    key={modifyItem.id}
                    isOpen={open}
                    isClose={(click: boolean) => setOpen(click)}
                    item={modifyItem}
                    itemCatagory={catagory} />
                <AlertDialog isOpen={dialogOpen} isClose={(click: boolean) => setDialogOpen(click)}
                    HandleDeleteClick={HandleDeleteClick} />
                </CardContent>
                <CircularProgress isOpen={loading}/>
            </Card>
        </>
    );
}

export const getStaticProps: GetServerSideProps = async (context) => {
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