import React, { useState } from "react";
import MarkdownEditor from "rich-markdown-editor";
import useUploadStorage from "../../../hooks/useUploadStorage";
import { NoticeDTO } from "../../../dto/notice.dto";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { InputWrap, Label, Description, ModalBox } from "../../../styles/AdminPage.style";
import CircularProgress from '../../progress';

interface Props {
    item: NoticeDTO;
    isOpen: boolean;
    isClose: (click: boolean) => void;
}

const ModifyModal = ({ item, isOpen, isClose }: Props) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [date, setDate] = useState<string>(item.datetime);
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const localStorage = useUploadStorage;

    const OnSubmit = async (data: any) => {
        setLoading(true);
        isClose(false);
        if (value && data.title) {
            const res = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/notice/modify",
                {
                    method: "POST",
                    body: JSON.stringify({
                        ...data,
                        id: item.id,
                        datetime: date,
                        content: value,
                    }),
                }
            );
            router.reload()
        }
    };

    const uploadImage = async (file: any) => {
        const res = await localStorage(file, "storeImage");
        return res.downloadUrl;
    };


    return (
        <> <div>
            <CircularProgress isOpen={loading} />
            <Modal
                open={isOpen}
                onClose={() => isClose(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={ModalBox(1000)}>
                    <form onSubmit={handleSubmit(OnSubmit)}>
                        <TextField
                            id="datetime-local"
                            label="등록날짜(노출 순위가 달라집니다)"
                            type="datetime-local"
                            defaultValue={item.datetime}
                            sx={{ width: 250 }}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <InputWrap>
                            <TextField
                                id="datetime-local"
                                label="공지사항 제목"
                                defaultValue={item.title}
                                {...register("title", { required: true })}
                            />
                        </InputWrap>
                        <InputWrap>
                            <Label>공지사항 내용</Label>
                            <Box sx={{
                                minHeight: '300px',
                                border: '1px solid black',
                                borderRadius:'5px'
                            }}>
                                <div className="editor">
                                    <MarkdownEditor
                                        defaultValue={item.content}
                                        onChange={(getValue) => {
                                            setValue(getValue());
                                        }}
                                        uploadImage={uploadImage}
                                    />
                                </div>
                            </Box>
                        </InputWrap>
                        <Button variant="contained" type="submit">저장</Button>
                    </form>
                </Box>
            </Modal>
        </div>
        </>
    );
};

export default ModifyModal;
