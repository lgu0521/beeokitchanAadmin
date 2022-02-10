import { ImageStoreageDTO } from "./image-storage.dto";

export interface BannerDTO extends ImageStoreageDTO {
  id: string;
  datetime: string;
  type:string;
}

export interface BannerCreateDTO extends Omit<BannerDTO, "id"> {
  id?: string;
}

export interface BannerDeleteDTO {
  id: string;
}
