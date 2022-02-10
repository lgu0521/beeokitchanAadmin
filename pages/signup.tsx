import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AuthProvider, useAuth } from "../hooks/AuthProvider";
import { Button, InputWrap, Input, Label } from "../styles/AdminPage.style";
type LoginData = {
    email: string;
    password: string;
};

const AdminSignUpPage = () => {
    const { user, error, SignInWithEmailAndPassword, LoginOut } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        const res = await SignInWithEmailAndPassword(data.email, data.password);
        if (res) {
            router.push("/");
        }
    };

    return (
        <>
            <Wrap>
                {user ? (
                    <Button onClick={LoginOut}>로그아웃</Button>
                ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputWrap>
                                <Label>이메일</Label>
                                <Input
                                    {...register("email", { required: true, maxLength: 20 })}
                                    placeholder="이메일을 입력해주세요"
                                />
                            </InputWrap>
                            <InputWrap>
                                <Label>비밀번호</Label>
                                <Input
                                    type="password"
                                    {...register("password", { required: true, maxLength: 20 })}
                                    placeholder="비밀번호를 입력해주세요"
                                />
                            </InputWrap>
                            <Button type="submit">로그인</Button>
                        </form>
                    )}
            </Wrap>
        </>
    );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 120px 0px;
`;

export default AdminSignUpPage;