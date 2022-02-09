import { useForm } from "react-hook-form";
import { InputWrap, Description, Label, ModalBox, Input, TextArea } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ImageUpload from '../../ImageUpload';
import useUploadStorage from "../../../hooks/useUploadStorage";
import { StoreDTO } from "../../../dto/store.dto";

interface Props {
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const CreateModal = ({ isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newMenuImage, setNewMenuImage] = useState<any>(null);

  const onSubmit = async (data: any) => {
    // 이미지 변경시, 기존 이미지 삭제 후 교체
    let newImageStorage = null;

    if (newMenuImage) {
      newImageStorage = await useUploadStorage(newMenuImage, "storeImage");
    }

    const resData: StoreDTO = {
      ...data,
      image: { ...newImageStorage },
    }
    console.log(resData);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/store/create",
        {
          method: "POST",
          body: JSON.stringify(resData),
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
                <Label>매장명</Label>
                <Input
                  {...register("title", { required: true })}
                />
              </InputWrap>
              <InputWrap>
                <Label>매장 정보</Label>
                <TextArea
                  {...register("operation", { required: true })}
                />
              </InputWrap>
              <InputWrap>
                <Label>매장 전화번호</Label>
                <Input
                  {...register("phonenumber", { required: true })}
                />
              </InputWrap>
              <InputWrap>
                <Label>메뉴 이미지</Label>
                <Description>권장사이즈 : 300 x 300px / 지원파일 : jpg,png (최대 1MB)</Description>
                <ImageUpload id="image"
                  defaultImage={null}
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

export default CreateModal;