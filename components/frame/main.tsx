import styled from "styled-components";

type AppLayoutProps = {
    children: React.ReactNode;
};


const Main = ({ children }: AppLayoutProps) => {
    return (
        <Wrap>
            {children}
        </Wrap>
    )
}


const Wrap = styled.div`
    padding: 20px;
`
export default Main;