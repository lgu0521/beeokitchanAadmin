import { useForm } from "react-hook-form";
import { InputWrap, Description, Label, ModalBox } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ImageUpload from '../../ImageUpload';
import useDeleteStorage from "../../../hooks/useDeleteStorage";
import useUploadStorage from "../../../hooks/useUploadStorage";
import { StoreDTO } from "../../../dto/store.dto";
import TextField from '@mui/material/TextField';


interface Props {
  item: StoreDTO;
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const ModifyModal = ({ item, isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newMenuImage, setNewMenuImage] = useState<any>(null);
  const [date, setDate] = useState<string>(item.datetime);  
  const deleteStorage = useDeleteStorage;
  const uploadStorage = useUploadStorage;


  const OnSubmit = async (data: any) => {
    let newImageStorage = null;
    if (newMenuImage) {
      await deleteStorage(item.image);
      newImageStorage = await uploadStorage(newMenuImage, "storeImage");
    }


    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/store/modify",
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            datetime: date,
            id: item.id,
            image: newImageStorage ? newImageStorage : item.image,
          } as StoreDTO),
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
                  id="component-outlined"
                  defaultValue={item.title}
                  {...register("title", { required: true })}
                  label="매장명"
                />
              </InputWrap>
              <InputWrap>
                <TextField
                  id="component-outlined"
                  defaultValue={item.operation}
                  multiline
                  rows={5}
                  {...register("operation", { required: true })}
                  label="매장 정보"
                />
              </InputWrap>
              <InputWrap>
                <TextField
                  id="component-outlined"
                  defaultValue={item.phonenumber}
                  {...register("phonenumber", { required: true })}
                  label="매장 전화번호"
                />
              </InputWrap>
              <InputWrap>
                <Label>매장 이미지</Label>
                <Description>권장사이즈 : 380 x 320px / 지원파일 : jpg,png (최대 1MB)</Description>
                <ImageUpload id="image"
                  defaultImage={item.image.downloadUrl}
                  onImageUpload={(file: File) => { setNewMenuImage(file) }} />
              </InputWrap>
              <Button type='submit'>저장</Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ModifyModal;