import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface Props {
    isOpen: boolean;
}


const CircularIndeterminate = ({ isOpen }: Props) => {
    return (
        <>
            <div>
                <Modal
                    open={isOpen}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        height: '100%',
                    }}>
                        <CircularProgress />
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default CircularIndeterminate;