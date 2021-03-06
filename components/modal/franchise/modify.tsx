import { useForm } from "react-hook-form";
import { InputWrap, ModalBox } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FranChiseDTO } from "../../../dto/franchise.dto";
import CircularProgress from '../../progress';

interface Props {
  item: FranChiseDTO;
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const ModifyModal = ({ item, isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [date, setDate] = useState<string>(item.datetime);
  const [loading, setLoading] = useState<boolean>(false);
  const OnSubmit = async (data: any) => {
    setLoading(true);
    isClose(false);
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/franchise/modify", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          datetime: date,
          id: item.id
        } as FranChiseDTO),
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
                defaultValue={item.datetime}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputWrap>
                <TextField
                  id="component-outlined"
                  defaultValue={item.description}
                  {...register("description", { required: true })}
                  label="가맹절차 폼 내용"
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

export default ModifyModal;