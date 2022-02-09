import { MenuCatagoryDTO, MenuDTO } from "../../../dto/menu-create.dto";
import { useForm } from "react-hook-form";
import { InputWrap, Description, Label, ModalBox, Input, Select } from "../../../styles/AdminPage.style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import ImageUpload from '../../ImageUpload';
import useDeleteStorage from "../../../hooks/useDeleteStorage";
import useUploadStorage from "../../../hooks/useUploadStorage";

interface Props {
  item: MenuDTO;
  itemCatagory: MenuCatagoryDTO[];
  isOpen: boolean;
  isClose: (click: boolean) => void;
}

const ModifyModal = ({ item, itemCatagory, isOpen, isClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newMenuImage, setNewMenuImage] = useState<any>({ isSet: false });

  const onSubmit = async (data: any) => {
    if (item.catagory != data.catagory) {
      //date time update 로 수정
      item.order = 0;
    }

    // 이미지 변경시, 기존 이미지 삭제 후 교체
    if (newMenuImage.isSet) {
      await useDeleteStorage(item.image);
      const newImageStorage = await useUploadStorage(newMenuImage, "menuImage");
      setNewMenuImage({ ...newImageStorage, isSet: true });
    }

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/item/modify",
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            id: item.id,
            order: item.order,
            image: newMenuImage.isSet ? newMenuImage : item.image,
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
                <Label>메뉴 카테고리</Label>
                <Description>메뉴 카테고리를 생성하고 싶으시면 메인에서 추가하세요</Description>
                <Select
                  defaultValue={item.catagory}
                  {...register("catagory", { required: true })}
                >
                  {itemCatagory.map((item, i) => (
                    <option value={item.title} key={i}>
                      {item.title}
                    </option>
                  ))}
                </Select>
              </InputWrap>
              <InputWrap>
                <Label>메뉴 이름</Label>
                <Input
                  defaultValue={item.title}
                  {...register("title", { required: true, maxLength: 20 })}
                />
              </InputWrap>
              <InputWrap>
                <Label>메뉴 설명1</Label>
                <Input
                  defaultValue={item.content1}
                  {...register("content1", { required: true })}
                />
              </InputWrap>
              <InputWrap>
                <Label>메뉴 설명2</Label>
                <Input
                  defaultValue={item.content2}
                  {...register("content2")}
                />
              </InputWrap>
              <InputWrap>
                <Label>메뉴 이미지</Label>
                <Description>권장사이즈 : 300 x 300px / 지원파일 : jpg,png (최대 1MB)</Description>
                <ImageUpload id="image"
                  defaultImage={newMenuImage ? newMenuImage.downloadUrl : null}
                  onImageUpload={(file: File) => { setNewMenuImage({ ...file, isSet: true }) }} />
              </InputWrap>
              <Button>저장</Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ModifyModal;