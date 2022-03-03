import { ImageStoreageDTO } from "./image-storage.dto";

export interface PopupDto extends ImageStoreageDTO {
  id: string;
  datetime: string;
  type: string;
  link:string;
}

export interface PopupCreateDTO extends Omit<PopupDto, "id"> {
  id?: string;
}

export interface PopupDeleteDTO {
  id: string;
}
