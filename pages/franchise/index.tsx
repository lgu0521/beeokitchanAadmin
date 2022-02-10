import { GetStaticProps, NextPage } from "next";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useMainColumns } from '../../mock/grid-columns';
import ModifyModal from '../../components/modal/franchise/modify';
import AlertDialog from "../../components/alertDialog";
import CreateModal from "../../components/modal/franchise/create";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../hooks/AuthProvider';
import { useRouter } from "next/router";
import { FranChiseDTO } from "../../dto/franchise.dto";

interface Props {
    franchises: FranChiseDTO[],
}

const defaultItem: FranChiseDTO = {
    id: '',
    step: 'PC',
    description: '',
    datetime: ''
}

const AdminFranChisePage: NextPage<Props> = ({ franchises }) => {
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
        franchises.forEach(franchise => {
            rowNumber = rowNumber + 1;
            rows.push({
                ...franchise,
                number: rowNumber,
            })
        });
    }

    madeRows();

    const handleEditClick = (id: any) => {
        setModifyItem(id);
        setModifyModalOpen(true);
    };

    const handleDeleteClick = async () => {
        try {
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/franchise/delete", {
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

    const SetDialogOpen = (id: any) => {
        setModifyItem(id);
        setDialogOpen(true);
    }

    const columns = useMainColumns({ handleEditClick: handleEditClick, handleDeleteClick: SetDialogOpen });

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
                    <h1>프랜차이즈 관리</h1>
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
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateModalOpen(true)}>추가하기</Button>
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
                    handleDeleteClick={handleDeleteClick} />
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const res1 = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/franchise");
    const franchises: FranChiseDTO[] = await res1.json();

    if (!franchises) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            franchises
        },
    };
};

export default AdminFranChisePage;