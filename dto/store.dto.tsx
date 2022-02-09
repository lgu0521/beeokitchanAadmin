import { ImageStoreageDTO } from "./image-storage.dto";

export type StoreDTO = {
    id: string,
    datetime: string,
    title: string,
    phonenumber: string,
    operation: string,
    image: ImageStoreageDTO
}

export interface StoreCreateDTO extends Omit<StoreDTO, "id"> {
    id?: string
}

export interface StoreDeleteDTO {
    id: string
}