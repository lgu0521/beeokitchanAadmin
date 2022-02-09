import { ImageBlock } from "./image-create.dto";

export interface MenuDTO{
  id: string;
  catagory: string;
  title: string;
  content1: string;
  content2: string;
  order: number;
  image: ImageBlock;
};

export type MenuCatagoryDTO = {
  id: string;
  order: number;
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
