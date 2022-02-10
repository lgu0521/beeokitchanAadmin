import { Box } from "@mui/material"
import Header from "./header";
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
                    gridTemplateRows: '70px 1fr',
                    gridTemplateAreas: `
                    "header header header header header header"
                    "sidebar main main main main main"`,
                }}>
                <Box sx={{ gridRow:'1', gridArea: 'header', bgcolor: "white", height:"40px" }}><Header /></Box>
                <Box sx={{  gridRow:"1",  gridArea: 'main', bgcolor: "white" }}>
                    <Main>{children}</Main>
                </Box>
                <Box sx={{ gridRow:"1", gridArea: 'sidebar', bgcolor: "white" }}><Sidebar /></Box>
            </Box>
        </>
    )
}

export default Layout;