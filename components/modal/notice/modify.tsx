import dynamic from "next/dynamic";
import { NoticeDTO } from "../../../dto/notice.dto";
import { EditorProps, Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";
import { TuiEditorWithForwardedProps } from "../../toastEditor";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { InputWrap, Label, Description, ModalBox } from "../../../styles/AdminPage.style";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import CircularProgress from '../../progress';

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
  const [loading, setLoading] = useState<boolean>(false);
  const OnSubmit = async (data: any) => {
    setLoading(true);
    isClose(false);
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
      if (res && typeof window != null) {
        window.location.reload();
      }
    }
  };

  return (
    <div>
       <CircularProgress isOpen={loading}/>
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
            <Button variant="contained" type="submit">저장</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default ModifyModal;
