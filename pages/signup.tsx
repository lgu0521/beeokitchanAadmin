import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { AuthProvider, useAuth } from "../hooks/AuthProvider";
import { InputWrap, } from "../styles/AdminPage.style";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
type LoginData = {
    email: string;
    password: string;
};

const AdminSignUpPage = () => {
    const { user, SignInWithEmailAndPassword, LoginOut, error } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    useEffect(() => {
        if (user) router.push("/");
        if (error) alert('로그인 정보가 잘못 되었습니다');
    }, [user, error]);

    const onSubmit = async (data: any) => {
        const res = await SignInWithEmailAndPassword(data.email, data.password);
    };

    return (
        <>
            <Card sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        maxWidth: 600,
                        p: 1,
                        m: 1,
                        margin: '0 auto'
                    }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="300"
                    image="/images/login.png"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">로그인</Typography>
                    <Wrap>
                        {user ? (
                            <Button onClick={LoginOut}>로그아웃</Button>
                        ) : (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <InputWrap>
                                        <TextField
                                            type="email"
                                            id="component-outlined"
                                            {...register("email", { required: true })}
                                            label="이메일을 입력해주세요"
                                        />
                                    </InputWrap>
                                    <InputWrap>
                                        <TextField
                                            type="password"
                                            id="component-outlined"
                                            {...register("password", { required: true })}
                                            label="비밀번호를 입력해주세요"
                                        />
                                    </InputWrap>
                                </form>
                            )}
                    </Wrap>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                    }}>
                    <Button type="submit" variant="contained">로그인</Button>
                </CardActions>
            </Card>

        </>
    );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default AdminSignUpPage;