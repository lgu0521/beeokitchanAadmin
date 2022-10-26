import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth } from '../../hooks/AuthProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = () => {
    const { user, LoginOut } = useAuth();
    return (
        <header>
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
                <Typography gutterBottom variant="h5" component="div">헬키푸키</Typography>
                <Button variant="contained" startIcon={<AccountCircleIcon />} onClick={LoginOut}>로그아웃</Button>
            </Box>
        </header>
    )
}

export default Header;