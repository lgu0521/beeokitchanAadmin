import { useForm } from "react-hook-form";
import { InputWrap, Description, Label, ModalBox } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ImageUpload from '../../ImageUpload';
import useDeleteStorage from "../../../hooks/useDeleteStorage";
import useUploadStorage from "../../../hooks/useUploadStorage";
import TextField from '@mui/material/TextField';
import { PopupDto } from "../../../dto/popup.dto";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from '../../progress';
import { useRouter } from "next/router";

interface Props {
  item: PopupDto;
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const ModifyModal = ({ item, isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [newMenuImage, setNewMenuImage] = useState<any>(null);
  const [date, setDate] = useState<string>(item.datetime);
  const deleteStorage = useDeleteStorage;
  const uploadStorage = useUploadStorage;
  const [loading, setLoading] = useState<boolean>(false);

  const OnSubmit = async (data: any) => {
    let newImageStorage = null;
    setLoading(true);
    isClose(false);
    if (newMenuImage) {
      const res = await deleteStorage(item);
      if (res) newImageStorage = await uploadStorage(newMenuImage, "storeImage");
    }


    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/popup/modify",
        {
          method: "POST",
          body: JSON.stringify({
            ...newImageStorage,
            link: data.link,
            type: 'PC',
            id: item.id,
            datetime: date
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
                  defaultValue={item.link}
                  {...register("link", { required: true })}
                  label="연결 링크"
                />
              </InputWrap>
              <InputWrap>
                <Label>팝업 이미지</Label>
                <Description>권장사이즈 : 430 x 510px / 지원파일 : jpg,png (최대 1MB)</Description>
                <ImageUpload id="image"
                  defaultImage={item.downloadUrl}
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

export default ModifyModal;