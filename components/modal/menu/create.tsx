import { MenuCatagoryDTO, MenuDTO } from "../../../dto/menu.dto";
import { useForm } from "react-hook-form";
import { InputWrap, Description, Label, ModalBox } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ImageUpload from '../../ImageUpload';
import useUploadStorage from "../../../hooks/useUploadStorage";
import TextField from '@mui/material/TextField';
import useGetDate from "../../../hooks/useGetDate";
import CircularProgress from '../../progress';


interface Props {
  item: MenuCatagoryDTO[];
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const CreateModal = ({ item, isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newMenuImage, setNewMenuImage] = useState<any>(null);
  const [date, setDate] = useState<string>(useGetDate());
  const [loading, setLoading] = useState<boolean>(false);
  const OnSubmit = async (data: any) => {
    const newImageStorage = await useUploadStorage(newMenuImage, "menuImage");

    try {
      setLoading(true);
      isClose(false);
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/menu/create",
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            datetime: date,
            image: newImageStorage,
          } as MenuDTO),
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
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="메뉴 카테고리"
                  {...register("catagory", { required: true })}>
                  {item.map((item, i) => (
                    <MenuItem key={i} value={item.title}> {item.title}</MenuItem>
                  ))}
                </Select>
              </InputWrap>
              <InputWrap>
                <TextField
                  id="component-outlined"
                  {...register("title", { required: true, maxLength: 20 })}
                  label="메뉴명"
                />
              </InputWrap>
              <InputWrap>
                <TextField
                  id="component-outlined"
                  {...register("content1", { required: true })}
                  label="대표설명"
                />
              </InputWrap>
              <InputWrap>
                <TextField
                  id="component-outlined"
                  {...register("content2", { required: true })}
                  label="부가설명"
                />
              </InputWrap>
              <InputWrap>
                <Label>프로젝트 썸네일 이미지</Label>
                <Description>권장사이즈 : 300 x 300px / 지원파일 : jpg,png (최대 1MB)</Description>
                <ImageUpload id="image"
                  defaultImage={newMenuImage ? newMenuImage.downloadUrl : null}
                  onImageUpload={(file: File) => { setNewMenuImage(file) }} />
              </InputWrap>
              <Button variant="contained" type="submit">저장</Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CreateModal;