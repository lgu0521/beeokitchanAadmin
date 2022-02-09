import { ImageStoreageDTO } from "./image-storage.dto";

export interface MenuDTO{
  id: string;
  catagory: string;
  title: string;
  content1: string;
  content2: string;
  datetime: string;
  image: ImageStoreageDTO;
};

export type MenuCatagoryDTO = {
  id: string;
  datetime: string;
  title: string;
  content: string;
};

export interface MenusWithCatagoryDTO extends MenuCatagoryDTO {
  menus: MenuDTO[];
}

export interface MenuCreateDTO extends Omit<MenuDTO, "id"> {
  id?: string;
}

export interface MenuCatagoryCreateDTO extends Omit<MenuCatagoryDTO, "id"> {
  id?: string;
}

export interface MenuDelelteDTO {
  id: string;
  title?: string;
}
