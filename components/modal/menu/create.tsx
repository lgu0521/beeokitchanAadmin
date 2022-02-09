import { MenuCatagoryDTO, MenuDTO } from "../../../dto/menu-create.dto";
import { useForm } from "react-hook-form";
import { InputWrap, Description, Label, ModalBox } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ImageUpload from '../../ImageUpload';
import useUploadStorage from "../../../hooks/useUploadStorage";

interface Props {
  item: MenuCatagoryDTO[];
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const CreateModal = ({ item, isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newMenuImage, setNewMenuImage] = useState<any>(null);

  const onSubmit = async (data: any) => {
    const newImageStorage = await useUploadStorage(newMenuImage, "menuImage");
    setNewMenuImage({...newImageStorage, isSet: true});

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/menu/modify",
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            image: newMenuImage,
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
          <Box sx={ModalBox}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputWrap>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="catagory"
                  {...register("catagory", { required: true })}>
                  {item.map((item, i) => (
                    <MenuItem value={item.title}> {item.title}</MenuItem>
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
                  onImageUpload={(file: File) => { setNewMenuImage({ ...file, isSet: true }) }} />
              </InputWrap>
              <Button type="submit">저장</Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CreateModal;