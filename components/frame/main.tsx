type AppLayoutProps = {
    children: React.ReactNode;
};


const Main = ({ children }: AppLayoutProps) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Main;