import styled from "styled-components";

type AppLayoutProps = {
    children: React.ReactNode;
};


const Main = ({ children }: AppLayoutProps) => {
    return (
        <Wrap>
            <Container>
                <WrapConteiner>
                    {children}
                </WrapConteiner>
            </Container>
        </Wrap>
    )
}

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const Container = styled.div`
    margin: 0 auto;
    width: 97%;
    height: 100%;
    border-radius: 12px 12px 0px 0px;
    background-color: white;
`
const WrapConteiner = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 12px 12px 0px 0px;
    background-color: #E3F2FD;
    padding: 2%;
`
export default Main;