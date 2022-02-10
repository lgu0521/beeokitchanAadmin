import { MenuCatagoryDTO, MenuDTO } from "../../../dto/menu.dto";
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface Props {
  item: MenuDTO;
  itemCatagory: MenuCatagoryDTO[];
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const ModifyModal = ({ item, itemCatagory, isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newMenuImage, setNewMenuImage] = useState<any>(null);
  const [date, setDate] = useState<string>(item.datetime);

  const onSubmit = async (data: any) => {
    let newImageStorage = null;
    console.log(data);
    if (newMenuImage) {
      await useDeleteStorage(item.image);
      newImageStorage = await useUploadStorage(newMenuImage, "menuImage");
    }
    console.log(data);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/menu/modify",
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            datetime: date,
            id: item.id,
            image: newImageStorage ? newImageStorage : item.image,
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
      <div>
        <Modal
          open={isOpen}
          onClose={() => isClose(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={ModalBox()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputWrap>
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
              </InputWrap>
              <InputWrap>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="메뉴 카테고리"
                  defaultValue={item.catagory}
                  {...register("catagory", { required: true })}>
                  {itemCatagory.map((catagory, i) => (
                    <MenuItem key={i} value={catagory.title}> {catagory.title}</MenuItem>
                  ))}
                </Select>
              </InputWrap>
              <InputWrap>
                <TextField
                  id="component-outlined"
                  defaultValue={item.title}
                  {...register("title", { required: true })}
                  label="메뉴명"
                />
              </InputWrap>
              <InputWrap>
                <TextField
                  id="component-outlined"
                  defaultValue={item.content1}
                  {...register("content1", { required: true })}
                  label="메뉴 대표설명"
                />
              </InputWrap>
              <InputWrap>
                <TextField
                  id="component-outlined"
                  defaultValue={item.content2}
                  {...register("content2", { required: true })}
                  label="메뉴 부가설명"
                />
              </InputWrap>
              <InputWrap>
                <Label>메뉴 이미지</Label>
                <Description>권장사이즈 : 380 x 380px / 지원파일 : jpg,png (최대 1MB)</Description>
                <ImageUpload id="image"
                  defaultImage={item.image.downloadUrl}
                  onImageUpload={(file: File) => { setNewMenuImage(file) }} />
              </InputWrap>
              <Button type="submit">저장</Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ModifyModal;