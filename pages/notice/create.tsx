import { useState } from "react";
import { InputWrap } from "../../styles/AdminPage.style";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useGetDate from "../../hooks/useGetDate";
import CircularProgress from '../../components/progress';
import MarkdownEditor from "rich-markdown-editor";
import useUploadStorage from "../../hooks/useUploadStorage";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const CreatePage = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [date, setDate] = useState<string>(useGetDate());
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const localStorage = useUploadStorage;


    const OnSubmit = async (data: any) => {
        setLoading(true);
        if (value && data.title) {
            const res = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/notice/create",
                {
                    method: "POST",
                    body: JSON.stringify({
                        ...data,
                        datetime: date,
                        content: value,
                    }),
                }
            );
            router.push("/notice");
        }
    };

    const uploadImage = async (file: any) => {
        const res = await localStorage(file, "noticeImage");
        return res.downloadUrl;
    };

    return (
        <div>
            <Card sx={{ width: '100%', borderRadius: '12px' }}>
                <CardContent>
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
                        <Typography gutterBottom variant="h4" component="div">공지사항 작성</Typography>
                    </Box>
                </CardContent>
                <CardContent>
                    <Box
                        sx={{
                            p: 1,
                            m: 1,
                            width:"100%",
                            // bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                            <form onSubmit={handleSubmit(OnSubmit)}>
                                <TextField
                                    id="datetime-local"
                                    label="등록날짜(노출 순위가 달라집니다)"
                                    type="datetime-local"
                                    sx={{ width: 250 }}
                                    defaultValue={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <InputWrap>
                                    <TextField
                                        id="datetime-local"
                                        label="공지사항 제목"
                                        {...register("title", { required: true })}
                                    />
                                </InputWrap>
                                <Box sx={{
                                    minHeight: '500px',
                                    border: '1px solid #C4C4C4',
                                    borderRadius: '4px',
                                    p:"16.5px 25px",
                                    m: '10px 0px'
                                }}>
                                    <div className="editor">
                                        <MarkdownEditor
                                            onChange={(getValue) => {
                                                setValue(getValue());
                                            }}
                                            uploadImage={uploadImage}
                                        />
                                    </div>
                                </Box>
                                <Button variant="contained" type="submit">저장</Button>
                            </form>
                        </Box>
                    <CircularProgress isOpen={loading} />
                </CardContent>
            </Card>
        </div>
    );
};

export default CreatePage;
