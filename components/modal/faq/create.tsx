import { useForm } from "react-hook-form";
import { InputWrap, ModalBox } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FaqDTO } from "../../../dto/faq.dto";

interface Props {
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const CreactModal = ({ isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/faq/modify", {
        method: "POST",
        body: JSON.stringify({
          ...data,
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
      <div>
        <Modal
          open={isOpen}
          onClose={() => isClose(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={ModalBox}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button type="submit">저장</Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CreactModal;