import { useForm } from "react-hook-form";
import { InputWrap, Description, Label, ModalBox } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ImageUpload from '../../ImageUpload';
import useUploadStorage from "../../../hooks/useUploadStorage";
import TextField from '@mui/material/TextField';
import { BannerDTO } from "../../../dto/banner.dto";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useGetDate from "../../../hooks/useGetDate";

interface Props {
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const CreateModal = ({ isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newMenuImage, setNewMenuImage] = useState<any>(null);
  const [date, setDate] = useState<string>(useGetDate());
  const onSubmit = async (data: any) => {
    let newImageStorage = await useUploadStorage(newMenuImage, "storeImage");

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/banner/create",
        {
          method: "POST",
          body: JSON.stringify({
            ...newImageStorage,
            type: data.type,
            datetime: date
          } as BannerDTO),
        }
      );
      if (res && typeof window != null) {
        window.location.reload();
      }
    } catch (e) {
      alert("다시 시도해주세요");
    }
  };


  //이미지 권장설명 수정 필요
  return (
    <>
      <div>
        <Modal
          open={isOpen}
          onClose={() => isClose(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={ModalBox()}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="화면 유형"
                  {...register("type", { required: true })}>
                  <MenuItem value="PC">PC 화면</MenuItem>
                  <MenuItem value="MB">MB 화면</MenuItem>
                </Select>
              </InputWrap>
              <InputWrap>
                <Label>배너 이미지</Label>
                <Description>권장사이즈 : 1920 x 800px / 지원파일 : jpg,png (최대 1MB)</Description>
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