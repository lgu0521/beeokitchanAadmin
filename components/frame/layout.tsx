import { Box } from "@mui/material"
import Footer from "./footer";
import Sidebar from "./sidebar"
import Main from './main';
type AppLayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: 0,
                    gridTemplateRows: 'repeat(1, 1fr)',
                    gridTemplateAreas: `"sidebar main main main main main"
                                        "sidebar footer footer footer footer footer"`,
                }}>
                <Box sx={{ gridRow: '1' , gridArea: 'main', bgcolor: '#edf5e1' }}>
                    <Main>{children}</Main>
                </Box>
                <Box sx={{ gridRow: '1' ,gridArea: 'sidebar', bgcolor: '#05386B' }}><Sidebar /></Box>
                <Box sx={{ gridRow: '1' ,gridArea: 'footer', bgcolor: '#edf5e1' }}><Footer /></Box>
            </Box>
        </>
    )
}

export default Layout;