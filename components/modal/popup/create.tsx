import { useForm } from "react-hook-form";
import { InputWrap, Description, Label, ModalBox } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ImageUpload from '../../ImageUpload';
import useUploadStorage from "../../../hooks/useUploadStorage";
import TextField from '@mui/material/TextField';
import { PopupDto } from "../../../dto/popup.dto";
import useGetDate from "../../../hooks/useGetDate";
import CircularProgress from '../../progress';
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const CreateModal = ({ isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newMenuImage, setNewMenuImage] = useState<any>(null);
  const [date, setDate] = useState<string>(useGetDate());
  const [loading, setLoading] = useState<boolean>(false);
  const uploadStorage = useUploadStorage;
  const router = useRouter();

  const OnSubmit = async (data: any) => {
    let newImageStorage = await uploadStorage(newMenuImage, "storeImage");

    try {
      setLoading(true);
      isClose(false);
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/popup/create",
        {
          method: "POST",
          body: JSON.stringify({
            ...newImageStorage,
            type: 'PC',
            datetime: date,
            link: data.link
          } as PopupDto),
        }
      );
      router.reload()
    } catch (e) {
      alert("다시 시도해주세요");
    }
  };


  //이미지 권장설명 수정 필요
  return (
    <>
      <CircularProgress isOpen={loading} />
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
                defaultValue={date}
                sx={{ width: 250 }}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputWrap>
                <TextField
                  id="component-outlined"
                  {...register("link", { required: true })}
                  label="연결 링크"
                />
              </InputWrap>
              <InputWrap>
                <Label>팝업 이미지</Label>
                <Description>권장사이즈 : 430 x 510px / 지원파일 : jpg,png (최대 1MB)</Description>
                <ImageUpload id="image"
                  defaultImage={null}
                  onImageUpload={(file: File) => { setNewMenuImage(file) }} />
              </InputWrap>
              <Button variant="contained" type='submit'>저장</Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CreateModal;