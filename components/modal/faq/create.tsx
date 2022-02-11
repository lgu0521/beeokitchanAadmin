import { useForm } from "react-hook-form";
import { InputWrap, ModalBox } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FaqDTO } from "../../../dto/faq.dto";
import TextField from '@mui/material/TextField';
import useGetDate from "../../../hooks/useGetDate";
import { useState } from "react";
import CircularProgress from '../../progress';

interface Props {
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const CreactModal = ({ isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [date, setDate] = useState<string>(useGetDate());
  const [loading, setLoading] = useState<boolean>(false);

  const OnSubmit = async (data: any) => {
    try {
      setLoading(true);
    isClose(false);
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/faq/create", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          datetime: date,
        } as FaqDTO),
      });

      if (typeof window != undefined) {
        window.location.reload();
      }
    } catch (e) {
      alert("다시 시도해주세요");
    }
  };

  return (
    <>
     <CircularProgress isOpen={loading}/>
      <div>
        <Modal
          open={isOpen}
          onClose={() => isClose(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={ModalBox()}>
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
                  id="component-outlined"
                  {...register("title", { required: true, maxLength: 20 })}
                  label="FAQ 제목"
                />
              </InputWrap>
              <InputWrap>
                <TextField
                  multiline
                  rows={10}
                  id="component-outlined"
                  {...register("content", { required: true })}
                  label="FAQ 내용"
                />
              </InputWrap>
              <Button variant="contained" type="submit">저장</Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CreactModal;