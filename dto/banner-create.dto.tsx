import { ImageBlock, TmpImageBlock } from "./image-create.dto";

export interface BannerDTO extends ImageBlock {
  id: string;
  order: number;
}

export interface BannerCreateDTO extends Omit<BannerDTO, "id"> {
  id?: string;
}

export interface BannerDeleteDTO {
  id: string;
}
