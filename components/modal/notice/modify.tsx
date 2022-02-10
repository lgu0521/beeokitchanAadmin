import dynamic from "next/dynamic";
import { NoticeDTO } from "../../../dto/notice.dto";
import { EditorProps, Editor } from "@toast-ui/react-editor";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";
import { TuiEditorWithForwardedProps } from "../../toastEditor";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { InputWrap, Input, Label, Description, ModalBox } from "../../../styles/AdminPage.style";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from "react";

interface Props {
  item: NoticeDTO;
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const TuiNoSSRWrapper = dynamic<TuiEditorWithForwardedProps>(
  () => import("../../toastEditor"),
  {
    ssr: false,
    loading: () => <p>Loading . . .</p>,
  }
);
const TuiWrapper = React.forwardRef((props: EditorProps, ref) => (
  <TuiNoSSRWrapper
    {...props}
    forwardedRef={ref as React.MutableRefObject<Editor>}
  />
));

TuiWrapper.displayName = "Editor";

const ModifyModal = ({ item, isOpen, isClose }: Props) => {
  const router = useRouter();
  const editorRef = useRef<Editor>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [date, setDate] = useState<string>(item.datetime);

  const onSubmit = async (data: any) => {
    console.log(data);
    if (editorRef.current && data.title) {
      const content = editorRef.current.getInstance().getMarkdown();
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/notice/modify",
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            id: item.id,
            datetime: date,
            content: content,
          }),
        }
      );
      if (res) {
        router.push("/notice");
      }
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => isClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={ModalBox(1000)}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Label>공지사항 제목</Label>
              <Input
                {...register("title", { required: true })}
                defaultValue={item.title}
              />
            </InputWrap>
            <InputWrap>
              <Label>공지사항 내용</Label>
              <Description>
                사진 첨부시, 반드시 FireBase에서 이미지 업로드 후 URL을
                넣어주세요.
            </Description>
              <TuiWrapper
                height="400px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                ref={editorRef}
                initialValue={item.content}
              />
            </InputWrap>
            <Button type="submit">저장</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default ModifyModal;
